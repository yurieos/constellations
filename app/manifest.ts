import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Constellations",
    short_name: "Constellations",
    description: "A celestial blog exploring ideas across the universe of knowledge",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "512x512", type: "image/png" },
    ],
  }
}
