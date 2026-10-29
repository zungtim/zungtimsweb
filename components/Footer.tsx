import React, { useState } from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContactDialog } from './ContactDialog';

export const Footer: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <footer className="site-footer page-gutter">
        <div className="ui-shell footer-inner">
          <Link to="/" className="ui-focus-ring wordmark" aria-label="Go to homepage">ZungTim<span>.</span></Link>
          <p className="muted text-xs">© {new Date().getFullYear()} ZungTim Wong</p>
          <button type="button" onClick={() => setIsContactOpen(true)} aria-haspopup="dialog" aria-expanded={isContactOpen} className="ui-focus-ring text-link" aria-label="Open contact email" title="联系邮箱"><Mail className="h-4 w-4" /> Contact <ArrowUpRight className="h-4 w-4" /></button>
        </div>
      </footer>
      <ContactDialog open={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};
