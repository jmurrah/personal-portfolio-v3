import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon.svg';
import SvgIcon from '@/components/SvgIcon';
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
      <ul className="blog-preview-list flex flex-col">
        {posts.map((post) => {
          const slug = getPostSlug(post);
          const id = getPostId(post, slug);
          const publishedOn = formatPreviewDate(post.pubDate);

          return (
            <li key={id} className="blog-preview-list__item">
              <Link
                to={getPostPath(post)}
                className="blog-preview-card -mx-3 flex flex-col gap-0.5 px-3 py-3"
                aria-label={`Read ${post.title}`}
              >
                <time
                  className="mb-0.5 text-xs leading-4 text-[var(--muted-light)]"
                  dateTime={post.pubDate.slice(0, 10)}
                >
                  {publishedOn}
                </time>
                <div className="grid grid-cols-[minmax(0,auto)_minmax(1rem,1fr)_1rem] items-start gap-2">
                  <h3 className="blog-preview-card__title min-w-0 text-base leading-snug">
                    {post.title}
                  </h3>
                  <span className="dotted-leader mt-[10px] opacity-60" aria-hidden="true" />
                  <SvgIcon
                    src={ArrowRightIcon}
                    alt=""
                    size="2xsmall"
                    className="blog-preview-card__arrow"
                    color="currentColor"
                    hoverColor="currentColor"
                  />
                </div>
                <p className="text-sm leading-snug text-[var(--muted)]">{post.description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
