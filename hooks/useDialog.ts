import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const useDialog = (isOpen: boolean, onClose: () => void) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!isOpen || !dialog) {
            return;
        }

        const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const previousOverflow = document.body.style.overflow;
        const previousPaddingRight = document.body.style.paddingRight;
        const previousGutter = document.documentElement.style.scrollbarGutter;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const bodyPadding = Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
        // Remove the reserved scrollbar strip without shifting the page behind the dialog.
        document.documentElement.style.scrollbarGutter = 'auto';
        document.body.style.paddingRight = `${bodyPadding + scrollbarWidth}px`;
        document.body.style.overflow = 'hidden';

        const getFocusableElements = () => Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
            .filter((element) => element.getClientRects().length > 0 && !element.closest('[inert]'));

        (dialog.querySelector<HTMLElement>('[data-dialog-close]') ?? dialog).focus({ preventScroll: true });

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onCloseRef.current();
                return;
            }

            if (event.key !== 'Tab') {
                return;
            }

            const elements = getFocusableElements();
            const first = elements[0];
            const last = elements[elements.length - 1];
            if (!first || !last) {
                event.preventDefault();
                dialog.focus({ preventScroll: true });
                return;
            }

            if (!dialog.contains(document.activeElement)) {
                event.preventDefault();
                (event.shiftKey ? last : first).focus();
            } else if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) {
                event.preventDefault();
                first.focus();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
            document.body.style.paddingRight = previousPaddingRight;
            document.documentElement.style.scrollbarGutter = previousGutter;
            if (opener?.isConnected) {
                opener.focus({ preventScroll: true });
            }
        };
    }, [isOpen]);

    return dialogRef;
};
