import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="flex items-center justify-between pb-8 border-b border-border">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="none"
          className="size-7"
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
        <h1 className="text-2xl font-bold tracking-tight">Constellations</h1>
      </div>
      <ThemeToggle />
    </header>
  )
}
