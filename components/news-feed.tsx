"use client"

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Calendar, User, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useJournal, JournalArticle } from '@/lib/journal'
import Fuse from 'fuse.js'
import Image from 'next/image'

interface NewsFeedProps {
  showSearch?: boolean
  articlesPerPage?: number
  showPagination?: boolean
  showImages?: boolean
  compact?: boolean
}

export function NewsFeed({
  showSearch = true,
  articlesPerPage = 5,
  showPagination = true,
  showImages = true,
  compact = false
}: NewsFeedProps) {
  const { journalData, loading, error, refetch } = useJournal()
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Configure Fuse.js for search
  const fuse = useMemo(() => {
    if (!journalData?.articles) return null

    return new Fuse(journalData.articles, {
      keys: ['title', 'excerpt', 'author', 'categories'],
      threshold: 0.4,
      includeScore: true
    })
  }, [journalData?.articles])

  // Filter articles based on search
  const filteredArticles = useMemo(() => {
    if (!journalData?.articles) return []

    if (!searchQuery.trim()) {
      return journalData.articles
    }

    if (!fuse) return []

    const results = fuse.search(searchQuery)
    return results.map(result => result.item)
  }, [journalData?.articles, searchQuery, fuse])

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  )

  // Reset page when search changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <p className="text-red-600 mb-4">Failed to load journal articles</p>
          <Button onClick={refetch} variant="outline" size="sm">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!journalData?.articles.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No articles available</p>
        </CardContent>
      </Card>
    )
  }

  const handleShare = (article: JournalArticle) => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(article.link)}`
    window.open(linkedInUrl, '_blank', 'width=600,height=400')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`font-bold text-[#0a2f58] ${compact ? 'text-xl' : 'text-2xl lg:text-3xl'}`}>
            Latest from the Journal
          </h2>
          {!compact && (
            <p className="text-gray-600 mt-1">
              {journalData.feedDescription}
            </p>
          )}
        </div>

        {showSearch && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        )}
      </div>

      {/* Search results indicator */}
      {searchQuery && (
        <div className="text-sm text-gray-600">
          Found {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      )}

      {/* Articles */}
      <div className="space-y-4">
        {paginatedArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
              <CardContent className={compact ? "p-4" : "p-6"}>
                <div className={`grid gap-4 ${showImages && article.image ? 'lg:grid-cols-4' : 'grid-cols-1'}`}>
                  {/* Image */}
                  {showImages && article.image && (
                    <div className="lg:col-span-1">
                      <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 200px"
                        />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className={showImages && article.image ? "lg:col-span-3" : "col-span-1"}>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(article.publishedAt).toLocaleDateString()}
                      <span>•</span>
                      <User className="h-4 w-4" />
                      {article.author}
                    </div>

                    <h3 className={`font-semibold text-[#0a2f58] mb-2 ${compact ? 'text-lg' : 'text-xl'} line-clamp-2`}>
                      {article.title}
                    </h3>

                    {article.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}

                    {article.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.categories.slice(0, 3).map((category, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        asChild
                        size="sm"
                        className="bg-[#51bccd] hover:bg-[#46a7b7] text-white"
                      >
                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Read Article
                        </a>
                      </Button>
                      <Button
                        onClick={() => handleShare(article)}
                        variant="outline"
                        size="sm"
                        className="border-gray-300 hover:bg-gray-50"
                      >
                        Share on LinkedIn
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                className="w-10"
              >
                {i + 1}
              </Button>
            ))}
          </div>

          <Button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Footer */}
      {!compact && (
        <div className="text-center text-sm text-gray-500">
          <p>
            Last updated: {new Date(journalData.lastUpdated).toLocaleString()}
          </p>
          <Button onClick={refetch} variant="ghost" size="sm" className="mt-2">
            Refresh
          </Button>
        </div>
      )}
    </div>
  )
}

export default NewsFeed
