# Constellations

A minimal one-page blog built with Next.js 16 and Shadcn UI.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

## Adding Posts

Create a new `.md` file in the `content/` folder:

```markdown
---
title: "Your Post Title"
date: "2026-01-12"
excerpt: "A brief description of your post"
---

Your content here...
```

Posts are automatically sorted by date (newest first).

## Features

- Markdown-based posts with frontmatter
- Dark/light mode toggle
- Server-side rendering (zero client JS for content)
- Shadcn UI components

## Tech Stack

- [Next.js 16](https://nextjs.org)
- [Shadcn UI](https://ui.shadcn.com)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)
