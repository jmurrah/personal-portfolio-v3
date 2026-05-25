import { Link } from 'react-router-dom';
import { ICONS } from '@/assets';
import Timeline, { type TimelineItem } from '@/components/Timeline';
import SvgIcon from '@/components/SvgIcon';

const signals: TimelineItem[] = [
  {
    id: 'wrestling',
    label: 'Age 10',
    title: 'Alabama Youth Wrestling State Champion',
    description: "Competing is fun, let's keep challenging myself.",
    isFilled: false,
  },
  {
    id: 'mile',
    label: 'Age 14',
    title: 'Sub-6 Minute Mile',
    description: 'Leave nothing in the tank by the end of a race.',
    isFilled: false,
  },
  {
    id: 'fortnite',
    label: 'Age 17',
    title: 'Top 0.1% Fortnite Player',
    description: 'Learned what separates the good from the elite.',
    isFilled: false,
  },
  {
    id: 'valorant',
    label: 'Age 20',
    title: 'Top 1% Valorant Player',
    description: 'Expertise in one area makes learning another much easier.',
    isFilled: false,
  },
  {
    id: 'powerlifting',
    label: 'Age 21',
    title: '1000-lb Powerlifting Total',
    description: 'Long term goals are only achievable through consistency.',
    isFilled: false,
  },
  {
    id: 'married',
    label: 'Age 22',
    title: 'Married my kindhearted wife',
    description: 'Clear communication prevents most conflicts.',
    isFilled: false,
  },
  {
    id: 'auburn',
    label: 'Age 22',
    title: 'Graduated from Auburn with 4 internships',
    description: 'Your environment does not determine growth, effort does.',
    isFilled: false,
  },
  {
    id: 'gatech',
    label: 'Age 23',
    title: 'Accepted into Georgia Tech',
    description: 'Stopped wondering if I belonged in the rooms I was in.',
    isFilled: false,
  },
];

export default function Signals() {
  return (
    <section>
      <Link className="back-nav-link text-base" to="/">
        <SvgIcon src={ICONS.arrowLeft} alt="" size="2xsmall" color="currentColor" />
        <span>Back to Home</span>
      </Link>
      <h1 className="mb-2 text-4xl font-semibold">Signals</h1>

      <p className="mb-6 text-[color:var(--muted)]">
        A timeline of moments that have shaped my standards, habits, and perspective.
      </p>

      <Timeline items={signals} sectionGap="3rem" />
    </section>
  );
}
