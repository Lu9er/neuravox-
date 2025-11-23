# Neuravox Website

A dynamic, responsive website for Neuravox featuring automatic journal article detection, interactive notifications, and a comprehensive news feed system.

## Features

### 🔔 Dynamic Journal Integration
- **Automatic Article Detection**: Automatically fetches new articles from https://journal.neuravox.org
- **Smart Notifications**: Dismissible toast notifications for new articles with 24-hour cooldown
- **Real-time Updates**: Client-side polling for articles published after build time

### 📰 News & Content System
- **News Feed**: Paginated news feed with search functionality using Fuse.js
- **Client-side Search**: Fast, fuzzy search across article titles, content, and authors
- **Responsive Design**: Mobile-first approach with smooth animations

### 🎨 Interactive Experience
- **Smooth Animations**: AOS (Animate On Scroll) and Framer Motion integration
- **Micro-interactions**: Tasteful hover states and transitions
- **Progressive Enhancement**: Site works without JavaScript

### ⚙️ Admin Controls
- **Configuration System**: JSON-based admin configuration for feature toggles
- **Notification Controls**: Ability to disable popups globally or temporarily
- **Debug Options**: Built-in logging and console output controls

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion + AOS
- **Search**: Fuse.js for client-side fuzzy search
- **Data Fetching**: RSS Parser for journal integration
- **UI Components**: Radix UI with custom styling

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd neuravox-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Fetch latest journal data**
   ```bash
   npm run fetch-journal
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Journal Sync System

### How it Works

The journal sync system operates on multiple levels:

1. **Build Time**: RSS feed is fetched during build and saved to `/data/journal-latest.json`
2. **Client Side**: Browser checks for new articles on homepage load
3. **Caching**: Smart caching prevents excessive API calls

### RSS Feed Integration

The system fetches articles from `https://journal.neuravox.org/feed` (Substack RSS):

```javascript
// Automatic during build
npm run build  // Runs prebuild script

// Manual fetch
npm run fetch-journal
```

### Notification Logic

```javascript
// Check if user should see notification
const shouldShow = await journalService.shouldShowNotification()

// Notification shows when:
// 1. New article exists (not seen before)
// 2. 24 hours have passed since last notification
// 3. Notifications are enabled in admin config
```

### Data Structure

Articles are stored with the following structure:

```json
{
  "lastUpdated": "2025-11-23T10:48:15.921Z",
  "feedTitle": "Neuravox Journal",
  "articles": [
    {
      "id": "unique-article-id",
      "title": "Article Title",
      "excerpt": "Brief description...",
      "link": "https://journal.neuravox.org/p/article",
      "publishedAt": "2025-11-23T10:00:00Z",
      "author": "Author Name",
      "categories": ["AI Policy", "Governance"],
      "image": "https://image-url.jpg"
    }
  ]
}
```

## Configuration

### Admin Config (`/data/admin-config.json`)

```json
{
  "features": {
    "journalNotifications": {
      "enabled": true,
      "globalDisable": false,  // Emergency disable
      "cooldownHours": 24
    },
    "newsSearch": { "enabled": true },
    "newsFeed": { "enabled": true, "articlesPerPage": 5 }
  }
}
```

### Disabling Notifications

**Temporary Disable**: Set `globalDisable: true` in admin config
**Permanent Disable**: Set `enabled: false` for journalNotifications

## Components

### Core Components

- **`JournalNotification`**: Toast notification system
- **`NewsFeed`**: Article listing with search and pagination
- **`ClientLayout`**: Handles AOS initialization and notifications

### Pages

- **`/`**: Homepage with hero, pillars, and compact news feed
- **`/news`**: Full news feed with search functionality
- **`/about`**, **`/our-work`**, etc.: Existing content pages

## Deployment

### Build Process

```bash
# Install dependencies
npm ci

# Fetch latest journal data
npm run fetch-journal

# Build static site
npm run build
```

### Deployment to Namecheap

1. **Build the site**:
   ```bash
   npm run build
   ```

2. **Upload contents** of `out/` directory to `public_html/`

3. **Ensure .htaccess** is uploaded for clean URLs

### File Structure After Build

```
out/
├── index.html              # Homepage
├── news.html              # News page
├── about.html             # About page
├── data/
│   ├── journal-latest.json # Journal data
│   └── admin-config.json   # Configuration
├── _next/                 # Assets (CSS, JS, fonts)
└── .htaccess             # URL rewriting
```

## Performance Considerations

- **Static Generation**: All pages pre-built for fast loading
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for optimal bundles
- **Caching**: Smart caching for journal data (5-minute client cache)
- **Progressive Enhancement**: Core functionality works without JS

## Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+
- **Mobile**: iOS Safari 14+, Android Chrome 88+
- **Graceful Degradation**: Notifications require JavaScript, but core site works without

## Development Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run fetch-journal    # Fetch latest journal data
npm run lint             # Run ESLint
```

## Troubleshooting

### Journal Data Not Loading
1. Check RSS feed availability: https://journal.neuravox.org/feed
2. Run `npm run fetch-journal` manually
3. Check `/data/journal-latest.json` exists and has content

### Notifications Not Appearing
1. Check admin config: `journalNotifications.enabled`
2. Clear localStorage: `localStorage.clear()`
3. Check 24-hour cooldown period

### Build Failures
1. Ensure all dependencies installed: `npm ci`
2. Check Node.js version (18+)
3. Clear Next.js cache: `rm -rf .next`

## Contributing

1. Create feature branch from `main`
2. Make changes with proper TypeScript types
3. Test thoroughly on mobile and desktop
4. Update documentation if needed
5. Submit pull request

## License

© 2024 Neuravox. All rights reserved.