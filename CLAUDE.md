# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TTWrapped is a Next.js 16 application that allows users to upload and analyze their TikTok data export (JSON or ZIP
files). The app provides a "Spotify Wrapped"-style slideshow experience showcasing user activity insights, followed by a
comprehensive analytics dashboard. All processing happens client-side for privacy.

## Development Commands

### Running the Development Server

```bash
npm run dev
# or
pnpm dev
```

The app will be available at http://localhost:3000

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

### Code Formatting

Prettier is configured with Tailwind CSS plugin. Format code with:

```bash
npx prettier --write .
```

Prettier configuration includes:

- Print width: 120 characters
- Single attribute per line for JSX
- Tailwind class sorting enabled
- LF line endings

## Technology Stack

### Core

- **Framework**: Next.js 16.0.3 (App Router)
- **React**: Version 19.2.0 (with React Compiler enabled)
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS 4

### State & Data

- **State Management**: Zustand 5.0.8
- **Schema Validation**: Zod 4.1.12 (runtime validation)
- **ZIP Processing**: JSZip 3.10.1
- **Tables**: TanStack React Table 8.21.3

### UI Components

- **Component Library**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React 0.553
- **Carousel**: Embla Carousel 8.6

## Project Structure

```
src/
├── app/                              # Next.js App Router pages
│   ├── layout.tsx                   # Root layout (TikTok Sans font)
│   ├── page.tsx                     # Home page wrapper
│   ├── globals.css                  # Global styles and Tailwind imports
│   ├── home/
│   │   ├── Home_Page.tsx            # Main home page component
│   │   ├── Header.tsx               # Page header
│   │   ├── error/
│   │   │   └── Error_Display.tsx    # Error handling display
│   │   └── sections/                # Home page info sections
│   ├── terms/page.tsx               # Terms of service
│   └── usage/page.tsx               # Usage guide
├── components/
│   ├── custom/                      # Custom reusable components
│   │   ├── File_Upload.tsx          # Main file upload handler (JSON/ZIP)
│   │   ├── Activity_Map.tsx         # Activity visualization
│   │   ├── DeferredRender.tsx       # Lazy loading wrapper
│   │   ├── Empty_State.tsx          # No data fallback UI
│   │   └── Pretty_Zod_Error.tsx     # Zod validation error display
│   ├── layout/                      # Layout primitives
│   │   ├── Data_Section_Card.tsx    # Accordion card wrapper
│   │   └── Footer.tsx               # Site footer
│   ├── page/                        # Page-level dashboard components
│   │   ├── Analytics_Dashboard.tsx  # Main analytics container
│   │   ├── Profile_Overview.tsx     # User profile card
│   │   ├── activity-summary/        # Activity analysis tabs
│   │   ├── ad-tracking/             # Ad interests & tracking
│   │   ├── login-history/           # Login timeline & analytics
│   │   └── shopping/                # Cart & browsing history
│   ├── slideshow/                   # "Wrapped" slideshow feature
│   │   ├── Story_Slideshow.tsx      # Main slideshow controller
│   │   ├── Slideshow_Complete.tsx   # Post-slideshow options
│   │   ├── calculate_watch_stats.ts # Watch time calculation
│   │   ├── format_*.ts              # Number/time formatters
│   │   ├── calculate_user_profile/  # User personality categorization
│   │   │   ├── calculate_user_profile.ts
│   │   │   └── profiles.ts          # 64 profile definitions
│   │   └── slides/                  # Individual slide components
│   └── ui/                          # shadcn/ui components
├── hooks/
│   └── useMobile.tsx                # Mobile breakpoint hook (768px)
├── lib/
│   └── utils.ts                     # cn() utility (clsx + twMerge)
├── stores/
│   └── app_store.ts                 # Zustand state management
└── types/
    └── TikTok_Data_Schema.ts        # Zod schemas + TypeScript types (637 lines)
```

## Architecture

### Application Flow

1. **Upload**: User uploads TikTok data export (JSON file or ZIP archive)
2. **Validation**: File parsed and validated against 11 Zod schemas
3. **Slideshow**: Auto-playing "Wrapped" experience with 10+ slides
4. **Complete**: Options to re-watch, download images, or view dashboard
5. **Dashboard**: Full analytics with tabbed sections

### State Management (Zustand)

The app store (`/src/stores/app_store.ts`) manages:

```typescript
type App_State = {
  json_data: TikTok_Data | null; // Complete parsed export
  data_sections: Data_Sections_State; // 11 validated sections
  schema_validation: Schema_Validation_State; // Validation status per section
  error: string | null;
  view_state: "upload" | "slideshow" | "complete" | "dashboard";
  is_loading: boolean;
  slideshow_backgrounds: string[]; // Shuffled backgrounds (persisted)
};
```

**Key Actions:**

- `handle_file_load(data)`: Validates all sections, sets state, transitions to slideshow
- `handle_error(error)`: Resets state, shows error
- `go_to_slideshow/complete/dashboard()`: View navigation
- `get_validation_summary()`: Returns valid/invalid section counts

### Data Validation

11 data sections validated independently using Zod schemas:

- ads_and_data, app_settings, comment, direct_message
- income_plus_wallet_transactions, location_review, post, profile
- tiktok_shop, tiktok_live, your_activity

Partial validation allowed (some sections can fail while others succeed).

### Slideshow System

**Location**: `/src/components/slideshow/`

**Controller** (`Story_Slideshow.tsx`):

- Auto-advances every 5 seconds with smooth progress animation
- Touch navigation: left third (prev), center (pause), right third (next)
- Uses RequestAnimationFrame for smooth progress bar
- Backgrounds shuffled once per session and stored in state

**Slides Generated**:

1. Welcome (profile intro)
2. Videos watched count
3. Total watch time
4. Session statistics
5. Daily average metrics
6. Download size equivalent
7. Likes & favorites
8. Comments made
9. Shares
10. Profile overview (personality type)
11. Complete

**User Profile Categorization**:

- 4 dimensions: Consumption, Engagement, Sharing, Creation
- Each dimension: low/medium/high
- Results in 64 unique personality profiles with names/descriptions/avatars

### Watch Stats Calculation

**Location**: `calculate_watch_stats.ts`

Algorithm:

1. Filter videos to last 365 days
2. Group into sessions (30-min gap = session boundary)
3. Estimate watch time per video (gap between views, capped at 3 min)
4. Calculate totals, averages, longest session, download estimates

## Key Configuration

### Next.js Configuration

- React Compiler enabled (`reactCompiler: true`)
- Remote image patterns: `tiktokcdn.com`, `tiktokcdn-eu.com`, GitHub avatars
- App Router architecture

### TypeScript Configuration

- Target: ES2017
- Strict mode enabled
- Path aliases: `@/*` → `./src/*`
- JSX mode: `react-jsx`

### ESLint Configuration

- Uses Next.js core web vitals and TypeScript configs
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Development Guidelines

### Component Organization

- **custom/**: Generic reusable components (File_Upload, Empty_State)
- **layout/**: Layout primitives (Data_Section_Card, Footer)
- **page/**: Feature-specific dashboard sections
- **slideshow/**: Wrapped slideshow system & slides
- **ui/**: shadcn/ui component wrappers

### Code Style

#### Naming Conventions

- **Component files**: PascalCase with underscores (e.g., `Home_Page.tsx`, `Slide_Overview.tsx`)
- **Type files**: PascalCase (e.g., `TikTok_Data_Schema.ts`)
- **Hook files**: camelCase with "use" prefix (e.g., `useMobile.tsx`)
- **Variables & functions**: snake_case (e.g., `json_data`, `handle_file_load`, `calculate_watch_stats`)
- **Type names**: PascalCase (e.g., `TikTok_Data`, `Watch_Stats`)

#### TypeScript

- **Strict mode enabled** - Maintain comprehensive type definitions
- **Zod for runtime validation** - All TikTok data validated at runtime
- **Always use `type`** - Never use `interface`; use `type` for all type definitions

#### React Patterns

- **"use client" directive** - Place at top of files that use hooks or browser APIs
- **Component props** - Define explicit prop types
- **State management** - Use Zustand store for global state, React hooks for local state
- **Event handlers** - Prefix with "handle" (e.g., `handle_file_load`, `handle_click`)

#### Helper Functions

- Place helper functions BELOW the main component (not above)
- Do NOT use comments in helper functions unless absolutely necessary
- Name functions descriptively (e.g., `calculate_watch_stats`, `format_hours`)
- Keep functions focused on a single responsibility

### Path Aliases

Always use `@/*` for imports within src:

```typescript
import { useData_store } from "@/stores/app_store";
import { TikTok_Data } from "@/types/TikTok_Data_Schema";
```

## Important Notes

### Data Privacy

- All processing happens client-side (browser)
- No data sent to servers
- ZIP files extracted in-browser using JSZip

### Key Files

- **Type definitions**: `src/types/TikTok_Data_Schema.ts` (637 lines of Zod schemas)
- **State management**: `src/stores/app_store.ts`
- **Slideshow controller**: `src/components/slideshow/Story_Slideshow.tsx`
- **Profile categorization**: `src/components/slideshow/calculate_user_profile/`

### Assets

- 57 slideshow background images in `/public/slideshow_backgrounds/`
- 64 profile avatar images in `/public/user_profiles/`

## Important Instruction Reminders

- Do what has been asked; nothing more, nothing less
- NEVER create files unless they're absolutely necessary for achieving your goal
- ALWAYS prefer editing an existing file to creating a new one
- NEVER proactively create documentation files (\*.md) or README files unless explicitly requested
