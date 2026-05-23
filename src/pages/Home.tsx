import React from 'react';
import { Link } from 'react-router-dom';
import Timeline, { type TimelineItem } from '@/components/Timeline';

type HeroLink = { label: string; href: string };
type ExperienceItem = {
  company: string;
  companyLink: string;
  location: string;
  role: string;
  dates: string;
  summary: React.ReactNode;
};

const HERO_LINKS: HeroLink[] = [
  { label: 'email', href: 'mailto:jacob@murrah.dev' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/jacobmurrah/' },
  { label: 'github', href: 'https://github.com/jmurrah' },
  { label: 'resume', href: '/JacobMurrahResume.pdf' },
];

const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'AT&T',
    companyLink: 'https://www.att.com/',
    location: 'Atlanta, GA',
    role: 'Software Engineer I',
    dates: 'Jan. 2026 - Present',
    summary: 'Network analytics and automation.',
  },
  {
    company: 'Auburn University',
    companyLink: 'https://www.auburn.edu/',
    location: 'Auburn, AL',
    role: 'UG Research Assistant',
    dates: 'Aug. 2025 - Dec. 2025',
    summary: (
      <>
        Worked with{' '}
        <a
          href="https://scholar.google.com/citations?user=Q1yTMQQAAAAJ"
          target="_blank"
          rel="noopener noreferrer"
          className="meta-link"
        >
          Dr. Rongxuan Wang
        </a>{' '}
        in the AMICS lab.
      </>
    ),
  },
  {
    company: 'AT&T',
    companyLink: 'https://www.att.com/',
    location: 'Atlanta, GA',
    role: 'Software Engineer Intern',
    dates: 'Jun. 2025 - Aug. 2025',
    summary: 'Web application for monitoring store inventory.',
  },
  {
    company: 'Adtran',
    companyLink: 'https://www.adtran.com/',
    location: 'Huntsville, AL',
    role: 'Software Engineer Co-op',
    dates: 'May 2023 - Dec. 2024',
    summary: 'Developer tooling and SaaS for network monitoring.',
  },
];

const EXPERIENCE_ITEMS: TimelineItem[] = EXPERIENCES.map((experience) => ({
  id: `${experience.company}-${experience.role}-${experience.dates}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, ''),
  title: (
    <span>
      {experience.role} <span className="text-[var(--muted)]">@</span>{' '}
      <a
        href={experience.companyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="meta-link"
      >
        {experience.company}
      </a>
    </span>
  ),
  description: (
    <>
      <div className="flex items-baseline gap-3">
        <span>{experience.location}</span>
        <span className="ml-auto whitespace-nowrap">{experience.dates}</span>
      </div>
      <div>{experience.summary}</div>
    </>
  ),
  isFilled: experience.dates.includes('Present'),
}));

function HeroSection() {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-5xl font-semibold">Jacob Murrah</h1>
      <div className="flex flex-col gap-3">
        <p className="text-[var(--muted)]">
          Curious about what has shaped me? Read my{' '}
          <Link className="inline-link" to="/signals">
            signals
          </Link>
          .
        </p>
        <p className="text-[var(--muted)]">
          <span className="text-[var(--text)]">Software Engineer</span> at{' '}
          <a
            href="https://www.att.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="meta-link gap-0.5 flex items-center"
          >
            <span>AT&T</span>
          </a>{' '}
          in <span className="text-[var(--text)]">Atlanta</span>, working on network analytics and
          automation. I bring modern engineering practices to legacy systems.
        </p>
        <p className="text-[var(--muted)]">
          Pursuing a master's at{' '}
          <a
            href="https://www.gatech.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="meta-link gap-0.5 flex items-center"
          >
            <span>Georgia Tech</span>
          </a>{' '}
          while navigating fatherhood, hitting the gym, and optimizing my daily routines.
        </p>
      </div>
      <div className="flex flex-wrap gap-x-4 justify-start">
        {HERO_LINKS.map((link, index) => (
          <React.Fragment key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="meta-link gap-0.5 flex items-center"
            >
              <span>{link.label}</span>
            </a>
            {index < HERO_LINKS.length - 1 && <span>&middot;</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl">Experience</h2>
      <Timeline items={EXPERIENCE_ITEMS} sectionGap="2rem" titleAs="h3" />
    </div>
  );
}

export default function Home() {
  return (
    <section className="flex flex-col gap-16">
      <HeroSection />
      <ExperienceSection />
    </section>
  );
}
