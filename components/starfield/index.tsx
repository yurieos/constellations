"use client"

import { useRef } from "react"
import { useTheme } from "next-themes"
import { usePageVisibility } from "./hooks/useVisibility"
import { useStarfield } from "./hooks/useStarfield"

/**
 * Starfield component - renders an animated starfield canvas
 * Features:
 * - Stars with shimmer effects
 * - Constellations with hover interaction
 * - Solar systems with orbiting planets and moons
 * - Nebulas with slow drift
 * - Shooting stars
 * - Mouse trail effect
 * - Click supernova effect
 * - Parallax on mouse move and scroll
 *
 * Performance optimizations:
 * - Pauses animation when tab is not visible
 * - Throttled mouse events using requestAnimationFrame
 * - Modular rendering for better code organization
 * - Object reuse to minimize garbage collection
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const isVisible = usePageVisibility()

  useStarfield({
    canvasRef,
    isVisible,
    isDarkMode: resolvedTheme === "dark",
  })

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      aria-hidden="true"
    />
  )
}
