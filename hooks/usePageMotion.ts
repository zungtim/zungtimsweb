import { useEffect } from 'react';

const REVEAL_TARGETS = '.page-heading, .profile-eyebrow, .identity-row, .section-label, .home-research-overview, .background-teaser, .travel-feature, .research-interest, .education-row, .archive-heading, .achievement-row';

export const usePageMotion = (pathname: string) => {
  useEffect(() => {
    const main = document.getElementById('main-content');
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!main || preference.matches || !('IntersectionObserver' in window)) return;

    const elements = Array.from(main.querySelectorAll<HTMLElement>(REVEAL_TARGETS));
    elements.forEach((element) => element.classList.add('reveal-item'));
    main.classList.add('motion-ready');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    elements.forEach((element) => observer.observe(element));

    const disableMotion = () => {
      if (!preference.matches) return;
      observer.disconnect();
      main.classList.remove('motion-ready');
    };
    preference.addEventListener('change', disableMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', disableMotion);
      main.classList.remove('motion-ready');
      elements.forEach((element) => element.classList.remove('reveal-item', 'is-revealed'));
    };
  }, [pathname]);
};
