"use client"
import type React from "react"
import { useState } from "react"
import dynamic from "next/dynamic"

// Lazy-load Framer Motion only in browser
const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div), { ssr: false })

type Result = { success: boolean; message: string } | null

const ContactPage: React.FC = () => {
  const [isPending, setIsPending] = useState(false)
  const [result, setResult] = useState<Result>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    setResult(null)
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch("https://formspree.io/f/xldnbeov", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
      const data = await res.json()
      if (res.ok) {
        setResult({ success: true, message: "Thank you for contacting us! We'll get back to you soon." })
        form.reset()
        setTimeout(() => setResult(null), 5000)
      } else {
        setResult({ success: false, message: data?.message || "Something went wrong." })
      }
    } catch {
      setResult({ success: false, message: "Something went wrong. Try again." })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="min-h-screen">
      <section className="bg-[#1d4e63] text-white py-20">
        <div className="container mx-auto px-4">
          <MotionDiv
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Connect with us to discuss partnerships, collaborations, or learn more about our work in AI governance
            </p>
          </MotionDiv>
        </div>
      </section>

      <section className="py-20 bg-[#ebf3f6]">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <MotionDiv
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white shadow-lg p-8 rounded"
          >
            <h2 className="text-2xl font-bold text-[#0a2f58] mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name *"
                  required
                  disabled={isPending}
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  required
                  disabled={isPending}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <input
                type="text"
                name="organization"
                placeholder="Organization"
                disabled={isPending}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject *"
                required
                disabled={isPending}
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Message *"
                required
                disabled={isPending}
                className="w-full border rounded px-3 py-2"
              />
              <button
                type="submit"
                disabled={isPending}
                className={`w-full py-2 px-4 rounded bg-[#046a83] text-white font-semibold hover:bg-[#035a6f] ${isPending ? "opacity-60 cursor-not-allowed" : ""}`}
              >
                {isPending ? "Sending..." : "Send Message"}
              </button>
              {result && (
                <MotionDiv
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded ${result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {result.message}
                </MotionDiv>
              )}
            </form>
          </MotionDiv>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-[#0a2f58] font-bold text-xl mb-2">Email</h3>
              <p>contact@neuravox.org</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-[#0a2f58] font-bold text-xl mb-2">Response Time</h3>
              <p>We respond within 48 hours. For urgent issues, mention it in the subject.</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-[#0a2f58] font-bold text-xl mb-2">Websites</h3>
              <p>
                <a href="https://journal.neuravox.org" className="text-[#046a83] hover:underline">
                  Journal
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
