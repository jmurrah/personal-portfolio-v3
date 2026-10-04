import './SectionDivider.css';

type SectionDividerProps = {
  className?: string;
};

export default function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={['section-divider', className].filter(Boolean).join(' ')} role="separator">
      <span aria-hidden="true">✦ ✦ ✦</span>
    </div>
  );
}
