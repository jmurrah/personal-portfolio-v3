import { BRAND_ICONS, LOGOS } from '@/assets';
import AuburnBrandIcon from '@/assets/icons/AuburnBrandIcon.webp';
import CengageBrandIcon from '@/assets/icons/CengageBrandIcon.jpg';
import CoolorsBrandIcon from '@/assets/icons/CoolorsBrandIcon.webp';
import CounterStrikeBrandIcon from '@/assets/icons/CounterStrikeBrandIcon.svg';
import DiscordBrandIcon from '@/assets/icons/DiscordBrandIcon.svg';
import FortniteBrandIcon from '@/assets/icons/FortniteBrandIcon.png';
import GoogleBrandIcon from '@/assets/icons/GoogleBrandIcon.webp';
import JoshComeauBrandIcon from '@/assets/icons/JoshComeauBrandIcon.png';
import LeetCodeBrandIcon from '@/assets/icons/LeetCodeBrandIcon.png';
import MediumBrandIcon from '@/assets/icons/MediumBrandIcon.png';
import NFLBrandIcon from '@/assets/icons/NFLBrandIcon.png';
import OpenAIBrandIcon from '@/assets/icons/OpenAIBrandIcon.webp';
import PageSpeedInsightsBrandIcon from '@/assets/icons/PageSpeedInsightsBrandIcon.png';
import SayuBrandIcon from '@/assets/icons/SayuBrandIcon.png';
import TrackerNetworkBrandIcon from '@/assets/icons/TrackerNetworkBrandIcon.png';
import USNewsBrandIcon from '@/assets/icons/USNewsBrandIcon.png';
import ValorantBrandIcon from '@/assets/icons/ValorantBrandIcon.png';
import W3CBrandIcon from '@/assets/icons/W3CBrandIcon.png';
import WebDevBrandIcon from '@/assets/icons/WebDevBrandIcon.svg';
import YouTubeBrandIcon from '@/assets/icons/YouTubeBrandIcon.svg';

type ArticleBrandIcon = { src: string; wide?: boolean };

const BRAND_DOMAINS: { domain: string; name: RegExp; icon: ArticleBrandIcon }[] = [
  { domain: 'youtube.com', name: /\bYouTube\b/i, icon: { src: YouTubeBrandIcon } },
  { domain: 'discord.com', name: /\bDiscord\b/i, icon: { src: DiscordBrandIcon } },
  {
    domain: 'pagespeed.web.dev',
    name: /\bPageSpeed Insights\b/i,
    icon: { src: PageSpeedInsightsBrandIcon },
  },
  { domain: 'web.dev', name: /\bweb\.dev\b/i, icon: { src: WebDevBrandIcon } },
  { domain: 'about.google', name: /\bGoogle\b/i, icon: { src: GoogleBrandIcon } },
  {
    domain: 'joshwcomeau.com',
    name: /\bJosh(?: W\.)? Comeau\b/i,
    icon: { src: JoshComeauBrandIcon },
  },
  { domain: 'sayu.studio', name: /\bSayu\b/i, icon: { src: SayuBrandIcon } },
  { domain: 'coolors.co', name: /\bCoolors\b/i, icon: { src: CoolorsBrandIcon } },
  { domain: 'chatgpt.com', name: /\b(?:ChatGPT|OpenAI)\b/i, icon: { src: OpenAIBrandIcon } },
  { domain: 'medium.com', name: /\bMedium\b/i, icon: { src: MediumBrandIcon } },
  { domain: 'leetcode.com', name: /\bLeetCode\b/i, icon: { src: LeetCodeBrandIcon } },
  { domain: 'nfl.com', name: /\bNFL\b/i, icon: { src: NFLBrandIcon } },
  {
    domain: 'counter-strike.net',
    name: /\b(?:CS:GO|Counter-Strike)\b/i,
    icon: { src: CounterStrikeBrandIcon },
  },
  { domain: 'fortnite.com', name: /\bFortnite\b/i, icon: { src: FortniteBrandIcon } },
  {
    domain: 'fortnitetracker.com',
    name: /\b(?:Fortnite Tracker|Tracker Network)\b/i,
    icon: { src: TrackerNetworkBrandIcon },
  },
  { domain: 'playvalorant.com', name: /\bValorant\b/i, icon: { src: ValorantBrandIcon } },
  { domain: 'usnews.com', name: /\bU\.?S\.? News\b/i, icon: { src: USNewsBrandIcon } },
  { domain: 'auburn.edu', name: /\bAuburn\b/i, icon: { src: AuburnBrandIcon } },
  { domain: 'att.com', name: /\bAT&T\b/i, icon: { src: LOGOS.att } },
  { domain: 'adtran.com', name: /\bAdtran\b/i, icon: { src: LOGOS.adtran } },
  { domain: 'gatech.edu', name: /\bGeorgia Tech\b/i, icon: { src: LOGOS.georgiaTech, wide: true } },
  { domain: 'cengage.com', name: /\bCengage\b/i, icon: { src: CengageBrandIcon } },
];

const matchesDomain = (hostname: string, domain: string) =>
  hostname === domain || hostname.endsWith(`.${domain}`);

const isVisibleDestinationUrl = (label: string, hostname: string) => {
  if (!/^(?:https?:\/\/|www\.|[\w-]+\.[a-z]{2,}(?:\/|$))/i.test(label)) return false;
  try {
    const visibleHost = new URL(/^https?:\/\//i.test(label) ? label : `https://${label}`).hostname;
    return visibleHost.replace(/^www\./i, '').toLowerCase() === hostname.replace(/^www\./i, '');
  } catch {
    return false;
  }
};

export const getArticleBrandIcon = (href: string, label: string): ArticleBrandIcon | null => {
  const visibleLabel = label.trim();
  let hostname: string;
  try {
    hostname = new URL(href).hostname.toLowerCase();
  } catch {
    return null;
  }

  if (matchesDomain(hostname, 'substack.com')) {
    return /\bSubstack\b/i.test(visibleLabel) || isVisibleDestinationUrl(visibleLabel, hostname)
      ? { src: BRAND_ICONS.substack }
      : null;
  }
  if (matchesDomain(hostname, 'blog.cengage.com')) {
    return { src: CengageBrandIcon };
  }
  if (matchesDomain(hostname, 'businesswire.com') && /\bCengage\b/i.test(visibleLabel)) {
    return { src: CengageBrandIcon };
  }
  if (matchesDomain(hostname, 'developer.mozilla.org') && /\bWCAG\b/i.test(visibleLabel)) {
    return { src: W3CBrandIcon };
  }

  const brand = BRAND_DOMAINS.find(({ domain }) => matchesDomain(hostname, domain));
  return brand && (brand.name.test(visibleLabel) || isVisibleDestinationUrl(visibleLabel, hostname))
    ? brand.icon
    : null;
};
