import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <h1 className="text-2xl font-semibold tracking-tight">Constellations</h1>
      <ThemeToggle />
    </header>
  )
}
