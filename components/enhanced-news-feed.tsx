"use client"

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  Calendar,
  User,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Tag,
  Download,
  Share2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useNews, useNewsSearch, NewsArticle } from '@/lib/news'
import Image from 'next/image'

interface EnhancedNewsFeedProps {
  showSearch?: boolean
  articlesPerPage?: number
  showPagination?: boolean
  showImages?: boolean
  compact?: boolean
  showFilters?: boolean
  featuredFirst?: boolean
}

export function EnhancedNewsFeed({
  showSearch = true,
  articlesPerPage = 5,
  showPagination = true,
  showImages = true,
  compact = false,
  showFilters: enableFilters = true,
  featuredFirst = true
}: EnhancedNewsFeedProps) {
  const { newsData, loading, error, refetch } = useNews()
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    selectedType,
    setSelectedType,
    searchResults,
    categories,
    loading: searchLoading,
    clearSearch
  } = useNewsSearch()

  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  // Determine which articles to show
  const displayArticles = useMemo(() => {
    let articles: NewsArticle[] = []

    if (searchQuery || selectedCategories.length || selectedType) {
      articles = searchResults
    } else if (newsData) {
      articles = [...newsData.articles]

      // Sort featured articles first if enabled
      if (featuredFirst) {
        articles.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        })
      }
    }

    return articles
  }, [newsData, searchResults, searchQuery, selectedCategories, selectedType, featuredFirst])

  // Pagination
  const totalPages = Math.ceil(displayArticles.length / articlesPerPage)
  const paginatedArticles = displayArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  )

  // Reset page when search changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategories, selectedType])

  const handleShare = (article: NewsArticle) => {
    const url = article.externalLink || `${window.location.origin}${article.link}`
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    window.open(linkedInUrl, '_blank', 'width=600,height=400')
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  // Show loading skeletons immediately to prevent blank screen
  if (loading && !newsData) {
    return (
      <div className="space-y-4">
        <div className="text-center mb-4">
          <p className="text-gray-600">Loading latest articles...</p>
        </div>
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

  if (error && !newsData) {
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6 text-center">
          <p className="text-orange-600 mb-4">Having trouble loading articles</p>
          <p className="text-sm text-gray-600 mb-4">Please check your connection and try again</p>
          <Button onClick={() => refetch()} variant="outline" size="sm" className="mr-2">
            Try Again
          </Button>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            size="sm"
          >
            Refresh Page
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!newsData?.articles.length && !searchResults.length) {
    return (
      <Card data-aos="fade-up">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No articles available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4" data-aos="fade-down">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className={`font-bold text-[#0a2f58] ${compact ? 'text-xl' : 'text-2xl lg:text-3xl'}`}>
              News & Insights
            </h2>
            {!compact && newsData && (
              <p className="text-gray-600 mt-1">
                Latest articles, research, and updates • {newsData.totalCount} total articles
              </p>
            )}
          </div>

          {showSearch && (
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {enableFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="shrink-0"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {enableFilters && (showFilters || selectedCategories.length || selectedType) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 rounded-lg p-4 space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Type Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Source</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="All sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All sources</SelectItem>
                      <SelectItem value="journal">Journal articles</SelectItem>
                      <SelectItem value="local">Local news</SelectItem>
                      <SelectItem value="external">External publications</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filters */}
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium text-gray-700">Categories</label>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          selectedCategories.includes(category)
                            ? 'bg-[#046a83] text-white'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Filters & Clear */}
              {(searchQuery || selectedCategories.length || selectedType) && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <Badge variant="outline" className="bg-blue-50">
                        Search: "{searchQuery}"
                      </Badge>
                    )}
                    {selectedType && (
                      <Badge variant="outline" className="bg-green-50">
                        Source: {selectedType}
                      </Badge>
                    )}
                    {selectedCategories.map((cat) => (
                      <Badge key={cat} variant="outline" className="bg-purple-50">
                        {cat}
                        <button
                          onClick={() => handleCategoryToggle(cat)}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>

                  <Button
                    onClick={clearSearch}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search results indicator */}
        {(searchQuery || selectedCategories.length || selectedType) && (
          <div className="text-sm text-gray-600" data-aos="fade-in">
            {searchLoading ? (
              <span className="inline-flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#046a83]"></div>
                Searching...
              </span>
            ) : (
              <>
                Found {displayArticles.length} article{displayArticles.length !== 1 ? 's' : ''}
                {searchQuery && ` matching "${searchQuery}"`}
              </>
            )}
          </div>
        )}
      </div>

      {/* Articles */}
      <div className="space-y-6">
        {paginatedArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <Card className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md ${
              article.featured ? 'ring-2 ring-[#51bccd] ring-opacity-50' : ''
            }`}>
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
                    {/* Type and Featured Badge */}
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          article.type === 'journal' ? 'bg-blue-100 text-blue-800' :
                          article.type === 'external' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {article.type === 'journal' ? 'Journal Article' :
                         article.type === 'external' ? 'External Publication' :
                         'News'}
                      </Badge>

                      {article.featured && (
                        <Badge className="text-xs bg-[#51bccd] text-white">
                          Featured
                        </Badge>
                      )}
                    </div>

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

                    {/* Collaboration line for external publications */}
                    {article.collaboration && (
                      <p className="text-sm text-gray-600 italic mb-2">
                        {article.collaboration}
                      </p>
                    )}

                    {article.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}

                    {article.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.categories.slice(0, 4).map((category, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                        {article.categories.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{article.categories.length - 4} more
                          </Badge>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {/* Primary action - Read/View */}
                      <Button
                        asChild
                        size="sm"
                        className="bg-[#51bccd] hover:bg-[#46a7b7] text-white"
                      >
                        <a
                          href={article.externalLink || article.link}
                          target={article.externalLink ? "_blank" : "_self"}
                          rel={article.externalLink ? "noopener noreferrer" : undefined}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {article.type === 'external' ? 'View Document' : 'Read Article'}
                        </a>
                      </Button>

                      {/* Download button for PDFs */}
                      {article.link.endsWith('.pdf') && !article.externalLink && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-gray-300 hover:bg-gray-50"
                        >
                          <a href={article.link} download>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      )}

                      {/* Share button */}
                      <Button
                        onClick={() => handleShare(article)}
                        variant="outline"
                        size="sm"
                        className="border-gray-300 hover:bg-gray-50"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
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
        <div className="flex justify-center items-center gap-2 mt-8" data-aos="fade-up">
          <Button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex gap-1">
            {[...Array(Math.min(totalPages, 7))].map((_, i) => {
              const pageNum = totalPages <= 7
                ? i + 1
                : currentPage <= 4
                  ? i + 1
                  : currentPage >= totalPages - 3
                    ? totalPages - 6 + i
                    : currentPage - 3 + i

              return (
                <Button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  className="w-10"
                >
                  {pageNum}
                </Button>
              )
            })}
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
      {!compact && newsData && (
        <div className="text-center text-sm text-gray-500" data-aos="fade-up">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <span className="font-medium">{newsData.sources.journal}</span> Journal articles
            </div>
            <div>
              <span className="font-medium">{newsData.sources.external}</span> External publications
            </div>
            <div>
              <span className="font-medium">{newsData.sources.local}</span> Local news
            </div>
          </div>
          <p>Last updated: {new Date(newsData.lastUpdated).toLocaleString()}</p>
          <Button onClick={refetch} variant="ghost" size="sm" className="mt-2">
            Refresh
          </Button>
        </div>
      )}
    </div>
  )
}

export default EnhancedNewsFeed
