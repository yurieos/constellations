import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PostList } from "@/components/post-list"
import type { Post, PostFrontmatter } from "@/types/blog"

function getPosts(): Post[] {
  const contentDir = path.join(process.cwd(), "content")
  const files = fs.readdirSync(contentDir)

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(contentDir, file)
      const fileContent = fs.readFileSync(filePath, "utf-8")
      const { data } = matter(fileContent)
      const frontmatter = data as PostFrontmatter

      return {
        slug: file.replace(".md", ""),
        title: frontmatter.title,
        date: frontmatter.date,
        excerpt: frontmatter.excerpt,
        tags: frontmatter.tags ?? [],
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

function getAllTags(posts: Post[]): string[] {
  const tags = new Set<string>()
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)))
  return Array.from(tags).sort()
}

export default function Page() {
  const posts = getPosts()
  const allTags = getAllTags(posts)

  return (
    <main className="mx-auto max-w-4xl px-6 pt-8 pb-16">
      <Header />
      <PostList posts={posts} allTags={allTags} />
      <Footer />
    </main>
  )
}
