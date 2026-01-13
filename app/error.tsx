"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="mx-auto max-w-4xl px-6 pt-8 pb-16">
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="none"
          className="size-16 mb-6 text-muted-foreground/40"
          aria-hidden="true"
        >
          <path
            d="M6 8 L16 6 L26 10 M16 6 L14 16 L20 24 L10 26 M14 16 L6 8 M14 16 L26 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
          <circle cx="6" cy="8" r="2.5" fill="currentColor" />
          <circle cx="16" cy="6" r="3" fill="currentColor" />
          <circle cx="26" cy="10" r="2" fill="currentColor" />
          <circle cx="14" cy="16" r="2.5" fill="currentColor" />
          <circle cx="20" cy="24" r="2" fill="currentColor" />
          <circle cx="10" cy="26" r="2.5" fill="currentColor" />
          <circle cx="24" cy="20" r="1" fill="currentColor" opacity="0.6" />
          <circle cx="4" cy="18" r="1" fill="currentColor" opacity="0.6" />
        </svg>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-2">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="cursor-pointer rounded-full px-6 py-2 text-sm font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
