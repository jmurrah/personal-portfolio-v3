import { useEffect, useId, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { TECHNOLOGY_ICONS, type TechnologyName } from './technologyIcons';

export default function TechnologyIcon({ technology }: { technology: TechnologyName }) {
  const tooltipId = useId();
  const [anchor, setAnchor] = useState<{ x: number; y: number; arrowOffset: number } | null>(null);

  useEffect(() => {
    if (!anchor) return;
    const dismiss = () => setAnchor(null);
    window.addEventListener('scroll', dismiss, true);
    window.addEventListener('resize', dismiss);
    return () => {
      window.removeEventListener('scroll', dismiss, true);
      window.removeEventListener('resize', dismiss);
    };
  }, [anchor]);

  const showTooltip = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const x = Math.max(72, Math.min(window.innerWidth - 72, center));
    setAnchor({ x, y: rect.top - 8, arrowOffset: center - x });
  };

  return (
    <>
      <span
        className="experience-technology-icon"
        tabIndex={0}
        role="img"
        aria-label={technology}
        aria-describedby={anchor ? tooltipId : undefined}
        onMouseEnter={(event) => showTooltip(event.currentTarget)}
        onMouseLeave={() => setAnchor(null)}
        onFocus={(event) => showTooltip(event.currentTarget)}
        onBlur={() => setAnchor(null)}
        onKeyDown={(event) => { if (event.key === 'Escape') setAnchor(null); }}
      >
        <img src={TECHNOLOGY_ICONS[technology]} alt="" width="14" height="14" decoding="async" draggable={false} />
      </span>
      {anchor ? createPortal(
        <span
          className="experience-technology-tooltip"
          id={tooltipId}
          role="tooltip"
          style={{ left: anchor.x, top: anchor.y, '--tooltip-arrow-offset': `${anchor.arrowOffset}px` } as CSSProperties}
        >
          {technology}
        </span>,
        document.body,
      ) : null}
    </>
  );
}
