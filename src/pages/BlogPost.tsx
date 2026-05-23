import { useMemo } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ICONS } from '@/assets';
import { getCachedBlogPosts } from '@/components/Blog/feedService';
import { getPostSlug } from '@/components/Blog/postRouting';
import PostView from '@/components/Blog/PostView';
import SvgIcon from '@/components/SvgIcon';
import type { FeedPost } from '@/components/Blog/types';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const posts = useMemo(() => getCachedBlogPosts(), []);

  const normalizedSlug = (slug ?? '').toLowerCase();
  const post = useMemo<FeedPost | undefined>(
    () => posts.find((item) => getPostSlug(item) === normalizedSlug),
    [posts, normalizedSlug],
  );

  if (!slug) {
    return <Navigate to="/writing" replace />;
  }

  if (!post) {
    return (
      <section className="flex flex-col gap-3">
        <Link className="back-nav-link" to="/writing">
          <SvgIcon src={ICONS.arrowLeft} alt="" size="2xsmall" color="currentColor" />
          <span>Back to posts</span>
        </Link>
        <h1 className="text-3xl font-semibold">Post not found</h1>
        <p>This post is no longer available.</p>
      </section>
    );
  }

  return (
    <section>
      <PostView post={post} onBack={() => navigate('/writing')} />
    </section>
  );
}
