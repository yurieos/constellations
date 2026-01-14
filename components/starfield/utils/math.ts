import type { StarColor } from "../types"
import { STAR_COLORS } from "../constants"

/**
 * Pick a star color based on weighted distribution
 */
export function pickStarColor(): StarColor {
  const rand = Math.random()
  let cumulative = 0
  for (const { color, weight } of STAR_COLORS) {
    cumulative += weight
    if (rand < cumulative) return color
  }
  return STAR_COLORS[1].color // Default yellow
}

/**
 * Calculate parallax offset based on mouse position
 */
export function calculateParallax(
  mouseX: number,
  mouseY: number,
  centerX: number,
  centerY: number,
  strength: number
): { x: number; y: number } {
  return {
    x: (mouseX - centerX) * strength,
    y: (mouseY - centerY) * strength,
  }
}

/**
 * Check if a point is within hover radius
 */
export function isWithinRadius(
  px: number,
  py: number,
  targetX: number,
  targetY: number,
  radius: number
): boolean {
  const dx = px - targetX
  const dy = py - targetY
  return dx * dx + dy * dy < radius * radius
}

/**
 * Calculate distance squared between two points
 */
export function distanceSquared(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const dx = x1 - x2
  const dy = y1 - y2
  return dx * dx + dy * dy
}

/**
 * Linear interpolation
 */
export function lerp(current: number, target: number, factor: number): number {
  return current + (target - current) * factor
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

/**
 * Calculate shimmer effect value
 */
export function shimmer(time: number, speed: number, offset: number): number {
  return 0.75 + 0.25 * Math.sin(time * speed + offset)
}
