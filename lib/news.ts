import { useState, useEffect, useMemo } from 'react';
import Fuse from 'fuse.js';

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  link: string;
  externalLink?: string;
  publishedAt: string;
  author: string;
  categories: string[];
  image?: string;
  type: 'journal' | 'local' | 'external';
  collaboration?: string;
  featured?: boolean;
}

export interface LocalNewsData {
  lastUpdated: string;
  articles: NewsArticle[];
}

export interface JournalData {
  lastUpdated: string;
  feedTitle: string;
  feedDescription: string;
  articles: NewsArticle[];
  latestArticleId: string | null;
  latestArticleDate: string | null;
  error?: string;
}

export interface CombinedNewsData {
  articles: NewsArticle[];
  totalCount: number;
  lastUpdated: string;
  sources: {
    local: number;
    journal: number;
    external: number;
  };
}

class NewsService {
  private static instance: NewsService;
  private combinedData: CombinedNewsData | null = null;
  private lastFetch = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  static getInstance(): NewsService {
    if (!NewsService.instance) {
      NewsService.instance = new NewsService();
    }
    return NewsService.instance;
  }

  async getCombinedNews(forceRefresh = false): Promise<CombinedNewsData> {
    const now = Date.now();
    const shouldRefresh = forceRefresh ||
      !this.combinedData ||
      (now - this.lastFetch > this.CACHE_DURATION);

    if (shouldRefresh) {
      try {
        // Fetch local news
        const localResponse = await fetch('/data/local-news.json');
        const localData: LocalNewsData = await localResponse.json();

        // Fetch journal data from API first, fallback to static file
        let journalData: JournalData;
        try {
          const journalResponse = await fetch('/api/journal');
          const apiData = await journalResponse.json();

          // Transform API response to match expected JournalData format
          journalData = {
            lastUpdated: apiData.lastUpdated,
            feedTitle: 'Neuravox Journal',
            feedDescription: 'Neuravox Journal publishes sharp, independent writing on AI policy, governance and public interest, with a focus on Africa and globally relevant perspectives.',
            articles: apiData.articles.map((article: any) => ({
              id: article.link || `article-${Date.now()}`,
              title: article.title,
              excerpt: article.summary || '',
              content: article.summary || '',
              link: article.link,
              publishedAt: article.isoDate || new Date().toISOString(),
              author: article.author || 'Neuravox',
              categories: ['Journal', 'AI Policy'],
              image: article.image
            })),
            latestArticleId: apiData.articles.length > 0 ? (apiData.articles[0].link || null) : null,
            latestArticleDate: apiData.articles.length > 0 ? (apiData.articles[0].isoDate || null) : null
          };
        } catch (apiError) {
          console.warn('Failed to fetch from API, falling back to static file:', apiError);
          // Fallback to static file
          const fallbackResponse = await fetch('/data/journal-latest.json');
          journalData = await fallbackResponse.json();
        }

        // Transform journal articles to match NewsArticle interface
        const journalArticles: NewsArticle[] = journalData.articles.map(article => ({
          ...article,
          type: 'journal' as const,
          categories: article.categories || ['Journal', 'AI Policy']
        }));

        // Transform local articles
        const localArticles: NewsArticle[] = localData.articles.map(article => ({
          ...article,
          type: article.type || 'local' as any
        }));

        // Combine and sort by publication date
        const allArticles = [...localArticles, ...journalArticles]
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

        this.combinedData = {
          articles: allArticles,
          totalCount: allArticles.length,
          lastUpdated: new Date().toISOString(),
          sources: {
            local: localArticles.filter(a => a.type === 'local').length,
            journal: journalArticles.length,
            external: localArticles.filter(a => a.type === 'external').length
          }
        };

        this.lastFetch = now;
      } catch (error) {
        console.warn('Failed to load news data:', error);
        this.combinedData = {
          articles: [],
          totalCount: 0,
          lastUpdated: new Date().toISOString(),
          sources: { local: 0, journal: 0, external: 0 }
        };
      }
    }

    return this.combinedData!;
  }

  async getLatestNews(limit = 5): Promise<NewsArticle[]> {
    const data = await this.getCombinedNews();
    return data.articles.slice(0, limit);
  }

  async searchNews(query: string, options: {
    categories?: string[];
    type?: string;
    limit?: number;
  } = {}): Promise<NewsArticle[]> {
    const data = await this.getCombinedNews();
    let articles = data.articles;

    // Filter by type
    if (options.type) {
      articles = articles.filter(article => article.type === options.type);
    }

    // Filter by categories
    if (options.categories && options.categories.length > 0) {
      articles = articles.filter(article =>
        article.categories.some(cat =>
          options.categories!.some(filterCat =>
            cat.toLowerCase().includes(filterCat.toLowerCase())
          )
        )
      );
    }

    // If no search query, return filtered results
    if (!query.trim()) {
      return articles.slice(0, options.limit || 20);
    }

    // Configure Fuse.js for search
    const fuse = new Fuse(articles, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'excerpt', weight: 0.3 },
        { name: 'content', weight: 0.2 },
        { name: 'author', weight: 0.1 },
        { name: 'categories', weight: 0.1 }
      ],
      threshold: 0.4,
      includeScore: true
    });

    const results = fuse.search(query);
    return results
      .map(result => result.item)
      .slice(0, options.limit || 20);
  }

  async getAllCategories(): Promise<string[]> {
    const data = await this.getCombinedNews();
    const categoriesSet = new Set<string>();

    data.articles.forEach(article => {
      article.categories.forEach(cat => categoriesSet.add(cat));
    });

    return Array.from(categoriesSet).sort();
  }

  // Notification methods (for homepage notifications)
  hasSeenArticle(articleId: string): boolean {
    if (typeof window === 'undefined') return true;
    const seen = localStorage.getItem('neuravox-seen-articles');
    if (!seen) return false;
    const seenIds = JSON.parse(seen);
    return seenIds.includes(articleId);
  }

  markArticleAsSeen(articleId: string): void {
    if (typeof window === 'undefined') return;
    const seen = localStorage.getItem('neuravox-seen-articles');
    const seenIds = seen ? JSON.parse(seen) : [];
    if (!seenIds.includes(articleId)) {
      seenIds.push(articleId);
      // Keep only last 100 to prevent localStorage bloat
      if (seenIds.length > 100) {
        seenIds.splice(0, seenIds.length - 100);
      }
      localStorage.setItem('neuravox-seen-articles', JSON.stringify(seenIds));
    }
  }

  isNotificationCooledDown(): boolean {
    if (typeof window === 'undefined') return false;
    const lastShown = localStorage.getItem('neuravox-last-notification');
    if (!lastShown) return true;

    const lastTime = new Date(lastShown).getTime();
    const now = Date.now();
    const cooldownMs = 24 * 60 * 60 * 1000; // 24 hours

    return (now - lastTime) > cooldownMs;
  }

  setNotificationShown(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('neuravox-last-notification', new Date().toISOString());
  }

  async shouldShowNotification(): Promise<{ show: boolean; article?: NewsArticle }> {
    const data = await this.getCombinedNews();

    // Only show notifications for journal articles
    const journalArticles = data.articles.filter(a => a.type === 'journal');
    if (!journalArticles.length) {
      return { show: false };
    }

    const latestJournalArticle = journalArticles[0];

    if (this.hasSeenArticle(latestJournalArticle.id) || !this.isNotificationCooledDown()) {
      return { show: false };
    }

    return { show: true, article: latestJournalArticle };
  }
}

// React Hook
export function useNews() {
  const [newsData, setNewsData] = useState<CombinedNewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const service = NewsService.getInstance();

  const fetchData = async (forceRefresh = false) => {
    try {
      // Don't set loading true if we already have data (prevents flashing)
      if (!newsData || forceRefresh) {
        setLoading(true);
      }
      setError(null);
      const data = await service.getCombinedNews(forceRefresh);
      setNewsData(data);
      setInitialized(true);
    } catch (err) {
      console.error('Failed to fetch news:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news data');
      // Try to use cached data even on error
      try {
        const cachedData = await service.getCombinedNews(false);
        if (cachedData) {
          setNewsData(cachedData);
          setInitialized(true);
        }
      } catch {
        // Ignore cache errors
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Force immediate fetch on mount
    fetchData();
  }, []);

  // Also ensure we fetch if we're not initialized after a timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!initialized && !loading) {
        console.log('Force fetching due to initialization timeout');
        fetchData();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [initialized, loading]);

  return {
    newsData,
    loading,
    error,
    refetch: () => fetchData(true),
    service,
  };
}

// Search Hook
export function useNewsSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchResults, setSearchResults] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const service = NewsService.getInstance();

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery || selectedCategories.length || selectedType) {
        setLoading(true);
        try {
          const results = await service.searchNews(searchQuery, {
            categories: selectedCategories,
            type: selectedType,
            limit: 20
          });
          setSearchResults(results);
        } catch (error) {
          console.error('Search failed:', error);
          setSearchResults([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategories, selectedType, service]);

  // Load categories
  useEffect(() => {
    service.getAllCategories().then(setCategories).catch(console.error);
  }, [service]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    selectedType,
    setSelectedType,
    searchResults,
    categories,
    loading,
    clearSearch: () => {
      setSearchQuery('');
      setSelectedCategories([]);
      setSelectedType('');
      setSearchResults([]);
    }
  };
}

// Notification Hook
export function useNewsNotification() {
  const [notification, setNotification] = useState<{
    show: boolean;
    article?: NewsArticle;
  }>({ show: false });

  const service = NewsService.getInstance();

  useEffect(() => {
    const checkNotification = async () => {
      // Check admin config for notifications enabled
      try {
        const configResponse = await fetch('/data/admin-config.json');
        const config = await configResponse.json();

        if (!config.features.journalNotifications.enabled ||
            config.features.journalNotifications.globalDisable) {
          return;
        }

        const result = await service.shouldShowNotification();
        setNotification(result);
      } catch (error) {
        console.warn('Failed to check notification status:', error);
      }
    };

    // Only check on client side
    if (typeof window !== 'undefined') {
      checkNotification();
    }
  }, [service]);

  const dismissNotification = (articleId: string) => {
    service.markArticleAsSeen(articleId);
    service.setNotificationShown();
    setNotification({ show: false });
  };

  return {
    notification,
    dismissNotification,
  };
}

export default NewsService;
