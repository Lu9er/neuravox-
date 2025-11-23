"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Our Work", href: "/our-work" },
  { name: "News", href: "/news" },
  { name: "Journal", href: "/journal" },
  { name: "Policy Lab", href: "/policy-lab" },
  { name: "Partners", href: "/partners" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-[#ebf3f6] shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Neuravox Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold text-[#0a2f58]">Neuravox</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#046a83] ${
                  pathname === item.href ? "text-[#046a83] border-b-2 border-[#046a83] pb-1" : "text-[#1a1a1a]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-4 border-t border-gray-200 pt-4"
            >
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      pathname === item.href
                        ? "bg-[#046a83] text-white"
                        : "text-[#1a1a1a] hover:bg-[#d2e9f0] hover:text-[#046a83]"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
