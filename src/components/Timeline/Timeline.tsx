import type { CSSProperties, ElementType, ReactNode } from 'react';
import './Timeline.css';

type BaseTimelineItem = {
  id: string;
  title: ReactNode;
  titleMeta?: ReactNode;
  description: ReactNode;
  isFilled?: boolean;
};

export type TimelineItem = BaseTimelineItem;
export type LabeledTimelineItem = BaseTimelineItem & {
  label: ReactNode;
};

interface TimelineProps {
  items: TimelineItem[];
  sectionGap?: CSSProperties['paddingBottom'];
  titleAs?: ElementType;
}

interface LabeledTimelineProps {
  items: LabeledTimelineItem[];
  sectionGap?: CSSProperties['paddingBottom'];
  titleAs?: ElementType;
}

const getTimelineStyle = (sectionGap?: CSSProperties['paddingBottom']) =>
  sectionGap === undefined ? undefined : ({ '--timeline-row-gap': sectionGap } as CSSProperties);

export default function Timeline({ items, sectionGap, titleAs: TitleTag = 'h2' }: TimelineProps) {
  const timelineStyle = getTimelineStyle(sectionGap);

  return (
    <div className="timeline timeline--experience" style={timelineStyle}>
      {items.map((item) => (
        <div className="timeline__row timeline__row--experience" key={item.id}>
          <div
            className={`timeline__marker${item.isFilled ? ' timeline__marker--filled' : ''}`}
            aria-hidden="true"
          />
          <div className="timeline__content timeline__content--experience">
            <div className="timeline__title-row">
              <TitleTag className="timeline__title text-lg">{item.title}</TitleTag>
              {item.titleMeta ? <div className="timeline__title-meta">{item.titleMeta}</div> : null}
            </div>
            <div className="timeline__description">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LabeledTimeline({
  items,
  sectionGap,
  titleAs: TitleTag = 'h2',
}: LabeledTimelineProps) {
  const timelineStyle = getTimelineStyle(sectionGap);

  return (
    <div className="timeline timeline--signals" style={timelineStyle}>
      {items.map((item) => (
        <div className="timeline__row timeline__row--signals" key={item.id}>
          <p className="timeline__label text-sm sm:text-base">{item.label}</p>
          <div
            className={`timeline__marker${item.isFilled ? ' timeline__marker--filled' : ''}`}
            aria-hidden="true"
          />
          <div className="timeline__content timeline__content--signals">
            <div className="timeline__title-row">
              <TitleTag className="timeline__title text-base sm:text-lg">{item.title}</TitleTag>
              {item.titleMeta ? <div className="timeline__title-meta">{item.titleMeta}</div> : null}
            </div>
            <div className="timeline__description text-sm sm:text-base">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
