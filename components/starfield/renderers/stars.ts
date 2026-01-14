import type { Star, RenderContext } from "../types"
import { HOVER_RADIUS, SCROLL_PARALLAX_STRENGTH } from "../constants"
import { lerp } from "../utils/math"

/**
 * Update star hover state and render stars
 */
export function renderStars(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  { time, mouse, scrollY, parallaxX, parallaxY }: RenderContext
): void {
  for (const star of stars) {
    const shimmer = 0.75 + 0.25 * Math.sin(time * star.shimmerSpeed + star.shimmerOffset)
    const scrollOffset = scrollY * star.depth * SCROLL_PARALLAX_STRENGTH

    // Update hover state
    if (mouse) {
      const starX = star.x - parallaxX * star.depth
      const starY = star.y - parallaxY * star.depth - scrollOffset
      const dx = starX - mouse.x
      const dy = starY - mouse.y
      const distSq = dx * dx + dy * dy
      const hoverRadiusSq = HOVER_RADIUS * HOVER_RADIUS

      if (distSq < hoverRadiusSq) {
        const dist = Math.sqrt(distSq)
        const intensity = 1 - dist / HOVER_RADIUS
        star.targetScale = 1 + intensity * 2
        star.targetGlow = intensity
      } else {
        star.targetScale = 1
        star.targetGlow = 0
      }
    } else {
      star.targetScale = 1
      star.targetGlow = 0
    }

    // Smooth interpolation
    star.currentScale = lerp(star.currentScale, star.targetScale, 0.1)
    star.currentGlow = lerp(star.currentGlow, star.targetGlow, 0.1)

    const scale = star.currentScale
    const glowIntensity = star.currentGlow
    const opacity = star.opacity * shimmer * (1 + glowIntensity * 0.5)

    const starX = star.x - parallaxX * star.depth
    const starY = star.y - parallaxY * star.depth - scrollOffset
    const { r, g, b } = star.color

    // Draw glow effect when hovered
    if (glowIntensity > 0.01) {
      const glowRadius = star.size * scale * 12
      const gradient = ctx.createRadialGradient(starX, starY, 0, starX, starY, glowRadius)
      gradient.addColorStop(0, `rgba(150, 180, 255, ${glowIntensity * 0.4})`)
      gradient.addColorStop(0.5, `rgba(150, 180, 255, ${glowIntensity * 0.1})`)
      gradient.addColorStop(1, "transparent")
      ctx.beginPath()
      ctx.arc(starX, starY, glowRadius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    }

    // Draw star body
    ctx.beginPath()
    ctx.arc(starX, starY, star.size * scale, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
    ctx.fill()

    // Draw shine effect for bright stars
    if (star.hasShine) {
      const shineOpacity = opacity * 0.5
      const shineSize = star.size * scale * 6

      const gradient = ctx.createRadialGradient(starX, starY, 0, starX, starY, shineSize)
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${shineOpacity})`)
      gradient.addColorStop(1, "transparent")

      ctx.beginPath()
      ctx.arc(starX, starY, shineSize, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw cross-shine
      const crossLength = star.size * scale * 8
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${shineOpacity * 0.6})`
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(starX - crossLength, starY)
      ctx.lineTo(starX + crossLength, starY)
      ctx.moveTo(starX, starY - crossLength)
      ctx.lineTo(starX, starY + crossLength)
      ctx.stroke()
    }
  }
}
