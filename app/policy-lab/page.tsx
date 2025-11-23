"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const publications = [
  {
    title: "AI Governance Framework for African Nations",
    type: "Policy Brief",
    date: "December 2024",
    status: "Published",
    description: "Comprehensive framework for implementing ethical AI governance across African contexts.",
    tags: ["AI Governance", "Africa", "Policy Framework"],
  },
  {
    title: "Community-Centered AI Safety Standards",
    type: "White Paper",
    date: "November 2024",
    status: "Published",
    description: "Developing AI safety standards that prioritize community needs and local contexts.",
    tags: ["AI Safety", "Community", "Standards"],
  },
  {
    title: "Digital Rights in the Age of AI",
    type: "Commentary",
    date: "October 2024",
    status: "Published",
    description: "Analysis of digital rights challenges and opportunities in AI-driven societies.",
    tags: ["Digital Rights", "AI Ethics", "Human Rights"],
  },
  {
    title: "Language AI and Cultural Preservation",
    type: "Research Report",
    date: "January 2025",
    status: "Upcoming",
    description: "Examining the role of language AI in preserving and promoting linguistic diversity.",
    tags: ["Language AI", "Culture", "Preservation"],
  },
  {
    title: "Public Interest Technology Metrics",
    type: "Policy Brief",
    date: "February 2025",
    status: "Upcoming",
    description: "Framework for measuring the public interest impact of technology initiatives.",
    tags: ["Public Interest", "Metrics", "Technology"],
  },
]

const researchAreas = [
  {
    title: "AI Governance Models",
    description: "Developing inclusive and effective governance frameworks for AI systems",
    focus: ["Multi-stakeholder governance", "Community participation", "Accountability mechanisms"],
  },
  {
    title: "Digital Rights & AI",
    description: "Protecting and advancing digital rights in AI-enabled environments",
    focus: ["Privacy protection", "Algorithmic transparency", "Data sovereignty"],
  },
  {
    title: "Public Interest Technology",
    description: "Defining and measuring technology that serves the public good",
    focus: ["Impact assessment", "Community benefit", "Sustainable development"],
  },
  {
    title: "AI Safety & Ethics",
    description: "Ensuring AI systems are safe, beneficial, and aligned with human values",
    focus: ["Risk assessment", "Ethical frameworks", "Safety standards"],
  },
]

export default function PolicyLabPage() {
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Neuravox Policy Lab</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Research-driven policy development for ethical AI governance and public interest technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-[#ebf3f6]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[#0a2f58] mb-6">About the Policy Lab</h2>
              <p className="text-lg text-[#1a1a1a] leading-relaxed mb-6">
                The Neuravox Policy Lab serves as our research and policy development hub, producing evidence-based
                analysis, frameworks, and recommendations for ethical AI governance.
              </p>
              <p className="text-lg text-[#1a1a1a] leading-relaxed mb-6">
                Our work bridges the gap between technical AI development and policy implementation, ensuring that
                governance frameworks are both technically informed and practically applicable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-[#51bccd] hover:bg-[#46a7b7] text-white">
                  <a href="https://journal.neuravox.org" target="_blank" rel="noopener noreferrer">
                    View Publications
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-[#046a83] text-[#046a83] hover:bg-[#046a83] hover:text-white"
                >
                  <a href="#research-areas">Research Areas</a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-[#0a2f58] mb-6">Our Approach</h3>
                  <div className="space-y-4">
                    {[
                      "Community-centered research methodology",
                      "Evidence-based policy recommendations",
                      "Multi-stakeholder consultation processes",
                      "Open access knowledge sharing",
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#046a83] rounded-full"></div>
                        <span className="text-[#1a1a1a]">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section id="research-areas" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">Research Areas</h2>
            <p className="text-xl text-[#1a1a1a] max-w-3xl mx-auto">
              Our research focuses on critical areas of AI governance and public interest technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {researchAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-[#0a2f58] mb-4">{area.title}</h3>
                    <p className="text-[#1a1a1a] mb-6 leading-relaxed">{area.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-[#0a2f58] mb-3">Key Focus Areas:</h4>
                      {area.focus.map((focus, focusIndex) => (
                        <div key={focusIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-[#51bccd] rounded-full"></div>
                          <span className="text-sm text-[#1a1a1a]">{focus}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-20 bg-[#ebf3f6]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">Publications & Reports</h2>
            <p className="text-xl text-[#1a1a1a] max-w-3xl mx-auto mb-8">
              Coming Soon – Verified research briefs and white papers from ongoing projects.
            </p>
            <div className="bg-white rounded-lg p-8 shadow-md max-w-2xl mx-auto">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-[#0a2f58] mb-3">Research in Progress</h3>
              <p className="text-[#1a1a1a]">
                Our Policy Lab is actively developing comprehensive research outputs. Check back soon for verified
                publications and policy briefs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
