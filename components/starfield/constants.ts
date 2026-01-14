import type {
  StarColorWeight,
  ConstellationPattern,
  PlanetColorDef,
  MoonColorDef,
  SunColorDef,
  NebulaColorDef,
} from "./types"

// Star colors based on stellar classification
export const STAR_COLORS: StarColorWeight[] = [
  { color: { r: 200, g: 220, b: 255 }, weight: 0.15 }, // Blue-white (hot)
  { color: { r: 255, g: 255, b: 220 }, weight: 0.50 }, // Yellow (sun-like)
  { color: { r: 255, g: 220, b: 180 }, weight: 0.25 }, // Orange
  { color: { r: 255, g: 180, b: 150 }, weight: 0.10 }, // Red dwarf
]

// Constellation patterns - All 12 Zodiac signs plus classic constellations
export const CONSTELLATION_PATTERNS: ConstellationPattern[] = [
  // === ZODIAC CONSTELLATIONS ===
  {
    name: "Aries ♈",
    stars: [
      { x: 0, y: 30 },
      { x: 25, y: 15 },
      { x: 50, y: 0 },
      { x: 75, y: 10 },
    ],
    lines: [[0, 1], [1, 2], [2, 3]],
  },
  {
    name: "Taurus ♉",
    stars: [
      { x: 0, y: 40 },
      { x: 20, y: 35 },
      { x: 40, y: 25 },
      { x: 60, y: 20 },
      { x: 80, y: 0 },
      { x: 80, y: 40 },
      { x: 55, y: 50 },
      { x: 35, y: 55 },
      { x: 15, y: 60 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [2, 6], [6, 7], [7, 8]],
  },
  {
    name: "Gemini ♊",
    stars: [
      { x: 20, y: 0 },
      { x: 60, y: 0 },
      { x: 15, y: 25 },
      { x: 65, y: 25 },
      { x: 10, y: 50 },
      { x: 70, y: 50 },
      { x: 0, y: 80 },
      { x: 80, y: 80 },
      { x: 40, y: 40 },
    ],
    lines: [[0, 2], [2, 4], [4, 6], [1, 3], [3, 5], [5, 7], [2, 8], [8, 3], [4, 5]],
  },
  {
    name: "Cancer ♋",
    stars: [
      { x: 40, y: 0 },
      { x: 20, y: 30 },
      { x: 60, y: 30 },
      { x: 0, y: 50 },
      { x: 80, y: 50 },
      { x: 40, y: 70 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [1, 5], [2, 5]],
  },
  {
    name: "Leo ♌",
    stars: [
      { x: 0, y: 30 },
      { x: 20, y: 0 },
      { x: 40, y: 10 },
      { x: 55, y: 25 },
      { x: 75, y: 35 },
      { x: 90, y: 50 },
      { x: 70, y: 60 },
      { x: 50, y: 55 },
      { x: 100, y: 70 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 4], [6, 7], [5, 8]],
  },
  {
    name: "Virgo ♍",
    stars: [
      { x: 50, y: 0 },
      { x: 30, y: 20 },
      { x: 70, y: 20 },
      { x: 10, y: 45 },
      { x: 50, y: 40 },
      { x: 90, y: 45 },
      { x: 0, y: 70 },
      { x: 40, y: 65 },
      { x: 70, y: 80 },
      { x: 100, y: 75 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 7], [7, 8], [5, 9]],
  },
  {
    name: "Libra ♎",
    stars: [
      { x: 50, y: 0 },
      { x: 20, y: 30 },
      { x: 80, y: 30 },
      { x: 0, y: 60 },
      { x: 40, y: 55 },
      { x: 60, y: 55 },
      { x: 100, y: 60 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [4, 5]],
  },
  {
    name: "Scorpio ♏",
    stars: [
      { x: 0, y: 20 },
      { x: 15, y: 30 },
      { x: 30, y: 35 },
      { x: 45, y: 40 },
      { x: 60, y: 50 },
      { x: 75, y: 65 },
      { x: 90, y: 75 },
      { x: 100, y: 60 },
      { x: 105, y: 80 },
      { x: 20, y: 10 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [6, 8], [0, 9]],
  },
  {
    name: "Sagittarius ♐",
    stars: [
      { x: 60, y: 0 },
      { x: 40, y: 20 },
      { x: 80, y: 20 },
      { x: 20, y: 40 },
      { x: 60, y: 35 },
      { x: 100, y: 40 },
      { x: 0, y: 60 },
      { x: 40, y: 55 },
      { x: 80, y: 60 },
      { x: 60, y: 80 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [3, 7], [4, 7], [4, 8], [7, 9], [8, 9]],
  },
  {
    name: "Capricorn ♑",
    stars: [
      { x: 20, y: 0 },
      { x: 0, y: 25 },
      { x: 40, y: 20 },
      { x: 60, y: 30 },
      { x: 80, y: 45 },
      { x: 100, y: 55 },
      { x: 90, y: 75 },
      { x: 70, y: 80 },
    ],
    lines: [[0, 1], [0, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 4]],
  },
  {
    name: "Aquarius ♒",
    stars: [
      { x: 30, y: 0 },
      { x: 10, y: 25 },
      { x: 50, y: 20 },
      { x: 70, y: 15 },
      { x: 0, y: 50 },
      { x: 30, y: 45 },
      { x: 60, y: 50 },
      { x: 90, y: 45 },
      { x: 40, y: 75 },
      { x: 70, y: 80 },
      { x: 100, y: 70 },
    ],
    lines: [[0, 1], [0, 2], [2, 3], [1, 4], [1, 5], [2, 5], [2, 6], [3, 7], [5, 8], [6, 9], [7, 10]],
  },
  {
    name: "Pisces ♓",
    stars: [
      { x: 0, y: 30 },
      { x: 20, y: 20 },
      { x: 40, y: 10 },
      { x: 60, y: 0 },
      { x: 50, y: 40 },
      { x: 70, y: 50 },
      { x: 90, y: 60 },
      { x: 100, y: 80 },
      { x: 80, y: 75 },
      { x: 30, y: 50 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [5, 6], [6, 7], [7, 8], [4, 9], [9, 0]],
  },
  // === CLASSIC CONSTELLATIONS ===
  {
    name: "Big Dipper",
    stars: [
      { x: 0, y: 0 },
      { x: 25, y: 5 },
      { x: 50, y: 0 },
      { x: 75, y: 10 },
      { x: 95, y: 30 },
      { x: 115, y: 55 },
      { x: 90, y: 60 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
  },
  {
    name: "Orion",
    stars: [
      { x: 20, y: 0 },
      { x: 60, y: 5 },
      { x: 0, y: 40 },
      { x: 25, y: 50 },
      { x: 40, y: 50 },
      { x: 55, y: 50 },
      { x: 80, y: 40 },
      { x: 15, y: 90 },
      { x: 65, y: 95 },
    ],
    lines: [[0, 2], [0, 3], [1, 6], [1, 5], [2, 3], [3, 4], [4, 5], [5, 6], [3, 7], [5, 8]],
  },
  {
    name: "Cassiopeia",
    stars: [
      { x: 0, y: 20 },
      { x: 25, y: 0 },
      { x: 50, y: 15 },
      { x: 75, y: 0 },
      { x: 100, y: 25 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  {
    name: "Cygnus",
    stars: [
      { x: 50, y: 0 },
      { x: 50, y: 30 },
      { x: 25, y: 45 },
      { x: 75, y: 45 },
      { x: 50, y: 60 },
      { x: 50, y: 90 },
    ],
    lines: [[0, 1], [1, 4], [4, 5], [2, 1], [1, 3]],
  },
  {
    name: "Lyra",
    stars: [
      { x: 30, y: 0 },
      { x: 0, y: 40 },
      { x: 20, y: 50 },
      { x: 40, y: 50 },
      { x: 60, y: 40 },
    ],
    lines: [[0, 1], [0, 4], [1, 2], [2, 3], [3, 4]],
  },
  {
    name: "Draco",
    stars: [
      { x: 0, y: 0 },
      { x: 20, y: 15 },
      { x: 40, y: 10 },
      { x: 55, y: 25 },
      { x: 70, y: 40 },
      { x: 60, y: 60 },
      { x: 75, y: 75 },
      { x: 95, y: 80 },
      { x: 110, y: 65 },
      { x: 100, y: 50 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
  },
  {
    name: "Ursa Minor",
    stars: [
      { x: 50, y: 0 },
      { x: 45, y: 20 },
      { x: 55, y: 40 },
      { x: 40, y: 55 },
      { x: 60, y: 70 },
      { x: 30, y: 80 },
      { x: 70, y: 85 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 5], [2, 4], [4, 6]],
  },
  {
    name: "Pegasus",
    stars: [
      { x: 0, y: 0 },
      { x: 60, y: 0 },
      { x: 60, y: 60 },
      { x: 0, y: 60 },
      { x: 80, y: 30 },
      { x: 100, y: 50 },
      { x: -20, y: 80 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0], [1, 4], [4, 5], [3, 6]],
  },
  {
    name: "Andromeda",
    stars: [
      { x: 0, y: 40 },
      { x: 25, y: 35 },
      { x: 50, y: 25 },
      { x: 75, y: 15 },
      { x: 100, y: 0 },
      { x: 60, y: 50 },
      { x: 70, y: 70 },
      { x: 35, y: 55 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [1, 7]],
  },
  {
    name: "Perseus",
    stars: [
      { x: 40, y: 0 },
      { x: 30, y: 20 },
      { x: 50, y: 35 },
      { x: 20, y: 50 },
      { x: 60, y: 55 },
      { x: 10, y: 75 },
      { x: 70, y: 80 },
      { x: 0, y: 90 },
    ],
    lines: [[0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7]],
  },
  {
    name: "Hercules",
    stars: [
      { x: 40, y: 0 },
      { x: 20, y: 25 },
      { x: 60, y: 25 },
      { x: 30, y: 50 },
      { x: 50, y: 50 },
      { x: 10, y: 75 },
      { x: 40, y: 80 },
      { x: 70, y: 75 },
      { x: 0, y: 100 },
      { x: 80, y: 100 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 7], [5, 6], [6, 7], [5, 8], [7, 9]],
  },
  {
    name: "Corona Borealis",
    stars: [
      { x: 0, y: 30 },
      { x: 20, y: 10 },
      { x: 45, y: 0 },
      { x: 70, y: 10 },
      { x: 90, y: 30 },
      { x: 80, y: 50 },
      { x: 10, y: 50 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6]],
  },
  {
    name: "Boötes",
    stars: [
      { x: 40, y: 0 },
      { x: 20, y: 30 },
      { x: 60, y: 30 },
      { x: 10, y: 55 },
      { x: 70, y: 55 },
      { x: 40, y: 75 },
      { x: 0, y: 90 },
      { x: 80, y: 90 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [3, 6], [4, 7]],
  },
  {
    name: "Canis Major",
    stars: [
      { x: 40, y: 0 },
      { x: 20, y: 25 },
      { x: 60, y: 30 },
      { x: 0, y: 50 },
      { x: 45, y: 55 },
      { x: 80, y: 60 },
      { x: 30, y: 80 },
      { x: 70, y: 85 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [4, 6], [4, 7]],
  },
]

// Expanded planet color palette with realistic variations
export const PLANET_COLORS: PlanetColorDef[] = [
  // Rocky planets
  { color: "rgb(180, 120, 90)", glow: "rgba(180, 120, 90, 0.3)", type: "rocky" },   // Mars-like (rust)
  { color: "rgb(140, 130, 120)", glow: "rgba(140, 130, 120, 0.3)", type: "rocky" }, // Mercury-like (gray)
  { color: "rgb(200, 160, 130)", glow: "rgba(200, 160, 130, 0.3)", type: "rocky" }, // Desert planet
  { color: "rgb(100, 90, 80)", glow: "rgba(100, 90, 80, 0.3)", type: "rocky" },     // Dark rocky
  // Earth-like
  { color: "rgb(80, 130, 180)", glow: "rgba(80, 130, 180, 0.4)", type: "terrestrial" },   // Earth-like (blue)
  { color: "rgb(70, 150, 130)", glow: "rgba(70, 150, 130, 0.3)", type: "terrestrial" },   // Ocean world (teal)
  { color: "rgb(90, 160, 90)", glow: "rgba(90, 160, 90, 0.3)", type: "terrestrial" },     // Forest world
  // Gas giants
  { color: "rgb(200, 180, 140)", glow: "rgba(200, 180, 140, 0.3)", type: "gas" },   // Saturn-like (tan)
  { color: "rgb(220, 200, 170)", glow: "rgba(220, 200, 170, 0.3)", type: "gas" },   // Jupiter-like (cream)
  { color: "rgb(200, 150, 100)", glow: "rgba(200, 150, 100, 0.3)", type: "gas" },   // Orange gas giant
  { color: "rgb(180, 160, 200)", glow: "rgba(180, 160, 200, 0.3)", type: "gas" },   // Purple gas giant
  // Ice giants
  { color: "rgb(100, 150, 200)", glow: "rgba(100, 150, 200, 0.3)", type: "ice" },   // Neptune-like (blue)
  { color: "rgb(150, 200, 220)", glow: "rgba(150, 200, 220, 0.3)", type: "ice" },   // Uranus-like (cyan)
  { color: "rgb(180, 220, 230)", glow: "rgba(180, 220, 230, 0.3)", type: "ice" },   // Ice world
  // Exotic
  { color: "rgb(220, 100, 100)", glow: "rgba(220, 100, 100, 0.4)", type: "lava" },  // Lava world
  { color: "rgb(255, 200, 100)", glow: "rgba(255, 200, 100, 0.4)", type: "lava" },  // Molten world
  { color: "rgb(60, 60, 80)", glow: "rgba(100, 100, 150, 0.3)", type: "dark" },     // Dark planet
  { color: "rgb(200, 180, 220)", glow: "rgba(200, 180, 220, 0.3)", type: "exotic" }, // Lavender world
]

// Moon colors
export const MOON_COLORS: MoonColorDef[] = [
  { color: "rgb(180, 180, 180)", glow: "rgba(180, 180, 180, 0.2)" }, // Gray moon
  { color: "rgb(200, 190, 170)", glow: "rgba(200, 190, 170, 0.2)" }, // Tan moon
  { color: "rgb(160, 160, 170)", glow: "rgba(160, 160, 170, 0.2)" }, // Blue-gray moon
  { color: "rgb(220, 200, 180)", glow: "rgba(220, 200, 180, 0.2)" }, // Cream moon
  { color: "rgb(200, 150, 120)", glow: "rgba(200, 150, 120, 0.2)" }, // Orange moon (Io-like)
  { color: "rgb(240, 230, 200)", glow: "rgba(240, 230, 200, 0.2)" }, // Europa-like (ice)
]

// Expanded sun/star colors with more variety
export const SUN_COLORS: SunColorDef[] = [
  // Main sequence stars
  { color: "rgb(255, 220, 150)", glow: "rgba(255, 200, 100, 0.6)", type: "yellow" },    // Yellow sun (G-type)
  { color: "rgb(255, 240, 220)", glow: "rgba(255, 240, 200, 0.5)", type: "white" },     // White star (F-type)
  { color: "rgb(255, 180, 120)", glow: "rgba(255, 150, 80, 0.6)", type: "orange" },     // Orange star (K-type)
  { color: "rgb(200, 220, 255)", glow: "rgba(180, 200, 255, 0.5)", type: "blue" },      // Blue-white star (A-type)
  { color: "rgb(170, 200, 255)", glow: "rgba(150, 180, 255, 0.5)", type: "blue" },      // Blue star (B-type)
  // Giants and special
  { color: "rgb(255, 200, 180)", glow: "rgba(255, 180, 150, 0.5)", type: "red" },       // Red giant (M-type)
  { color: "rgb(255, 150, 100)", glow: "rgba(255, 130, 80, 0.6)", type: "red" },        // Red dwarf
  { color: "rgb(255, 100, 80)", glow: "rgba(255, 80, 60, 0.5)", type: "red" },          // Deep red star
  { color: "rgb(255, 255, 240)", glow: "rgba(255, 255, 220, 0.6)", type: "white" },     // Hot white star
  // Binary companion colors
  { color: "rgb(255, 200, 150)", glow: "rgba(255, 180, 130, 0.4)", type: "companion" }, // Secondary star
  { color: "rgb(220, 180, 255)", glow: "rgba(200, 160, 255, 0.4)", type: "companion" }, // Purple companion
]

// Nebula colors
export const NEBULA_COLORS: NebulaColorDef[] = [
  { r: 100, g: 50, b: 150, a: 0.06 },  // Deep purple
  { r: 50, g: 80, b: 180, a: 0.05 },   // Deep blue
  { r: 150, g: 50, b: 100, a: 0.04 },  // Magenta/pink
  { r: 80, g: 120, b: 160, a: 0.04 },  // Teal blue
]

// Ring colors for gas giants
export const RING_COLORS = [
  "rgba(200, 190, 170, 0.4)",
  "rgba(180, 170, 160, 0.35)",
  "rgba(220, 200, 180, 0.4)",
  "rgba(170, 180, 190, 0.35)",
]

// Animation constants
export const HOVER_RADIUS = 100
export const CONSTELLATION_HOVER_RADIUS = 60
export const PARALLAX_STRENGTH = 0.02
export const SCROLL_PARALLAX_STRENGTH = 0.15
export const MAX_TRAIL_POINTS = 25
export const MAX_SUPERNOVAS = 3
export const SHOOTING_STAR_MIN_INTERVAL = 5000
export const SHOOTING_STAR_MAX_INTERVAL = 15000
