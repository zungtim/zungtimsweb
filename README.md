# Zungtim Wong Personal Website

Personal portfolio website built with React 19, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS (CDN config in `index.html`)
- React Router (`HashRouter`)
- Lucide React icons

## Content + Media Workflow (Long-term)

The website now uses a **content-data + source-images** pipeline.

### 1) Add/Edit content

- Travel data: `content/travel.tsx`
- Achievement data: `content/achievements.ts`

### 2) Put source images

- Travel source folder: `public/photo-src/travel/<entry-id>/`
- Achievement source folder: `public/photo-src/competitions/<entry-id>/`

Filename rules (strict):
- Cover image: `cover.*`
- Gallery images: `1.*`, `2.*`, `3.*` ...

### 3) Build pipeline runs automatically

`npm run dev` and `npm run build` both trigger `media:build` first.

`media:build` will:
- Generate responsive WebP variants (`sm/md/lg`) into `public/photo-gen`
- Generate runtime manifest for rendering
- Run media budget checks (fails build when over limits)

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

Optional (run manually):

```bash
npm run media:build
npx tsc --noEmit
```

## Project Structure

```text
.
├── App.tsx
├── index.tsx
├── components/
├── content/
│   ├── travel.tsx
│   ├── competitions.ts
│   └── generated/media-manifest.ts
├── hooks/
├── scripts/media/build-media.mjs
├── types/
│   └── content.ts
├── public/
│   ├── photo-src/
│   └── photo-gen/ (generated)
└── context/
```

## Notes

- No test framework is configured yet.
- No lint/format pipeline is configured yet.

## UI Design System Maintenance Rules

To keep the new UI consistent while adding future content/pages:

1. Reuse semantic UI classes from `index.html` style tokens:
   - Layout: `ui-section`, `ui-shell`
   - Surface/Card: `ui-surface`
   - Chips: `ui-chip`
   - Focus accessibility: `ui-focus-ring`
   - Buttons: `ui-primary-btn`, `ui-ghost-btn`
2. Keep animation subtle and meaningful:
   - Avoid long-running decorative animations.
   - Respect `prefers-reduced-motion` behavior.
3. Preserve readability first:
   - Maintain clear heading hierarchy and comfortable line-height.
   - Keep light/dark contrast readable for text and controls.
4. For Travel/Achievement updates:
   - Continue using `content/*` + `public/photo-src/*` + `media:build`.
   - Do not re-introduce hardcoded image path arrays in components.

