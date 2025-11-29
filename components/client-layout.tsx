"use client"

import type React from "react"

import { useEffect } from "react"
import JournalNotification from "./journal-notification"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initAOS = async () => {
      const AOS = (await import("aos")).default
      await import("aos/dist/aos.css")

      AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: "ease-out-cubic",
      })
    }

    initAOS()

    // Refresh AOS on route changes
    const handleRouteChange = async () => {
      const AOS = (await import("aos")).default
      setTimeout(() => {
        AOS.refresh()
      }, 100)
    }

    // Listen for navigation events
    window.addEventListener("popstate", handleRouteChange)

    return () => {
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [])

  return (
    <>
      {children}
      <JournalNotification />
    </>
  )
}

export default ClientLayout
