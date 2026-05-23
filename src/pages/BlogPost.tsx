import { useMemo } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { getCachedBlogPosts } from '@/components/Blog/feedService';
import { getPostSlug } from '@/components/Blog/postRouting';
import PostView from '@/components/Blog/PostView';
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
        <h1 className="mono-heading text-3xl font-semibold">Post not found</h1>
        <p>This post is no longer available.</p>
        <Link className="text-link w-fit" to="/writing">
          Back to writing
        </Link>
      </section>
    );
  }

  return (
    <section>
      <PostView post={post} onBack={() => navigate('/writing')} />
    </section>
  );
}
