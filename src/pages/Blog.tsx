import { Link } from 'react-router-dom';
import { ICONS } from '@/assets';
import BlogContent from '@/components/Blog/BlogContent';
import SvgIcon from '@/components/SvgIcon';

export default function Blog() {
  return (
    <section>
      <Link className="back-nav-link" to="/">
        <SvgIcon src={ICONS.arrowLeft} alt="" size="2xsmall" color="currentColor" />
        <span>Back to Home</span>
      </Link>
      <h1 className="mb-6 text-4xl font-semibold">Writing</h1>
      <BlogContent />
    </section>
  );
}
