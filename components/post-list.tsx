"use client"

import { useCallback, useMemo, useState } from "react"
import { Search, X } from "lucide-react"
import type { Post } from "@/types/blog"
import { cn } from "@/lib/utils"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group"

type PostListProps = {
  posts: Post[]
  allTags: string[]
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-muted to-muted/50" />
)

export function PostList({ posts, allTags }: PostListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return posts.filter((post) => {
      // Tag filter
      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true

      // Search filter (case-insensitive on title and excerpt)
      const matchesSearch =
        query === "" ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)

      return matchesTag && matchesSearch
    })
  }, [posts, searchQuery, selectedTag])

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    []
  )

  const formatDate = useCallback(
    (dateString: string) => {
      // Append T12:00:00 to avoid timezone rollover issues
      // "2026-01-11" parsed as UTC midnight becomes Jan 10 in western timezones
      return dateFormatter.format(new Date(`${dateString}T12:00:00`))
    },
    [dateFormatter]
  )

  return (
    <>
      {/* Search and Tag Filter */}
      <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
        {/* Search Bar */}
        <InputGroup className="w-full sm:flex-1 sm:min-w-48 h-12 rounded-full border-border bg-background/50 backdrop-blur-sm">
          <InputGroupAddon>
            <Search className="size-4 text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search posts"
          />
          {searchQuery && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                variant="ghost"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X className="size-4" />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>

        {/* Tag Filter */}
        <nav aria-label="Filter by category" className="w-full sm:w-auto overflow-x-auto">
          <div className="inline-flex items-center gap-2 p-1.5 rounded-full border border-border bg-background/50 backdrop-blur-sm">
          <button
            onClick={() => setSelectedTag(null)}
            className={cn(
              "cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              selectedTag === null
                ? "bg-secondary text-foreground"
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
                "cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                selectedTag === tag
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              {tag}
            </button>
          ))}
          </div>
        </nav>
      </div>

      {/* Posts */}
      <section className="mt-10">
        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">
              {searchQuery
                ? `No posts found for "${searchQuery}".`
                : "No posts found."}
            </p>
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
