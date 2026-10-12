import { Link } from 'react-router-dom';
import { BRAND_ICONS, ICONS, LOGOS, PHOTOS } from '@/assets';
import BlogFeed from '@/components/Blog/BlogFeed';
import InlineBrandIcon from '@/components/InlineBrandIcon';
import InteractiveImage from '@/components/InteractiveImage';
import SectionDivider from '@/components/SectionDivider';
import SectionRail, { type SectionRailItem } from '@/components/SectionRail';
import SvgIcon from '@/components/SvgIcon';
import ExperienceList, { type ExperienceItem } from './Home/ExperienceList';
import './Home/HeroLinks.css';

type HeroLink = { label: string; href: string; icon: string; brandIcon?: boolean };

const HERO_LINKS: HeroLink[] = [
  { label: 'Email', href: 'mailto:jacob@murrah.dev', icon: ICONS.mail },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jacobmurrah/', icon: BRAND_ICONS.linkedIn, brandIcon: true },
  { label: 'GitHub', href: 'https://github.com/jmurrah', icon: BRAND_ICONS.gitHub, brandIcon: true },
  { label: 'Substack', href: 'https://jacobmurrah.substack.com/', icon: BRAND_ICONS.substack, brandIcon: true },
  { label: 'Resume', href: '/JacobMurrahResume.pdf', icon: ICONS.resume },
];

const HOME_SECTIONS: SectionRailItem[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'writing', label: 'Writing' },
];

const EXPERIENCES: ExperienceItem[] = [
  {
    company: 'AT&T',
    logo: LOGOS.att,
    companyLink: 'https://www.att.com/',
    role: 'Software Engineer I',
    dates: '2025 - Present',
    technologies: [
      'Java', 'Python', 'TypeScript', 'Spring Boot', 'Angular', 'Oracle SQL',
      'MongoDB', 'Microsoft Azure', 'Docker', 'Shell', 'GitHub',
    ],
    summary: (
      <>
        Building network disaster recovery and automated alarm-ticketing systems.
      </>
    ),
  },
  {
    company: 'Auburn University',
    logo: LOGOS.auburn,
    companyLink: 'https://www.auburn.edu/',
    role: 'Research Assistant',
    dates: '2025',
    technologies: ['Python', 'TypeScript', 'FastAPI', 'Next.js', 'Supabase', 'Docker', 'Shell', 'GitHub'],
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
  },
  {
    company: 'Adtran',
    logo: LOGOS.adtran,
    companyLink: 'https://www.adtran.com/',
    role: 'Software Engineer Co-op',
    dates: '2023 – 2024',
    technologies: ['Python', 'TypeScript', 'Angular', 'AWS', 'Docker', 'Postman', 'Shell', 'GitHub'],
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
  },
  {
    company: 'IS4S',
    logo: LOGOS.is4s,
    companyLink: 'https://www.is4s.com/',
    companyLinkLabel: 'Website',
    role: 'Technician',
    dates: '2021 – 2022',
    summary: 'Built and inspected contamination-control systems for military vehicles.',
    technologies: [],
  },
  {
    company: 'Epic Games',
    logo: LOGOS.epicGames,
    companyLink: 'https://fortnitetracker.com/profile/kbm/murr%CE%B1h/events?region=GLOBAL',
    companyLinkLabel: 'Fortnite Tracker',
    role: 'Fortnite Player',
    dates: '2019 – 2020',
    summary: 'Competed in online Fortnite tournaments, earning $6.7k in prize money.',
    technologies: [],
  },
];

function HeroSection() {
  return (
    <section id="about" className="section-rail-target mt-8 flex w-full flex-col">
      <h1 className="text-4xl font-normal sm:text-5xl">Jacob Murrah</h1>
      <p className="mt-6 max-w-2xl text-[var(--muted)]">
        Software Engineer at{' '}
        <a
          href="https://www.att.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="meta-link"
        >
          <InlineBrandIcon src={LOGOS.att} />
          AT&T
        </a>{' '}
        with a focus on automating manual systems. I’m pursuing a master’s at{' '}
        <a
          href="https://www.gatech.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="meta-link"
        >
          <InlineBrandIcon src={LOGOS.georgiaTech} wide />
          Georgia Tech
        </a>{' '}
        and navigating fatherhood.
      </p>
      <p className="mt-4 max-w-2xl text-[var(--muted)]">
        Curious about my standards? Read my{' '}
        <Link className="inline-link" to="/signals">
          signals
        </Link>
        .
      </p>

      <nav className="mt-7" aria-label="Contact and profiles">
        <ul className="hero-links flex flex-wrap items-center justify-start gap-x-5 gap-y-3">
          {HERO_LINKS.map((link) => (
            <li key={link.label} className="text-base">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-link external-text-link"
              >
                {link.brandIcon ? (
                  <img
                    src={link.icon}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 shrink-0 rounded-[2px] object-contain"
                  />
                ) : (
                  <SvgIcon
                    src={link.icon}
                    alt=""
                    size="2xsmall"
                    color="currentColor"
                    hoverColor="currentColor"
                  />
                )}
                <span className="hero-link-label link-underline">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
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
            <SvgIcon
              src={ICONS.resume}
              alt=""
              size="2xsmall"
              color="currentColor"
              hoverColor="currentColor"
              className="mr-1 align-[-0.125em]"
            />
            <span>Resume</span>
          </a>
          .
        </p>
      </div>
      <ExperienceList experiences={EXPERIENCES} />
    </section>
  );
}

function WritingSection() {
  return (
    <section id="writing" className="section-rail-target flex flex-col gap-4">
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
            <InlineBrandIcon src={BRAND_ICONS.substack} />
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
