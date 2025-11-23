"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Heart, Users } from "lucide-react"

export default function AboutPage() {
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Driving ethical AI governance and public interest technology across Africa and the Global South
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#ebf3f6]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[#0a2f58] mb-6">Our Mission</h2>
              <p className="text-lg text-[#1a1a1a] leading-relaxed mb-6">
                Neuravox advances ethical AI governance, promotes public interest technology and supports community-led
                innovation. We aim to make artificial intelligence serve people's needs especially in underrepresented
                regions.
              </p>
              <p className="text-lg text-[#1a1a1a] leading-relaxed">
                Through research, policy development, and collaborative partnerships, we strive to create a more
                equitable and accountable AI ecosystem that benefits all communities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#046a83] rounded-lg flex items-center justify-center mb-6">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#0a2f58] mb-4">Our Vision</h3>
                  <p className="text-[#1a1a1a] leading-relaxed">
                    A future where AI systems are accountable to people and communities not just corporations or
                    governments.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">Our Core Values</h2>
            <p className="text-lg text-[#1a1a1a] max-w-2xl mx-auto">
              These values guide how we work, build partnerships and serve communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Perspective",
                description:
                  "We prioritize voices and needs from Africa and the Global South in AI governance discussions.",
              },
              {
                icon: Users,
                title: "Community-Led",
                description: "Our work is driven by and accountable to the communities we serve.",
              },
              {
                icon: Heart,
                title: "Public Interest",
                description: "We champion technology that serves humanity over profit.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-[#51bccd] rounded-lg flex items-center justify-center mb-6 mx-auto">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#0a2f58] mb-4">{value.title}</h3>
                    <p className="text-[#1a1a1a] leading-relaxed">{value.description}</p>
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
