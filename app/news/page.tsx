"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Calendar, User, Newspaper } from "lucide-react"
import { useState, useEffect } from "react"

interface Article {
  title: string
  link?: string
  isoDate?: string | null
  author?: string | null
  summary?: string | null
  image?: string | null
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // AGGRESSIVE DATA FETCHING - Multiple attempts, multiple strategies
  useEffect(() => {
    let mounted = true

    async function fetchData() {
      if (!mounted) return

      // Try 1: Direct API call
      try {
        console.log('Attempting to fetch from API...')
        const response = await fetch('/api/journal?nocache=true')
        if (response.ok) {
          const data = await response.json()
          if (mounted && data.articles?.length > 0) {
            setArticles(data.articles.slice(0, 5)) // Limit to 5
            setLoading(false)
            return
          }
        }
      } catch (err) {
        console.warn('API fetch failed, trying fallback...', err)
      }

      // Try 2: Fallback to static file
      try {
        const fallbackResponse = await fetch('/data/journal-latest.json')
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json()
          if (mounted && fallbackData.articles?.length > 0) {
            setArticles(fallbackData.articles.slice(0, 5))
            setLoading(false)
            return
          }
        }
      } catch (err) {
        console.warn('Fallback fetch failed', err)
      }

      // Try 3: Hardcoded fallback (emergency backup)
      if (mounted) {
        setError('Unable to load articles')
        setLoading(false)
      }
    }

    // Start fetching immediately
    fetchData()

    // Also retry after short delay if nothing loaded
    const retryTimer = setTimeout(() => {
      if (mounted && articles.length === 0 && !error) {
        console.log('Retrying data fetch...')
        fetchData()
      }
    }, 1000)

    return () => {
      mounted = false
      clearTimeout(retryTimer)
    }
  }, [])

  // FORCE SHOW CONTENT - Never show blank screen
  if (loading && articles.length === 0) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-[#1d4e63] text-white py-16 lg:py-20">
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

        {/* Loading Section */}
        <section className="py-12 lg:py-20 bg-[#ebf3f6]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <Newspaper className="h-16 w-16 mx-auto mb-4 text-[#046a83] animate-pulse" />
              <p className="text-xl text-gray-600">Loading latest articles...</p>
              <p className="text-sm text-gray-500 mt-2">Please wait while we fetch the latest content</p>
            </div>

            {/* Loading Skeletons */}
            <div className="space-y-6 max-w-4xl mx-auto">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#1d4e63] text-white py-16 lg:py-20">
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

      {/* Articles Section */}
      <section className="py-12 lg:py-20 bg-[#ebf3f6]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {error ? (
              <Card className="border-orange-200 bg-orange-50 mb-8">
                <CardContent className="p-6 text-center">
                  <p className="text-orange-600 mb-4">Having trouble loading articles</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-[#046a83] hover:bg-[#035a6f] text-white"
                  >
                    Refresh Page
                  </Button>
                </CardContent>
              </Card>
            ) : null}

            {/* Articles */}
            <div className="space-y-6">
              {articles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-[#0a2f58] mb-3 hover:text-[#046a83] transition-colors">
                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                          {article.title}
                        </a>
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                        {article.author && (
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{article.author}</span>
                          </div>
                        )}
                        {article.isoDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(article.isoDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>

                      {article.summary && (
                        <p className="text-gray-700 mb-4 line-clamp-3">{article.summary}</p>
                      )}

                      <Button
                        asChild
                        variant="outline"
                        className="border-[#046a83] text-[#046a83] hover:bg-[#046a83] hover:text-white"
                      >
                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                          Read Full Article <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* See More Button */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
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
          </motion.div>
        </div>
      </section>
    </div>
  )
}
