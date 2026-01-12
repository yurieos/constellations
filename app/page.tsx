import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Header } from "@/components/header"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
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
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function Page() {
  const posts = getPosts()

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Header />
      <section className="mt-8 space-y-6">
        {posts.map((post) => (
          <Card key={post.slug}>
            <CardHeader>
              <CardDescription>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
              <CardTitle className="text-lg">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
