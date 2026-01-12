# AGENTS.md

> Constellations is a minimal one-page blog built with Next.js 16, React 19, and Shadcn UI (base-maia style). Posts are markdown files with frontmatter in `content/`.

## Setup Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build
npm run lint         # Run ESLint
```

## Verification Commands

Always run these before completing a task:

```bash
npm run lint         # Must pass with no errors
npm run build        # Must complete successfully
```

## Project Structure

```
constellations/
├── app/
│   ├── page.tsx          # Main blog page (SERVER COMPONENT)
│   ├── layout.tsx        # Root layout with ThemeProvider
│   ├── globals.css       # Tailwind v4 + CSS variables
│   └── icon.svg          # Favicon
├── components/
│   ├── ui/               # Shadcn UI components (DO NOT EDIT MANUALLY)
│   ├── header.tsx        # Site header with logo
│   ├── post-list.tsx     # Post list with tag filtering (CLIENT)
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx  # Theme toggle (CLIENT)
├── content/              # Markdown blog posts
│   └── *.md
├── lib/
│   └── utils.ts          # cn() utility for classnames
└── types/
    └── blog.ts           # TypeScript types
```

## Code Style

- TypeScript strict mode
- Server components by default — NO `"use client"` unless required
- Import aliases: `@/` maps to project root
- Use `cn()` from `@/lib/utils` for conditional classnames
- Tailwind v4 with CSS variables for theming

## Component Guidelines

### Server vs Client Components

```tsx
// Server component (DEFAULT) - no directive needed
export function ServerComponent() { ... }

// Client component - ONLY when needed for interactivity
"use client"
export function ClientComponent() { ... }
```

### When to use "use client"

- Event handlers (onClick, onChange, etc.)
- React hooks (useState, useEffect, etc.)
- Browser APIs (window, document, localStorage)

### Shadcn UI Components

Located in `components/ui/`. Add new components via CLI:

```bash
npx shadcn@latest add <component-name>
```

DO NOT manually edit files in `components/ui/`. Re-run the CLI to update.

Installed components: button

## Adding Blog Posts

Create `content/<slug>.md`:

```markdown
---
title: "Post Title"
date: "YYYY-MM-DD"
excerpt: "Brief description"
---

Content here...
```

Posts auto-sort by date (newest first).

## Key Dependencies

| Package | Purpose |
|---------|---------|
| `gray-matter` | Parse markdown frontmatter |
| `next-themes` | Dark/light mode |
| `class-variance-authority` | Component variants |
| `tailwind-merge` | Merge Tailwind classes |

## DO NOT

- Add `"use client"` to server components
- Manually edit `components/ui/*` files
- Install additional CSS frameworks
- Add unnecessary dependencies
- Create new routing (single-page blog)

## Testing Changes

1. Run `npm run lint` — fix any errors
2. Run `npm run build` — must complete without errors
3. Run `npm run dev` — verify UI renders correctly

## PR Guidelines

- Title format: `[type] Brief description`
- Types: `feat`, `fix`, `refactor`, `docs`, `style`
- Run lint and build before committing
- Keep changes focused and minimal

## Additional Context

- Types: `types/blog.ts`
