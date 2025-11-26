import { useState, useEffect } from 'react';

export interface JournalArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  link: string;
  publishedAt: string;
  author: string;
  categories: string[];
  image?: string;
}

export interface JournalData {
  lastUpdated: string;
  feedTitle: string;
  feedDescription: string;
  articles: JournalArticle[];
  latestArticleId: string | null;
  latestArticleDate: string | null;
  error?: string;
}

export interface AdminConfig {
  features: {
    journalNotifications: {
      enabled: boolean;
      globalDisable: boolean;
      cooldownHours: number;
      maxNotificationsPerDay: number;
    };
    newsSearch: { enabled: boolean; maxResults: number };
    newsFeed: { enabled: boolean; articlesPerPage: number; showImages: boolean };
  };
  journal: {
    rssUrl: string;
    fetchIntervalMinutes: number;
    cacheExpiryHours: number;
  };
  ui: {
    enableAnimations: boolean;
    reducedMotion: boolean;
    showBranding: boolean;
  };
  debug: { logLevel: string; enableConsoleOutput: boolean };
}

class JournalService {
  private static instance: JournalService;
  private journalData: JournalData | null = null;
  private adminConfig: AdminConfig | null = null;
  private lastFetch = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  static getInstance(): JournalService {
    if (!JournalService.instance) {
      JournalService.instance = new JournalService();
    }
    return JournalService.instance;
  }

  async getAdminConfig(): Promise<AdminConfig> {
    if (!this.adminConfig) {
      try {
        const response = await fetch('/data/admin-config.json');
        this.adminConfig = await response.json();
      } catch (error) {
        console.warn('Failed to load admin config, using defaults:', error);
        this.adminConfig = this.getDefaultConfig();
      }
    }
    return this.adminConfig!;
  }

  async getJournalData(forceRefresh = false): Promise<JournalData> {
    const now = Date.now();
    const shouldRefresh = forceRefresh ||
      !this.journalData ||
      (now - this.lastFetch > this.CACHE_DURATION);

    if (shouldRefresh) {
      try {
        // First try static data from build
        const response = await fetch('/data/journal-latest.json');
        const staticData: JournalData = await response.json();

        // Check if data is recent enough
        const dataAge = now - new Date(staticData.lastUpdated).getTime();
        const maxAge = 6 * 60 * 60 * 1000; // 6 hours

        if (dataAge < maxAge) {
          this.journalData = staticData;
          this.lastFetch = now;
        } else {
          // Try to fetch fresh data (fallback to static if it fails)
          try {
            const freshData = await this.fetchFreshData();
            this.journalData = freshData;
          } catch {
            this.journalData = staticData;
          }
          this.lastFetch = now;
        }
      } catch (error) {
        console.warn('Failed to load journal data:', error);
        this.journalData = this.getEmptyData();
      }
    }

    return this.journalData!;
  }

  async fetchFreshData(): Promise<JournalData> {
    // This would typically call an API endpoint that runs the fetch script
    // For now, we'll just throw to fall back to static data
    throw new Error('Fresh data fetching not implemented in client');
  }

  private getDefaultConfig(): AdminConfig {
    return {
      features: {
        journalNotifications: {
          enabled: true,
          globalDisable: false,
          cooldownHours: 24,
          maxNotificationsPerDay: 3,
        },
        newsSearch: { enabled: true, maxResults: 20 },
        newsFeed: { enabled: true, articlesPerPage: 5, showImages: true },
      },
      journal: {
        rssUrl: 'https://journal.neuravox.org/feed',
        fetchIntervalMinutes: 60,
        cacheExpiryHours: 6,
      },
      ui: { enableAnimations: true, reducedMotion: false, showBranding: true },
      debug: { logLevel: 'info', enableConsoleOutput: false },
    };
  }

  private getEmptyData(): JournalData {
    return {
      lastUpdated: new Date().toISOString(),
      feedTitle: 'Neuravox Journal',
      feedDescription: 'AI policy, governance and public interest, with a focus on Africa',
      articles: [],
      latestArticleId: null,
      latestArticleDate: null,
      error: 'Failed to load journal data',
    };
  }

  // Notification management
  hasSeenArticle(articleId: string): boolean {
    const seen = localStorage.getItem('neuravox-seen-articles');
    if (!seen) return false;
    const seenIds = JSON.parse(seen);
    return seenIds.includes(articleId);
  }

  markArticleAsSeen(articleId: string): void {
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
    const lastShown = localStorage.getItem('neuravox-last-notification');
    if (!lastShown) return true;

    const lastTime = new Date(lastShown).getTime();
    const now = Date.now();
    const cooldownMs = 24 * 60 * 60 * 1000; // 24 hours

    return (now - lastTime) > cooldownMs;
  }

  setNotificationShown(): void {
    localStorage.setItem('neuravox-last-notification', new Date().toISOString());
  }

  async shouldShowNotification(): Promise<{ show: boolean; article?: JournalArticle }> {
    const config = await this.getAdminConfig();

    if (!config.features.journalNotifications.enabled ||
        config.features.journalNotifications.globalDisable) {
      return { show: false };
    }

    const data = await this.getJournalData();
    if (!data.articles.length) {
      return { show: false };
    }

    const latestArticle = data.articles[0];

    if (this.hasSeenArticle(latestArticle.id) || !this.isNotificationCooledDown()) {
      return { show: false };
    }

    return { show: true, article: latestArticle };
  }
}

// React Hook
export function useJournal() {
  const [journalData, setJournalData] = useState<JournalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const service = JournalService.getInstance();

  const fetchData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getJournalData(forceRefresh);
      setJournalData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch journal data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    journalData,
    loading,
    error,
    refetch: () => fetchData(true),
    service,
  };
}

// Notification Hook
export function useJournalNotification() {
  const [notification, setNotification] = useState<{
    show: boolean;
    article?: JournalArticle;
  }>({ show: false });

  const service = JournalService.getInstance();

  useEffect(() => {
    const checkNotification = async () => {
      const result = await service.shouldShowNotification();
      setNotification(result);
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

export default JournalService;