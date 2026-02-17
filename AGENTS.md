# AGENTS.md - Coding Guidelines for Zungtim Wong Personal Website

## Project Overview

React 19 + TypeScript + Vite personal website with Tailwind CSS styling.

## Build Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install
```

**Note**: No test framework or linter is currently configured. Tests and linting are not available.

## Project Structure

```
├── components/          # React components
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Education.tsx
│   ├── Research.tsx
│   ├── Competitions.tsx
│   ├── Travel.tsx
│   └── Footer.tsx
├── types.ts            # TypeScript interfaces
├── App.tsx             # Main app component with routing
├── index.tsx           # Entry point
├── index.html          # HTML template with Tailwind CDN
└── vite.config.ts      # Vite configuration
```

## Code Style Guidelines

### ⚠️ Content Integrity (IMPORTANT)

- **NEVER modify user's content text** - This includes but is not limited to:
  - Personal descriptions/bio text
  - Project titles and descriptions
  - Achievement descriptions
  - Any user-provided content
- Only modify code structure and styling
- If content needs to be reformatted for layout reasons, keep the original meaning intact
- Ask for confirmation before making any content-related changes

### TypeScript & React

- Use **React 19** with functional components
- Type components as `React.FC` explicitly
- Define props using interfaces in `types.ts`
- Use 4-space indentation
- Use single quotes for strings, double quotes for JSX attributes
- Always use semicolons

```typescript
// Good
import React from 'react';

export const Hero: React.FC = () => {
    return <div className="text-blue-600">Hello</div>;
};
```

### Imports

- Order: React → third-party libraries → local components → types
- Use path alias `@/` for root-level imports
- Group lucide-react icon imports together

```typescript
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import type { NavItem } from '@/types';
```

### Naming Conventions

- Components: PascalCase (e.g., `Hero.tsx`, `Education.tsx`)
- Interfaces: PascalCase with descriptive names (e.g., `EducationData`, `NavItem`)
- Variables/functions: camelCase
- Constants: UPPER_SNAKE_CASE for true constants

### Styling (Tailwind CSS)

- Use Tailwind utility classes exclusively
- Custom colors available: `primary` (#2563eb), `secondary` (#475569), `accent` (#f59e0b)
- Follow utility class order: layout → spacing → sizing → typography → colors → effects
- Use responsive prefixes: `sm:`, `md:`, `lg:` for responsive design

```tsx
// Good
<div className="flex flex-col items-center gap-4 px-4 py-6 text-slate-900 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
```

### Error Handling

- Check for null/undefined before rendering
- Use optional chaining and nullish coalescing where appropriate
- Throw descriptive errors in entry points

```typescript
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}
```

### Routing

- Uses `react-router-dom` with `HashRouter`
- Routes defined in `App.tsx`
- Navigation uses `<Link>` component from react-router-dom
- Use `useLocation()` hook for active route detection

### Types & Interfaces

- Export all interfaces from `types.ts`
- Use optional properties with `?` for nullable fields
- Use union types for fixed values (e.g., `level: 'National' | 'Provincial' | 'Municipal'`)

### Comments

- Use `//` for single-line comments
- Comments in Chinese are acceptable for this bilingual project
- Keep comments concise and relevant

```typescript
// 头像的地址
src="/photo/avatar.jpg"
```

### Environment Variables

- API keys loaded via Vite's `loadEnv`
- Set `GEMINI_API_KEY` in `.env.local` file
- Access via `process.env.GEMINI_API_KEY`

## Key Dependencies

- react ^19.2.4
- react-dom ^19.2.4
- react-router-dom ^7.13.0
- lucide-react ^0.563.0 (icons)
- typescript ~5.8.2
- vite ^6.2.0
- @vitejs/plugin-react ^5.0.0

## Path Aliases

- `@/` maps to project root
- Configure in both `tsconfig.json` and `vite.config.ts`

## Development Notes

- Dev server runs on port 3000
- Uses CDN-loaded Tailwind CSS (no build step required for styles)
- Supports hot module replacement (HMR)
- Bilingual content (English/Chinese) is expected
