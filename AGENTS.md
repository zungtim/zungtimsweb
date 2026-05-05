# AGENTS.md - Coding Guidelines for Zungtim Wong Personal Website

## Project Overview

React 19 + TypeScript + Vite personal website with Tailwind CSS styling. A bilingual (English/Chinese) portfolio website showcasing education, research, achievements, and travel experiences.

## Build Commands

```bash
# Development server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Build responsive media assets manually
npm run media:build

# Type-check only
npx tsc --noEmit

# Install dependencies
npm install
```

`npm run dev` and `npm run build` both run `media:build` first through npm lifecycle scripts.

**Note**: No test framework or linter is currently configured. Tests and linting are not available.

## Project Structure

```text
.
├── components/                  # React components
│   ├── Hero.tsx                 # Landing page with avatar, bio, and contact modal
│   ├── Navbar.tsx               # Navigation with theme toggle
│   ├── Education.tsx            # Education background cards
│   ├── Research.tsx             # Research projects portfolio
│   ├── Achievements.tsx         # Competition and achievement cards/gallery
│   ├── Travel.tsx               # Travel photo gallery
│   ├── Footer.tsx               # Site footer
│   └── ImageLoader.tsx          # Lazy image loading utility
├── content/                     # User-facing content data
│   ├── achievements.ts          # Achievement entries
│   ├── media.ts                 # Media manifest helpers
│   ├── travel.tsx               # Travel entries with rich descriptions
│   └── generated/
│       └── media-manifest.ts    # Generated responsive media manifest
├── context/
│   └── ThemeContext.tsx         # Light/dark mode state management
├── hooks/                       # Shared React hooks
├── scripts/media/
│   └── build-media.mjs          # Responsive image generation pipeline
├── types/
│   └── content.ts               # Content/media TypeScript interfaces
├── types.ts                     # Legacy/shared TypeScript interfaces
├── App.tsx                      # Main app with routing and ThemeProvider
├── index.tsx                    # React entry point
├── index.html                   # HTML template, Tailwind CDN config, UI CSS tokens
├── vite.config.ts               # Vite configuration
└── public/
    ├── photo/                   # Static images used directly by pages
    ├── photo-src/               # Source images for generated galleries
    └── photo-gen/               # Generated responsive WebP images
```

## Content Integrity (Critical)

- **Never modify user's content text without explicit confirmation.** This includes:
  - Personal descriptions and bio text
  - Project titles and descriptions
  - Achievement descriptions
  - Travel descriptions
  - Any user-provided content in Chinese or English
- Only modify code structure, styling, layout, and data wiring unless the user asks for content edits.
- Any website change must remain compatible with both light and dark modes.
- If content needs reformatting, preserve the original meaning exactly.
- Always ask for confirmation before making content-related changes.

## Content And Media Workflow

Travel and achievement galleries use a content-data plus generated-media workflow.

- Travel content lives in `content/travel.tsx`.
- Achievement content lives in `content/achievements.ts`.
- Travel source images live in `public/photo-src/travel/<entry-id>/`.
- Achievement source images live in `public/photo-src/competitions/<entry-id>/`.
- Source image filenames must be `cover.*` for covers and numeric names such as `1.*`, `2.*`, `3.*` for gallery images.
- `scripts/media/build-media.mjs` generates WebP variants into `public/photo-gen/`.
- `content/generated/media-manifest.ts` is generated and consumed by `content/media.ts`.
- Components should use `getMediaEntry()` and `resolveMediaImage()` instead of hardcoding travel/achievement image arrays.

Static one-off images are still used directly in some pages:

- Avatar: `public/photo/avatar.jpg`
- Education logo: `public/photo/education/gdutlogo.png`
- Research images: `public/photo/Research/*`

## TypeScript & React

- Use React 19 with functional components.
- Type exported page/components as `React.FC`.
- Define content/media interfaces in `types/content.ts`.
- Keep legacy/shared interfaces in `types.ts` when existing code imports from there.
- Use single quotes for strings and double quotes for JSX attributes.
- Use semicolons.
- Prefer existing local patterns over introducing new abstractions.

```typescript
import React from 'react';

export const Component: React.FC = () => {
  return <div className="text-blue-600">Hello</div>;
};
```

## Imports Order

1. React imports
2. Third-party libraries such as `react-router-dom` and `lucide-react`
3. Local components, context, hooks, and content helpers
4. Types with `import type`

```typescript
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useTheme } from '@/context/ThemeContext';
import type { NavItem } from '@/types';
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Hero.tsx`, `Education.tsx` |
| Interfaces | PascalCase | `AchievementContentEntry`, `NavItem` |
| Variables/functions | camelCase | `activeItem`, `toggleMenu` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_THEME` |

## Styling

- Use Tailwind utility classes and existing semantic UI classes.
- Tailwind is loaded through CDN config in `index.html`.
- Reuse semantic UI classes from `index.html`:
  - Layout: `ui-section`, `ui-shell`
  - Surface/card: `ui-surface`, `ui-subtle-panel`
  - Chips: `ui-chip`
  - Buttons: `ui-primary-btn`, `ui-ghost-btn`
  - Accessibility: `ui-focus-ring`
  - Text: `ui-text-gradient`
- Dark mode uses the `dark:` prefix and CSS variables attached to `html.dark`.
- Every visual change must be reviewed in both light and dark themes, including text, cards, borders, overlays, badges, icons, hover states, and disabled/secondary text.
- Avoid hardcoded colors that only work in one theme; pair Tailwind color utilities with matching `dark:` variants or use existing semantic UI classes/CSS variables.
- Current Tailwind custom colors:
  - `primary`: `#0f2742`
  - `secondary`: `#35546f`
  - `accent`: `#1e8f80`
- Prefer readable, restrained portfolio styling over decorative redesigns.

## Dark Mode

- Theme is managed by `ThemeContext` in `context/ThemeContext.tsx`.
- Current default theme on first visit is `light`.
- Theme is persisted in `localStorage`.
- Use the `useTheme()` hook to access theme state.
- Always provide appropriate `dark:` variants for colors and verify contrast/readability in both themes before considering the change complete.

```typescript
const { theme, toggleTheme } = useTheme();
```

## Routing

- Uses `react-router-dom` with `HashRouter`.
- Routes are defined in `App.tsx`.
- Navigation uses `<Link>` components.
- `Navbar.tsx` uses `useLocation()` for active route detection.

Current routes:

| Path | Component |
|------|-----------|
| `/` | `Hero` |
| `/education` | `Education` |
| `/research` | `Research` |
| `/achievements` | `Achievements` |
| `/travel` | `Travel` |

## Error Handling

- Check for null/undefined before rendering when values may be absent.
- Use optional chaining (`?.`) and nullish coalescing (`??`) where appropriate.
- Throw descriptive errors in entry points.

```typescript
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}
```

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.4 | UI framework |
| react-dom | ^19.2.4 | React DOM renderer |
| react-router-dom | ^7.13.0 | Client-side routing |
| lucide-react | ^0.563.0 | Icon library |
| sharp | ^0.34.5 | Responsive media generation |
| typescript | ~5.8.2 | Type checking |
| vite | ^6.2.0 | Build tool |

## Path Aliases

- `@/` maps to the project root.
- Configured in both `tsconfig.json` and `vite.config.ts`.

## Development Notes

- Dev server runs on port 3000.
- Supports hot module replacement (HMR).
- Bilingual content (English/Chinese) appears throughout.
- Generated files in `content/generated/` and `public/photo-gen/` should normally be updated through `npm run media:build`.
- Before changing gallery data, verify each content `entryId` has a corresponding folder under `public/photo-src/<module>/`.

## Common Patterns

### Component with Theme Support

```typescript
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export const MyComponent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
      Content
    </div>
  );
};
```

### Card Component Pattern

```typescript
<div className="ui-surface rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1">
  {/* Card content */}
</div>
```

### Badge/Tag Pattern

```typescript
<span className="ui-chip rounded-full px-3 py-1 text-sm font-semibold">
  Label
</span>
```
