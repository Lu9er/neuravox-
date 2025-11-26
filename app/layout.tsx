import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import ClientLayout from "@/components/client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Neuravox - AI Governance, Public Interest, Global Accountability",
  description:
    "A Community Interest Company focused on ethical AI governance, public interest technology, and community-led innovation across Africa and the Global South.",
  keywords: "AI governance, public interest technology, ethical AI, Africa, Global South, community innovation",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  )
}
