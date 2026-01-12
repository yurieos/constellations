/**
 * Blog post types for the Constellations blog
 */

/**
 * Frontmatter structure expected in markdown files
 */
export type PostFrontmatter = {
  title: string
  date: string
  excerpt: string
}

/**
 * Parsed blog post with slug derived from filename
 */
export type Post = {
  slug: string
  title: string
  date: string
  excerpt: string
}

/**
 * Full post including raw markdown content
 */
export type PostWithContent = Post & {
  content: string
}
