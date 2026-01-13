"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

type Star = {
  x: number
  y: number
  size: number
  opacity: number
  shimmerSpeed: number
  shimmerOffset: number
  hasShine: boolean
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas and skip rendering in light mode
    if (resolvedTheme !== "dark") {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }

    const generateStars = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const starCount = Math.floor((canvas.width * canvas.height) / 12000)

      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1 + 0.3,
        opacity: Math.random() * 0.35 + 0.15,
        shimmerSpeed: Math.random() * 0.0015 + 0.0005,
        shimmerOffset: Math.random() * Math.PI * 2,
        hasShine: Math.random() < 0.08,
      }))
    }

    generateStars()
    window.addEventListener("resize", generateStars)

    let animationId: number

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      starsRef.current.forEach((star) => {
        const shimmer = 0.75 + 0.25 * Math.sin(time * star.shimmerSpeed + star.shimmerOffset)
        const opacity = star.opacity * shimmer

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()

        // Draw shine
        if (star.hasShine) {
          const shineOpacity = opacity * 0.5
          const shineSize = star.size * 6

          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, shineSize
          )
          gradient.addColorStop(0, `rgba(255, 255, 255, ${shineOpacity})`)
          gradient.addColorStop(1, "transparent")
          
          ctx.beginPath()
          ctx.arc(star.x, star.y, shineSize, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()

          // Cross
          const crossLength = star.size * 8
          ctx.strokeStyle = `rgba(255, 255, 255, ${shineOpacity * 0.6})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(star.x - crossLength, star.y)
          ctx.lineTo(star.x + crossLength, star.y)
          ctx.moveTo(star.x, star.y - crossLength)
          ctx.lineTo(star.x, star.y + crossLength)
          ctx.stroke()
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", generateStars)
      cancelAnimationFrame(animationId)
    }
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}
