import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type ImageBounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type LightboxImage = {
  src: string;
  alt: string;
  source: HTMLImageElement;
  trigger: HTMLElement;
  objectFit: CSSProperties['objectFit'];
};

type ImageLightboxProps = {
  image: LightboxImage | null;
  onBackdropClick: () => void;
};

function ImageDialog({ image, onBackdropClick }: ImageLightboxProps & { image: LightboxImage }) {
  const prefersReducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const releaseSourceTimerRef = useRef<number | null>(null);
  const [bounds, setBounds] = useState<{ origin: ImageBounds; target: ImageBounds } | null>(null);

  useEffect(() => {
    const dismissOnPointerDown = () => onBackdropClick();
    window.addEventListener('pointerdown', dismissOnPointerDown, true);
    return () => window.removeEventListener('pointerdown', dismissOnPointerDown, true);
  }, [onBackdropClick]);

  useLayoutEffect(() => {
    const { source, trigger } = image;
    const { body, documentElement } = document;
    const appRoot = document.getElementById('root');
    const sourceVisual = source.closest<HTMLElement>('.post-image-visual');
    const previousInert = appRoot?.inert ?? false;
    const previousVisibility = source.style.visibility;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    if (releaseSourceTimerRef.current !== null) {
      window.clearTimeout(releaseSourceTimerRef.current);
      releaseSourceTimerRef.current = null;
    }
    sourceVisual?.classList.add('post-image-visual--lightbox-origin');

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbarWidth}px`;
    }
    body.style.overflow = 'hidden';

    const updateBounds = () => {
      const rect = source.getBoundingClientRect();
      const naturalWidth = source.naturalWidth || rect.width || 1;
      const naturalHeight = source.naturalHeight || rect.height || 1;
      const scale = Math.min(
        Math.min(window.innerWidth * 0.8, 1024) / naturalWidth,
        (window.innerHeight * 0.8) / naturalHeight,
      );
      const width = naturalWidth * scale;
      const height = naturalHeight * scale;
      setBounds({
        origin: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
        target: {
          top: (window.innerHeight - height) / 2,
          left: (window.innerWidth - width) / 2,
          width,
          height,
        },
      });
    };

    updateBounds();
    source.addEventListener('load', updateBounds);
    source.style.visibility = 'hidden';
    dialogRef.current?.focus({ preventScroll: true });
    if (appRoot) appRoot.inert = true;
    window.addEventListener('resize', updateBounds);

    return () => {
      window.removeEventListener('resize', updateBounds);
      source.removeEventListener('load', updateBounds);
      source.style.visibility = previousVisibility;
      if (sourceVisual) {
        releaseSourceTimerRef.current = window.setTimeout(() => {
          sourceVisual.classList.remove('post-image-visual--lightbox-origin');
          releaseSourceTimerRef.current = null;
        }, 50);
      }
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      if (appRoot) appRoot.inert = previousInert;
      if (trigger.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [image]);

  return (
    <div
      ref={dialogRef}
      className="post-image-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Enlarged image: ${image.alt}`}
      tabIndex={-1}
      onKeyDown={(event) => {
        if (event.key === 'Tab') event.preventDefault();
      }}
    >
      <motion.div
        className="post-image-lightbox__backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
      />
      {bounds ? (
        <motion.img
          className="post-image-lightbox__image"
          src={image.src}
          alt={image.alt}
          draggable={false}
          style={{ objectFit: image.objectFit }}
          initial={prefersReducedMotion ? false : bounds.origin}
          animate={bounds.target}
          exit={bounds.origin}
          transition={
            prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }
          }
        />
      ) : null}
    </div>
  );
}

export default function ImageLightbox({ image, onBackdropClick }: ImageLightboxProps) {
  useEffect(() => {
    if (!image) return undefined;
    document.body.classList.add('image-lightbox-open');
    return () => document.body.classList.remove('image-lightbox-open');
  }, [image]);

  return createPortal(
    <AnimatePresence>
      {image ? <ImageDialog key="image" image={image} onBackdropClick={onBackdropClick} /> : null}
    </AnimatePresence>,
    document.body,
  );
}
