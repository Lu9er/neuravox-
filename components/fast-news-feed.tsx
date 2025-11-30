"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, User, ExternalLink } from 'lucide-react'

interface Article {
  title: string
  link?: string
  isoDate?: string | null
  author?: string | null
  summary?: string | null
  image?: string | null
}

interface FastNewsFeedProps {
  limit?: number
  compact?: boolean
}

export function FastNewsFeed({ limit = 3, compact = true }: FastNewsFeedProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function fetchData() {
      if (!mounted) return

      // Try API first
      try {
        const response = await fetch('/api/journal?nocache=true')
        if (response.ok) {
          const data = await response.json()
          if (mounted && data.articles?.length > 0) {
            setArticles(data.articles.slice(0, limit))
            setLoading(false)
            return
          }
        }
      } catch (err) {
        console.warn('API fetch failed, trying fallback...', err)
      }

      // Fallback to static file
      try {
        const fallbackResponse = await fetch('/data/journal-latest.json')
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json()
          if (mounted && fallbackData.articles?.length > 0) {
            setArticles(fallbackData.articles.slice(0, limit))
            setLoading(false)
            return
          }
        }
      } catch (err) {
        console.warn('Fallback fetch failed', err)
      }

      // Emergency fallback
      if (mounted) {
        setLoading(false)
      }
    }

    fetchData()

    // Retry if needed
    const retryTimer = setTimeout(() => {
      if (mounted && articles.length === 0 && loading) {
        fetchData()
      }
    }, 1000)

    return () => {
      mounted = false
      clearTimeout(retryTimer)
    }
  }, [limit])

  if (loading && articles.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(limit)].map((_, i) => (
          <Card key={i} className="animate-pulse border-0 shadow-lg overflow-hidden">
            <div className="aspect-video bg-gray-200"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6 text-center">
          <p className="text-orange-600">No articles available at the moment</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
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
            <CardContent className={compact ? "p-4" : "p-6"}>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#51bccd] text-white">
                  Journal Article
                </span>
              </div>

              <h3 className={`font-bold text-[#0a2f58] mb-3 hover:text-[#046a83] transition-colors ${compact ? 'text-base' : 'text-lg'}`}>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="line-clamp-2 block"
                >
                  {article.title}
                </a>
              </h3>

              <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                {article.author && (
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span className="truncate">{article.author}</span>
                  </div>
                )}
                {article.isoDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(article.isoDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {article.summary && (
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">{article.summary}</p>
              )}

              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-[#046a83] hover:text-[#035a6f] font-medium transition-colors"
              >
                Read Article <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}