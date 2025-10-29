# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.4 application called "Vektra" - an AI-powered design generation platform. The project uses the App Router with TypeScript, React 19, Tailwind CSS v4, and Framer Motion for animations. It's configured for Firebase Studio with Google IDX.

## Key Commands

### Development
```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint (use with --fix to auto-fix issues)
```

### Firebase Studio Context
- **Do not manually run `npm run dev`** - Firebase Studio automatically runs the dev server via `.idx/dev.nix`
- The preview server is managed by IDX and runs on a dynamic port
- Monitor IDE diagnostics and preview output for errors

## Architecture

### Project Structure
- **`src/app/`** - Next.js App Router pages and layouts
  - Uses path alias `@/*` mapped to `./src/*`
  - `/auth/signin` and `/auth/signup` - Authentication pages
  - `/dashboard` - Protected user dashboard
  - `/profile` - Protected user profile page
- **`src/components/`** - Reusable React components
  - Client components marked with `'use client'` directive
  - Server components by default (no directive needed)
  - `ProtectedRoute.tsx` - HOC for route protection
- **`src/contexts/`** - React Context providers
  - `AuthContext.tsx` - Global authentication state
- **`src/lib/`** - Utility functions and configuration
  - `firebase.ts` - Firebase app initialization
- **`public/`** - Static assets (SVG icons and logos)
- **`.idx/`** - Firebase Studio configuration
  - `dev.nix` defines environment packages and preview server
  - `mcp.json` configures Firebase MCP server integration

### Tech Stack Specifics
- **Next.js 15 App Router**: Server Components by default. Use `'use client'` only when needed for interactivity, state, or browser APIs
- **Tailwind CSS v4**: Uses `@import "tailwindcss"` and `@theme inline` for custom properties. CSS variables defined in `globals.css` with automatic dark mode support via `prefers-color-scheme`
- **TypeScript**: Strict mode enabled, targeting ES2017. Avoid `any` types - use proper type guards
- **Framer Motion**: Used for animations and transitions
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **Firebase SDK**: Firebase Authentication and Firestore for user management

### Current Features
The application includes:
- **Landing Page**: Single-page site with Navigation, Hero, Dashboard showcase, Pricing, and Footer sections
- **Authentication System**:
  - Email/password sign up and sign in
  - Protected routes with automatic redirect
  - User profile management
  - Persistent auth state via Firebase
- **User Dashboard**: Protected page showing user stats and quick actions
- **Navigation**: Auth-aware header showing different options for logged in/out users

### Styling Architecture
- Custom CSS variables for theming (light/dark mode)
- Key colors: `--accent` (#cf1310 red), `--background`, `--foreground`, `--surface`, `--muted`
- Consistent use of backdrop blur, subtle borders, and smooth transitions
- Custom animations defined: `fade-in-up`, `pulse-subtle`

### Firebase Integration
- **Firebase Authentication**: Email/password authentication enabled
- **Firestore**: User profiles stored in `/users/{uid}` collection
- **Environment Variables**: Requires `.env.local` with Firebase config (see `.env.local.example`)
- **Setup Guide**: See `FIREBASE_SETUP.md` for detailed configuration steps
- Firebase MCP server configured in `.idx/mcp.json`
- Firebase tools available via `npx firebase-tools`

### Authentication Architecture
- **AuthContext**: Global auth state provider wrapping the app in `layout.tsx`
- **useAuth hook**: Access auth state and methods (`user`, `userProfile`, `signIn`, `signUp`, `logOut`)
- **ProtectedRoute**: Wrap protected pages to enforce authentication
- **User Profile Data**: Stored in Firestore with `uid`, `email`, `displayName`, `createdAt`
- **Error Handling**: Use type guards (`err instanceof Error`) instead of `any` types

## Development Guidelines

### Component Patterns
- Keep Client Components minimal - push interactivity to component leaves
- Use Server Components for data fetching with async/await
- Colocate data fetching with components that consume the data
- For forms and mutations, use Next.js Server Actions with `'use server'` directive
- For protected pages, wrap content with `ProtectedRoute` component
- Access auth state via `useAuth()` hook from `@/contexts/AuthContext`

### Error Handling
After code changes:
1. Check ESLint output for type/lint errors
2. Monitor the preview server for compilation errors
3. Verify browser preview for runtime/visual issues
4. Auto-fix with `npm run lint -- --fix` when possible

### Design System
- Maintain clean spacing with proper Tailwind utilities
- Use established color variables from `globals.css`
- Preserve light/dark mode support via CSS custom properties
- Keep animations subtle and purposeful (follow existing patterns)

### File Naming
- Components: PascalCase (e.g., `Navigation.tsx`)
- Pages: lowercase (e.g., `page.tsx`, `layout.tsx`)
- Config files: kebab-case (e.g., `next.config.ts`)
