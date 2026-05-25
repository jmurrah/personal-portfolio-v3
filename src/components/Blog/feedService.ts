import prerendered from '@/constants/prerenderedPosts.json';
import type { FeedPost } from './types';

type RawPost = Partial<Record<keyof FeedPost, unknown>>;

const toStringValue = (value: unknown) => (typeof value === 'string' ? value : '');
const toStringArray = (value: unknown) =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

const normalizeEnclosure = (value: unknown): FeedPost['enclosure'] => {
  if (!value || typeof value !== 'object') {
    return { link: '', type: '' };
  }

  const enclosure = value as Partial<Record<keyof FeedPost['enclosure'], unknown>>;

  return {
    link: toStringValue(enclosure.link),
    type: toStringValue(enclosure.type),
  };
};

const comparePostsDescending = (left: FeedPost, right: FeedPost) => {
  const leftTime = new Date(left.pubDate).getTime();
  const rightTime = new Date(right.pubDate).getTime();
  const safeLeftTime = Number.isNaN(leftTime) ? Number.NEGATIVE_INFINITY : leftTime;
  const safeRightTime = Number.isNaN(rightTime) ? Number.NEGATIVE_INFINITY : rightTime;

  if (safeLeftTime !== safeRightTime) {
    return safeRightTime - safeLeftTime;
  }

  const leftTieBreaker = left.guid || left.link || left.title;
  const rightTieBreaker = right.guid || right.link || right.title;

  return leftTieBreaker.localeCompare(rightTieBreaker);
};

const normalizePost = (post: RawPost): FeedPost => ({
  title: toStringValue(post.title),
  link: toStringValue(post.link),
  pubDate: toStringValue(post.pubDate),
  description: toStringValue(post.description),
  content: toStringValue(post.content),
  guid: toStringValue(post.guid),
  author: toStringValue(post.author),
  thumbnail: toStringValue(post.thumbnail),
  enclosure: normalizeEnclosure(post.enclosure),
  categories: toStringArray(post.categories),
});

const cachedPosts: FeedPost[] = Array.isArray((prerendered as { items?: RawPost[] }).items)
  ? (prerendered as { items: RawPost[] }).items.map(normalizePost).sort(comparePostsDescending)
  : [];

export function loadBlogPosts(): Promise<FeedPost[]> {
  return Promise.resolve(cachedPosts);
}

export function getCachedBlogPosts(): FeedPost[] {
  return cachedPosts;
}
