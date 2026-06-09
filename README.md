# ZungTim Wong Personal Website

Personal portfolio website for ZungTim Wong, built with React, TypeScript, Vite, and Tailwind CSS. The site presents education background, research projects, achievements, and travel records in a responsive light/dark interface.

## Overview

This repository contains the source code and content pipeline for my personal homepage. It is designed as a compact portfolio rather than a marketing landing page: the first screen introduces who I am, while the main sections organize academic background, research work, awards, and photo-based travel memories.

Main sections:

- About: profile, short bio, and contact entry.
- Education: academic background and coursework.
- Research: selected research project and patent records.
- Achievements: award and achievement records with galleries.
- Travel: travel entries with responsive photo galleries.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router with `HashRouter`
- Tailwind CSS through the CDN config in `index.html`
- Lucide React icons
- Sharp for responsive image generation

## Features

- Responsive layout for desktop and mobile screens.
- Light and dark theme support.
- Hash-based client routing for static hosting compatibility.
- Structured content files for travel and achievement entries.
- Responsive WebP media pipeline with `sm`, `md`, and `lg` variants.
- Lazy/preloaded media handling for gallery-heavy pages.
- Accessible modal behavior for contact and image previews.

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

## Content Editing

Primary content locations:

```text
content/travel.tsx
content/achievements.ts
components/Research.tsx
```

Media helper code:

```text
content/media.ts
types/content.ts
scripts/media/build-media.mjs
```

When adding a new gallery entry, make sure the `entryId` in the content file matches the folder name under `public/photo-src/<module>/`.

## Project Structure

```text
.
|- components/                   # React page and UI components
|- content/                      # Structured content and media manifest
|- context/                      # Theme context
|- hooks/                        # Shared image/loading hooks
|- public/
|  |- photo/                     # Static one-off images
|  |- photo-src/                 # Source images for the media pipeline
|  `- photo-gen/                 # Generated responsive images
|- scripts/media/                # Media build script
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
