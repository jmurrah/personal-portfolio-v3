import GitHubIcon from '@/assets/icons/GitHubIcon.svg';
import SubstackIcon from '@/assets/icons/SubstackIcon.svg';
import LinkedInIcon from '@/assets/icons/LinkedInIcon.svg';
import MailIcon from '@/assets/icons/MailIcon.svg';
import MenuIcon from '@/assets/icons/MenuIcon.svg';
import ArrowUpRightIcon from '@/assets/icons/ArrowUpRightIcon.svg';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon.svg';
import ClockIcon from '@/assets/icons/ClockIcon.svg';
import ResumeIcon from '@/assets/icons/ResumeIcon.svg';
import GitHubBrandIcon from '@/assets/icons/GitHubBrandIcon.svg';
import LinkedInBrandIcon from '@/assets/icons/LinkedInBrandIcon.webp';
import SubstackBrandIcon from '@/assets/icons/SubstackBrandIcon.webp';

import GraduationHeadshotPhoto from '@/assets/photos/GraduationHeadshot.webp';
import SunsetPhoto from '@/assets/photos/sunset.webp';
import AdtranLogo from '@/assets/logos/adtran.png';
import AttLogo from '@/assets/logos/att.png';
import AuburnLogo from '@/assets/logos/auburn.png';
import Is4sLogo from '@/assets/logos/is4s.webp';
import EpicGamesLogo from '@/assets/logos/epic-games.webp';
import GeorgiaTechLogo from '@/assets/logos/georgia-tech.png';

export const ICONS = {
  gitHub: GitHubIcon,
  substack: SubstackIcon,
  linkedIn: LinkedInIcon,
  mail: MailIcon,
  arrowUpRight: ArrowUpRightIcon,
  arrowLeft: ArrowLeftIcon,
  menu: MenuIcon,
  clock: ClockIcon,
  resume: ResumeIcon,
} as const;

export const BRAND_ICONS = {
  gitHub: GitHubBrandIcon,
  linkedIn: LinkedInBrandIcon,
  substack: SubstackBrandIcon,
} as const;

export const PHOTOS = {
  graduationHeadshot: GraduationHeadshotPhoto,
  sunset: SunsetPhoto,
} as const;

export const LOGOS = {
  adtran: AdtranLogo,
  att: AttLogo,
  auburn: AuburnLogo,
  is4s: Is4sLogo,
  epicGames: EpicGamesLogo,
  georgiaTech: GeorgiaTechLogo,
} as const;
