"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Globe, FileText, Brain, Users, Lightbulb } from "lucide-react"

const pillars = [
  {
    icon: Shield,
    title: "AI Governance",
    description:
      "Developing comprehensive frameworks for responsible AI development and deployment across diverse global contexts.",
    details: [
      "Multi-stakeholder governance models",
      "Cross-border AI policy coordination",
      "Ethical AI certification frameworks",
      "Community-centered governance approaches",
    ],
  },
  {
    icon: Globe,
    title: "Public Interest Technology",
    description: "We build technology that serves public needs not profit margins.",
    details: [
      "Open-source AI tools for public benefit",
      "Digital infrastructure for underserved communities",
      "Technology for social impact measurement",
      "Community-owned digital platforms",
    ],
  },
  {
    icon: FileText,
    title: "Policy & Regulation",
    description: "Shaping evidence-based policies for ethical AI governance and digital rights.",
    details: [
      "AI policy research and analysis",
      "Regulatory impact assessments",
      "Digital rights advocacy",
      "Policy consultation and advisory services",
    ],
  },
  {
    icon: Brain,
    title: "AI Safety & Compute Governance",
    description: "Ensuring safe AI systems and equitable access to computational resources.",
    details: [
      "AI safety research and standards",
      "Compute resource allocation frameworks",
      "Risk assessment methodologies",
      "Safety-first AI development practices",
    ],
  },
  {
    icon: Lightbulb,
    title: "Research & Publishing",
    description: "Producing cutting-edge research on AI ethics, governance, and societal impact.",
    details: [
      "Peer-reviewed academic publications",
      "Policy briefs and white papers",
      "Community research initiatives",
      "Open access knowledge sharing",
    ],
  },
  {
    icon: Users,
    title: "Collaboration & Capacity Building",
    description: "Building networks and capabilities for inclusive AI governance worldwide.",
    details: [
      "Training programs for policymakers",
      "Community organizer workshops",
      "International partnership development",
      "Knowledge transfer initiatives",
    ],
  },
]

const featuredProjects = [
  {
    title: "VoiceLink Uganda",
    description:
      "A Mozilla Foundation-funded project that collects multilingual radio speech in Uganda for building digital language database through structured community partnerships.",
    status: "Active",
    tags: ["Language AI", "Community Partnerships", "Uganda", "Mozilla Foundation", "Speech Data"],
  },
  {
    title: "Language AI Accelerator",
    description: "Partnership with UNDP and Italia G7 Presidency to advance multilingual AI capabilities.",
    status: "Partnership",
    tags: ["Language AI", "International Cooperation", "Policy"],
  },
]

export default function OurWorkPage() {
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Work</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive approach to ethical AI governance through six interconnected pillars of work
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">Featured Projects</h2>
            <p className="text-xl text-[#1a1a1a] max-w-3xl mx-auto">
              Innovative initiatives that demonstrate our commitment to ethical AI and public interest technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-[#0a2f58]">{project.title}</h3>
                      <Badge
                        variant="secondary"
                        className={`
                          ${project.status === "Active" ? "bg-green-100 text-green-800" : ""}
                          ${project.status === "Development" ? "bg-blue-100 text-blue-800" : ""}
                          ${project.status === "Partnership" ? "bg-purple-100 text-purple-800" : ""}
                        `}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-[#1a1a1a] mb-6 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Six Pillars Detailed */}
      <section className="py-20 bg-[#ebf3f6]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">Our Focus</h2>
            <p className="text-xl text-[#1a1a1a] max-w-3xl mx-auto">
              Each pillar represents a critical component of our holistic approach to AI governance
            </p>
          </motion.div>

          <div className="space-y-12">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                      <div className="lg:col-span-1">
                        <div className="w-16 h-16 bg-[#046a83] rounded-lg flex items-center justify-center mb-6">
                          <pillar.icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-semibold text-[#0a2f58] mb-4">{pillar.title}</h3>
                        <p className="text-[#1a1a1a] leading-relaxed">{pillar.description}</p>
                      </div>
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-semibold text-[#0a2f58] mb-4">Key Focus Areas:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {pillar.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-[#51bccd] rounded-full"></div>
                              <span className="text-[#1a1a1a]">{detail}</span>
                            </div>
                          ))}
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
    </div>
  )
}
