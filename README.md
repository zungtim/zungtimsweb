# Zungtim Wong Personal Website

Personal portfolio website built with React 19, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS (CDN config in `index.html`)
- React Router (`HashRouter`)
- Lucide React icons

## Getting Started

**Prerequisite:** Node.js

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000`.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Project Structure

```text
.
├── App.tsx
├── index.tsx
├── types.ts
├── components/
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Education.tsx
│   ├── Research.tsx
│   ├── Competitions.tsx
│   ├── Travel.tsx
│   ├── ImageLoader.tsx
│   └── Footer.tsx
├── context/
│   └── ThemeContext.tsx
├── hooks/
│   ├── useIntersectionObserver.ts
│   └── useImagePreloadQueue.ts
└── public/photo/
```

## Notes

- No test framework is configured yet.
- No lint/format pipeline is configured yet.
