import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Map', href: '/map' },
  { name: 'Care Points', href: '/care-points' },
  { name: 'Lost & Found', href: '/lost-found' },
  { name: 'Shelters', href: '/shelters' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-neutral-100">
      <nav className="container-app">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">🐾</span>
            </div>
            <span className="font-display font-bold text-xl text-neutral-900">
              Pet<span className="text-primary-500">Connect</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive(item.href)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="primary" size="sm">
              Report Pet
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-100 animate-slide-up">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive(item.href)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-neutral-100">
                <Button variant="primary" className="w-full">
                  Report Pet
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
