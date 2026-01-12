# AGENTS.md

## Project Overview

Constellations is a minimal one-page blog built with Next.js 16 and Shadcn UI. Posts are stored as markdown files with frontmatter.

## Setup Commands

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm start`

## Project Structure

```
constellations/
├── app/
│   ├── page.tsx          # Main blog page (server component)
│   ├── layout.tsx        # Root layout with theme provider
│   └── globals.css       # Global styles and CSS variables
├── components/
│   ├── ui/               # Shadcn UI components
│   ├── header.tsx        # Site header with theme toggle
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
└── content/              # Markdown blog posts
    └── *.md
```

## Code Style

- TypeScript strict mode
- Use server components by default (no "use client" unless necessary)
- Shadcn UI components in `components/ui/`
- CSS variables for theming (Tailwind + Shadcn)
- Import aliases: `@/` maps to project root

## Adding Blog Posts

Create a new `.md` file in `content/` with frontmatter:

```markdown
---
title: "Post Title"
date: "YYYY-MM-DD"
excerpt: "Brief description"
---

Content here...
```

Posts are automatically read by `app/page.tsx` and sorted by date (newest first).

## Key Dependencies

- `gray-matter`: Parses markdown frontmatter
- `next-themes`: Dark/light mode support
- Shadcn UI: Component library (Card, Button, etc.)

## Important Notes

- The blog is a single page - no routing needed for posts
- All content rendering happens server-side (zero client JS for blog content)
- Theme toggle is the only client component
