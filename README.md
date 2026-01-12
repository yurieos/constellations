# Constellations

A minimal one-page blog built with Next.js 16 and Shadcn UI.

## Getting Started

```bash
npm install
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
tags: ["History", "Science"]
---

Your content here...
```

Posts are automatically sorted by date (newest first).

### Available Tags

- Ancient World
- History
- Science
- Tech

## Features

- Markdown-based posts with frontmatter
- Tag filtering
- Dark/light mode toggle
- Server-side rendering
- Responsive design

## Tech Stack

- [Next.js 16](https://nextjs.org)
- [Shadcn UI](https://ui.shadcn.com)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)
