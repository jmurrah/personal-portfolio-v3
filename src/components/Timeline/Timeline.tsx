import type { CSSProperties, ElementType, ReactNode } from 'react';
import './Timeline.css';

export type TimelineItem = {
  id: string;
  label?: string;
  title: ReactNode;
  titleMeta?: ReactNode;
  description: ReactNode;
  isFilled?: boolean;
};

interface TimelineProps {
  items: TimelineItem[];
  sectionGap?: CSSProperties['paddingBottom'];
  titleAs?: ElementType;
}

export default function Timeline({ items, sectionGap, titleAs: TitleTag = 'h2' }: TimelineProps) {
  const hasLabels = items.some((item) => item.label);
  const timelineStyle =
    sectionGap === undefined ? undefined : ({ '--timeline-row-gap': sectionGap } as CSSProperties);

  return (
    <div
      className={`timeline${hasLabels ? ' timeline--with-labels' : ' timeline--without-labels'}`}
      style={timelineStyle}
    >
      {items.map((item) => (
        <div className="timeline__row" key={item.id}>
          {hasLabels && <p className="timeline__label">{item.label ?? ''}</p>}
          <div
            className={`timeline__marker${item.isFilled ? ' timeline__marker--filled' : ''}`}
            aria-hidden="true"
          />
          <div className="timeline__content">
            <div className="timeline__title-row">
              <TitleTag className="timeline__title text-lg">{item.title}</TitleTag>
              {item.titleMeta ? (
                <div className="timeline__title-meta text-sm">{item.titleMeta}</div>
              ) : null}
            </div>
            <div className="timeline__description">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
