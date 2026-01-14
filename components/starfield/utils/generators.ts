import type {
  Star,
  ConstellationInstance,
  SolarSystem,
  Nebula,
  Planet,
  Moon,
} from "../types"
import {
  CONSTELLATION_PATTERNS,
  PLANET_COLORS,
  MOON_COLORS,
  SUN_COLORS,
  NEBULA_COLORS,
  RING_COLORS,
} from "../constants"
import { pickStarColor } from "./math"

/**
 * Generate stars for the starfield
 */
export function generateStars(width: number, height: number): Star[] {
  const starCount = Math.floor((width * height) / 6000)

  return Array.from({ length: starCount }, () => {
    const isBright = Math.random() < 0.08
    const isMedium = !isBright && Math.random() < 0.25

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: isBright
        ? 1.0 + Math.random() * 1.2
        : isMedium
          ? 0.5 + Math.random() * 0.5
          : 0.2 + Math.random() * 0.4,
      opacity: isBright
        ? 0.5 + Math.random() * 0.4
        : isMedium
          ? 0.25 + Math.random() * 0.25
          : 0.1 + Math.random() * 0.2,
      shimmerSpeed: Math.random() * 0.002 + 0.0003,
      shimmerOffset: Math.random() * Math.PI * 2,
      hasShine: isBright && Math.random() < 0.4,
      currentScale: 1,
      targetScale: 1,
      currentGlow: 0,
      targetGlow: 0,
      color: pickStarColor(),
      depth: 0.15 + Math.random() * 0.85,
    }
  })
}

/**
 * Generate nebulas
 */
export function generateNebulas(width: number, height: number): Nebula[] {
  const numNebulas = 2

  return Array.from({ length: numNebulas }, () => {
    const colorSet = NEBULA_COLORS[Math.floor(Math.random() * NEBULA_COLORS.length)]
    const fadedColor = {
      ...colorSet,
      a: colorSet.a * 0.6,
    }

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 350 + Math.random() * 450,
      color: fadedColor,
      driftSpeed: {
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.008,
      },
      pulseSpeed: 0.0002 + Math.random() * 0.0001,
      pulseOffset: Math.random() * Math.PI * 2,
    }
  })
}

/**
 * Generate constellations at screen edges
 */
export function generateConstellations(width: number, height: number): ConstellationInstance[] {
  const constellations: ConstellationInstance[] = []

  // Define edge zones
  const edgeZones = [
    { x: 0, y: 0, anchor: "top-left" },
    { x: width, y: 0, anchor: "top-right" },
    { x: 0, y: height, anchor: "bottom-left" },
    { x: width, y: height, anchor: "bottom-right" },
    { x: 0, y: height * 0.5, anchor: "left" },
    { x: width, y: height * 0.5, anchor: "right" },
  ]

  const shuffled = edgeZones.sort(() => Math.random() - 0.5)
  const numConstellations = Math.random() < 0.5 ? 1 : 2
  const selectedZones = shuffled.slice(0, numConstellations)
  const usedPatterns = new Set<number>()

  for (const zone of selectedZones) {
    let patternIndex: number
    do {
      patternIndex = Math.floor(Math.random() * CONSTELLATION_PATTERNS.length)
    } while (usedPatterns.has(patternIndex) && usedPatterns.size < CONSTELLATION_PATTERNS.length)
    usedPatterns.add(patternIndex)

    const pattern = CONSTELLATION_PATTERNS[patternIndex]
    const scale = 1.8 + Math.random() * 1.5

    const maxX = Math.max(...pattern.stars.map(s => s.x)) * scale
    const maxY = Math.max(...pattern.stars.map(s => s.y)) * scale

    let offsetX: number, offsetY: number
    const margin = 60
    const randomOffset = 80

    switch (zone.anchor) {
      case "top-left":
        offsetX = margin + Math.random() * randomOffset
        offsetY = margin + Math.random() * randomOffset
        break
      case "top-right":
        offsetX = width - maxX - margin - Math.random() * randomOffset
        offsetY = margin + Math.random() * randomOffset
        break
      case "bottom-left":
        offsetX = margin + Math.random() * randomOffset
        offsetY = height - maxY - margin - Math.random() * randomOffset
        break
      case "bottom-right":
        offsetX = width - maxX - margin - Math.random() * randomOffset
        offsetY = height - maxY - margin - Math.random() * randomOffset
        break
      case "left":
        offsetX = margin + Math.random() * randomOffset
        offsetY = (height - maxY) * 0.5 + (Math.random() - 0.5) * 150
        break
      case "right":
        offsetX = width - maxX - margin - Math.random() * randomOffset
        offsetY = (height - maxY) * 0.5 + (Math.random() - 0.5) * 150
        break
      default:
        offsetX = margin
        offsetY = margin
    }

    const stars = pattern.stars.map(s => ({
      x: s.x * scale + offsetX,
      y: s.y * scale + offsetY,
    }))

    constellations.push({
      stars,
      lines: pattern.lines,
      baseOpacity: 0.1 + Math.random() * 0.08,
      shimmerOffset: Math.random() * Math.PI * 2,
      currentOpacity: 0.1,
      targetOpacity: 0.1,
      currentGlow: 0,
      targetGlow: 0,
      name: pattern.name,
      depth: 0.3 + Math.random() * 0.2,
    })
  }

  return constellations
}

/**
 * Generate solar systems
 */
export function generateSolarSystems(width: number, height: number): SolarSystem[] {
  const solarSystems: SolarSystem[] = []

  const edgeMargin = 100
  const edgeZones = [
    { x: edgeMargin, y: edgeMargin },
    { x: width - edgeMargin, y: edgeMargin },
    { x: edgeMargin, y: height - edgeMargin },
    { x: width - edgeMargin, y: height - edgeMargin },
  ]

  const shuffled = edgeZones.sort(() => Math.random() - 0.5)
  const numSystems = Math.random() < 0.4 ? 1 : 2
  const selectedZones = shuffled.slice(0, numSystems)

  for (const zone of selectedZones) {
    const x = zone.x + (Math.random() - 0.5) * 80
    const y = zone.y + (Math.random() - 0.5) * 80

    const mainStarColors = SUN_COLORS.filter(c => c.type !== "companion")
    const sunColorSet = mainStarColors[Math.floor(Math.random() * mainStarColors.length)]

    const hasBinaryStar = Math.random() < 0.15
    const hasAsteroidBelt = Math.random() < 0.25

    const numPlanets = 2 + Math.floor(Math.random() * 3)
    const planets: Planet[] = []

    const asteroidBeltPosition = hasAsteroidBelt ? 2 + Math.floor(Math.random() * 2) : -1
    let orbitOffset = 0

    for (let j = 0; j < numPlanets; j++) {
      if (j === asteroidBeltPosition) {
        orbitOffset += 15
      }

      const planetColor = PLANET_COLORS[Math.floor(Math.random() * PLANET_COLORS.length)]
      const planetSize = planetColor.type === "gas" || planetColor.type === "ice"
        ? 3 + Math.random() * 4
        : 1.5 + Math.random() * 2.5

      const moons: Moon[] = []
      const moonChance = planetColor.type === "gas" ? 0.7 : planetColor.type === "ice" ? 0.5 : 0.2
      if (Math.random() < moonChance) {
        const numMoons = planetColor.type === "gas"
          ? 1 + Math.floor(Math.random() * 3)
          : Math.random() < 0.5 ? 1 : 0

        for (let m = 0; m < numMoons; m++) {
          const moonColor = MOON_COLORS[Math.floor(Math.random() * MOON_COLORS.length)]
          moons.push({
            orbitRadius: planetSize * 2 + m * 3 + Math.random() * 2,
            orbitSpeed: (0.003 + Math.random() * 0.004) * (m % 2 === 0 ? 1 : -1),
            orbitOffset: Math.random() * Math.PI * 2,
            size: 0.5 + Math.random() * 0.8,
            color: moonColor.color,
            glowColor: moonColor.glow,
          })
        }
      }

      planets.push({
        orbitRadius: 28 + j * 16 + orbitOffset + Math.random() * 8,
        orbitSpeed: (0.0002 + Math.random() * 0.0004) * (j % 2 === 0 ? 1 : -1),
        orbitOffset: Math.random() * Math.PI * 2,
        size: planetSize,
        color: planetColor.color,
        glowColor: planetColor.glow,
        hasRing: (planetColor.type === "gas" || planetColor.type === "ice") && Math.random() < 0.35,
        ringTilt: 0.25 + Math.random() * 0.45,
        ringColor: RING_COLORS[Math.floor(Math.random() * RING_COLORS.length)],
        moons,
        type: planetColor.type,
      })
    }

    let binaryConfig: Partial<SolarSystem> = {
      hasBinaryStar: false,
      hasAsteroidBelt: false,
    }

    if (hasBinaryStar) {
      const companionColors = SUN_COLORS.filter(c => c.type === "companion" || c.type === "red")
      const binaryColor = companionColors[Math.floor(Math.random() * companionColors.length)]
      binaryConfig = {
        hasBinaryStar: true,
        binaryStarOffset: Math.random() * Math.PI * 2,
        binaryStarSize: 3 + Math.random() * 3,
        binaryStarColor: binaryColor.color,
        binaryStarGlow: binaryColor.glow,
        binaryOrbitRadius: 12 + Math.random() * 8,
        binaryOrbitSpeed: 0.0004 + Math.random() * 0.0003,
      }
    }

    if (hasAsteroidBelt) {
      const beltRadius = 28 + asteroidBeltPosition * 16 + 8
      binaryConfig.hasAsteroidBelt = true
      binaryConfig.asteroidBeltRadius = beltRadius
      binaryConfig.asteroidBeltWidth = 8 + Math.random() * 6
    }

    solarSystems.push({
      x,
      y,
      sunSize: 5 + Math.random() * 5,
      sunColor: sunColorSet.color,
      sunGlowColor: sunColorSet.glow,
      planets,
      currentGlow: 0,
      targetGlow: 0,
      depth: 0.5,
      ...binaryConfig,
    } as SolarSystem)
  }

  return solarSystems
}

/**
 * Create a shooting star
 */
export function createShootingStar(width: number, height: number) {
  const startEdge = Math.random()
  let x: number, y: number, angle: number

  if (startEdge < 0.6) {
    x = Math.random() * width
    y = -10
    angle = Math.PI / 4 + Math.random() * Math.PI / 4
  } else {
    x = width + 10
    y = Math.random() * height * 0.5
    angle = Math.PI * 0.6 + Math.random() * Math.PI / 4
  }

  return {
    x,
    y,
    angle,
    speed: 8 + Math.random() * 6,
    length: 80 + Math.random() * 60,
    opacity: 0.7 + Math.random() * 0.3,
    life: 0,
    maxLife: 60 + Math.random() * 40,
  }
}

/**
 * Create supernova particles
 */
export function createSupernova(x: number, y: number) {
  const particleCount = 30 + Math.floor(Math.random() * 20)
  const particles = []

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5
    const speed = 2 + Math.random() * 4
    const colorChoice = Math.random()
    let color: { r: number; g: number; b: number }
    if (colorChoice < 0.4) {
      color = { r: 255, g: 255, b: 255 }
    } else if (colorChoice < 0.7) {
      color = { r: 200, g: 220, b: 255 }
    } else {
      color = { r: 255, g: 200, b: 150 }
    }
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: 1 + Math.random() * 3,
      color,
    })
  }

  return {
    x,
    y,
    age: 0,
    maxAge: 90,
    particles,
  }
}
