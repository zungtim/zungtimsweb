import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, GraduationCap, Microscope, Plane, Trophy, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: 'About', href: '/', icon: User },
  { label: 'Education', href: '/education', icon: GraduationCap },
  { label: 'Research', href: '/research', icon: Microscope },
  { label: 'Competitions', href: '/competitions', icon: Trophy },
  { label: 'Travel', href: '/travel', icon: Plane },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/70 dark:border-slate-700/70 bg-white/86 dark:bg-slate-950/78 backdrop-blur-md">
        <div className="ui-shell px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              to="/"
              className="ui-focus-ring text-lg sm:text-xl font-semibold tracking-tight text-primary hover:opacity-90 transition-opacity"
              aria-label="Go to homepage"
            >
              ZungTim.
            </Link>

            <nav className="hidden md:flex items-center gap-2" aria-label="Desktop navigation">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`ui-focus-ring inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-slate-100 dark:bg-slate-800/90 text-primary dark:text-slate-100'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 hover:text-primary dark:hover:text-slate-100'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="ui-focus-ring ui-ghost-btn inline-flex h-10 w-10 items-center justify-center"
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>

              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="ui-focus-ring ui-ghost-btn md:hidden inline-flex h-10 w-10 items-center justify-center"
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-200 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          className="absolute inset-0 bg-slate-900/40"
          onClick={() => setIsOpen(false)}
          aria-label="Close mobile menu overlay"
        />
        <aside
          id="mobile-navigation"
          className={`absolute right-0 top-0 h-full w-[82%] max-w-sm border-l border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex h-16 items-center justify-between border-b border-slate-200 dark:border-slate-700 px-5">
            <span className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">Navigation</span>
            <button
              onClick={() => setIsOpen(false)}
              className="ui-focus-ring ui-ghost-btn inline-flex h-9 w-9 items-center justify-center"
              aria-label="Close navigation menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="p-4 space-y-1.5" aria-label="Mobile links">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`ui-focus-ring flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-slate-100 dark:bg-slate-800 text-primary dark:text-slate-100'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
};
