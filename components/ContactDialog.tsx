import React from 'react';
import { createPortal } from 'react-dom';
import { Mail, X } from 'lucide-react';
import { profile } from '../content/profile';
import { useDialog } from '../hooks/useDialog';

export const ContactDialog: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const dialogRef = useDialog(open, onClose);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="ui-gallery-overlay contact-overlay">
      <button type="button" tabIndex={-1} className="dialog-backdrop" onClick={onClose} aria-label="Close contact popup overlay" />
      <div ref={dialogRef} className="contact-dialog" role="dialog" aria-modal="true" aria-label="Contact email" tabIndex={-1}>
        <button type="button" data-dialog-close onClick={onClose} className="ui-focus-ring ui-dialog-close absolute right-4 top-4" aria-label="Close contact popup" title="关闭">
          <X className="h-5 w-5" />
        </button>
        <Mail className="mb-6 h-6 w-6 text-[var(--ui-accent)]" />
        <p className="eyebrow mb-2">Contact</p>
        <h2 className="text-2xl font-semibold">联系邮箱</h2>
        <a href={`mailto:${profile.email}`} className="ui-focus-ring contact-email">{profile.email}</a>
      </div>
    </div>,
    document.body
  );
};
