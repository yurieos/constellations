"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const Starfield = dynamic(() => import("./index").then((mod) => mod.Starfield), {
  ssr: false,
  loading: () => null,
})

type NetworkInformation = {
  saveData?: boolean
  effectiveType?: string
}

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation
  deviceMemory?: number
}

function shouldDisableStarfield(): boolean {
  if (typeof window === "undefined") return true

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (prefersReducedMotion) return true

  const { connection, deviceMemory } = navigator as NavigatorWithConnection
  if (connection?.saveData) return true
  if (connection?.effectiveType && ["slow-2g", "2g"].includes(connection.effectiveType)) return true
  if (typeof deviceMemory === "number" && deviceMemory <= 4) return true

  return false
}

export function LazyStarfield() {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    if (shouldDisableStarfield()) return

    let timeoutId: number | null = null
    let idleId: number | null = null

    const enable = () => setIsEnabled(true)

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(enable, { timeout: 2000 })
    } else {
      timeoutId = window.setTimeout(enable, 200)
    }

    return () => {
      if (idleId !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [])

  if (!isEnabled) return null
  return <Starfield />
}
