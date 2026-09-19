import React from 'react';
import { Link } from 'react-router-dom';
import { PHOTOS } from '@/assets';
import BlogFeed from '@/components/Blog/BlogFeed';
import SectionRail, { type SectionRailItem } from '@/components/SectionRail';
import Timeline, { type TimelineItem } from '@/components/Timeline';

type HeroLink = { label: string; href: string };
type ExperienceItem = {
  company: string;
  companyLink: string;
  role: string;
  dates: string;
  summary: React.ReactNode;
  reflection: string;
};

const HERO_LINKS: HeroLink[] = [
  { label: 'email', href: 'mailto:jacob@murrah.dev' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/jacobmurrah/' },
  { label: 'github', href: 'https://github.com/jmurrah' },
  { label: 'substack', href: 'https://jacobmurrah.substack.com/' },
  { label: 'resume', href: '/JacobMurrahResume.pdf' },
];

const HOME_SECTIONS: SectionRailItem[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'writing', label: 'Writing' },
];

const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'AT&T',
    companyLink: 'https://www.att.com/',
    role: 'Software Engineer I',
    dates: 'Jan. 2026 - Present',
    summary: 'Network disaster recovery and automated ticketing.',
    reflection:
      'Navigating legacy Java systems that nobody fully understands while improving development processes along the way.',
  },
  {
    company: 'Auburn University',
    companyLink: 'https://www.auburn.edu/',
    role: 'Research Assistant',
    dates: 'Aug. 2025 - Dec. 2025',
    summary: (
      <>
        Manufacturing fulfillment marketplace for CAD designers under{' '}
        <a
          href="https://scholar.google.com/citations?user=Q1yTMQQAAAAJ"
          target="_blank"
          rel="noopener noreferrer"
          className="meta-link"
        >
          Dr. Wang
        </a>
        .
      </>
    ),
    reflection:
      'Led design and implementation in Next.js and learned to translate high-level vision into concrete technical decisions.',
  },
  {
    company: 'AT&T',
    companyLink: 'https://www.att.com/',
    role: 'Software Engineer Intern',
    dates: 'Jun. 2025 - Aug. 2025',
    summary: (
      <>
        Inventory monitoring application for{' '}
        <a
          href="https://www.cricketwireless.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="meta-link"
        >
          Cricket Wireless
        </a>{' '}
        retail stores.
      </>
    ),
    reflection:
      'Realized how much I can ship when there is only one priority and dove deep into Spring Boot.',
  },
  {
    company: 'Adtran',
    companyLink: 'https://www.adtran.com/',
    role: 'Software Engineer Co-op',
    dates: 'May 2023 - Dec. 2024',
    summary: (
      <>
        Developer tooling and{' '}
        <a
          href="https://www.adtran.com/en/products-and-services/mosaic-one"
          target="_blank"
          rel="noopener noreferrer"
          className="meta-link"
        >
          Mosaic One
        </a>{' '}
        SaaS for network monitoring.
      </>
    ),
    reflection:
      'Learned how to enforce development practices to avoid drift and got comfortable with AWS.',
  },
];

const EXPERIENCE_ITEMS: TimelineItem[] = EXPERIENCES.map((experience) => ({
  id: `${experience.company}-${experience.role}-${experience.dates}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, ''),
  title: (
    <span className="flex w-full flex-col">
      <a
        href={experience.companyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="meta-link w-fit"
      >
        {experience.company}
      </a>
      <span className="flex items-baseline gap-x-6 gap-y-1 flex-wrap">
        <span className="text-sm font-normal text-[var(--muted)] mr-auto">{experience.role}</span>
        <span className="ui-label whitespace-nowrap text-sm font-normal text-[var(--muted-light)]">
          {experience.dates}
        </span>
      </span>
    </span>
  ),
  description: (
    <div className="flex flex-col gap-1.5 mt-2">
      <div className="text-[var(--muted)]">{experience.summary}</div>
      {/* <p>{experience.reflection}</p> */}
    </div>
  ),
  isFilled: experience.dates.includes('Present'),
}));

function HeroSection() {
  return (
    <section id="about" className="section-rail-target w-full flex flex-col gap-4 mt-8">
      <h1 className="text-4xl sm:text-5xl font-semibold whitespace-nowrap mb-1">Jacob Murrah</h1>
      <div className="flex flex-col gap-3">
        <p className="text-[var(--muted)]">
          Software Engineer at{' '}
          <a
            href="https://www.att.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="meta-link gap-0.5 flex items-center"
          >
            <span>AT&T</span>
          </a>{' '}
          in Atlanta, working on network disaster recovery and automated ticketing.
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
        <p className="text-[var(--muted)]">
          Curious about my standards? Read my{' '}
          <Link className="inline-link" to="/signals">
            signals
          </Link>
          .
        </p>
      </div>
      <div className="flex flex-wrap gap-x-4 justify-start">
        {HERO_LINKS.map((link, index) => (
          <React.Fragment key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="meta-link ui-label gap-0.5 flex items-center"
            >
              <span>{link.label}</span>
            </a>
            {index < HERO_LINKS.length - 1 && <span className="text-[var(--muted)]">&middot;</span>}
          </React.Fragment>
        ))}
      </div>
      <img
        src={PHOTOS.sunset}
        alt="Sunset"
        className="mt-3 h-16 sm:h-20 w-full rounded object-cover object-center"
      />
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="section-rail-target flex flex-col gap-6">
      <div>
        <h2 className="text-3xl mb-2">Experience</h2>
        <p className="text-[color:var(--muted)]">
          For a more technical view of my experiences, read my{' '}
          <a
            href="/JacobMurrahResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="meta-link gap-0.5 flex items-center"
          >
            <span>resume</span>
          </a>
          .
        </p>
      </div>
      <Timeline items={EXPERIENCE_ITEMS} sectionGap="1.5rem" titleAs="h3" />
    </section>
  );
}

function WritingSection() {
  return (
    <section id="writing" className="section-rail-target flex flex-col gap-6">
      <div>
        <h2 className="text-3xl mb-2">Writing</h2>
        <p className="text-[color:var(--muted)]">
          Recent posts from my{' '}
          <a
            className="inline-link"
            href="https://jacobmurrah.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Substack
          </a>
          . Read more on my{' '}
          <Link className="inline-link" to="/writing">
            writing
          </Link>{' '}
          page.
        </p>
      </div>
      <BlogFeed limit={3} />
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SectionRail sections={HOME_SECTIONS} />
      <div className="flex flex-col gap-16 sm:gap-24">
        <HeroSection />
        <ExperienceSection />
        <WritingSection />
      </div>
    </>
  );
}
