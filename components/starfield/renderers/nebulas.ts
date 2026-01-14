import type { Nebula, RenderContext } from "../types"

/**
 * Update and render nebulas (background layer)
 */
export function renderNebulas(
  ctx: CanvasRenderingContext2D,
  nebulas: Nebula[],
  { width, height, time, parallaxX, parallaxY, scrollY }: RenderContext
): void {
  for (const nebula of nebulas) {
    // Slow drift
    nebula.x += nebula.driftSpeed.x
    nebula.y += nebula.driftSpeed.y

    // Wrap around
    if (nebula.x < -nebula.radius) nebula.x = width + nebula.radius
    if (nebula.x > width + nebula.radius) nebula.x = -nebula.radius
    if (nebula.y < -nebula.radius) nebula.y = height + nebula.radius
    if (nebula.y > height + nebula.radius) nebula.y = -nebula.radius

    // Pulse opacity
    const pulse = 0.7 + 0.3 * Math.sin(time * nebula.pulseSpeed + nebula.pulseOffset)
    const alpha = nebula.color.a * pulse

    // Very slow parallax for nebulas (far away)
    const nebulaX = nebula.x - parallaxX * 0.1 - scrollY * 0.02
    const nebulaY = nebula.y - parallaxY * 0.1

    const gradient = ctx.createRadialGradient(
      nebulaX, nebulaY, 0,
      nebulaX, nebulaY, nebula.radius
    )
    gradient.addColorStop(0, `rgba(${nebula.color.r}, ${nebula.color.g}, ${nebula.color.b}, ${alpha})`)
    gradient.addColorStop(0.4, `rgba(${nebula.color.r}, ${nebula.color.g}, ${nebula.color.b}, ${alpha * 0.5})`)
    gradient.addColorStop(1, "transparent")

    ctx.beginPath()
    ctx.arc(nebulaX, nebulaY, nebula.radius, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()
  }
}
