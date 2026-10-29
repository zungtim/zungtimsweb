# AGENTS.md - Coding Guidelines for Zungtim Wong Personal Website

## Project Overview

React 19 + TypeScript + Vite personal website with Tailwind CSS styling. A bilingual (English/Chinese) portfolio website showcasing education, research, achievements, and travel experiences.

## Website Direction

- Read `WEBSITE_ROADMAP.md` before proposing future UI, content-structure, privacy, or publishing changes. It records the user's tentative graduate-oriented academic-site direction and the dated architecture assessment.
- The first graduate-oriented UI iteration was implemented at the user's request on 2026-10-20. This does not authorize additional content rewrites, media removal, repository visibility changes, Git-history changes, or publishing. The roadmap's privacy assessment remains a dated assessment, not a completed remediation list.
- Undergraduate research should be brief historical background in the proposed redesign, not the future site's primary research focus. Keep Travel as a distinct personal section, and do not publish private context retrieved from other chats without confirmation.
- The user subsequently rejected the literary/editorial visual treatment. Use a practical scientific/technical profile: sans-serif headings, restrained cyan accents, compact metadata, and useful interactions. Do not restore the removed temporary preparation-status badge, age-based greeting, or generic undergraduate interdisciplinary bio.
- By interaction, the user means page motion and UI response, not additional search/filter/view controls. Travel uses scroll-linked full-bleed photo scenes, thumbnail scene navigation, and restrained pointer/hover feedback. Do not restore its removed toolbar without a new request.
- The user approved a Research-interest main line of cold ion-molecule reaction dynamics on 2026-10-29. Present its overview, scientific questions, and method context as interests, not completed work or technical credentials. Keep publications, references, and current-project sections absent until their specific public content is confirmed. This approval does not authorize publishing institutional/advisor relationships or private research material.

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
│   ├── Hero.tsx                 # Academic profile, interests, background/travel entries
│   ├── Navbar.tsx               # Navigation with theme toggle
│   ├── Background.tsx           # Education, undergraduate research archive, honors
│   ├── Education.tsx            # Compact education timeline with optional records
│   ├── Research.tsx             # Current interests and reusable undergraduate archive
│   ├── Achievements.tsx         # Compact honors list and photo gallery
│   ├── ContactDialog.tsx        # Shared, focus-managed email dialog
│   ├── Travel.tsx               # Scroll-linked travel scenes and gallery entry
│   ├── TravelGallery.tsx        # Photo grid/viewer, navigation, zoom, touch handling
│   ├── Footer.tsx               # Site footer
│   └── ImageLoader.tsx          # Lazy image loading utility
├── content/                     # User-facing content data
│   ├── achievements.ts          # Achievement entries
│   ├── media.ts                 # Media manifest helpers
│   ├── profile.ts               # Public identity, research-focused bio, contact, interests
│   ├── research-focus.ts        # Shared interest index, overview, questions, method context
│   ├── research.tsx             # Preserved undergraduate project/patent records
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
├── index.html                   # HTML template and Tailwind CDN config
├── styles/site.css              # Technical-profile layouts, theme tokens, responsive UI
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

Travel, achievement, and selected research images use a content-data plus generated-media workflow.

- Travel content lives in `content/travel.tsx`.
- Achievement content lives in `content/achievements.ts`.
- Public profile/contact information lives in `content/profile.ts`, which re-exports the shared research-interest index for the homepage.
- Current Research-interest labels, overview, questions, and method context live in `content/research-focus.ts`. The homepage and Research page share this source; keep the discipline, research focus, and method perspective distinct. The method flow is a conceptual illustration, not an apparatus or results diagram.
- Undergraduate research records live in `content/research.tsx`, displayed briefly in Background with optional original records/images. Do not add future graduate projects to this historical archive or present interests as completed work.
- Travel source images live in `public/photo-src/travel/<entry-id>/`.
- Achievement source images live in `public/photo-src/achievements/<entry-id>/`.
- Research source images live in `public/photo-src/research/<entry-id>/`.
- Source image filenames must be `cover.*` for covers and numeric names such as `1.*`, `2.*`, `3.*` for gallery images.
- `scripts/media/build-media.mjs` generates WebP variants into `public/photo-gen/`.
- `content/generated/media-manifest.ts` is generated and consumed by `content/media.ts`.
- The media builder preserves the existing `generatedAt` value when generated media content has not changed.
- Components should use `getMediaEntry()` and `resolveMediaImage()` instead of hardcoding generated travel/achievement/research image arrays.

Static one-off images are still used directly in some pages:

- Avatar: `public/photo/avatar.jpg`
- Education logo: `public/photo/education/gdutlogo.png`
- Research patent certificate image: `public/photo/Research/patent-cert.png`

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

- Use Tailwind utility classes and existing semantic UI classes in `styles/site.css`.
- Tailwind is loaded through CDN config in `index.html`.
- Reuse semantic UI classes from `styles/site.css`:
  - Layout: `ui-section`, `ui-shell`
  - Surface/card: `ui-surface`, `ui-subtle-panel`
  - Chips: `ui-chip`
  - Buttons: `ui-primary-btn`, `ui-ghost-btn`
  - Accessibility: `ui-focus-ring`
  - Shared layout: `page-gutter`, `editorial-grid`, `page-heading`, `record-details`
  - Links and tools: `text-link`, `icon-button`
- Dark mode uses the `dark:` prefix and CSS variables attached to `html.dark`.
- Every visual change must be reviewed in both light and dark themes, including text, cards, borders, overlays, badges, icons, hover states, and disabled/secondary text.
- Avoid hardcoded colors that only work in one theme; pair Tailwind color utilities with matching `dark:` variants or use existing semantic UI classes/CSS variables.
- Current Tailwind custom colors:
  - `primary`: `#20292e`
  - `secondary`: `#617079`
  - `accent`: `#087f8c`
- Use cool white/gray and graphite surfaces with a restrained cyan accent, sans-serif headings, and monospace metadata. Keep sections unframed and limit genuinely framed tools/cards to 8px corners. Use real public images, not invented scientific results or decorative pseudo-data.
- Do not show empty Notes or Publications sections. Only add approved public writing and verified works; never mirror private notes from other chats.

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
| `/background` | `Background` (education, undergraduate archive, honors) |
| `/research` | `Research` |
| `/education`, `/achievements` | Redirect to `/background` for legacy links |
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
- Use `useDialog()` for modal focus trapping, Escape handling, body scroll locking, and focus restoration. Email dialogs use a portal; galleries must remain above the header/footer without transformed ancestor stacking contexts.
- Travel only uses the `trip` URL parameter for the selected gallery. Its scene changes follow native scrolling; do not capture wheel/touch events to lock the page. Keep the thumbnail grid and photo viewer inside one portal dialog, not nested dialogs. Escape returns from photo view to the grid before closing; arrows, zoom bounds, focus restoration, and mobile controls must remain functional.
- `usePageMotion()` adds one-time viewport reveals to individual content blocks. Do not transform ancestors of fixed overlays or the sticky Travel stage. Respect `prefers-reduced-motion` and keep content visible when motion is unavailable.
- Use `getMediaImages()` for cover/gallery deduplication by media ID and photo counts. Do not read EXIF/GPS or invent map locations to add Travel interactions.
- Travel cover framing uses manifest dimensions and the actual stage aspect ratio. Preserve portrait images and heavily mismatched compositions with `contain`, without zoom/parallax cropping; only suitable landscape compositions fill the stage. Keep captions separate from contained photos, including on narrow and short screens. Do not replace source photos to solve layout problems without authorization.
- Travel transitions keep at most two self-contained scene layers. Each layer owns its image fit, background, and caption; never apply the destination's framing to the outgoing image. Decode the destination cover before committing its title/gallery identity, keep only the latest pending destination, and make outgoing layers inert. Thumbnail navigation jumps directly to the target scroll position; the scene crossfade supplies the motion. Preserve reduced-motion fallback, loading/error feedback, and retry behavior.

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
<div className="ui-surface rounded-lg p-6">
  {/* Card content */}
</div>
```

### Badge/Tag Pattern

```typescript
<span className="ui-chip rounded-full px-3 py-1 text-sm font-semibold">
  Label
</span>
```
