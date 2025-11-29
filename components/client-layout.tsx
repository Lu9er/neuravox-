"use client"

import type React from "react"

import { useEffect } from "react"
import JournalNotification from "./journal-notification"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-aos-delay")
          const animationDelay = delay ? Number.parseInt(delay) : 0

          setTimeout(() => {
            entry.target.classList.add("aos-animate")
          }, animationDelay)

          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe all elements with data-aos attribute
    const elements = document.querySelectorAll("[data-aos]")
    elements.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
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
