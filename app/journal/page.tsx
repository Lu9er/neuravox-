"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Calendar, User } from "lucide-react"

const recentPosts = [
  {
    title: "The Future of AI Governance in Africa",
    excerpt: "Exploring community-centered approaches to AI governance that prioritize local needs and values.",
    date: "December 2024",
    author: "Neuravox Policy Lab",
    readTime: "8 min read",
  },
  {
    title: "Language AI and Cultural Preservation",
    excerpt: "How multilingual AI systems can support rather than threaten linguistic diversity in the Global South.",
    date: "November 2024",
    author: "Neuravox Policy Lab",
    readTime: "12 min read",
  },
  {
    title: "Public Interest Technology: A Framework",
    excerpt: "Defining principles and practices for technology that truly serves the public interest.",
    date: "October 2024",
    author: "Neuravox Policy Lab",
    readTime: "10 min read",
  },
]

export default function JournalPage() {
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
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Neuravox Journal</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Insights, research, and commentary on AI governance, public interest technology, and ethical innovation
            </p>
            <Button asChild size="lg" className="bg-[#51bccd] hover:bg-[#46a7b7] text-white">
              <a
                href="https://journal.neuravox.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>


      {/* External Publications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">External Publications</h2>
            <p className="text-xl text-[#1a1a1a] max-w-3xl mx-auto">Collaborative works and contributions</p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-[#0a2f58] mb-4">
                  Community Paper on Language AI
                </h3>
                <p className="text-[#1a1a1a] mb-4 leading-relaxed">
                  A collaborative work on advancing multilingual AI capabilities in partnership with UNDP and Italia G7 Presidency.
                  Neuravox contributed to this community paper addressing critical challenges in language AI development.
                </p>
                <div className="flex items-center text-sm text-[#1a1a1a] mb-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  2024
                  <span className="mx-2">•</span>
                  Collaborative Work
                </div>
                <Button asChild variant="outline" className="border-[#046a83] text-[#046a83] hover:bg-[#046a83] hover:text-white">
                  <a
                    href="https://cdn.prod.website-files.com/66e31d90ea60e260f5ea025f/68546ed270a71196702c0081_Community%20Paper_Final%20for%20AI%20Hub%20Launch%20-%20REVISED%20VERSION%20(1).pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    View Publication <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Recent Posts Preview */}
      <section className="py-20 bg-[#ebf3f6]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58] mb-4">Recent Publications</h2>
            <p className="text-xl text-[#1a1a1a] max-w-3xl mx-auto">Latest insights from our research and analysis</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recentPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-[#1a1a1a] mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {post.date}
                      <span className="mx-2">•</span>
                      {post.readTime}
                    </div>
                    <h3 className="text-xl font-semibold text-[#0a2f58] mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-[#1a1a1a] mb-4 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-[#1a1a1a]">
                      <User className="h-4 w-4 mr-2" />
                      {post.author}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#046a83] text-[#046a83] hover:bg-[#046a83] hover:text-white"
            >
              <a
                href="https://journal.neuravox.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                View All Posts on Neuravox Journal <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
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
                <h3 className="text-3xl font-bold text-[#0a2f58] mb-4">Stay Updated</h3>
                <p className="text-xl text-[#1a1a1a] mb-8 max-w-2xl mx-auto">
                  Subscribe to our journal for the latest insights on AI governance, public interest technology, and
                  ethical innovation.
                </p>
                <Button asChild size="lg" className="bg-[#046a83] hover:bg-[#035a6f] text-white">
                  <a
                    href="https://journal.neuravox.org/subscribe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    Subscribe for Updates <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
