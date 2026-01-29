const express = require('express');
const Parser = require('rss-parser');
const router = express.Router();
const parser = new Parser();

// FIX: Added /feed/ in the URL
const MEDIUM_RSS_URL = 'https://medium.com/feed/@mdsadiksadik464';

router.get('/', async (req, res) => {
  try {
    const feed = await parser.parseURL(MEDIUM_RSS_URL);
    const posts = feed.items.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      contentSnippet: item.contentSnippet,
      // Medium RSS usually has content:encoded for images, but snippet is safer
    }));
    res.json(posts);
  } catch (err) {
    console.error("Medium Error:", err);
    res.status(500).json({ error: 'Failed to fetch Medium posts' });
  }
});

module.exports = router;
