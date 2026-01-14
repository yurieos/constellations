"use client"

import { useSyncExternalStore } from "react"

/**
 * Get visibility state from document
 */
function getVisibility(): boolean {
  if (typeof document === "undefined") return true
  return document.visibilityState === "visible"
}

/**
 * Subscribe to visibility changes
 */
function subscribeToVisibility(callback: () => void): () => void {
  document.addEventListener("visibilitychange", callback)
  return () => document.removeEventListener("visibilitychange", callback)
}

/**
 * Server snapshot (always visible)
 */
function getServerSnapshot(): boolean {
  return true
}

/**
 * Hook to detect page visibility
 * Returns true when the page is visible, false when hidden (e.g., tab switched)
 * Used to pause animations when the page is not visible for performance
 */
export function usePageVisibility(): boolean {
  return useSyncExternalStore(
    subscribeToVisibility,
    getVisibility,
    getServerSnapshot
  )
}
