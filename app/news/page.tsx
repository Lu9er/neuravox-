"use client"

import { motion } from "framer-motion"
import NewsFeed from "@/components/news-feed"

export default function NewsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#1d4e63] text-white py-20" data-aos="fade-in">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">News & Insights</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay updated with the latest insights, research, and commentary on AI governance from the Neuravox Journal
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Feed */}
      <section className="py-20 bg-[#ebf3f6]">
        <div className="container mx-auto px-4">
          <div data-aos="fade-up" data-aos-delay="200">
            <NewsFeed
              showSearch={true}
              articlesPerPage={8}
              showPagination={true}
              showImages={true}
              compact={false}
            />
          </div>
        </div>
      </section>
    </div>
  )
}