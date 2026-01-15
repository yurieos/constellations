import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { LazyStarfield } from "@/components/starfield/lazy-starfield"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://constellationsai.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Constellations",
  description: "A celestial blog exploring ideas across the universe of knowledge",
  keywords: ["History", "Science", "Technology"],
  authors: [{ name: "Constellations" }],
  openGraph: {
    title: "Constellations",
    description: "A celestial blog exploring ideas across the universe of knowledge",
    type: "website",
    siteName: "Constellations",
    locale: "en_US",
    url: BASE_URL,
  },
  twitter: {
    card: "summary",
    title: "Constellations",
    description: "A celestial blog exploring ideas across the universe of knowledge",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Constellations",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-background text-foreground transition-colors`}>
        <ThemeProvider>
          <LazyStarfield />
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
