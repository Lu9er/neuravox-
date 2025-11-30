"use client"

import { motion } from "framer-motion"
import EnhancedNewsFeed from "@/components/enhanced-news-feed"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"

export default function NewsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#1d4e63] text-white py-16 lg:py-20" data-aos="fade-in">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">News & Insights</h1>
            <p className="text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto">
              Latest articles, research, and commentary from Neuravox and the global AI governance community
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Feed */}
      <section className="py-12 lg:py-20 bg-[#ebf3f6]">
        <div className="container mx-auto px-4">
          <div data-aos="fade-up" data-aos-delay="200">
            <EnhancedNewsFeed
              showSearch={false}
              articlesPerPage={5}
              showPagination={false}
              showImages={true}
              compact={false}
              showFilters={false}
              featuredFirst={true}
            />
          </div>

          {/* See More Button */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg" className="bg-[#046a83] hover:bg-[#035a6f] text-white">
              <a
                href="https://journal.neuravox.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                See More on Neuravox Journal
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <p className="text-gray-600 mt-4 text-sm">
              Visit our journal for more in-depth articles, research, and commentary
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
