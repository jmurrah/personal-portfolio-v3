import { useId, useState, type ReactNode } from 'react';
import type { TechnologyName } from './technologyIcons';
import './ExperienceList.css';

export type ExperienceItem = {
  company: string;
  logo: string;
  companyLink: string;
  companyLinkLabel?: string;
  role: string;
  dates: string;
  note?: string;
  summary?: ReactNode;
  technologies: TechnologyName[];
};

function ExperienceRow({ experience, isOpen, onToggle }: {
  experience: ExperienceItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const headingId = `${panelId}-heading`;

  return (
    <article className={`experience-row${isOpen ? ' experience-row--open' : ''}`}>
      <h3 className="experience-heading" id={headingId}>
        <button
          type="button"
          className="experience-summary"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="experience-company">
            <img className="experience-company-logo" src={experience.logo} alt="" width="20" height="20" decoding="async" draggable={false} />
            {experience.company}
          </span>
          <span className="experience-role">{experience.role}</span>
          <span className="experience-leader" aria-hidden="true" />
          <span className="experience-date">{experience.dates}</span>
          <span className="experience-toggle" aria-hidden="true" />
        </button>
      </h3>
      <div
        className="experience-panel"
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="experience-panel-inner">
          <div className="experience-details">
            {experience.note ? <p className="experience-note">{experience.note}</p> : null}
            {experience.summary ? <p className="experience-description">{experience.summary}</p> : null}
            <div className="experience-footer">
              <a className="meta-link experience-company-link" href={experience.companyLink} target="_blank" rel="noopener noreferrer">
                {experience.companyLinkLabel ?? 'Website'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ExperienceList({ experiences }: { experiences: ExperienceItem[] }) {
  const [openCompany, setOpenCompany] = useState<string | null>(null);

  return (
    <div className="experience-list">
      {experiences.map((experience) => (
        <ExperienceRow
          experience={experience}
          key={experience.company}
          isOpen={openCompany === experience.company}
          onToggle={() => setOpenCompany((current) => current === experience.company ? null : experience.company)}
        />
      ))}
    </div>
  );
}
