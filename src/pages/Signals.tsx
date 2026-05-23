const signals = [
  { value: 10, title: "Alabama Youth Wrestling State Champion", desc: "" },
  { value: 14, title: "Sub-6 Minute Mile", desc: "" },
  { value: 17, title: "Top 0.1% Fortnite Player", desc: "" },
  { value: 20, title: "Top 1% Valorant Player", desc: "" },
  { value: 21, title: "1000-lb Powerlifting Total", desc: "" },
  { value: 22, title: "Married my Kindhearted Wife", desc: "" },
  { value: 22, title: "Graduated from Auburn with 4 Internships", desc: "" },
  { value: 23, title: "Accepted into Georgia Tech", desc: "" },
  { value: 23, title: "Today" },
];

export default function Signals() {
  return (
    <section>
        <h1 className="mono-heading mb-6 text-4xl font-semibold">Signals</h1>
        <p className="text-[color:var(--muted)] mb-6">
          This page is a list of signals you can use to assess
        </p>
        {signals.map((signal) => (
          <div key={signal.value}>
            <p>{signal.value}: {signal.title}</p>
            <p>{signal.desc}</p>
          </div>
        ))}
    </section>
  );
}
