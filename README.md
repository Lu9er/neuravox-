# Neuravox Website

A dynamic, responsive website for Neuravox featuring unified news management, automatic journal article detection, interactive notifications, and comprehensive search functionality.

## ✨ **KEY UPDATES**

### **News-Centric Architecture**
- ✅ **Unified News Hub**: Single `/news` page for all content types
- ✅ **Journal Integration**: Automatic RSS sync from https://journal.neuravox.org
- ✅ **External Publications**: UNDP community paper and collaborative works
- ✅ **Local Content**: Blog-style posts and announcements
- ✅ **No Journal Tab**: Removed standalone journal page per requirements

### **Advanced Search & Filtering**
- ✅ **Fuse.js Integration**: Fuzzy search across titles, content, authors
- ✅ **Category Filtering**: Filter by source type and topic tags
- ✅ **Mobile-First Design**: Responsive search and filters
- ✅ **Progressive Enhancement**: Works without JavaScript

## 🎯 **FEATURES**

### **1. Unified News System**
- **Combined Content**: Journal articles + local posts + external publications
- **Smart Categorization**: Automatic tagging and source identification
- **Featured Content**: Highlighted publications (UNDP paper featured)
- **Load More**: Pagination with 10 articles per page

### **2. Interactive Notification System**
- **Journal-Only Alerts**: Toast notifications for new journal articles
- **24-hour Cooldown**: localStorage-based visitor management
- **LinkedIn Sharing**: Direct share functionality
- **Admin Toggle**: Emergency disable via config

### **3. Enhanced Search Experience**
- **Fuzzy Search**: Fuse.js powered search across all content
- **Multi-Filter**: Combine text search with category/source filters
- **Real-time Results**: Live search with debounced queries
- **Tag System**: Visual category tags for easy browsing

### **4. Mobile-Responsive Design**
- **AOS Animations**: Smooth reveal-on-scroll effects
- **Touch-Optimized**: Mobile-first interface design
- **Collapsible Filters**: Space-efficient mobile filtering
- **Progressive Enhancement**: Core functionality without JS

### **5. Admin & Configuration**
- **Popup Control**: `disable_journal_popups` flag
- **Feature Toggles**: Enable/disable search, filters, notifications
- **Debug Options**: Logging and development controls
- **Cache Management**: Smart caching for optimal performance

## 🗂️ **CONTENT STRUCTURE**

### **Content Types**

1. **Journal Articles** (`type: "journal"`)
   - Fetched from https://journal.neuravox.org/feed
   - Auto-categorized with "Journal", "AI Policy" tags
   - Trigger notification system

2. **External Publications** (`type: "external"`)
   - UNDP Community Paper (featured)
   - Collaborative research and reports
   - PDF downloads available

3. **Local News** (`type: "local"`)
   - Blog-style posts and announcements
   - Internal news and updates

### **Data Sources**

```
/data/
├── journal-latest.json     # 20 latest journal articles
├── local-news.json        # Local posts and external publications
└── admin-config.json      # Feature flags and settings
```

## 📦 **DEPLOYMENT**

### **Package Ready**: `neuravox-news-optimized-deployment.zip` (1.2MB)

**Contents**:
- ✅ All HTML pages (homepage, about, news, etc.)
- ✅ Enhanced News page with search and filtering
- ✅ Journal data and local news content
- ✅ UNDP community paper PDF asset
- ✅ Optimized CSS/JS bundles with AOS animations
- ✅ Admin configuration and .htaccess

### **Deployment Steps**:
1. **Backup existing site**
2. **Clear public_html directory**
3. **Upload and extract** `neuravox-news-optimized-deployment.zip`
4. **Verify .htaccess** file is present
5. **Test all features** on live site

## 🎯 **QA CHECKLIST RESULTS**

| ✅ Requirement | Status | Details |
|----------------|---------|---------|
| **No Journal tab** | ✅ PASS | Completely removed from navigation and footer |
| **News shows journal + local** | ✅ PASS | Combined feed with 20 latest journal articles |
| **UNDP paper in News** | ✅ PASS | Featured with collaboration line and PDF download |
| **Homepage toast for new articles** | ✅ PASS | Shows for unseen journal articles, 24h cooldown |
| **Search and tag filters work** | ✅ PASS | Mobile responsive with real-time results |
| **Mobile responsive** | ✅ PASS | Tested across standard breakpoints |
| **AOS animations smooth** | ✅ PASS | Accessible reveal-on-scroll effects |
| **fetch-journal.js script** | ✅ PASS | Gets 20 items, writes to /data/journal-latest.json |
| **Build succeeded** | ✅ PASS | Zero errors, optimized production build |
| **Admin popup toggle** | ✅ PASS | `disable_journal_popups` in admin-config.json |

## 🚀 **TECHNICAL IMPLEMENTATION**

### **News Service Architecture**

```typescript
// Unified news management
class NewsService {
  async getCombinedNews(): Promise<CombinedNewsData>
  async searchNews(query: string, options): Promise<NewsArticle[]>
  async shouldShowNotification(): Promise<{ show: boolean; article?: NewsArticle }>
}
```

### **Search Implementation**

```typescript
// Advanced search with Fuse.js
const fuse = new Fuse(articles, {
  keys: ['title', 'excerpt', 'content', 'author', 'categories'],
  threshold: 0.4
})
```

### **Journal Sync Workflow**

1. **Build Time**: `npm run build` → `node scripts/fetch-journal.js` → latest 20 articles
2. **Client Side**: Homepage load checks for new articles
3. **Notification**: Shows toast for unseen journal articles only
4. **Admin Control**: Toggle via `disable_journal_popups` config

## 📱 **RESPONSIVE DESIGN**

### **Breakpoints Tested**
- **Mobile**: 320px - 768px ✅
- **Tablet**: 768px - 1024px ✅
- **Desktop**: 1024px+ ✅

### **Mobile Optimizations**
- Collapsible filter panel
- Touch-friendly search interface
- Optimized typography scaling
- Efficient space usage

## 🔧 **DEVELOPMENT SCRIPTS**

```bash
npm run dev              # Development server
npm run build            # Production build (includes journal fetch)
npm run fetch-journal    # Manual journal sync (20 articles)
npm run lint             # Code quality check
```

## 📋 **ADMIN CONTROLS**

### **Disable Notifications**
```json
{
  "disable_journal_popups": true,
  "features": {
    "journalNotifications": { "globalDisable": true }
  }
}
```

### **Configure Search**
```json
{
  "features": {
    "newsSearch": { "enabled": true, "maxResults": 20 },
    "newsFeed": { "showFilters": true, "articlesPerPage": 10 }
  }
}
```

## 📚 **CONTENT MANAGEMENT**

### **Adding Local News**
1. Edit `/data/local-news.json`
2. Add new article with required fields:
   - `id`, `title`, `excerpt`, `content`
   - `publishedAt`, `author`, `categories`
   - `type: "local"` or `"external"`
3. Rebuild and deploy

### **UNDP Paper Integration**
- **Featured Status**: `"featured": true` in local-news.json
- **PDF Asset**: Available at `/assets/undp-community-paper.pdf`
- **Collaboration Line**: Displayed prominently in news feed
- **Multi-Action**: View online + Download PDF options

## 🎨 **PERFORMANCE**

- **Static Generation**: All pages pre-built
- **Code Splitting**: Automatic bundle optimization
- **Smart Caching**: 5-minute client cache for news data
- **AOS Animations**: Lightweight, accessible animations
- **Bundle Size**: 87.5kB shared JavaScript

## 🌐 **BROWSER SUPPORT**

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+
- **Mobile**: iOS Safari 14+, Android Chrome 88+
- **Progressive Enhancement**: Core functionality without JavaScript

---

**🎉 Ready for deployment!** The Neuravox site now features a comprehensive news system that consolidates journal articles, external publications, and local content into a single, searchable, mobile-optimized experience.

**Latest Commit**: `fad5d0f` - Complete News-centric transformation