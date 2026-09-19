import { useEffect, useRef, useState, type MouseEvent } from 'react';
import './SectionRail.css';

export type SectionRailItem = {
  id: string;
  label: string;
  depth?: 0 | 1 | 2;
};

type SectionRailProps = {
  sections: SectionRailItem[];
};

export default function SectionRail({ sections }: SectionRailProps) {
  const [activeId, setActiveId] = useState(() => sections[0]?.id ?? '');
  const railRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setActiveId((currentId) =>
      sections.some((section) => section.id === currentId) ? currentId : (sections[0]?.id ?? ''),
    );
  }, [sections]);

  useEffect(() => {
    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return undefined;

    const links = Array.from(
      railRef.current?.querySelectorAll<HTMLAnchorElement>('.section-rail-link') ?? [],
    );
    const entries = sections.flatMap((section, index) => {
      const target = document.getElementById(section.id);
      const link = links[index];
      return target && link ? [{ target, link }] : [];
    });

    if (entries.length === 0) return undefined;

    const scrollMargin =
      Number.parseFloat(getComputedStyle(entries[0].target).scrollMarginTop) || 0;
    let animationFrame = 0;

    const updateRail = () => {
      animationFrame = 0;
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const starts = entries.map(({ target }) =>
        Math.min(
          maxScroll,
          Math.max(0, target.getBoundingClientRect().top + scrollTop - scrollMargin),
        ),
      );
      let activeIndex = 0;

      for (let index = 1; index < starts.length; index += 1) {
        if (scrollTop < starts[index]) break;
        activeIndex = index;
      }

      entries.forEach(({ link }, index) => {
        let progress = 0;

        if (index < activeIndex) {
          progress = 1;
        } else if (index === activeIndex) {
          const start = starts[index];
          const end = starts[index + 1] ?? maxScroll;
          progress =
            end <= start ? 1 : Math.min(1, Math.max(0.01, (scrollTop - start) / (end - start)));
        }

        link.style.setProperty('--section-rail-progress', `${progress * 100}%`);
      });

      const nextActiveId = entries[activeIndex].target.id;
      setActiveId((currentId) => (currentId === nextActiveId ? currentId : nextActiveId));
    };

    const scheduleRailUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateRail);
    };

    const observer = new IntersectionObserver(scheduleRailUpdate, {
      rootMargin: '-35% 0px -55% 0px',
      threshold: 0,
    });

    entries.forEach(({ target }) => observer.observe(target));
    window.addEventListener('scroll', scheduleRailUpdate, { passive: true });
    window.addEventListener('resize', scheduleRailUpdate);
    scheduleRailUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleRailUpdate);
      window.removeEventListener('resize', scheduleRailUpdate);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [sections]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;

    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    window.history.pushState(null, '', `#${id}`);
    target.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
    setActiveId(id);
  };

  if (sections.length === 0) return null;

  return (
    <nav ref={railRef} className="section-rail" aria-label="Page sections">
      {sections.map((section) => (
        <a
          key={section.id}
          className={`section-rail-link section-rail-link-depth-${section.depth ?? 0} ${activeId === section.id ? 'section-rail-link-active' : ''}`}
          href={`#${section.id}`}
          aria-label={`Go to ${section.label}`}
          aria-current={activeId === section.id ? 'location' : undefined}
          onClick={(event) => handleClick(event, section.id)}
        >
          <span className="section-rail-marker" aria-hidden="true">
            <span className="section-rail-fill" />
          </span>
          <span className="section-rail-label" aria-hidden="true">
            {section.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
