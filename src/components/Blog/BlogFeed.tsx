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
  const parsed = new Date(value);
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getPostId = (post: FeedPost, slug: string) => post.guid || post.link || slug;

export default function BlogFeed({ limit }: BlogFeedProps) {
  const posts = useMemo(() => {
    const allPosts = getCachedBlogPosts();
    return typeof limit === 'number' ? allPosts.slice(0, limit) : allPosts;
  }, [limit]);

  return (
    <div className="blog-feed">
      <ul className="blog-preview-list flex flex-col gap-1">
        {posts.map((post) => {
          const slug = getPostSlug(post);
          const id = getPostId(post, slug);
          const publishedOn = formatPreviewDate(post.pubDate);

          return (
            <li key={id} className="blog-preview-list__item">
              <Link
                to={getPostPath(post)}
                className="blog-preview-card flex flex-col gap-1.5"
                aria-label={post.title ? `Read ${post.title}` : 'Read post'}
              >
                <div className="min-w-0 flex flex-col gap-1.5">
                  <div className="flex flex-wrap">
                    <h3 className="blog-preview-card__title link-underline text-base mr-auto w-96">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] mt-1">{publishedOn}</p>
                  </div>
                  <p className="text-[var(--muted)]">{post.description}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
