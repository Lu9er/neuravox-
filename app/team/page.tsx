"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Linkedin, ExternalLink } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  {
    name: "Gideon Abako",
    role: "Founder & Executive Director",
    bio: "AI governance and digital innovation specialist leading applied ML and public-health integrations across Africa. Gideon builds AI frameworks, policy tools and open datasets to support trustworthy systems in low-resource settings.",
    location: "Uganda",
    linkedin: "https://www.linkedin.com/in/gideonluper",
    image: "/gideon.jpeg",
  },
  {
    name: "Georgine Obwana",
    role: "Board Member",
    bio: "Communications strategist and public-health advocate with 10+ years leading national campaigns in nutrition, road safety, and tobacco control. Georgine coordinates multi-stakeholder advocacy and donor-funded initiatives.",
    location: "Uganda",
    linkedin: "https://www.linkedin.com/in/georgine-obwana-7421658a/",
    image: "/images/georgine.png",
  },
]

export default function TeamPage() {
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Team</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Neuravox is led by a small but experienced team committed to AI that serves public needs. Meet the people
              behind our vision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-[#ebf3f6]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={
                            member.name === "Georgine Obwana" ? "Portrait: Georgine Obwana" : `Photo of ${member.name}`
                          }
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-[#0a2f58] mb-2">{member.name}</h3>
                      <p className="text-lg font-medium text-[#046a83] mb-4">{member.role}</p>
                      <div className="flex items-center justify-center text-[#1a1a1a] mb-6">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{member.location}</span>
                      </div>
                    </div>

                    <p className="text-[#1a1a1a] leading-relaxed mb-6 text-center">{member.bio}</p>

                    <div className="text-center">
                      <Button
                        asChild
                        variant="outline"
                        className="border-[#046a83] text-[#046a83] hover:bg-[#046a83] hover:text-white bg-transparent"
                      >
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center"
                        >
                          <Linkedin className="h-4 w-4 mr-2" />
                          Connect on LinkedIn
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold text-[#0a2f58] mb-4">Join Our Mission</h3>
                <p className="text-xl text-[#1a1a1a] mb-8 max-w-2xl mx-auto">
                  We're always looking for passionate individuals who share our commitment to ethical AI governance and
                  public interest technology.
                </p>
                <Button asChild size="lg" className="bg-[#046a83] hover:bg-[#035a6f] text-white">
                  <a href="/contact">Get In Touch</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
