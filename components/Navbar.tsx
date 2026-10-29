import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useDialog } from '../hooks/useDialog';

const navItems = [
  { label: 'About', href: '/', chinese: '关于' },
  { label: 'Research', href: '/research', chinese: '研究' },
  { label: 'Background', href: '/background', chinese: '经历' },
  { label: 'Travel', href: '/travel', chinese: '旅行' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const dialogRef = useDialog(isOpen, () => setIsOpen(false));

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  const isActive = (path: string) => path === '/background'
    ? ['/background', '/education', '/achievements'].includes(location.pathname)
    : location.pathname === path;

  return (
    <>
      <header className="site-header page-gutter">
        <div className="ui-shell header-inner">
          <Link to="/" className="ui-focus-ring wordmark" aria-label="Go to homepage">ZungTim<span>.</span></Link>
          <nav className="desktop-nav" aria-label="Desktop navigation">
            {navItems.map((item) => <Link key={item.href} to={item.href} className="ui-focus-ring nav-link" aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</Link>)}
          </nav>
          <div className="flex items-center gap-1">
            <button type="button" onClick={toggleTheme} className="ui-focus-ring icon-button" aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} title={theme === 'light' ? '切换深色模式' : '切换浅色模式'}>
              {theme === 'light' ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
            </button>
            <button type="button" onClick={() => setIsOpen(true)} className="ui-focus-ring icon-button mobile-menu-toggle" aria-label="Toggle navigation menu" aria-expanded={isOpen} aria-controls={isOpen ? 'mobile-navigation' : undefined} title="导航"><Menu className="h-5 w-5" /></button>
          </div>
        </div>
      </header>
      {isOpen && <div className="mobile-navigation-overlay">
        <button type="button" tabIndex={-1} className="dialog-backdrop" onClick={() => setIsOpen(false)} aria-label="Close mobile menu overlay" />
        <div ref={dialogRef} id="mobile-navigation" className="mobile-navigation" role="dialog" aria-modal="true" aria-label="Mobile navigation" tabIndex={-1}>
          <div className="flex items-center justify-between mb-8"><span className="eyebrow">Navigation</span><button type="button" data-dialog-close className="ui-focus-ring icon-button" onClick={() => setIsOpen(false)} aria-label="Close navigation menu" title="关闭"><X className="h-5 w-5" /></button></div>
          <nav aria-label="Mobile links">{navItems.map((item) => <Link key={item.href} to={item.href} onClick={() => setIsOpen(false)} className="ui-focus-ring mobile-nav-link" aria-current={isActive(item.href) ? 'page' : undefined}><div><span>{item.label}</span><small>{item.chinese}</small></div><ArrowUpRight className="h-5 w-5" /></Link>)}</nav>
        </div>
      </div>}
    </>
  );
};

