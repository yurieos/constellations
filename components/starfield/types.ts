// Star color definition
export type StarColor = {
  r: number
  g: number
  b: number
}

export type StarColorWeight = {
  color: StarColor
  weight: number
}

// Individual star
export type Star = {
  x: number
  y: number
  size: number
  opacity: number
  shimmerSpeed: number
  shimmerOffset: number
  hasShine: boolean
  currentScale: number
  targetScale: number
  currentGlow: number
  targetGlow: number
  color: StarColor
  depth: number // For scroll parallax (0.2 = far/slow, 1.0 = close/fast)
}

// Constellation
export type ConstellationPattern = {
  name: string
  stars: { x: number; y: number }[]
  lines: [number, number][]
}

export type ConstellationInstance = {
  stars: { x: number; y: number }[]
  lines: [number, number][]
  baseOpacity: number
  shimmerOffset: number
  currentOpacity: number
  targetOpacity: number
  currentGlow: number
  targetGlow: number
  name: string
  depth: number
}

// Shooting star
export type ShootingStar = {
  x: number
  y: number
  angle: number
  speed: number
  length: number
  opacity: number
  life: number
  maxLife: number
}

// Moon
export type Moon = {
  orbitRadius: number
  orbitSpeed: number
  orbitOffset: number
  size: number
  color: string
  glowColor: string
}

// Planet
export type Planet = {
  orbitRadius: number
  orbitSpeed: number
  orbitOffset: number
  size: number
  color: string
  glowColor: string
  hasRing: boolean
  ringTilt: number
  ringColor?: string
  moons: Moon[]
  type: string
}

// Solar System
export type SolarSystem = {
  x: number
  y: number
  sunSize: number
  sunColor: string
  sunGlowColor: string
  planets: Planet[]
  currentGlow: number
  targetGlow: number
  depth: number
  // Binary star system
  hasBinaryStar: boolean
  binaryStarOffset?: number
  binaryStarSize?: number
  binaryStarColor?: string
  binaryStarGlow?: string
  binaryOrbitRadius?: number
  binaryOrbitSpeed?: number
  // Asteroid belt
  hasAsteroidBelt: boolean
  asteroidBeltRadius?: number
  asteroidBeltWidth?: number
}

// Nebula
export type Nebula = {
  x: number
  y: number
  radius: number
  color: { r: number; g: number; b: number; a: number }
  driftSpeed: { x: number; y: number }
  pulseSpeed: number
  pulseOffset: number
}

// Trail point (for comet trail effect)
export type TrailPoint = {
  x: number
  y: number
  age: number
  size: number
}

// Supernova particle
export type SupernovaParticle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: StarColor
}

// Supernova
export type Supernova = {
  x: number
  y: number
  age: number
  maxAge: number
  particles: SupernovaParticle[]
}

// Color palette types
export type PlanetColorDef = {
  color: string
  glow: string
  type: string
}

export type MoonColorDef = {
  color: string
  glow: string
}

export type SunColorDef = {
  color: string
  glow: string
  type: string
}

export type NebulaColorDef = {
  r: number
  g: number
  b: number
  a: number
}

// Animation state refs
export type StarfieldRefs = {
  stars: Star[]
  constellations: ConstellationInstance[]
  solarSystems: SolarSystem[]
  shootingStars: ShootingStar[]
  nebulas: Nebula[]
  trail: TrailPoint[]
  supernovas: Supernova[]
  mouse: { x: number; y: number } | null
  scroll: number
  lastShootingStar: number
  lastMousePos: { x: number; y: number } | null
}

// Render context
export type RenderContext = {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  time: number
  mouse: { x: number; y: number } | null
  scrollY: number
  parallaxX: number
  parallaxY: number
}
