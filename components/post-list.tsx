"use client"

import { useState } from "react"
import type { Post } from "@/types/blog"
import { cn } from "@/lib/utils"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"

type PostListProps = {
  posts: Post[]
  allTags: string[]
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-muted to-muted/50" />
)

export function PostList({ posts, allTags }: PostListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      {/* Tag Filter */}
      <nav className="pt-8" aria-label="Filter by category">
        <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-full border border-border/20 bg-secondary/30 backdrop-blur-sm">
          <button
            onClick={() => setSelectedTag(null)}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              selectedTag === null
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
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
                "cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                selectedTag === tag
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </nav>

      {/* Posts */}
      <section className="mt-10">
        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">No posts found.</p>
          </div>
        ) : (
          <BentoGrid className="max-w-4xl mx-auto">
            {filteredPosts.map((post, i) => (
              <BentoGridItem
                key={post.slug}
                title={post.title}
                description={
                  <>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                      {formatDate(post.date)}
                    </p>
                    <p className="mt-2 leading-relaxed">{post.excerpt}</p>
                  </>
                }
                header={<Skeleton />}
                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
              />
            ))}
          </BentoGrid>
        )}
      </section>
    </>
  )
}
