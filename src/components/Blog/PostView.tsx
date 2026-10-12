import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { LightboxImage } from '@/components/ImageLightbox';
import '@/components/InteractiveImage.css';
import '@/components/SectionDivider.css';
import InlineBrandIcon from '@/components/InlineBrandIcon';
import SvgIcon from '@/components/SvgIcon';
import SectionRail, { type SectionRailItem } from '@/components/SectionRail';
import { BRAND_ICONS, ICONS } from '@/assets';
import { getArticleBrandIcon } from './articleBrandIcons';
import type { FeedPost } from './types';
import './PostView.css';

interface PostViewProps {
  post: FeedPost;
  onBack: () => void;
}

const ARTICLE_TITLE_ID = 'article-title';
const imageLightboxModule = import('@/components/ImageLightbox');
const ImageLightbox = lazy(() => imageLightboxModule);

const formatDate = (value: string) => {
  if (!value) return '';
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString();
};

const stripHtml = (html: string) => {
  if (!html) return '';
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

const getFootnoteNumberFromHref = (href: string | null | undefined) => {
  if (!href) return null;
  const match = href.match(/#footnote(?:-anchor)?-(\d+)/);
  return match?.[1] ?? null;
};

const normalizeFootnotes = (doc: Document) => {
  doc.querySelectorAll('a.footnote-anchor').forEach((link) => {
    const number = getFootnoteNumberFromHref(link.getAttribute('href')) ?? link.textContent?.trim();
    if (!number) return;
    link.setAttribute('href', `#footnote-${number}`);
    if (!link.id) link.id = `footnote-anchor-${number}`;
    link.removeAttribute('target');
    link.removeAttribute('rel');
  });

  doc.querySelectorAll('.footnote').forEach((footnote) => {
    const numberLink = footnote.querySelector('a.footnote-number');
    const number =
      getFootnoteNumberFromHref(numberLink?.getAttribute('href')) ??
      numberLink?.textContent?.trim();
    if (!number || footnote.id) return;
    footnote.id = `footnote-${number}`;
  });

  doc.querySelectorAll('a.footnote-number').forEach((link) => {
    const number = getFootnoteNumberFromHref(link.getAttribute('href')) ?? link.textContent?.trim();
    if (!number) return;
    link.setAttribute('href', `#footnote-anchor-${number}`);
    link.removeAttribute('target');
    link.removeAttribute('rel');
  });
};

const normalizeImageTriggers = (doc: Document) => {
  doc.querySelectorAll('img').forEach((image) => {
    const sourceLink = image.closest<HTMLAnchorElement>('a');
    const source = sourceLink?.getAttribute('href') || image.getAttribute('src');
    if (!source) return;

    let trigger: HTMLElement;
    if (sourceLink) {
      trigger = sourceLink;
    } else {
      const wrapper = doc.createElement('span');
      image.replaceWith(wrapper);
      wrapper.appendChild(image);
      trigger = wrapper;
    }

    const alt = image.getAttribute('alt')?.trim() || 'Article image';
    trigger.classList.add('post-image-trigger');
    trigger.setAttribute('data-image-src', source);
    trigger.setAttribute('data-image-alt', alt);
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('tabindex', '0');
    trigger.setAttribute('aria-label', `Enlarge image: ${alt}`);

    const visual = image.closest('picture') ?? image;
    if (!visual.parentElement?.classList.contains('post-image-visual')) {
      const visualWrapper = doc.createElement('span');
      visualWrapper.classList.add('post-image-visual');
      visual.replaceWith(visualWrapper);
      visualWrapper.appendChild(visual);
      ['top-left', 'top-right', 'bottom-right', 'bottom-left'].forEach((position) => {
        const corner = doc.createElement('span');
        corner.classList.add('post-image-corner', `post-image-corner--${position}`);
        corner.setAttribute('aria-hidden', 'true');
        visualWrapper.appendChild(corner);
      });
    }

    if (sourceLink) {
      sourceLink.removeAttribute('href');
      sourceLink.removeAttribute('target');
      sourceLink.removeAttribute('rel');
    }
  });
};

const createArticleDivider = (doc: Document) => {
  const divider = doc.createElement('div');
  const ornament = doc.createElement('span');
  divider.classList.add('section-divider', 'article-section-divider');
  divider.setAttribute('role', 'separator');
  ornament.setAttribute('aria-hidden', 'true');
  ornament.textContent = '✦ ✦ ✦';
  divider.appendChild(ornament);
  return divider;
};

const prepareArticleDividers = (doc: Document) => {
  doc.querySelectorAll('hr').forEach((rule) => rule.replaceWith(createArticleDivider(doc)));

  const headings = Array.from(doc.querySelectorAll('h2'));
  const existingDividers = Array.from(doc.querySelectorAll('.section-divider'));
  const firstHeading = headings[0];
  if (firstHeading) {
    const introRange = doc.createRange();
    introRange.setStart(doc.body, 0);
    introRange.setEndBefore(firstHeading);
    const hasDividerBefore = existingDividers.some((divider) =>
      Boolean(divider.compareDocumentPosition(firstHeading) & Node.DOCUMENT_POSITION_FOLLOWING),
    );
    if (introRange.toString().trim() && !hasDividerBefore) {
      firstHeading.before(createArticleDivider(doc));
    }
  }

  headings.slice(1).forEach((heading, index) => {
    const previousHeading = headings[index];
    const hasDividerBetween = existingDividers.some(
      (divider) =>
        Boolean(previousHeading.compareDocumentPosition(divider) & Node.DOCUMENT_POSITION_FOLLOWING) &&
        Boolean(divider.compareDocumentPosition(heading) & Node.DOCUMENT_POSITION_FOLLOWING),
    );
    if (!hasDividerBetween) heading.before(createArticleDivider(doc));
  });
};

const linkGraduationIntro = (doc: Document, postTitle: string) => {
  if (postTitle !== "I Got my Bachelor's Degree!") return;
  const firstParagraph = doc.querySelector('p');
  const textNode = Array.from(firstParagraph?.childNodes ?? []).find(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.includes('Auburn University'),
  );
  const text = textNode?.textContent;
  if (!textNode || !text) return;

  const name = 'Auburn University';
  const index = text.indexOf(name);
  const link = doc.createElement('a');
  link.href = 'https://www.auburn.edu/';
  link.textContent = name;
  textNode.replaceWith(
    doc.createTextNode(text.slice(0, index)),
    link,
    doc.createTextNode(text.slice(index + name.length)),
  );
};

const normalizeArticleBrandLinks = (doc: Document) => {
  doc.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || link.classList.contains('post-image-trigger')) return;

    let label = link.textContent?.trim() ?? '';
    if (label === 'my Substack' && href === 'https://jacobmurrah.substack.com/') {
      link.before(doc.createTextNode('my '));
      link.textContent = 'Substack';
      label = 'Substack';
    }
    if (label === 'his Discord' && href.startsWith('https://discord.com/')) {
      link.before(doc.createTextNode('his '));
      link.textContent = 'Discord';
      label = 'Discord';
    }

    const brandIcon = getArticleBrandIcon(href, label);
    if (!brandIcon) return;
    const icon = doc.createElement('img');
    icon.src = brandIcon.src;
    icon.alt = '';
    icon.width = brandIcon.wide ? 20 : 16;
    icon.height = 16;
    icon.classList.add('inline-brand-icon');
    if (brandIcon.wide) icon.classList.add('inline-brand-icon--wide');
    link.prepend(icon);
  });
};

const cleanContent = (html: string, postTitle: string): { html: string; sections: SectionRailItem[] } => {
  if (!html) return { html: '', sections: [] };
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  doc
    .querySelectorAll(
      '.subscription-widget, .subscription-widget-wrap, .subscription-widget-wrap-editor',
    )
    .forEach((el) => el.remove());
  doc.querySelectorAll('.image-link-expand, .restack-image, .view-image').forEach((el) => {
    el.remove();
  });
  normalizeFootnotes(doc);
  normalizeImageTriggers(doc);
  prepareArticleDividers(doc);
  linkGraduationIntro(doc, postTitle);
  doc.querySelectorAll<HTMLAnchorElement>('a[href="https://murrah.dev/blog"]').forEach((link) => {
    link.setAttribute('href', '/writing');
  });
  normalizeArticleBrandLinks(doc);
  const usedHeadingIds = new Map<string, number>([[ARTICLE_TITLE_ID, 1]]);
  const sections = Array.from(doc.querySelectorAll('h2, h3, h4')).map((heading, index) => {
    const label = heading.textContent?.trim() || `Section ${index + 1}`;
    const baseId =
      label
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || `section-${index + 1}`;
    const occurrence = (usedHeadingIds.get(baseId) ?? 0) + 1;
    usedHeadingIds.set(baseId, occurrence);
    const id = occurrence === 1 ? baseId : `${baseId}-${occurrence}`;

    heading.id = id;
    heading.classList.add('section-rail-target');
    const depth = Math.min(Number(heading.tagName.slice(1)) - 2, 2) as 0 | 1 | 2;
    return { id, label, depth };
  });
  doc.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || (href.startsWith('/') && !href.startsWith('//'))) {
      link.removeAttribute('target');
      link.removeAttribute('rel');
      return;
    }
    link.setAttribute('target', '_blank');
    const existingRel = link.getAttribute('rel') ?? '';
    const relTokens = new Set(existingRel.split(/\s+/).filter(Boolean));
    relTokens.add('noopener');
    relTokens.add('noreferrer');
    link.setAttribute('rel', Array.from(relTokens).join(' '));
  });
  return { html: doc.body.innerHTML, sections };
};

export default function PostView({ post, onBack }: PostViewProps) {
  const publishedOn = formatDate(post.pubDate);
  const rawContent = post.content || post.description || '';
  const { html: content, sections } = useMemo(() => cleanContent(rawContent, post.title), [rawContent, post.title]);
  const contentMarkup = useMemo(() => ({ __html: content }), [content]);
  const railSections = useMemo<SectionRailItem[]>(
    () => [{ id: ARTICLE_TITLE_ID, label: post.title, depth: 0 }, ...sections],
    [post.title, sections],
  );
  const subtitle = stripHtml(post.description).trim();
  const contentRef = useRef<HTMLElement | null>(null);
  const isOpeningImageRef = useRef(false);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);

  const closeLightbox = useCallback(() => {
    isOpeningImageRef.current = false;
    setLightboxImage(null);
  }, []);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return undefined;

    const scrollToHash = (hash: string) => {
      const targetId = decodeURIComponent(hash.replace(/^#/, ''));
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const openImage = (trigger: HTMLElement) => {
      if (isOpeningImageRef.current) return;
      const image =
        trigger instanceof HTMLImageElement
          ? trigger
          : trigger.querySelector<HTMLImageElement>('img');
      if (!image) return;

      const src = image.currentSrc || trigger.dataset.imageSrc;
      if (!src) return;

      isOpeningImageRef.current = true;
      setLightboxImage({
        src,
        alt: trigger.dataset.imageAlt || 'Article image',
        source: image,
        trigger,
        objectFit: getComputedStyle(image).objectFit as LightboxImage['objectFit'],
      });
    };

    const getImageTrigger = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLElement>('.post-image-trigger') : null;

    const handleClick = (event: Event) => {
      const imageTrigger = getImageTrigger(event.target);
      if (imageTrigger) {
        event.preventDefault();
        openImage(imageTrigger);
        return;
      }

      const anchor = (event.target as HTMLElement)?.closest<HTMLAnchorElement>(
        'a.footnote-anchor, a.footnote-number',
      );
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      event.preventDefault();
      window.history.pushState(null, '', href);
      scrollToHash(href);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const imageTrigger = getImageTrigger(event.target);
      if (!imageTrigger) return;
      event.preventDefault();
      openImage(imageTrigger);
    };

    container.addEventListener('click', handleClick);
    container.addEventListener('keydown', handleKeyDown);
    if (window.location.hash) {
      scrollToHash(window.location.hash);
    }

    return () => {
      container.removeEventListener('click', handleClick);
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [content]);

  useEffect(() => {
    if (!lightboxImage) return undefined;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeLightbox, lightboxImage]);

  return (
    <article className="post-view">
      <SectionRail sections={railSections} />
      <div className="post-shell">
        <button type="button" onClick={onBack} className="back-nav-link text-base back-nav-button">
          <SvgIcon src={ICONS.arrowLeft} alt="" size="2xsmall" color="currentColor" />
          <span>Back to Writing</span>
        </button>

        <header id={ARTICLE_TITLE_ID} className="post-header section-rail-target">
          <div className="post-title-block">
            {post.link ? (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="post-title-link link-underline"
              >
                {post.title}
                {'\u00a0'}
                <SvgIcon
                  src={ICONS.arrowUpRight}
                  alt=""
                  size="2xsmall"
                  color="currentColor"
                  hoverColor="currentColor"
                  className="post-title-link__arrow"
                />
              </a>
            ) : (
              <h1 className="post-title">{post.title}</h1>
            )}
            {subtitle && <p className="post-subtitle">{subtitle}</p>}
          </div>
          <div className="post-byline">
            <a
              className="post-author meta-link"
              href="https://jacobmurrah.substack.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {post.author}
            </a>
            {publishedOn && <div className="post-date">{publishedOn}</div>}
          </div>
        </header>

        <hr className="post-divider" />

        <section
          ref={contentRef}
          className="post-content"
          dangerouslySetInnerHTML={contentMarkup}
          aria-label="Post content"
        />

        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="post-link-btn post-bottom-link inline-link"
          >
            <InlineBrandIcon src={BRAND_ICONS.substack} />
            Read on Substack
          </a>
        )}
      </div>

      <Suspense fallback={null}>
        <ImageLightbox image={lightboxImage} onBackdropClick={closeLightbox} />
      </Suspense>
    </article>
  );
}
