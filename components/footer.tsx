export function Footer() {
  return (
    <footer className="mt-20 pt-8 border-t border-border/10">
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground/60 italic">
          Exploring ideas across the universe of knowledge
        </p>
        <p className="text-xs tracking-wide text-muted-foreground/40">
          © {new Date().getFullYear()} Constellations
        </p>
      </div>
    </footer>
  )
}
