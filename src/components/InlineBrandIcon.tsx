import './InlineBrandIcon.css';

type InlineBrandIconProps = {
  src: string;
  wide?: boolean;
};

export default function InlineBrandIcon({ src, wide = false }: InlineBrandIconProps) {
  return (
    <img
      src={src}
      alt=""
      width={wide ? 20 : 16}
      height={16}
      className={`inline-brand-icon${wide ? ' inline-brand-icon--wide' : ''}`}
      draggable={false}
    />
  );
}
