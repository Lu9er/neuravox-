"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Share2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useJournalNotification, JournalArticle } from '@/lib/journal'

interface JournalNotificationProps {
  onDismiss?: () => void
}

export function JournalNotification({ onDismiss }: JournalNotificationProps) {
  const { notification, dismissNotification } = useJournalNotification()
  const [isVisible, setIsVisible] = useState(true)

  if (!notification.show || !notification.article || !isVisible) {
    return null
  }

  const article = notification.article

  const handleDismiss = () => {
    setIsVisible(false)
    dismissNotification(article.id)
    onDismiss?.()
  }

  const handleRead = () => {
    window.open(article.link, '_blank')
    handleDismiss()
  }

  const handleShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(article.link)}`
    window.open(linkedInUrl, '_blank', 'width=600,height=400')
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="fixed bottom-4 right-4 z-50 max-w-sm w-full"
      >
        <Card className="bg-white shadow-lg border border-gray-200 overflow-hidden">
          <div className="relative">
            {/* Header */}
            <div className="bg-[#1d4e63] text-white p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm font-medium">Latest from the Journal</span>
                </div>
                <button
                  onClick={handleDismiss}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Dismiss notification"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                {article.title}
              </h3>

              {article.excerpt && (
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
              )}

              <div className="text-xs text-gray-500 mb-3">
                By {article.author} • {new Date(article.publishedAt).toLocaleDateString()}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  onClick={handleRead}
                  size="sm"
                  className="flex-1 bg-[#51bccd] hover:bg-[#46a7b7] text-white text-xs"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Read
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="px-3 border-gray-300 hover:bg-gray-50"
                >
                  <Share2 className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Progress bar for auto-dismiss (optional) */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-[#51bccd]"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 30, ease: "linear" }}
              onAnimationComplete={handleDismiss}
            />
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

export default JournalNotification