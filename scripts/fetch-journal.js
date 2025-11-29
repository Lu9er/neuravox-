#!/usr/bin/env node

const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

const RSS_URL = 'https://journal.neuravox.org/feed';
const DATA_FILE = path.join(__dirname, '..', 'public', 'data', 'journal-latest.json');

async function fetchJournalData() {
  console.log('Fetching journal data from RSS feed...');

  const parser = new Parser({
    customFields: {
      item: [
        ['content:encoded', 'content'],
        ['dc:creator', 'author'],
        ['media:content', 'image'],
        ['guid', 'guid']
      ]
    }
  });

  try {
    const feed = await parser.parseURL(RSS_URL);

    const articles = feed.items.slice(0, 20).map(item => {
      // Extract first paragraph for excerpt
      const contentHtml = item.content || item.description || '';
      const textContent = contentHtml.replace(/<[^>]*>/g, ''); // Strip HTML
      const firstParagraph = textContent.split('\n')[0] || textContent;
      const excerpt = firstParagraph.length > 150
        ? firstParagraph.substring(0, 150) + '...'
        : firstParagraph;

      // Extract image URL if available
      let imageUrl = null;
      if (item.enclosure && item.enclosure.url && item.enclosure.url.includes('image')) {
        imageUrl = item.enclosure.url;
      }

      return {
        id: item.guid || item.link,
        title: item.title,
        excerpt: excerpt.trim(),
        content: item.content || item.description,
        link: item.link,
        publishedAt: item.pubDate,
        author: item.author || item['dc:creator'] || 'Neuravox Journal',
        categories: item.categories || [],
        image: imageUrl
      };
    });

    const journalData = {
      lastUpdated: new Date().toISOString(),
      feedTitle: feed.title,
      feedDescription: feed.description,
      articles: articles,
      latestArticleId: articles.length > 0 ? articles[0].id : null,
      latestArticleDate: articles.length > 0 ? articles[0].publishedAt : null
    };

    // Ensure data directory exists
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(journalData, null, 2));

    console.log(`✅ Successfully fetched ${articles.length} articles`);
    console.log(`📄 Data saved to: ${DATA_FILE}`);
    console.log(`🆕 Latest article: "${articles[0]?.title || 'N/A'}"`);

    return journalData;
  } catch (error) {
    console.error('❌ Error fetching journal data:', error.message);

    // Create empty fallback data
    const fallbackData = {
      lastUpdated: new Date().toISOString(),
      feedTitle: 'Neuravox Journal',
      feedDescription: 'AI policy, governance and public interest, with a focus on Africa',
      articles: [],
      latestArticleId: null,
      latestArticleDate: null,
      error: error.message
    };

    fs.writeFileSync(DATA_FILE, JSON.stringify(fallbackData, null, 2));
    throw error;
  }
}

// CLI execution
if (require.main === module) {
  fetchJournalData()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Script failed:', error.message);
      process.exit(1);
    });
}

module.exports = fetchJournalData;
