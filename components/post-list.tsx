"use client"

import { useState } from "react"
import type { Post } from "@/types/blog"
import { cn } from "@/lib/utils"

type PostListProps = {
  posts: Post[]
  allTags: string[]
}

export function PostList({ posts, allTags }: PostListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts

  return (
    <>
      {/* Tag Filter */}
      <nav className="pt-8" aria-label="Filter by category">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={cn(
              "cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selectedTag === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setSelectedTag(selectedTag === tag ? null : tag)
              }
              className={cn(
                "cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selectedTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </nav>

      {/* Posts List */}
      <section className="mt-10">
        {filteredPosts.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">
            No posts found.
          </p>
        ) : (
          <div className="space-y-8">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="group">
                <time className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-2 text-lg font-semibold text-foreground">
                  {post.title}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground/90">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
