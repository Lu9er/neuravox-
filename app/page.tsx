"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Globe, Shield, FileText, Brain, Users, Lightbulb } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const pillars = [
  {
    icon: Shield,
    title: "AI Governance",
    description: "Developing frameworks for responsible AI development and deployment across diverse contexts.",
  },
  {
    icon: Globe,
    title: "Public Interest Technology",
    description: "Advancing technology solutions that serve communities and promote social good.",
  },
  {
    icon: FileText,
    title: "Policy & Regulation",
    description: "Shaping evidence-based policies for ethical AI governance and digital rights.",
  },
  {
    icon: Brain,
    title: "AI Safety & Compute Governance",
    description: "Ensuring safe AI systems and equitable access to computational resources.",
  },
  {
    icon: Lightbulb,
    title: "Research & Publishing",
    description: "Producing cutting-edge research on AI ethics, governance, and societal impact.",
  },
  {
    icon: Users,
    title: "Collaboration & Capacity Building",
    description: "Building networks and capabilities for inclusive AI governance worldwide.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#1d4e63] text-white py-16 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">Neuravox</h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                AI governance. Public interest. Global accountability.
              </p>
            </div>

            <motion.p
              className="text-lg lg:text-xl mb-12 text-blue-50 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Focused on AI governance, public interest technology and community-led
              innovation across Africa and the Global South.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button asChild size="lg" className="bg-[#51bccd] hover:bg-[#46a7b7] text-white">
                <Link href="/our-work">
                  Explore Our Work <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-[#0a2f58] hover:bg-gray-100 border border-white">
                <Link href="/journal">Read the Journal</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Six Pillars Section */}
      <section className="py-20 bg-[#ebf3f6]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">Our Six Pillars of Work</h2>
            <p className="text-xl text-[#1a1a1a] max-w-3xl mx-auto">
              Comprehensive approach to ethical AI governance and public interest technology
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {pillars.map((pillar, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-[#046a83] rounded-lg flex items-center justify-center mb-6">
                      <pillar.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#0a2f58] mb-4">{pillar.title}</h3>
                    <p className="text-[#1a1a1a] leading-relaxed">{pillar.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-[#1d4e63] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Join Our Network</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Be part of the global movement for ethical AI governance and public interest technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#51bccd] hover:bg-[#46a7b7] text-white">
                <Link href="/contact">
                  Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-[#0a2f58] hover:bg-gray-100 border border-white">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
