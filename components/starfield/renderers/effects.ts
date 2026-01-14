import type { ShootingStar, Supernova, TrailPoint } from "../types"

/**
 * Update and render shooting stars
 * Returns filtered array with alive shooting stars
 */
export function renderShootingStars(
  ctx: CanvasRenderingContext2D,
  shootingStars: ShootingStar[]
): ShootingStar[] {
  return shootingStars.filter((star) => {
    star.life++
    star.x += Math.cos(star.angle) * star.speed
    star.y += Math.sin(star.angle) * star.speed

    let alpha = star.opacity
    if (star.life < 10) {
      alpha *= star.life / 10
    } else if (star.life > star.maxLife - 20) {
      alpha *= (star.maxLife - star.life) / 20
    }

    if (star.life >= star.maxLife || alpha <= 0) {
      return false
    }

    const gradient = ctx.createLinearGradient(
      star.x, star.y,
      star.x - Math.cos(star.angle) * star.length,
      star.y - Math.sin(star.angle) * star.length
    )
    gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`)
    gradient.addColorStop(0.3, `rgba(200, 220, 255, ${alpha * 0.5})`)
    gradient.addColorStop(1, "transparent")

    ctx.strokeStyle = gradient
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.beginPath()
    ctx.moveTo(star.x, star.y)
    ctx.lineTo(
      star.x - Math.cos(star.angle) * star.length,
      star.y - Math.sin(star.angle) * star.length
    )
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(star.x, star.y, 2, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
    ctx.fill()

    return true
  })
}

/**
 * Update and render mouse trail (comet effect)
 * Returns filtered array with alive trail points
 */
export function renderTrail(
  ctx: CanvasRenderingContext2D,
  trail: TrailPoint[],
  time: number
): TrailPoint[] {
  const maxAge = 40

  for (let i = 0; i < trail.length; i++) {
    const point = trail[i]
    point.age++

    if (point.age > maxAge) continue

    const alpha = 1 - point.age / maxAge
    const size = point.size * alpha

    // Sparkle effect
    const sparkle = 0.7 + 0.3 * Math.sin(time * 0.01 + i)

    const gradient = ctx.createRadialGradient(
      point.x, point.y, 0,
      point.x, point.y, size * 3
    )
    gradient.addColorStop(0, `rgba(200, 220, 255, ${alpha * 0.6 * sparkle})`)
    gradient.addColorStop(0.5, `rgba(150, 180, 255, ${alpha * 0.2 * sparkle})`)
    gradient.addColorStop(1, "transparent")

    ctx.beginPath()
    ctx.arc(point.x, point.y, size * 3, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()

    ctx.beginPath()
    ctx.arc(point.x, point.y, size * 0.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * sparkle})`
    ctx.fill()
  }

  return trail.filter(p => p.age <= maxAge)
}

/**
 * Update and render supernovas
 * Returns filtered array with alive supernovas
 */
export function renderSupernovas(
  ctx: CanvasRenderingContext2D,
  supernovas: Supernova[]
): Supernova[] {
  return supernovas.filter((supernova) => {
    supernova.age++

    if (supernova.age > supernova.maxAge) {
      return false
    }

    const progress = supernova.age / supernova.maxAge
    const alpha = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8

    // Central flash (only at start)
    if (supernova.age < 15) {
      const flashAlpha = (1 - supernova.age / 15) * 0.8
      const flashRadius = 20 + supernova.age * 3

      const flashGradient = ctx.createRadialGradient(
        supernova.x, supernova.y, 0,
        supernova.x, supernova.y, flashRadius
      )
      flashGradient.addColorStop(0, `rgba(255, 255, 255, ${flashAlpha})`)
      flashGradient.addColorStop(0.3, `rgba(200, 220, 255, ${flashAlpha * 0.5})`)
      flashGradient.addColorStop(1, "transparent")

      ctx.beginPath()
      ctx.arc(supernova.x, supernova.y, flashRadius, 0, Math.PI * 2)
      ctx.fillStyle = flashGradient
      ctx.fill()
    }

    // Expanding ring
    if (supernova.age > 5 && supernova.age < 50) {
      const ringProgress = (supernova.age - 5) / 45
      const ringRadius = 10 + ringProgress * 100
      const ringAlpha = (1 - ringProgress) * 0.4

      ctx.beginPath()
      ctx.arc(supernova.x, supernova.y, ringRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(200, 220, 255, ${ringAlpha})`
      ctx.lineWidth = 2 * (1 - ringProgress)
      ctx.stroke()
    }

    // Draw particles
    for (const particle of supernova.particles) {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.vx *= 0.98 // Slow down
      particle.vy *= 0.98

      const particleAlpha = alpha * 0.8
      const { r, g, b } = particle.color

      const glowGradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      )
      glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${particleAlpha})`)
      glowGradient.addColorStop(1, "transparent")

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
      ctx.fillStyle = glowGradient
      ctx.fill()

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${particleAlpha})`
      ctx.fill()
    }

    return true
  })
}
