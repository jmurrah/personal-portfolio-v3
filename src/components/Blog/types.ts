export type FeedPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
  guid: string;
  author: string;
  thumbnail: string;
  enclosure: {
    link: string;
    type: string;
  };
  categories: string[];
};
