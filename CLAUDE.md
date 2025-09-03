# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack enabled
- `npm run build` - Build the application for production with Turbopack
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Project Architecture

This is a Next.js 15.5.0 e-commerce application ("o2-shop") using the App Router architecture with the following key characteristics:

### Tech Stack
- **Framework**: Next.js 15.5.0 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS integration
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **Build Tool**: Turbopack enabled for faster development and builds
- **Linting**: ESLint with Next.js recommended rules

### Project Structure
- **Source Directory**: `src/` contains all application code
- **App Router**: Uses `src/app/` directory structure for routing
- **Import Aliases**: `@/*` maps to `./src/*` for cleaner imports
- **Public Assets**: Static files in `public/` directory

### Configuration Files
- `next.config.ts` - Next.js configuration (minimal setup)
- `tsconfig.json` - TypeScript configuration with Next.js plugin
- `eslint.config.mjs` - ESLint flat config with Next.js rules
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS
- `src/app/globals.css` - Global styles with Tailwind import and CSS variables for theming

### Key Features
- **Dark Mode Support**: CSS variables configured for light/dark theme switching
- **Font Optimization**: Next.js font optimization with Geist font family
- **TypeScript**: Strict TypeScript configuration for type safety
- **Modern CSS**: Tailwind CSS v4 with PostCSS processing

### Layout Structure
- Root layout (`src/app/layout.tsx`) sets up HTML structure, fonts, and global styles
- Main page (`src/app/page.tsx`) contains the landing page with responsive grid layout
- CSS custom properties defined for consistent theming across light/dark modes
- The goal of this project is to create a simple lightweight website for a swim coach to showcase credentials and offer coaching services.
