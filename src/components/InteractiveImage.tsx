import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
} from 'react';
import type { LightboxImage } from './ImageLightbox';
import './InteractiveImage.css';

const imageLightboxModule = import('./ImageLightbox');
const ImageLightbox = lazy(() => imageLightboxModule);

const CORNERS = ['top-left', 'top-right', 'bottom-right', 'bottom-left'] as const;

type InteractiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> & {
  alt: string;
  src: string;
  wrapperClassName?: string;
};

export default function InteractiveImage({
  alt,
  src,
  wrapperClassName,
  className,
  ...imageProps
}: InteractiveImageProps) {
  const triggerRef = useRef<HTMLSpanElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const isOpeningRef = useRef(false);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);

  const closeLightbox = useCallback(() => {
    isOpeningRef.current = false;
    setLightboxImage(null);
  }, []);

  const openLightbox = useCallback(() => {
    if (isOpeningRef.current) return;
    const trigger = triggerRef.current;
    const image = imageRef.current;
    if (!trigger || !image) return;

    isOpeningRef.current = true;
    setLightboxImage({
      src: image.currentSrc || src,
      alt,
      source: image,
      trigger,
      objectFit: getComputedStyle(image).objectFit as LightboxImage['objectFit'],
    });
  }, [alt, src]);

  useEffect(() => {
    if (!lightboxImage) return undefined;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeLightbox, lightboxImage]);

  return (
    <>
      <span
        ref={triggerRef}
        className={['post-image-trigger', 'interactive-image', wrapperClassName]
          .filter(Boolean)
          .join(' ')}
        role="button"
        tabIndex={0}
        aria-label={`Enlarge image: ${alt}`}
        onClick={openLightbox}
        onKeyDown={(event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          openLightbox();
        }}
      >
        <span className="post-image-visual">
          <img ref={imageRef} src={src} alt={alt} className={className} {...imageProps} />
          {CORNERS.map((corner) => (
            <span
              key={corner}
              className={`post-image-corner post-image-corner--${corner}`}
              aria-hidden="true"
            />
          ))}
        </span>
      </span>

      <Suspense fallback={null}>
        <ImageLightbox image={lightboxImage} onBackdropClick={closeLightbox} />
      </Suspense>
    </>
  );
}
