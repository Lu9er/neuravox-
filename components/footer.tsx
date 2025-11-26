"use client"

import Link from "next/link"
import { Mail, MapPin, ExternalLink } from "lucide-react"

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Our Work", href: "/our-work" },
    { name: "News", href: "/news" },
    { name: "Policy Lab", href: "/policy-lab" },
    { name: "Partners", href: "/partners" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    { name: "Neuravox Journal", href: "https://journal.neuravox.org" },
    { name: "LinkedIn", href: "https://linkedin.com/company/neuravox" },
    { name: "Twitter", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#1d4e63] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <p className="text-blue-100 mb-6 max-w-md leading-relaxed">
              Focused on AI governance, public interest technology and community-led
              innovation across Africa and the Global South.
            </p>
            <div className="space-y-2 text-sm text-blue-100">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@neuravox.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-blue-100 hover:text-white transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              {navigation.social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-100 hover:text-white transition-colors text-sm inline-flex items-center"
                  >
                    {item.name}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2a5d72] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-100 text-sm">© {new Date().getFullYear()} Neuravox. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-blue-100 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-blue-100 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
