import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, GraduationCap, Microscope, Plane, Trophy, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { label: 'About', href: '/', icon: User },
  { label: 'Education', href: '/education', icon: GraduationCap },
  { label: 'Research', href: '/research', icon: Microscope }, // Represents 科研实践
  { label: 'Competitions', href: '/competitions', icon: Trophy }, // Represents 竞赛经历
  { label: 'Travel', href: '/travel', icon: Plane },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-700 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-primary tracking-tight hover:opacity-80 transition-opacity">
              ZungTim.
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isActive(item.href)
                      ? 'text-primary bg-blue-50 dark:bg-blue-900/30 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>
            
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block w-8 h-8 text-slate-900 dark:text-slate-100" />
              ) : (
                <Menu className="block w-8 h-8 text-slate-900 dark:text-slate-100" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-lg absolute w-full left-0 top-16">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium flex items-center gap-3 transition-colors ${
                  isActive(item.href)
                    ? 'text-primary bg-blue-50 dark:bg-blue-900/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};