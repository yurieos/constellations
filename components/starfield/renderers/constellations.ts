import type { ConstellationInstance, RenderContext } from "../types"
import { CONSTELLATION_HOVER_RADIUS, SCROLL_PARALLAX_STRENGTH } from "../constants"
import { lerp } from "../utils/math"

/**
 * Update and render constellations
 */
export function renderConstellations(
  ctx: CanvasRenderingContext2D,
  constellations: ConstellationInstance[],
  { time, mouse, scrollY, parallaxX, parallaxY }: RenderContext
): void {
  for (const constellation of constellations) {
    // Check hover state
    let isHovered = false
    if (mouse) {
      for (const star of constellation.stars) {
        const scrollOffset = scrollY * constellation.depth * SCROLL_PARALLAX_STRENGTH
        const dx = star.x - parallaxX * 0.5 - mouse.x
        const dy = star.y - parallaxY * 0.5 - scrollOffset - mouse.y
        if (dx * dx + dy * dy < CONSTELLATION_HOVER_RADIUS * CONSTELLATION_HOVER_RADIUS) {
          isHovered = true
          break
        }
      }
    }

    // Update state
    constellation.targetOpacity = isHovered ? 0.6 : constellation.baseOpacity
    constellation.targetGlow = isHovered ? 1 : 0
    constellation.currentOpacity = lerp(constellation.currentOpacity, constellation.targetOpacity, 0.08)
    constellation.currentGlow = lerp(constellation.currentGlow, constellation.targetGlow, 0.08)

    const shimmer = 0.7 + 0.3 * Math.sin(time * 0.0008 + constellation.shimmerOffset)
    const lineOpacity = constellation.currentOpacity * shimmer
    const glowIntensity = constellation.currentGlow
    const scrollOffset = scrollY * constellation.depth * SCROLL_PARALLAX_STRENGTH

    // Draw line glow effect when hovered
    if (glowIntensity > 0.01) {
      ctx.strokeStyle = `rgba(100, 150, 255, ${glowIntensity * 0.15})`
      ctx.lineWidth = 8
      ctx.lineCap = "round"

      for (const [i, j] of constellation.lines) {
        const star1 = constellation.stars[i]
        const star2 = constellation.stars[j]
        if (star1 && star2) {
          ctx.beginPath()
          ctx.moveTo(star1.x - parallaxX * 0.5, star1.y - parallaxY * 0.5 - scrollOffset)
          ctx.lineTo(star2.x - parallaxX * 0.5, star2.y - parallaxY * 0.5 - scrollOffset)
          ctx.stroke()
        }
      }
    }

    // Draw constellation lines
    ctx.strokeStyle = `rgba(180, 200, 255, ${lineOpacity})`
    ctx.lineWidth = 0.8 + glowIntensity * 0.5
    ctx.lineCap = "round"

    for (const [i, j] of constellation.lines) {
      const star1 = constellation.stars[i]
      const star2 = constellation.stars[j]
      if (star1 && star2) {
        ctx.beginPath()
        ctx.moveTo(star1.x - parallaxX * 0.5, star1.y - parallaxY * 0.5 - scrollOffset)
        ctx.lineTo(star2.x - parallaxX * 0.5, star2.y - parallaxY * 0.5 - scrollOffset)
        ctx.stroke()
      }
    }

    // Draw constellation stars
    for (const star of constellation.stars) {
      const starX = star.x - parallaxX * 0.5
      const starY = star.y - parallaxY * 0.5 - scrollOffset
      const starShimmer = 0.8 + 0.2 * Math.sin(time * 0.001 + constellation.shimmerOffset)
      const starSize = 1.8 + glowIntensity * 1.2

      // Star glow
      const glowRadius = 6 + glowIntensity * 10
      const gradient = ctx.createRadialGradient(starX, starY, 0, starX, starY, glowRadius)
      gradient.addColorStop(0, `rgba(150, 180, 255, ${(0.2 + glowIntensity * 0.4) * starShimmer})`)
      gradient.addColorStop(1, "transparent")
      ctx.beginPath()
      ctx.arc(starX, starY, glowRadius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Star body
      ctx.beginPath()
      ctx.arc(starX, starY, starSize, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200, 220, 255, ${(0.6 + glowIntensity * 0.4) * starShimmer})`
      ctx.fill()
    }

    // Draw constellation name when hovered
    if (glowIntensity > 0.3) {
      const centerStar = constellation.stars[Math.floor(constellation.stars.length / 2)]
      ctx.font = "12px sans-serif"
      ctx.fillStyle = `rgba(150, 180, 255, ${glowIntensity * 0.7})`
      ctx.textAlign = "center"
      ctx.fillText(
        constellation.name,
        centerStar.x - parallaxX * 0.5,
        centerStar.y - parallaxY * 0.5 - scrollOffset - 20
      )
    }
  }
}
