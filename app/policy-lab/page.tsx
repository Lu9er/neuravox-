"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Users,
  Network,
  Shield,
  MessageSquare,
  Database,
  Heart,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Mail,
  Calendar,
  Target
} from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

// Research Themes Data
const researchThemes = [
  {
    id: "governance",
    title: "AI Governance & Public Policy",
    icon: Shield,
    summary: "Developing comprehensive frameworks for national AI strategies, regulatory approaches, and algorithmic oversight that strengthen public sector readiness across emerging economies.",
    details: [
      "National AI strategy development and implementation",
      "Regulatory framework design and stakeholder engagement",
      "Algorithmic accountability and transparency mechanisms",
      "Public sector AI readiness assessment and capacity building"
    ]
  },
  {
    id: "communication",
    title: "AI Communication & Public Engagement",
    icon: MessageSquare,
    summary: "Strategic communication frameworks that build public understanding of AI systems, develop compelling narratives, and counter misinformation through evidence-based engagement.",
    details: [
      "Public AI literacy and awareness campaigns",
      "Narrative development for responsible AI adoption",
      "Counter-misinformation strategies and fact-checking frameworks",
      "Community engagement and participatory communication methods"
    ]
  },
  {
    id: "infrastructure",
    title: "Digital Infrastructure & AI Readiness",
    icon: Database,
    summary: "Building sustainable language data systems, digital infrastructure assessments, and community-driven data governance models that enable equitable AI deployment.",
    details: [
      "Community Language Data Cooperative (CLDC) development",
      "VoiceLink Uganda platform and language technology",
      "Digital readiness assessment and infrastructure planning",
      "Data sovereignty and community-controlled data systems"
    ]
  },
  {
    id: "ethics",
    title: "Community-Led AI Methods & Ethics",
    icon: Heart,
    summary: "Participatory approaches to AI governance that prioritize community consent, cultural grounding, and inclusive design principles for ethical AI development.",
    details: [
      "Participatory data governance and community consent frameworks",
      "Culturally grounded AI design methodologies",
      "Community-led ethical AI standards and guidelines",
      "Inclusive AI development and deployment practices"
    ]
  }
]

// Active Projects Data
const activeProjects = [
  {
    title: "VoiceLink Uganda",
    overview: "Mozilla-funded platform advancing multilingual voice technology and language preservation across Uganda.",
    partner: "Mozilla",
    status: "Active",
    focus: "Digital Infrastructure"
  },
  {
    title: "Community Language Data Cooperative (CLDC)",
    overview: "Community-controlled language data platform ensuring equitable access to linguistic resources.",
    partner: "Community Partners",
    status: "Active",
    focus: "Digital Infrastructure"
  },
  {
    title: "AI Governance Comparison Project",
    overview: "Comparative analysis of AI governance frameworks across African nations and emerging economies.",
    partner: "Research Network",
    status: "Active",
    focus: "Governance"
  },
  {
    title: "Digital Sovereignty & AI Readiness",
    overview: "Assessment framework for national digital infrastructure and AI deployment readiness.",
    partner: "Policy Partners",
    status: "Active",
    focus: "Infrastructure"
  },
  {
    title: "Public Communication Framework",
    overview: "Strategic communication toolkit for responsible AI narrative development and public engagement.",
    partner: "Media Partners",
    status: "Active",
    focus: "Communication"
  },
  {
    title: "AI Hub Language Ecosystems",
    overview: "Contributing to UNDP/G7 initiatives on scaling language data systems for sustainable development.",
    partner: "UNDP/G7",
    status: "Active",
    focus: "Infrastructure"
  }
]

// Research Pipeline Data
const researchPipeline = [
  {
    initiative: "Community Language Data Cooperative",
    focusArea: "Digital Infrastructure",
    status: "Active"
  },
  {
    initiative: "VoiceLink Uganda",
    focusArea: "Digital Infrastructure",
    status: "Active"
  },
  {
    initiative: "AI Governance Benchmarking (Africa)",
    focusArea: "Governance",
    status: "Drafting"
  },
  {
    initiative: "National AI Readiness Assessment Model",
    focusArea: "Governance",
    status: "In Development"
  },
  {
    initiative: "Public Communication Framework for AI",
    focusArea: "Communication",
    status: "In Development"
  },
  {
    initiative: "Community Consent Toolkit",
    focusArea: "Ethics",
    status: "Prototyping"
  },
  {
    initiative: "Digital Sovereignty Playbook",
    focusArea: "Governance/Infrastructure",
    status: "Research Phase"
  }
]

// Status color mapping
const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800"
    case "Drafting":
      return "bg-blue-100 text-blue-800"
    case "In Development":
      return "bg-yellow-100 text-yellow-800"
    case "Prototyping":
      return "bg-purple-100 text-purple-800"
    case "Research Phase":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

export default function PolicyLabPage() {
  const [policyLabExpandedTheme, setPolicyLabExpandedTheme] = useState<string | null>(null)
  const [journalInsights, setJournalInsights] = useState<any[]>([])
  const [insightsLoading, setInsightsLoading] = useState(true)

  // Fetch journal insights tagged "Neuravox Policy Lab"
  useEffect(() => {
    async function fetchInsights() {
      try {
        const response = await fetch('/api/journal')
        if (response.ok) {
          const data = await response.json()
          // Filter for Policy Lab tagged articles (simulated - would need actual tagging)
          const policyLabArticles = data.articles?.filter((article: any) =>
            article.title?.toLowerCase().includes('policy') ||
            article.title?.toLowerCase().includes('governance') ||
            article.summary?.toLowerCase().includes('policy lab')
          ).slice(0, 3) || []
          setJournalInsights(policyLabArticles)
        }
      } catch (error) {
        console.warn('Failed to fetch journal insights:', error)
      } finally {
        setInsightsLoading(false)
      }
    }

    fetchInsights()
  }, [])

  const togglePolicyLabTheme = (themeId: string) => {
    setPolicyLabExpandedTheme(current => current === themeId ? null : themeId)
  }

  // Reset expanded state when component mounts to prevent interference
  useEffect(() => {
    setPolicyLabExpandedTheme(null)
  }, [])

  return (
    <div className="min-h-screen">
      {/* SECTION A - Hero / Positioning */}
      <section className="bg-[#1d4e63] text-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Neuravox Policy Lab</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              A multidisciplinary research and communication hub advancing AI governance, public engagement, digital infrastructure policy and community-led AI methods across Africa and emerging regions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION B - Research Themes (4 Themes) */}
      <section id="research-themes" className="py-20 bg-[#ebf3f6]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">Research Themes</h2>
            <p className="text-xl text-[#1a1a1a] max-w-3xl mx-auto">
              Four core domains anchoring our strategic research and policy work
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
            {researchThemes.map((theme, index) => {
              const IconComponent = theme.icon
              const isExpanded = policyLabExpandedTheme === theme.id

              return (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-fit border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#046a83] rounded-lg flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-[#0a2f58]">{theme.title}</h3>
                      </div>

                      <p className="text-[#1a1a1a] leading-relaxed mb-6">{theme.summary}</p>

                      <Button
                        onClick={() => togglePolicyLabTheme(theme.id)}
                        variant="outline"
                        size="sm"
                        className="border-[#046a83] text-[#046a83] hover:bg-[#046a83] hover:text-white"
                      >
                        {policyLabExpandedTheme === theme.id ? (
                          <>Less Details <ChevronUp className="ml-2 h-4 w-4" /></>
                        ) : (
                          <>Read More <ChevronDown className="ml-2 h-4 w-4" /></>
                        )}
                      </Button>

                      {policyLabExpandedTheme === theme.id && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h4 className="font-semibold text-[#0a2f58] mb-3">Key Areas:</h4>
                          <ul className="space-y-2">
                            {theme.details.map((detail, idx) => (
                              <li key={`${theme.id}-detail-${idx}`} className="flex items-start gap-3">
                                <Target className="h-4 w-4 text-[#046a83] mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-[#1a1a1a]">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION C - Active Projects */}
      <section id="active-projects" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">Active Projects</h2>
            <p className="text-xl text-[#1a1a1a] max-w-3xl mx-auto">
              Current initiatives Neuravox directly owns and leads across our research domains
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-[#051bccd] text-white">{project.focus}</Badge>
                      <Badge variant="outline" className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold text-[#0a2f58] mb-3">{project.title}</h3>
                    <p className="text-[#1a1a1a] text-sm leading-relaxed mb-4">{project.overview}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{project.partner}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D - Research Pipeline */}
      <section id="research-pipeline" className="py-20 bg-[#ebf3f6]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">Research Pipeline</h2>
            <p className="text-xl text-[#1a1a1a] max-w-3xl mx-auto">
              Current and upcoming initiatives across our research domains
            </p>
          </motion.div>

          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#0a2f58] text-white">
                      <tr>
                        <th className="px-6 py-4 text-left font-semibold">Initiative</th>
                        <th className="px-6 py-4 text-left font-semibold">Focus Area</th>
                        <th className="px-6 py-4 text-left font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {researchPipeline.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-6 py-4 font-medium text-[#0a2f58]">{item.initiative}</td>
                          <td className="px-6 py-4 text-[#1a1a1a]">{item.focusArea}</td>
                          <td className="px-6 py-4">
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* SECTION E - Leadership */}
      <section id="leadership" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">Policy Lab Leadership</h2>
            <p className="text-xl text-[#1a1a1a] max-w-3xl mx-auto">
              Leading strategic research and engagement across AI governance and communication
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full">
                    <Image
                      src="/gideon.jpeg"
                      alt="Gideon Abako"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0a2f58] mb-2">Gideon Abako</h3>
                  <p className="text-[#046a83] font-medium mb-4">Founder</p>
                  <p className="text-[#1a1a1a] leading-relaxed">
                    Focus: AI governance, communication strategy, digital infrastructure policy, language AI.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 overflow-hidden rounded-full">
                    <Image
                      src="/images/georgine.png"
                      alt="Georgina Obwana"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0a2f58] mb-2">Georgina Obwana</h3>
                  <p className="text-[#046a83] font-medium mb-4">Communications Strategist</p>
                  <p className="text-[#1a1a1a] leading-relaxed">
                    Focus: Strategic communication, public narratives, institutional outreach, visibility, engagement.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION F - Insights Feed (Conditional) */}
      {!insightsLoading && journalInsights.length > 0 && (
        <section id="insights" className="py-20 bg-[#ebf3f6]">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">Latest Insights</h2>
              <p className="text-xl text-[#1a1a1a] max-w-3xl mx-auto">
                Recent research and commentary from the Neuravox Policy Lab
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {journalInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <Badge className="bg-[#051bccd] text-white mb-3">Policy Lab</Badge>
                      <h3 className="text-lg font-bold text-[#0a2f58] mb-3 line-clamp-2">{insight.title}</h3>
                      {insight.summary && (
                        <p className="text-[#1a1a1a] text-sm leading-relaxed mb-4 line-clamp-3">{insight.summary}</p>
                      )}
                      {insight.isoDate && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(insight.isoDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-[#046a83] text-[#046a83] hover:bg-[#046a83] hover:text-white"
                      >
                        <a href={insight.link} target="_blank" rel="noopener noreferrer">
                          Read More <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION G - Contact / Collaboration CTA */}
      <section id="collaboration" className="py-20 bg-[#1d4e63] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Collaborate with the Policy Lab</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Partner with us on research, request policy analysis, or collaborate on AI governance initiatives across Africa and emerging regions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-[#51bccd] hover:bg-[#46a7b7] text-white"
              >
                <a href="mailto:contact@neuravox.org" className="inline-flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Start a Collaboration
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-[#1d4e63]"
              >
                <a href="/contact" className="text-white hover:text-[#1d4e63]">
                  Contact Our Team
                </a>
              </Button>
            </div>

          </motion.div>
        </div>
      </section>
    </div>
  )
}