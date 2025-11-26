"use client"

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import JournalNotification from './journal-notification'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
      easing: 'ease-out-cubic'
    })

    // Refresh AOS on route changes
    const handleRouteChange = () => {
      setTimeout(() => {
        AOS.refresh()
      }, 100)
    }

    // Listen for navigation events
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
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