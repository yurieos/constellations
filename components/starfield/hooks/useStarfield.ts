"use client"

import { useEffect, useRef, useCallback, type RefObject } from "react"
import type {
  Star,
  ConstellationInstance,
  SolarSystem,
  ShootingStar,
  Nebula,
  TrailPoint,
  Supernova,
  RenderContext,
} from "../types"
import {
  PARALLAX_STRENGTH,
  MAX_TRAIL_POINTS,
  MAX_SUPERNOVAS,
  SHOOTING_STAR_MIN_INTERVAL,
  SHOOTING_STAR_MAX_INTERVAL,
} from "../constants"
import {
  generateStars,
  generateNebulas,
  generateConstellations,
  generateSolarSystems,
  createShootingStar,
  createSupernova,
} from "../utils/generators"
import { renderNebulas } from "../renderers/nebulas"
import { renderStars } from "../renderers/stars"
import { renderConstellations } from "../renderers/constellations"
import { renderSolarSystems } from "../renderers/solar-systems"
import { renderShootingStars, renderTrail, renderSupernovas } from "../renderers/effects"

type UseStarfieldOptions = {
  canvasRef: RefObject<HTMLCanvasElement | null>
  isVisible: boolean
  isDarkMode: boolean
}

/**
 * Main starfield animation hook
 * Manages all animation state and rendering
 */
export function useStarfield({ canvasRef, isVisible, isDarkMode }: UseStarfieldOptions) {
  // Animation state refs (not React state to avoid re-renders)
  const starsRef = useRef<Star[]>([])
  const constellationsRef = useRef<ConstellationInstance[]>([])
  const solarSystemsRef = useRef<SolarSystem[]>([])
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const nebulasRef = useRef<Nebula[]>([])
  const trailRef = useRef<TrailPoint[]>([])
  const supernovasRef = useRef<Supernova[]>([])

  // Input state refs
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  const scrollRef = useRef<number>(0)
  const lastShootingStarRef = useRef<number>(0)
  const lastMousePosRef = useRef<{ x: number; y: number } | null>(null)

  // Throttled mouse move handler using RAF
  const rafMouseRef = useRef<number | null>(null)
  const pendingMouseRef = useRef<{ x: number; y: number } | null>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    pendingMouseRef.current = { x: e.clientX, y: e.clientY }

    if (rafMouseRef.current === null) {
      rafMouseRef.current = requestAnimationFrame(() => {
        rafMouseRef.current = null
        const newPos = pendingMouseRef.current
        if (!newPos) return

        // Add trail point if mouse moved enough
        if (lastMousePosRef.current) {
          const dx = newPos.x - lastMousePosRef.current.x
          const dy = newPos.y - lastMousePosRef.current.y
          if (dx * dx + dy * dy > 16) {
            trailRef.current.push({
              x: newPos.x,
              y: newPos.y,
              age: 0,
              size: 2 + Math.random() * 2,
            })
            if (trailRef.current.length > MAX_TRAIL_POINTS) {
              trailRef.current.shift()
            }
            lastMousePosRef.current = newPos
          }
        } else {
          lastMousePosRef.current = newPos
        }

        mouseRef.current = newPos
      })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = null
    lastMousePosRef.current = null
  }, [])

  const handleScroll = useCallback(() => {
    scrollRef.current = window.scrollY
  }, [])

  const handleClick = useCallback((e: MouseEvent) => {
    if (supernovasRef.current.length >= MAX_SUPERNOVAS) return
    supernovasRef.current.push(createSupernova(e.clientX, e.clientY))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    // Clear and skip animation if not dark mode
    if (!isDarkMode) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }

    // Generate initial state
    const regenerate = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      starsRef.current = generateStars(canvas.width, canvas.height)
      nebulasRef.current = generateNebulas(canvas.width, canvas.height)
      constellationsRef.current = generateConstellations(canvas.width, canvas.height)
      solarSystemsRef.current = generateSolarSystems(canvas.width, canvas.height)
    }

    regenerate()

    // Event listeners
    window.addEventListener("resize", regenerate)
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("scroll", handleScroll, { passive: true })
    canvas.addEventListener("click", handleClick)

    let animationId: number

    const animate = (time: number) => {
      // Skip animation if not visible
      if (!isVisible) {
        animationId = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current
      const scrollY = scrollRef.current
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      let parallaxX = 0
      let parallaxY = 0
      if (mouse) {
        parallaxX = (mouse.x - centerX) * PARALLAX_STRENGTH
        parallaxY = (mouse.y - centerY) * PARALLAX_STRENGTH
      }

      const renderContext: RenderContext = {
        ctx,
        width: canvas.width,
        height: canvas.height,
        time,
        mouse,
        scrollY,
        parallaxX,
        parallaxY,
      }

      // Render layers in order (back to front)
      renderNebulas(ctx, nebulasRef.current, renderContext)
      renderConstellations(ctx, constellationsRef.current, renderContext)
      renderSolarSystems(ctx, solarSystemsRef.current, renderContext)
      renderStars(ctx, starsRef.current, renderContext)

      // Shooting stars
      const now = Date.now()
      if (now - lastShootingStarRef.current > SHOOTING_STAR_MIN_INTERVAL + Math.random() * (SHOOTING_STAR_MAX_INTERVAL - SHOOTING_STAR_MIN_INTERVAL)) {
        shootingStarsRef.current.push(createShootingStar(canvas.width, canvas.height))
        lastShootingStarRef.current = now
      }
      shootingStarsRef.current = renderShootingStars(ctx, shootingStarsRef.current)

      // Trail and supernovas
      trailRef.current = renderTrail(ctx, trailRef.current, time)
      supernovasRef.current = renderSupernovas(ctx, supernovasRef.current)

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", regenerate)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("scroll", handleScroll)
      canvas.removeEventListener("click", handleClick)
      cancelAnimationFrame(animationId)
      if (rafMouseRef.current !== null) {
        cancelAnimationFrame(rafMouseRef.current)
      }
    }
  }, [canvasRef, isDarkMode, isVisible, handleMouseMove, handleMouseLeave, handleScroll, handleClick])
}
