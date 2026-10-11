import { Link } from 'react-router-dom';
import { ICONS, LOGOS, PHOTOS } from '@/assets';
import BlogFeed from '@/components/Blog/BlogFeed';
import InteractiveImage from '@/components/InteractiveImage';
import SectionDivider from '@/components/SectionDivider';
import SectionRail, { type SectionRailItem } from '@/components/SectionRail';
import SvgIcon from '@/components/SvgIcon';
import ExperienceList, { type ExperienceItem } from './Home/ExperienceList';

type HeroLink = { label: string; href: string; icon: string };

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
