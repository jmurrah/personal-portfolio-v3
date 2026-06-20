import { Link } from 'react-router-dom';
import { ICONS } from '@/assets';
import BlogContent from '@/components/Blog/BlogContent';
import SvgIcon from '@/components/SvgIcon';

export default function Blog() {
  return (
    <section>
      <Link className="back-nav-link text-base" to="/">
        <SvgIcon src={ICONS.arrowLeft} alt="" size="2xsmall" color="currentColor" />
        <span>Back to Home</span>
      </Link>
      <h1 className="mb-2 text-3xl font-semibold sm:text-4xl">Writing</h1>
      <p className="text-[color:var(--muted)] mb-6">
        I write on my{' '}
        <a
          className="inline-link"
          href="https://jacobmurrah.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation?.()}
        >
          Substack
        </a>
        , all posts are mirrored here.
      </p>
      <BlogContent />
    </section>
  );
}
