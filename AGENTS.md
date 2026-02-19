# AGENTS.md - Coding Guidelines for Zungtim Wong Personal Website

## Project Overview

React 19 + TypeScript + Vite personal website with Tailwind CSS styling. A bilingual (English/Chinese) portfolio website showcasing education, research, competitions, and travel experiences.

## Build Commands

```bash
# Development server (runs on port 3000)
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
│   ├── Hero.tsx         # Landing page with avatar and bio
│   ├── Navbar.tsx       # Navigation with theme toggle
│   ├── Education.tsx    # Education background cards
│   ├── Research.tsx     # Research projects portfolio
│   ├── Competitions.tsx # Competition achievements
│   ├── Travel.tsx       # Travel photo gallery
│   ├── Footer.tsx       # Site footer
│   └── ImageLoader.tsx  # Image loading utility
├── context/
│   └── ThemeContext.tsx # Dark/light mode state management
├── types.ts             # TypeScript interfaces
├── App.tsx              # Main app with routing
├── index.tsx            # Entry point with ThemeProvider
├── index.html           # HTML template with Tailwind CDN
├── vite.config.ts       # Vite configuration
└── public/
    └── photo/           # Static images (avatar, education, travel)
```

## Code Style Guidelines

### ⚠️ Content Integrity (CRITICAL)

- **NEVER modify user's content text** - This includes:
  - Personal descriptions/bio text
  - Project titles and descriptions
  - Achievement descriptions
  - Any user-provided content in Chinese or English
- Only modify code structure, styling, and layout
- If content needs reformatting, preserve the original meaning exactly
- Always ask for confirmation before making any content-related changes

### TypeScript & React

- Use **React 19** with functional components
- Type components as `React.FC` explicitly
- Define shared interfaces in `types.ts`
- Use 4-space indentation
- Use single quotes for strings, double quotes for JSX attributes
- Always use semicolons

```typescript
// Good
import React from 'react';

export const Component: React.FC = () => {
    return <div className="text-blue-600">Hello</div>;
};
```

### Imports Order

1. React imports
2. Third-party libraries (react-router-dom, lucide-react)
3. Local components
4. Types (use `import type`)

```typescript
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { useTheme } from '@/context/ThemeContext';
import type { NavItem } from '@/types';
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Hero.tsx`, `Education.tsx` |
| Interfaces | PascalCase | `EducationData`, `NavItem` |
| Variables/functions | camelCase | `activeItem`, `toggleMenu` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_THEME` |

### Styling (Tailwind CSS)

- Use Tailwind utility classes exclusively (no custom CSS files)
- Dark mode: use `dark:` prefix for all dark mode variants
- Custom colors: `primary` (#2563eb), `secondary` (#475569), `accent` (#f59e0b)
- Class order: layout → spacing → sizing → typography → colors → effects → responsive

```tsx
// Good - includes dark mode variants
<div className="flex flex-col items-center gap-4 px-4 py-6 text-slate-900 dark:text-white bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
```

### Dark Mode

- Theme managed by `ThemeContext` in `context/ThemeContext.tsx`
- Default theme: dark (first visit)
- Theme persisted in localStorage
- Use `useTheme()` hook to access theme state
- Always provide `dark:` variants for colors

```typescript
const { theme, toggleTheme } = useTheme();
```

### Routing

- Uses `react-router-dom` with `HashRouter`
- Routes defined in `App.tsx`
- Navigation uses `<Link>` component
- Use `useLocation()` for active route detection

### Error Handling

- Check for null/undefined before rendering
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Throw descriptive errors in entry points

```typescript
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}
```

### Types & Interfaces

- Export all shared interfaces from `types.ts`
- Use optional properties with `?` for nullable fields
- Use union types for fixed values

```typescript
interface CompetitionData {
  name: string;
  level: 'National' | 'Provincial' | 'Municipal';
  award?: string;
}
```

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.4 | UI framework |
| react-dom | ^19.2.4 | React DOM renderer |
| react-router-dom | ^7.13.0 | Client-side routing |
| lucide-react | ^0.563.0 | Icon library |
| typescript | ~5.8.2 | Type checking |
| vite | ^6.2.0 | Build tool |

## Path Aliases

- `@/` maps to project root
- Configured in both `tsconfig.json` and `vite.config.ts`

## Development Notes

- Dev server runs on port 3000
- Uses CDN-loaded Tailwind CSS (configured in `index.html`)
- Supports hot module replacement (HMR)
- Bilingual content (English/Chinese) throughout
- Images stored in `public/photo/`

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
<div className="bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    {/* Card content */}
</div>
```

### Badge/Tag Pattern

```typescript
<span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold rounded-full">
    Label
</span>
```
