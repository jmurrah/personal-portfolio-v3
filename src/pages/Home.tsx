import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS, LOGOS, PHOTOS } from '@/assets';
import BlogFeed from '@/components/Blog/BlogFeed';
import InteractiveImage from '@/components/InteractiveImage';
import SectionDivider from '@/components/SectionDivider';
import SectionRail, { type SectionRailItem } from '@/components/SectionRail';
import SvgIcon from '@/components/SvgIcon';
import Timeline, { type TimelineItem } from '@/components/Timeline';

type HeroLink = { label: string; href: string; icon: string };
type ExperienceItem = {
  company: string;
  companyLink: string;
  role: string;
  dates: string;
  summary: React.ReactNode;
  reflection: string;
};

const HERO_LINKS: HeroLink[] = [
  { label: 'Email', href: 'mailto:jacob@murrah.dev', icon: ICONS.mail },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jacobmurrah/', icon: ICONS.linkedIn },
  { label: 'GitHub', href: 'https://github.com/jmurrah', icon: ICONS.gitHub },
  { label: 'Substack', href: 'https://jacobmurrah.substack.com/', icon: ICONS.substack },
  { label: 'Résumé', href: '/JacobMurrahResume.pdf', icon: ICONS.resume },
];

const HOME_SECTIONS: SectionRailItem[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'writing', label: 'Writing' },
];

const HERO_PROOF_ITEMS = [
  { label: 'Software Engineer', image: LOGOS.att, imageAlt: 'AT&T' },
  { label: 'M.S. CS', mark: 'GT' },
  { label: 'B.E. Software Engineering', image: LOGOS.auburn, imageAlt: 'Auburn University' },
] as const;

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
    <section id="about" className="section-rail-target mt-8 flex w-full flex-col">
      <h1 className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="whitespace-nowrap text-4xl font-normal sm:text-5xl">Jacob Murrah</span>
        <span className="flex items-baseline gap-4 whitespace-nowrap text-xl font-normal text-[var(--muted)] sm:text-2xl">
          <span aria-hidden="true">/</span>
          <span>Software Engineer</span>
          <span aria-hidden="true">/</span>
          <span>Atlanta</span>
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-[var(--muted)]">
        Software engineer at{' '}
        <a
          href="https://www.att.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="meta-link"
        >
          AT&T
        </a>{' '}
        building network disaster-recovery and automation systems. Pursuing an M.S. in Computer
        Science at{' '}
        <a
          href="https://www.gatech.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="meta-link"
        >
          Georgia Tech
        </a>
        .
      </p>

      <ul
        className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3"
        aria-label="Professional overview"
      >
        {HERO_PROOF_ITEMS.map((item) => (
          <li
            key={item.label}
            className="ui-label flex items-center gap-2 text-sm font-normal text-[var(--muted)]"
          >
            <span className="flex h-4 w-4 shrink-0 items-center justify-center">
              {'image' in item ? (
                <img src={item.image} alt={item.imageAlt} className="h-4 w-4 object-contain" />
              ) : (
                <span className="ui-label text-[0.6rem] font-semibold" aria-hidden="true">
                  {item.mark}
                </span>
              )}
            </span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap items-center justify-start gap-5">
        {HERO_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link inline-flex rounded p-1"
            aria-label={link.label}
            title={link.label}
          >
            <SvgIcon
              src={link.icon}
              alt=""
              size="small"
              color="currentColor"
              hoverColor="currentColor"
            />
          </a>
        ))}
      </div>
      <InteractiveImage
        src={PHOTOS.sunset}
        alt="Sunset over the ocean"
        wrapperClassName="mt-10"
        className="h-16 sm:h-20 object-cover object-center"
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
            className="meta-link external-text-link"
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
      <div className="flex flex-col">
        <HeroSection />
        <SectionDivider className="home-section-divider" />
        <ExperienceSection />
        <SectionDivider className="home-section-divider" />
        <WritingSection />
      </div>
    </>
  );
}
