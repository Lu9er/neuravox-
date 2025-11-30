"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Calendar, User, Newspaper, FileText, Rss } from "lucide-react"
import { useState, useEffect } from "react"

interface JournalArticle {
  title: string
  link?: string
  isoDate?: string | null
  author?: string | null
  summary?: string | null
  image?: string | null
}

interface LocalNewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  link: string
  externalLink?: string
  publishedAt: string
  author: string
  categories: string[]
  image?: string | null
  type: 'journal' | 'local' | 'external'
  collaboration?: string
  featured?: boolean
}

export default function NewsPage() {
  const [journalArticles, setJournalArticles] = useState<JournalArticle[]>([])
  const [localNews, setLocalNews] = useState<LocalNewsArticle[]>([])
  const [journalLoading, setJournalLoading] = useState(true)
  const [localLoading, setLocalLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch Local News
  useEffect(() => {
    let mounted = true

    async function fetchLocalNews() {
      if (!mounted) return

      try {
        const response = await fetch('/data/local-news.json')
        if (response.ok) {
          const data = await response.json()
          if (mounted && data.articles?.length > 0) {
            setLocalNews(data.articles)
            setLocalLoading(false)
            return
          }
        }
      } catch (err) {
        console.warn('Local news fetch failed', err)
      }

      if (mounted) {
        setLocalLoading(false)
      }
    }

    fetchLocalNews()

    return () => {
      mounted = false
    }
  }, [])

  // Fetch Journal Articles - AGGRESSIVE DATA FETCHING
  useEffect(() => {
    let mounted = true

    async function fetchJournalData() {
      if (!mounted) return

      // Try 1: Direct API call
      try {
        const response = await fetch('/api/journal?nocache=true')
        if (response.ok) {
          const data = await response.json()
          if (mounted && data.articles?.length > 0) {
            setJournalArticles(data.articles.slice(0, 3)) // Limit to 3
            setJournalLoading(false)
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
            setJournalArticles(fallbackData.articles.slice(0, 3))
            setJournalLoading(false)
            return
          }
        }
      } catch (err) {
        console.warn('Fallback fetch failed', err)
      }

      // Try 3: Emergency fallback
      if (mounted) {
        setError('Unable to load journal articles')
        setJournalLoading(false)
      }
    }

    fetchJournalData()

    // Retry logic
    const retryTimer = setTimeout(() => {
      if (mounted && journalArticles.length === 0 && !error) {
        fetchJournalData()
      }
    }, 1000)

    return () => {
      mounted = false
      clearTimeout(retryTimer)
    }
  }, [])

  // Show loading only if both are loading and no content
  if ((journalLoading || localLoading) && journalArticles.length === 0 && localNews.length === 0) {
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
                Latest news, articles, and research from Neuravox and the global AI governance community
              </p>
            </motion.div>
          </div>
        </section>

        {/* Loading Section */}
        <section className="py-12 lg:py-20 bg-[#ebf3f6]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <Newspaper className="h-16 w-16 mx-auto mb-4 text-[#046a83] animate-pulse" />
              <p className="text-xl text-gray-600">Loading latest content...</p>
              <p className="text-sm text-gray-500 mt-2">Please wait while we fetch news and articles</p>
            </div>

            {/* Loading Skeletons */}
            <div className="space-y-6 max-w-6xl mx-auto">
              {[...Array(4)].map((_, i) => (
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
              Latest news, articles, and research from Neuravox and the global AI governance community
            </p>
          </motion.div>
        </div>
      </section>

      <div className="bg-[#ebf3f6] py-12 lg:py-20">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Latest News & Events Section */}
          {localNews.length > 0 && (
            <motion.section
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Newspaper className="h-8 w-8 text-[#046a83]" />
                <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58]">Latest News & Events</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {localNews.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                      {article.image && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#046a83] text-white">
                            {article.collaboration || 'News & Events'}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-[#0a2f58] mb-3 hover:text-[#046a83] transition-colors line-clamp-2">
                          <a href={article.externalLink || article.link} target="_blank" rel="noopener noreferrer">
                            {article.title}
                          </a>
                        </h3>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 text-sm line-clamp-3">{article.excerpt}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.categories.slice(0, 3).map((category, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                              {category}
                            </span>
                          ))}
                        </div>

                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-[#046a83] text-[#046a83] hover:bg-[#046a83] hover:text-white"
                        >
                          <a href={article.externalLink || article.link} target="_blank" rel="noopener noreferrer">
                            Read Full Article <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Journal Articles & Research Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <FileText className="h-8 w-8 text-[#51bccd]" />
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2f58]">Journal Articles & Research</h2>
            </div>

            {error ? (
              <Card className="border-orange-200 bg-orange-50 mb-8">
                <CardContent className="p-6 text-center">
                  <p className="text-orange-600 mb-4">Having trouble loading journal articles</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-[#046a83] hover:bg-[#035a6f] text-white"
                  >
                    Refresh Page
                  </Button>
                </CardContent>
              </Card>
            ) : null}

            {journalArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {journalArticles.map((article, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                      {article.image && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#51bccd] text-white">
                            Research Article
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-[#0a2f58] mb-3 hover:text-[#046a83] transition-colors line-clamp-2">
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
                          <p className="text-gray-700 mb-4 text-sm line-clamp-3">{article.summary}</p>
                        )}

                        <Button
                          asChild
                          variant="outline"
                          size="sm"
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
            ) : (
              <Card className="border-gray-200 bg-gray-50">
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600">No journal articles available at the moment</p>
                </CardContent>
              </Card>
            )}

            {/* See More Journal Button */}
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
          </motion.section>
        </div>
      </div>
    </div>
  )
}
