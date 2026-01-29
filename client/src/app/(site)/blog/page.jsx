'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BlogPage = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        // FIX: Hardcoded fallback URL taaki env undefined hone par bhi crash na ho
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://sadik-portfolio-x51n.onrender.com';
        
        const response = await fetch(`${baseUrl}/api/medium`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        // FIX: Response status check (Render sleep mode me HTML bhej deta hai)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          console.warn("Received data is not an array:", data);
          setArticles([]);
        }
      } catch (err) {
        console.error("Critical Fetch error:", err.message);
        setArticles([]); // Reset state to prevent .map errors
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []); // Dependency array empty hai infinite loop se bachne ke liye

  const processedArticles = useMemo(() => {
    // FIX: articles undefined na ho uska safety check
    const list = Array.isArray(articles) ? articles : [];
    return list
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

  const tileVariants = {
    off: { opacity: 0, y: 30 },
    on: (i) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
    }),
  };

  const badgeVariants = {
    initial: { x: -30, opacity: 0, rotate: -15 },
    animate: { x: 0, opacity: 1, rotate: -12, transition: { type: 'spring', stiffness: 100, delay: 0.5 } },
  };

  return (
    <div className="container mx-auto py-32 px-6 lg:px-12 bg-background min-h-screen">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-primary uppercase">
          Articles & Insights
        </h1>
        <div className="h-1.5 w-20 bg-primary/10 mx-auto mt-4 rounded-full" />
      </motion.div>

      <div className="max-w-xl mx-auto mb-20">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search by topic..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border border-zinc-200 bg-white/50 backdrop-blur-md shadow-sm outline-none ring-primary/5 focus:ring-4 focus:border-primary/20 transition-all text-sm"
          />
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {!isLoading && processedArticles.length > 0 ? (
            processedArticles.map((post, index) => (
              <motion.a
                key={post.rank || index}
                layout
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={tileVariants}
                initial="off"
                animate="on"
                exit={{ opacity: 0, scale: 0.9 }}
                custom={index}
                className="group relative flex flex-col justify-between p-8 rounded-[2.5rem] border border-zinc-100 bg-white hover:shadow-xl transition-all h-full"
              >
                <div className="relative z-10">
                  {post.rank === 1 && (
                    <motion.div variants={badgeVariants} initial="initial" animate="animate" className="absolute -left-0 -top-0 bg-zinc-900 text-white text-[10px] font-black px-4 py-1.5 shadow-xl">
                      NEW RELEASE
                    </motion.div>
                  )}
                  <div className="text-zinc-400 font-mono text-xs mb-4">#{post.rank.toString().padStart(2, '0')}</div>
                  <h2 className="text-xl font-bold mb-4 text-primary leading-tight group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed line-clamp-4 italic">
                    {post.contentSnippet}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between pt-6 border-t border-zinc-50">
                  <span className="text-xs font-black text-primary uppercase tracking-widest">Read Article &rarr;</span>
                </div>
              </motion.a>
            ))
          ) : (
            // Loading Skeletons
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-zinc-100 animate-pulse rounded-[2.5rem] h-80 w-full" />
            ))
          )}
        </AnimatePresence>
      </motion.div>
      
      {!isLoading && processedArticles.length === 0 && (
        <p className="text-center text-zinc-400 mt-10 italic">No articles found. Check backend connection.</p>
      )}
    </div>
  );
};

export default BlogPage;
