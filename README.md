# ZungTim Wong Personal Website

Personal academic website for ZungTim Wong, built with React, TypeScript, Vite, and Tailwind CSS. The site brings together research interests, academic background, and travel records in a responsive light/dark interface.

## Overview

This repository contains the source code and content pipeline for my personal homepage. Its graduate-oriented layout puts current interests first, keeps undergraduate training as historical background, and leaves travel as a distinct personal section. Research interests are not presented as completed projects or results.

Main sections:

- About: profile, short bio, and contact entry.
- Research: cold ion-molecule reaction-dynamics interests, scientific questions, and a conceptual experimental-method framework.
- Background: education with optional records, concise undergraduate research/patent summaries, and honors with galleries.
- Travel: scroll-linked photographic scenes and responsive travel galleries.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router with `HashRouter`
- Tailwind CSS through the CDN config in `index.html`
- Shared theme tokens and technical-profile layouts in `styles/site.css`
- Lucide React icons
- Sharp for responsive image generation

## Features

- Responsive layout for desktop and mobile screens.
- Light and dark theme support.
- Hash-based client routing for static hosting compatibility.
- Separate public profile, research-interest, undergraduate research, travel, and achievement content files.
- Responsive WebP media pipeline with `sm`, `md`, and `lg` variants.
- Lazy/preloaded media handling for gallery-heavy pages.
- Accessible modal behavior for contact and image previews.
- Scroll-linked Travel scenes with photo crossfades, thumbnail navigation, and pointer/hover feedback.
- One-time viewport reveals with reduced-motion support.
- Travel photo viewer with previous/next navigation, thumbnails, keyboard controls, and zoom.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Type-check only:

```bash
npx tsc --noEmit
```

## Media Pipeline

The site uses a source-image plus generated-media workflow.

Source images are placed under:

```text
public/photo-src/
```

Generated responsive WebP files are written to:

```text
public/photo-gen/
```

The generated media manifest is:

```text
content/generated/media-manifest.ts
```

`npm run dev` and `npm run build` both run `media:build` first. To run the media pipeline manually:

```bash
npm run media:build
```

Filename rules:

- Cover image: `cover.*`
- Gallery images: `1.*`, `2.*`, `3.*`, and so on

Current source image folders:

```text
public/photo-src/travel/<entry-id>/
public/photo-src/achievements/<entry-id>/
public/photo-src/research/<entry-id>/
```

Do not edit `public/photo-gen/` manually. Update source images, then rerun the media build.

The current `public/photo-src/` directory is not private storage: Vite copies it into production output. Only place material approved for public distribution there. UI visibility and the site's `noindex` tag are not access controls.

## Content Editing

Primary content locations:

```text
content/travel.tsx
content/achievements.ts
content/research.tsx       # Public researchArchiveEntries; retained historical detail
content/profile.ts        # Public identity and contact; re-exports the interest index
content/research-focus.ts # Shared interest index, Research overview, questions, methods
```

Media helper code:

```text
content/media.ts
types/content.ts
scripts/media/build-media.mjs
```

When adding a new gallery entry, make sure the `entryId` in the content file matches the folder name under `public/photo-src/<module>/`.

The main routes are `/`, `/research`, `/background`, and `/travel`. Legacy `/education` and `/achievements` links redirect to `/background`. Notes and Publications are not shown until suitable public content exists.

## Project Structure

```text
.
|- components/                   # React page and UI components
|- content/                      # Structured content and media manifest
|- context/                      # Theme context
|- hooks/                        # Shared loading, dialog, and page-motion hooks
|- public/
|  |- photo/                     # Static one-off images
|  |- photo-src/                 # Source images for the media pipeline
|  `- photo-gen/                 # Generated responsive images
|- scripts/media/                # Media build script
|- styles/site.css               # Theme tokens and responsive scientific-profile styling
|- types/                        # Content/media interfaces
|- App.tsx                       # App routes and layout
|- index.html                    # HTML template and Tailwind config
|- index.tsx                     # React entry point
`- vite.config.ts                # Vite config
```

## Development Notes

- The dev server runs on port `3000`.
- The project currently has no dedicated test framework or linter.
- Use `npx tsc --noEmit` and `npm run build` before publishing changes.
- Keep visual changes compatible with both light and dark modes.
- Avoid hardcoding generated image paths in components; use the media manifest helpers instead.
