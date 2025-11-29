"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Users, Building2, Award } from "lucide-react"
import Image from "next/image"

const partners = [
  {
    name: "United Nations Development Programme (UNDP)",
    type: "International Organisation",
    relationship: "Strategic Partnership",
    description: "Language AI Accelerator co-development; contributed to community paper.",
    focus: ["Language AI", "International Collaboration"],
    logo: "/undp-logo.jpeg",
  },
  {
    name: "Mozilla Foundation",
    type: "International Organisation",
    relationship: "Strategic Partnership",
    description: "Supporting Neuravox through the VoiceLink Uganda project, focused on open multilingual speech data for building inclusive language AI tools.",
    focus: ["Language AI", "Open Data", "Community Partnerships"],
    logo: "/mozilla-foundation-logo.png",
  },
  {
    name: "WIPO IP Labs",
    type: "International Organisation",
    relationship: "Innovation Cohort",
    description: "Neuravox selected for IP innovation cohort building.",
    focus: ["IP Innovation", "Governance Frameworks"],
    logo: "/wipo-logo.png",
  },
  {
    name: "AUDA-NEPAD & AFIDEP",
    type: "Regional Organisation",
    relationship: "Research Partnership",
    description: "Research presented on African AI strategies; engagements around AU AI Continental Strategy.",
    focus: ["Africa AI Policy", "Regional Governance"],
    logo: "/auda-nepad-logo.webp",
  },
]

const collaborationTypes = [
  {
    icon: Globe,
    title: "International Organisations",
    description: "Working with global bodies to shape AI governance at the international level",
    count: "4+ partnerships",
  },
  {
    icon: Users,
    title: "Civil Society",
    description: "Collaborating with NGOs and community organisations for grassroots impact",
    count: "8+ organisations",
  },
  {
    icon: Building2,
    title: "Academic Institutions",
    description: "Research partnerships with universities and think tanks worldwide",
    count: "7+ institutions",
  },
  {
    icon: Award,
    title: "Government Bodies",
    description: "Advisory relationships with national and regional government entities",
    count: "3+ governments",
  },
]

const acknowledgments = [
  "UNDP – Language AI Accelerator and Global Governance Initiatives",
  "Mozilla Foundation – VoiceLink Uganda Project for Multilingual Speech Data",
  "AUDA-NEPAD – AI Strategy Collaboration and Conference Participation",
  "WIPO IP Labs – Nigeria IP Lab",
]

export default function PartnersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#1d4e63] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Partners & Collaborations</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Building a global network for ethical AI governance and public interest technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collaboration Overview */}
      <section className="py-20 bg-[#ebf3f6]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">Our Collaborative Network</h2>
            <p className="text-xl text-[#1a1a1a] max-w-3xl mx-auto">
              We work with diverse partners to advance ethical AI governance and ensure technology serves the public
              interest
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {collaborationTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-[#046a83] rounded-lg flex items-center justify-center mb-6 mx-auto">
                      <type.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0a2f58] mb-3">{type.title}</h3>
                    <p className="text-[#1a1a1a] mb-4 text-sm leading-relaxed">{type.description}</p>
                    <Badge variant="secondary" className="bg-white text-[#0a2f58]">
                      {type.count}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Partners */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">Our Collaborators</h2>
            <p className="text-xl text-[#1a1a1a] max-w-3xl mx-auto">
              Organisations we work closely with to advance our mission
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      <div className="lg:col-span-3">
                        <div className="flex items-center gap-4 mb-4">
                          <h3 className="text-2xl font-semibold text-[#0a2f58]">{partner.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {partner.type}
                          </Badge>
                        </div>
                        <div className="mb-4">
                          <Badge
                            className={`
                              ${partner.relationship === "Strategic Partnership" ? "bg-green-100 text-green-800" : ""}
                              ${partner.relationship === "Innovation Cohort" ? "bg-blue-100 text-blue-800" : ""}
                              ${partner.relationship === "Research Partnership" ? "bg-purple-100 text-purple-800" : ""}
                              ${partner.relationship === "Training Partnership" ? "bg-orange-100 text-orange-800" : ""}
                            `}
                          >
                            {partner.relationship}
                          </Badge>
                        </div>
                        <p className="text-[#1a1a1a] mb-6 leading-relaxed">{partner.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {partner.focus.map((focus, focusIndex) => (
                            <Badge key={focusIndex} variant="secondary" className="text-xs">
                              {focus}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="lg:col-span-1 flex items-center justify-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden p-2">
                          <Image
                            src={partner.logo || "/placeholder.svg"}
                            alt={`${partner.name} logo`}
                            width={96}
                            height={96}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Acknowledgments */}
      <section className="py-20 bg-[#ebf3f6]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">Acknowledgments</h2>
            <p className="text-xl text-[#1a1a1a] max-w-3xl mx-auto">
              We gratefully acknowledge the support of foundations and organisations that enable our work
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {acknowledgments.map((acknowledgment, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#51bccd] rounded-full"></div>
                      <span className="text-[#1a1a1a]">{acknowledgment}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-20 bg-[#1d4e63] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Partner With Us</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our network of organisations working to advance ethical AI governance and public interest technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#51bccd] hover:bg-[#46a7b7] text-white font-medium rounded-md transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Conversation
              </motion.a>
              <motion.a
                href="/our-work"
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-white hover:bg-white hover:text-[#0a2f58] font-medium rounded-md transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn About Our Work
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
