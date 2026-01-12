export type PostFrontmatter = {
  title: string
  date: string
  excerpt: string
  tags?: string[]
}

export type Post = {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}
