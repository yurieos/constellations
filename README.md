# Constellations

A celestial blog exploring ideas across the universe of knowledge. Built with Next.js 16, React 19, and Shadcn UI.

🌐 **Live:** [constellationsai.vercel.app](https://constellationsai.vercel.app)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

## Features

- **Markdown-based posts** with frontmatter metadata
- **Search & filter** by title, excerpt, or tags
- **Dark/light/system theme** toggle with persistence
- **Animated starfield** background with constellations, nebulas, and shooting stars
- **PWA support** — installable as a native app
- **Static generation** with hourly revalidation
- **Responsive design** with bento grid layout
- **Error boundaries** for graceful error handling
- **SEO optimized** with OpenGraph and Twitter cards

## Adding Posts

Create a new `.md` file in the `content/` folder:

```markdown
---
title: "Your Post Title"
date: "2026-01-12"
excerpt: "A brief description of your post"
tags: ["History", "Science"]
---

Your content here...
```

Posts are automatically sorted by date (newest first).

### Available Tags

- History
- Science
- Technology

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_BASE_URL` | Production URL for SEO/sitemap | `https://constellationsai.vercel.app` |

## Tech Stack

| Package | Purpose |
|---------|---------|
| [Next.js 16](https://nextjs.org) | React framework with App Router |
| [React 19](https://react.dev) | UI library |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first CSS |
| [Shadcn UI](https://ui.shadcn.com) | Component library (base-maia style) |
| [next-themes](https://github.com/pacocoursey/next-themes) | Theme management |
| [gray-matter](https://github.com/jonschlinkert/gray-matter) | Markdown frontmatter parsing |
| [Lucide React](https://lucide.dev) | Icon library |

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

MIT
