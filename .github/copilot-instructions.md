# Copilot Instructions for AI Agents

## Project Overview
This is a personal website built with React, TypeScript, and Vite. It showcases education, research, competitions, and travel experiences. The site is structured as a single-page application (SPA) with client-side routing via `react-router-dom`.

## Architecture & Key Files
- **App.tsx**: Main entry, sets up routes and layout. Uses `HashRouter` for navigation.
- **components/**: Contains all major page sections (e.g., `Navbar`, `Hero`, `Education`, `Research`, `Competitions`, `Travel`, `Footer`).
- **types.ts**: Centralized TypeScript interfaces for data models (Education, Research, Competition, Travel, NavItem).
- **public/photo/**: Static assets for research and travel galleries, organized by date and topic.
- **vite.config.ts**: Vite configuration, including environment variable injection and path alias `@` to project root.

## Developer Workflows
- **Local Development**:  
  - Install dependencies: `npm install`  
  - Start dev server: `npm run dev` (default port 3000)
  - Build for production: `npm run build`
  - Preview production build: `npm run preview`
- **Environment Variables**:  
  - Set `GEMINI_API_KEY` in `.env.local` for Gemini API integration (if used).

## Patterns & Conventions
- **Routing**: All navigation handled via `react-router-dom` (`HashRouter`). Route paths are mapped to components in `App.tsx`.
- **Component Design**: Each major section is a dedicated React component. Data and UI logic are encapsulated per section.
- **Icons**: Uses `lucide-react` for consistent iconography across navigation and content.
- **Styling**: Tailwind CSS utility classes are used for layout and design. No global CSS files.
- **Data**: Most page content is hardcoded in components. Some sections (e.g., Travel) use TypeScript interfaces for structured data.
- **Static Assets**: Images are referenced via relative paths in the `public/photo/` directory. Gallery images are grouped by event/date.
- **Path Aliases**: Use `@` as an alias for the project root in imports (see `vite.config.ts`).

## Integration Points
- **Gemini API**: If using Gemini, access the API key via `process.env.GEMINI_API_KEY` (injected by Vite).
- **No backend/server code**: All logic is client-side; no API routes or server components.

## Example Patterns
- **Adding a new page**:  
  1. Create a new component in `components/`.  
  2. Add a route in `App.tsx`.  
  3. Update navigation in `Navbar.tsx`.
- **Referencing images**: Use `/photo/[section]/[date]/[filename]` for travel/research galleries.
- **Type safety**: Define new data models in `types.ts` and use them in components.

## Quick References
- Main entry: [App.tsx](../../App.tsx)
- Routing: [App.tsx](../../App.tsx), [Navbar.tsx](../../components/Navbar.tsx)
- Data models: [types.ts](../../types.ts)
- Vite config: [vite.config.ts](../../vite.config.ts)
- Static assets: [public/photo/](../../public/photo/)

---
_If any section is unclear or missing, please provide feedback for further refinement._
