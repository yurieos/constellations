# Project Patterns

## Component Patterns

### Card Usage

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardDescription>Metadata</CardDescription>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">Content</p>
  </CardContent>
</Card>
```

### Button Variants

```tsx
import { Button } from "@/components/ui/button"

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Conditional Classes

Always use `cn()` for conditional classnames:

```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  className
)} />
```

## File Organization

### New Feature Checklist

1. Add types to `types/` if needed
2. Create component in `components/`
3. Use server component unless interactivity required
4. Import Shadcn components from `@/components/ui/`
5. Run `npm run lint && npm run build`

### Adding Shadcn Components

```bash
# Add single component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add dialog toast avatar
```

## Styling Patterns

### Responsive Design

```tsx
// Mobile-first approach
<div className="px-4 md:px-6 lg:px-8">
  <h1 className="text-xl md:text-2xl lg:text-3xl">
```

### Dark Mode

Uses `next-themes`. CSS variables auto-switch:

```tsx
// These work in both light/dark mode
<p className="text-foreground">Primary text</p>
<p className="text-muted-foreground">Secondary text</p>
<div className="bg-background">Background</div>
<div className="bg-card">Card background</div>
```

### Spacing

Use Tailwind spacing scale consistently:

- `space-y-4` for vertical rhythm between items
- `gap-4` for grid/flex gaps
- `p-4` / `px-4 py-2` for padding
- `mt-8` for section separation

## Data Patterns

### Blog Post Type

```typescript
// types/blog.ts
export type Post = {
  slug: string
  title: string
  date: string
  excerpt: string
}

export type PostFrontmatter = {
  title: string
  date: string
  excerpt: string
}
```

### Reading Markdown Files

```typescript
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDir = path.join(process.cwd(), "content")
const files = fs.readdirSync(contentDir)
const { data, content } = matter(fileContent)
```

## Common Mistakes to Avoid

### ❌ Don't

```tsx
// Adding "use client" unnecessarily
"use client"
export function StaticCard() { return <Card>...</Card> }

// Inline styles instead of Tailwind
<div style={{ marginTop: 16 }}>

// Manual className concatenation
<div className={`base ${condition ? 'active' : ''}`}>

// Importing from wrong path
import { Button } from "shadcn"
```

### ✅ Do

```tsx
// Server component (no directive)
export function StaticCard() { return <Card>...</Card> }

// Tailwind classes
<div className="mt-4">

// Use cn() utility
<div className={cn("base", condition && "active")}>

// Correct import path
import { Button } from "@/components/ui/button"
```
