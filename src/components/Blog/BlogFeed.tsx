import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getCachedBlogPosts } from './feedService';
import { getPostPath, getPostSlug } from './postRouting';
import type { FeedPost } from './types';
import './BlogFeed.css';

type BlogFeedProps = {
  limit?: number;
};

const formatPreviewDate = (value: string) => {
  if (!value) return '';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getPostId = (post: FeedPost, slug: string) => post.guid || post.link || slug;
const getPreviewImage = (post: FeedPost) => post.thumbnail || post.enclosure.link;

export default function BlogFeed({ limit }: BlogFeedProps) {
  const posts = useMemo(() => {
    const allPosts = getCachedBlogPosts();
    return typeof limit === 'number' ? allPosts.slice(0, limit) : allPosts;
  }, [limit]);

  if (!posts.length) {
    return <div>No posts found.</div>;
  }

  return (
    <div className="blog-feed">
      <ul className="blog-preview-list flex flex-col gap-3">
        {posts.map((post) => {
          const slug = getPostSlug(post);
          const id = getPostId(post, slug);
          const publishedOn = formatPreviewDate(post.pubDate);
          const previewImage = getPreviewImage(post);

          return (
            <li key={id} className="blog-preview-list__item">
              <Link
                to={getPostPath(post)}
                className="blog-preview-card flex flex-col gap-3 sm:flex-row sm:items-start"
                aria-label={post.title ? `Read ${post.title}` : 'Read post'}
              >
                <div className="blog-preview-card__body min-w-0 flex-1">
                  <div className="flex">
                    <h3 className="blog-preview-card__title link-underline">{post.title}</h3>
                    <p className="ml-auto text-sm text-[var(--muted)]">{publishedOn}</p>
                  </div>
                  <p className="text-[var(--muted)]">{post.description}</p>
                </div>
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt={`Thumbnail for ${post.title}`}
                    className="h-auto w-full rounded-sm border border-[var(--border)] bg-[var(--surface-muted)] object-cover sm:w-44 sm:flex-none"
                    loading="lazy"
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
