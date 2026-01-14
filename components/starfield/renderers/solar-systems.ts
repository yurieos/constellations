import type { SolarSystem, RenderContext } from "../types"
import { SCROLL_PARALLAX_STRENGTH } from "../constants"
import { lerp } from "../utils/math"

/**
 * Render solar systems with planets, moons, and special features
 */
export function renderSolarSystems(
  ctx: CanvasRenderingContext2D,
  solarSystems: SolarSystem[],
  { time, mouse, scrollY, parallaxX, parallaxY }: RenderContext
): void {
  for (const system of solarSystems) {
    const scrollOffset = scrollY * system.depth * SCROLL_PARALLAX_STRENGTH
    const sysX = system.x - parallaxX * 0.3
    const sysY = system.y - parallaxY * 0.3 - scrollOffset

    // Check hover state
    let isHovered = false
    if (mouse) {
      const dx = sysX - mouse.x
      const dy = sysY - mouse.y
      const maxOrbit = system.planets.length > 0
        ? Math.max(...system.planets.map(p => p.orbitRadius))
        : 50
      if (dx * dx + dy * dy < (maxOrbit + 30) * (maxOrbit + 30)) {
        isHovered = true
      }
    }

    system.targetGlow = isHovered ? 1 : 0
    system.currentGlow = lerp(system.currentGlow, system.targetGlow, 0.06)

    const glowIntensity = system.currentGlow

    // Draw orbit paths
    for (const planet of system.planets) {
      ctx.beginPath()
      ctx.arc(sysX, sysY, planet.orbitRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(100, 120, 150, ${0.08 + glowIntensity * 0.12})`
      ctx.lineWidth = 0.5
      ctx.stroke()
    }

    // Draw asteroid belt if present
    if (system.hasAsteroidBelt && system.asteroidBeltRadius && system.asteroidBeltWidth) {
      const beltRadius = system.asteroidBeltRadius
      const beltWidth = system.asteroidBeltWidth
      const numAsteroids = 40

      for (let i = 0; i < numAsteroids; i++) {
        const asteroidAngle = (Math.PI * 2 * i) / numAsteroids + time * 0.00015 + i * 0.1
        const radiusVariation = beltRadius + (Math.sin(i * 3.7) * beltWidth / 2)
        const asteroidX = sysX + Math.cos(asteroidAngle) * radiusVariation
        const asteroidY = sysY + Math.sin(asteroidAngle) * radiusVariation
        const asteroidSize = 0.3 + Math.sin(i * 2.3) * 0.2

        ctx.beginPath()
        ctx.arc(asteroidX, asteroidY, asteroidSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(150, 140, 130, ${0.3 + glowIntensity * 0.2})`
        ctx.fill()
      }
    }

    // Draw binary star companion first (behind main star)
    if (system.hasBinaryStar && system.binaryOrbitRadius && system.binaryOrbitSpeed && system.binaryStarSize) {
      const binaryAngle = time * system.binaryOrbitSpeed + (system.binaryStarOffset || 0)
      const binaryX = sysX + Math.cos(binaryAngle) * system.binaryOrbitRadius
      const binaryY = sysY + Math.sin(binaryAngle) * system.binaryOrbitRadius

      // Binary star glow
      const binaryGlowSize = system.binaryStarSize * (3 + glowIntensity)
      const binaryGlowGradient = ctx.createRadialGradient(binaryX, binaryY, 0, binaryX, binaryY, binaryGlowSize)
      binaryGlowGradient.addColorStop(0, system.binaryStarGlow || "rgba(255, 200, 150, 0.4)")
      binaryGlowGradient.addColorStop(1, "transparent")
      ctx.beginPath()
      ctx.arc(binaryX, binaryY, binaryGlowSize, 0, Math.PI * 2)
      ctx.fillStyle = binaryGlowGradient
      ctx.fill()

      // Binary star body
      const binaryGradient = ctx.createRadialGradient(
        binaryX - system.binaryStarSize * 0.2, binaryY - system.binaryStarSize * 0.2, 0,
        binaryX, binaryY, system.binaryStarSize
      )
      binaryGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)")
      binaryGradient.addColorStop(0.4, system.binaryStarColor || "rgb(255, 200, 150)")
      binaryGradient.addColorStop(1, (system.binaryStarColor || "rgb(255, 200, 150)").replace("rgb", "rgba").replace(")", ", 0.7)"))
      ctx.beginPath()
      ctx.arc(binaryX, binaryY, system.binaryStarSize * (1 + glowIntensity * 0.15), 0, Math.PI * 2)
      ctx.fillStyle = binaryGradient
      ctx.fill()
    }

    // Draw main sun glow (outer)
    const outerGlowSize = system.sunSize * (4 + glowIntensity * 2)
    const outerGradient = ctx.createRadialGradient(sysX, sysY, 0, sysX, sysY, outerGlowSize)
    outerGradient.addColorStop(0, system.sunGlowColor)
    outerGradient.addColorStop(0.4, system.sunGlowColor.replace(/[\d.]+\)$/, `${0.2 + glowIntensity * 0.2})`))
    outerGradient.addColorStop(1, "transparent")
    ctx.beginPath()
    ctx.arc(sysX, sysY, outerGlowSize, 0, Math.PI * 2)
    ctx.fillStyle = outerGradient
    ctx.fill()

    // Draw main sun
    const sunGradient = ctx.createRadialGradient(
      sysX - system.sunSize * 0.3, sysY - system.sunSize * 0.3, 0,
      sysX, sysY, system.sunSize
    )
    sunGradient.addColorStop(0, "rgba(255, 255, 255, 1)")
    sunGradient.addColorStop(0.3, system.sunColor)
    sunGradient.addColorStop(1, system.sunColor.replace("rgb", "rgba").replace(")", ", 0.8)"))
    ctx.beginPath()
    ctx.arc(sysX, sysY, system.sunSize * (1 + glowIntensity * 0.2), 0, Math.PI * 2)
    ctx.fillStyle = sunGradient
    ctx.fill()

    // Draw planets with moons
    for (const planet of system.planets) {
      const angle = time * planet.orbitSpeed + planet.orbitOffset
      const planetX = sysX + Math.cos(angle) * planet.orbitRadius
      const planetY = sysY + Math.sin(angle) * planet.orbitRadius

      // Planet glow
      const planetGlowSize = planet.size * (2 + glowIntensity)
      const planetGlowGradient = ctx.createRadialGradient(
        planetX, planetY, 0,
        planetX, planetY, planetGlowSize
      )
      planetGlowGradient.addColorStop(0, planet.glowColor)
      planetGlowGradient.addColorStop(1, "transparent")
      ctx.beginPath()
      ctx.arc(planetX, planetY, planetGlowSize, 0, Math.PI * 2)
      ctx.fillStyle = planetGlowGradient
      ctx.fill()

      // Draw rings behind planet (bottom half)
      if (planet.hasRing) {
        ctx.save()
        ctx.translate(planetX, planetY)
        ctx.scale(1, planet.ringTilt)

        // Back ring
        ctx.beginPath()
        ctx.arc(0, 0, planet.size * 2.2, Math.PI, Math.PI * 2)
        ctx.strokeStyle = planet.ringColor || `rgba(200, 190, 170, ${0.35 + glowIntensity * 0.15})`
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(0, 0, planet.size * 2.7, Math.PI, Math.PI * 2)
        ctx.strokeStyle = planet.ringColor?.replace("0.4", "0.25") || `rgba(180, 170, 160, ${0.25 + glowIntensity * 0.1})`
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.restore()
      }

      // Planet body
      const planetGradient = ctx.createRadialGradient(
        planetX - planet.size * 0.3, planetY - planet.size * 0.3, 0,
        planetX, planetY, planet.size
      )
      planetGradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
      planetGradient.addColorStop(0.4, planet.color)
      planetGradient.addColorStop(1, planet.color.replace("rgb", "rgba").replace(")", ", 0.6)"))
      ctx.beginPath()
      ctx.arc(planetX, planetY, planet.size, 0, Math.PI * 2)
      ctx.fillStyle = planetGradient
      ctx.fill()

      // Draw rings in front of planet (top half)
      if (planet.hasRing) {
        ctx.save()
        ctx.translate(planetX, planetY)
        ctx.scale(1, planet.ringTilt)

        // Front ring
        ctx.beginPath()
        ctx.arc(0, 0, planet.size * 2.2, 0, Math.PI)
        ctx.strokeStyle = planet.ringColor || `rgba(200, 190, 170, ${0.35 + glowIntensity * 0.15})`
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(0, 0, planet.size * 2.7, 0, Math.PI)
        ctx.strokeStyle = planet.ringColor?.replace("0.4", "0.25") || `rgba(180, 170, 160, ${0.25 + glowIntensity * 0.1})`
        ctx.lineWidth = 1.5
        ctx.stroke()
        ctx.restore()
      }

      // Draw moons
      for (const moon of planet.moons) {
        const moonAngle = time * moon.orbitSpeed + moon.orbitOffset
        const moonX = planetX + Math.cos(moonAngle) * moon.orbitRadius
        const moonY = planetY + Math.sin(moonAngle) * moon.orbitRadius

        // Moon glow
        const moonGlowGradient = ctx.createRadialGradient(
          moonX, moonY, 0,
          moonX, moonY, moon.size * 2
        )
        moonGlowGradient.addColorStop(0, moon.glowColor)
        moonGlowGradient.addColorStop(1, "transparent")
        ctx.beginPath()
        ctx.arc(moonX, moonY, moon.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = moonGlowGradient
        ctx.fill()

        // Moon body
        const moonGradient = ctx.createRadialGradient(
          moonX - moon.size * 0.2, moonY - moon.size * 0.2, 0,
          moonX, moonY, moon.size
        )
        moonGradient.addColorStop(0, "rgba(255, 255, 255, 0.7)")
        moonGradient.addColorStop(0.5, moon.color)
        moonGradient.addColorStop(1, moon.color.replace("rgb", "rgba").replace(")", ", 0.5)"))
        ctx.beginPath()
        ctx.arc(moonX, moonY, moon.size, 0, Math.PI * 2)
        ctx.fillStyle = moonGradient
        ctx.fill()
      }
    }
  }
}
