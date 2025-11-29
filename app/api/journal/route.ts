import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

const RSS_URL = 'https://journal.neuravox.org/feed'

type Article = {
  title: string
  link?: string
  isoDate?: string | null
  author?: string | null
  summary?: string | null
  image?: string | null
}

const parser = new Parser()

async function fetchAndParseFeed(): Promise<{ lastUpdated: string; articles: Article[] }> {
  const feed = await parser.parseURL(RSS_URL)
  const lastUpdated = new Date().toISOString()

  const articles: Article[] = (feed.items || []).map((item) => {
    // Try to extract an image from enclosure, media:content, or content
    let image: string | null = null

    // Check enclosure for images
    if ((item as any).enclosure && (item as any).enclosure.url) {
      const enclosureUrl = (item as any).enclosure.url
      if (enclosureUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        image = enclosureUrl
      }
    }

    // Check media:content
    if (!image && (item as any)['media:content'] && (item as any)['media:content']['$'] && (item as any)['media:content']['$'].url) {
      image = (item as any)['media:content']['$'].url
    }

    // Try to extract image from content HTML if available
    if (!image && item.content) {
      const imgMatch = item.content.match(/<img[^>]+src="([^"]+)"/i)
      if (imgMatch) {
        image = imgMatch[1]
      }
    }

    return {
      title: item.title || '',
      link: item.link,
      isoDate: item.isoDate || item.pubDate || null,
      author: item.creator || item.author || (item as any)['dc:creator'] || null,
      summary: item.contentSnippet || item.summary || item.content || null,
      image,
    }
  })

  return { lastUpdated, articles }
}

export async function GET(req: NextRequest) {
  try {
    const data = await fetchAndParseFeed()

    // Cache at CDN edge for 10 minutes, allow stale while revalidate 60s
    const headers = {
      'Cache-Control': 's-maxage=600, stale-while-revalidate=60',
      'Content-Type': 'application/json',
    }

    return NextResponse.json(data, { status: 200, headers })
  } catch (err: any) {
    console.error('Failed to fetch journal feed:', err)

    const headers = {
      'Cache-Control': 's-maxage=60, stale-while-revalidate=30',
      'Content-Type': 'application/json',
    }

    return NextResponse.json(
      { error: 'Failed to fetch journal feed', details: String(err?.message || err) },
      { status: 500, headers }
    )
  }
}
