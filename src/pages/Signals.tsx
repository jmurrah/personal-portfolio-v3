import { Link } from 'react-router-dom';
import { ICONS } from '@/assets';
import SvgIcon from '@/components/SvgIcon';
import './Signals.css';

const signals = [
  {
    age: 10,
    title: 'Alabama Youth Wrestling State Champion',
    desc: "Competing is kind of fun, let's keep challenging myself.",
  },
  { age: 14, title: 'Sub-6 Minute Mile', desc: 'Leave nothing in the tank by the end of a race.' },
  {
    age: 17,
    title: 'Top 0.1% Fortnite Player',
    desc: 'Learned what separates the good from the elite.',
  },
  {
    age: 20,
    title: 'Top 1% Valorant Player',
    desc: 'Expertise in one area makes learning another much easier.',
  },
  {
    age: 21,
    title: '1000-lb Powerlifting Total',
    desc: 'Long term goals are only achievable through consistency.',
  },
  {
    age: 22,
    title: 'Married my kindhearted wife',
    desc: 'Clear communication prevents most conflicts.',
  },
  {
    age: 22,
    title: 'Graduated from Auburn with 4 internships',
    desc: 'Your environment does not determine growth, effort does.',
  },
  {
    age: 23,
    title: 'Accepted into Georgia Tech',
    desc: 'Stopped wondering if I belonged in the rooms I was in.',
  },
  { age: 23, title: 'Today', desc: 'Refining my daily routines to do more with less time.' },
];

type SignalProps = {
  age: number;
  title: string;
  desc: string;
};

function Signal({ age, title, desc }: SignalProps) {
  return (
    <div className="signal-row flex items-start">
      <p className="w-20 text-[var(--muted)] shrink-0 mt-2.5">Age {age}</p>
      <div className="signal-marker" aria-hidden="true" />
      <div className="signal-timeline ml-1 pb-12">
        <h2 className="text-lg mt-2">{title}</h2>
        <p className="text-[var(--muted)]">{desc}</p>
      </div>
    </div>
  );
}

export default function Signals() {
  return (
    <section>
      <Link className="back-nav-link text-md" to="/">
        <SvgIcon src={ICONS.arrowLeft} alt="" size="2xsmall" color="currentColor" />
        <span>Back to Home</span>
      </Link>
      <h1 className="mb-2 text-4xl font-semibold">Signals</h1>

      <p className="mb-6 text-[color:var(--muted)]">
        A timeline of moments that have shaped my standards, habits, and perspective.
      </p>

      <div className="signals-list">
        {signals.map((signal, index) => (
          <Signal key={index} age={signal.age} title={signal.title} desc={signal.desc} />
        ))}
      </div>
    </section>
  );
}
