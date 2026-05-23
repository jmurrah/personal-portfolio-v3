import { Link, useLocation, useNavigate } from 'react-router-dom';
import './TerminalBreadcrumb.css';

const MAX_SEGMENTS = 4;

const getSegments = (pathname: string) =>
  pathname.split('/').filter(Boolean).slice(0, MAX_SEGMENTS);

const SEGMENT_LABELS: Record<string, string> = {
  writing: 'Writing',
};

const capitalizeFirstLetter = (value: string) =>
  value.length > 0 ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value;

const getSegmentLabel = (segment: string, index: number, segments: string[]) => {
  if (segments[0] === 'writing' && index > 0) {
    return segment;
  }

  return SEGMENT_LABELS[segment] ?? capitalizeFirstLetter(segment);
};

export default function TerminalBreadcrumb() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const segments = getSegments(pathname);

  const scrollToTop = (behavior: ScrollBehavior = 'smooth') => {
    const targets = [document.scrollingElement, document.documentElement, document.body] as const;
    targets.forEach((target) => target?.scrollTo({ top: 0, behavior }));
    window.scrollTo({ top: 0, behavior });
  };

  const clearUrlHash = () => {
    if (typeof window === 'undefined') return;
    const { pathname: currentPath, search: currentSearch, hash: currentHash } = window.location;
    if (!currentHash) return;
    window.history.replaceState(null, '', `${currentPath}${currentSearch}`);
  };

  const handleHomeClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (pathname === '/') {
      event.preventDefault();
      scrollToTop('smooth');
      clearUrlHash();
    } else {
      scrollToTop('auto');
      navigate('/');
    }
  };

  return (
    <nav className="terminal-breadcrumb" aria-label="Breadcrumbs">
      <ul className="terminal-breadcrumb__list">
        <li className="terminal-breadcrumb__item text-md">
          <Link
            className="terminal-breadcrumb__link terminal-breadcrumb__link--home"
            to="/"
            onClick={handleHomeClick}
          >
            ~<span className="terminal-breadcrumb__home-slash">/</span>
          </Link>
        </li>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          return (
            <li className="terminal-breadcrumb__item" key={`${segment}-${index}`}>
              <Link
                className={`terminal-breadcrumb__link${isLast ? ' terminal-breadcrumb__current' : ''}`}
                to={href}
                aria-current={isLast ? 'page' : undefined}
                onClick={(event) => {
                  if (isLast && pathname === href) {
                    event.preventDefault();
                    scrollToTop('smooth');
                    clearUrlHash();
                  } else {
                    scrollToTop('auto');
                  }
                }}
              >
                {getSegmentLabel(segment, index, segments)}/
              </Link>
            </li>
          );
        })}
        <li className="terminal-breadcrumb__item" aria-hidden="true">
          <span className="terminal-breadcrumb__cursor" />
        </li>
      </ul>
    </nav>
  );
}
