'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Fetching from Medium API wrapper
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/medium`)
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  // Structural Refactor: Using useMemo for better performance during filtering
  const processedArticles = useMemo(() => {
    return articles
      .map((item, idx) => ({ ...item, rank: idx + 1 }))
      .filter((post) => {
        const normalizedTitle = post?.title?.toLowerCase() || '';
        const normalizedSnippet = post?.contentSnippet?.toLowerCase() || '';
        const searchTerms = query.toLowerCase();
        
        return (
          normalizedTitle.includes(searchTerms) || 
          normalizedSnippet.includes(searchTerms) || 
          post.rank.toString().includes(searchTerms)
        );
      });
  }, [articles, query]);

  // Refactored Motion Variants
  const tileVariants = {
    off: { opacity: 0, y: 30 },
    on: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1], 
        delay: i * 0.08 
      },
    }),
  };

  const badgeVariants = {
    initial: { x: -30, opacity: 0, rotate: -15 },
    animate: { 
      x: 0, 
      opacity: 1, 
      rotate: -12, 
      transition: { type: 'spring', stiffness: 100, delay: 0.5 } 
    },
  };

  return (
    <div className="container mx-auto py-32 px-6 lg:px-12 bg-background min-h-screen">
      {/* Visual Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-primary uppercase">
          Articles & Insights
        </h1>
        <div className="h-1.5 w-20 bg-primary/10 mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Modern Search Input */}
      <div className="max-w-xl mx-auto mb-20">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search by topic, keyword, or index..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border border-zinc-200 bg-white/50 backdrop-blur-md shadow-sm outline-none ring-primary/5 focus:ring-4 focus:border-primary/20 transition-all text-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>
      </div>

      {/* Optimized Grid Layout */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {processedArticles.length > 0 ? (
            processedArticles.map((post, index) => {
              const isActiveMatch = query && (
                post.title?.toLowerCase().includes(query.toLowerCase()) ||
                post.contentSnippet?.toLowerCase().includes(query.toLowerCase())
              );

              return (
                <motion.a
                  key={post.rank}
                  layout
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={tileVariants}
                  initial="off"
                  animate="on"
                  exit={{ opacity: 0, scale: 0.9 }}
                  custom={index}
                  whileHover={{ y: -8, shadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                  className={`group relative flex flex-col justify-between p-8 rounded-[2.5rem] border transition-all duration-500 overflow-hidden h-full ${
                    isActiveMatch 
                    ? 'border-primary/30 bg-primary/[0.02] ring-2 ring-primary/10' 
                    : 'border-zinc-100 bg-white'
                  }`}
                >
                  {/* Decorative Background Glow */}
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    {/* Unique Badge Component */}
                    {post.rank === 1 && (
                      <motion.div
                        variants={badgeVariants}
                        className="absolute -left-0 -top-0 bg-zinc-900 text-white text-[10px] font-black px-4 py-1.5 shadow-xl"
                      >
                        NEW RELEASE
                      </motion.div>
                    )}

                    <div className="text-zinc-400 font-mono text-xs mb-4">#{post.rank.toString().padStart(2, '0')}</div>
                    
                    <h2 className="text-xl font-bold mb-4 text-primary leading-tight group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-zinc-500 text-sm leading-relaxed line-clamp-4 font-medium italic">
                      {post.contentSnippet}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between relative z-10 pt-6 border-t border-zinc-50">
                    <span className="text-xs font-black text-primary uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300">
                      Read Article &rarr;
                    </span>
                    <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                    </div>
                  </div>
                </motion.a>
              );
            })
          ) : (
            // Improved Skeleton Logic
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-zinc-100 animate-pulse rounded-[2.5rem] h-80 w-full" />
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BlogPage;