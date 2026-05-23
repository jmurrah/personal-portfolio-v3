import { useMemo } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { getCachedBlogPosts } from '@/components/Blog/feedService';
import type { FeedPost } from '@/components/Blog/types';

const RECENT_POSTS_LIMIT = 3;
const RECENT_POSTS_ALL_POSTS_PATH = '/writing';

type HeroLink = { label: string; href: string };
const HERO_LINKS: HeroLink[] = [
  { label: 'email', href: 'mailto:jacob@murrah.dev' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/jacobmurrah/' },
  { label: 'github', href: 'https://github.com/jmurrah' },
  { label: 'resume', href: '/JacobMurrahResume.pdf' },
];

type RecentPostsPreview = {
  posts: FeedPost[];
  allPostsPath: typeof RECENT_POSTS_ALL_POSTS_PATH;
};

const getRecentPostsPreview = (): RecentPostsPreview => {
  const posts = getCachedBlogPosts() ?? [];
  return {
    posts: posts.slice(0, RECENT_POSTS_LIMIT),
    allPostsPath: RECENT_POSTS_ALL_POSTS_PATH,
  };
};

function HeroSection() {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-5xl font-semibold">Jacob Murrah</h1>
      <div className="flex flex-col gap-3">
        <p className="text-[var(--muted)]">
          Curious about what has shaped me? Read my{' '}
          <Link className="inline-link" to="/signals">
            signals
          </Link>
          .
        </p>
        <p className="text-[var(--muted)]">
          <span className="text-[var(--text)]">Software Engineer</span> at{' '}
          <a
            href="https://www.att.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="meta-link gap-0.5 flex items-center"
          >
            <span>AT&T</span>
          </a>{' '}
          in <span className="text-[var(--text)]">Atlanta</span>, working on network analytics and
          automation. I bring modern engineering practices to legacy systems.
        </p>
        <p className="text-[var(--muted)]">
          Pursuing a master's at{' '}
          <a
            href="https://www.gatech.edu/"
            target="_blank"
            rel="noopener noreferrer"
            className="meta-link gap-0.5 flex items-center"
          >
            <span>Georgia Tech</span>
          </a>{' '}
          while navigating fatherhood, hitting the gym, and optimizing my daily routines.
        </p>
      </div>
      <div className="flex flex-wrap gap-x-4 justify-start">
        {HERO_LINKS.map((link, index) => (
          <React.Fragment key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="meta-link gap-0.5 flex items-center"
            >
              <span>{link.label}</span>
            </a>
            {index < HERO_LINKS.length - 1 && <span>&middot;</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const recentPostsPreview = useMemo(getRecentPostsPreview, []);

  void recentPostsPreview;

  return (
    <section>
      <HeroSection />
    </section>
  );
}
