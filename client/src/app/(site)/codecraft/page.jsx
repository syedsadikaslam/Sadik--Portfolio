'use client';

import { useState, useLayoutEffect, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

// Refactored Data Structure
const REPOSITORY_DATA = [
  {
    uid: 'auth-secure',
    title: 'Robust Auth & Session Logic',
    summary: 'Enterprise-grade login system utilizing bcrypt, explicit status codes, and httpOnly cookie security.',
    lang: 'javascript',
    activeCode: `router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ msg: 'USER_NOT_FOUND' });
    if (!user.isVerified) return res.status(403).json({ msg: 'ACCOUNT_NOT_VERIFIED' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'INVALID_CREDENTIALS' });

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '6h' });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 6 * 60 * 60 * 1000,
    }).json({ success: true, user: user.name });
  } catch (err) {
    res.status(500).send('INTERNAL_SERVER_ERROR');
  }
});`,
    legacyCode: `// Standard/Insecure approach often found in tutorials
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.send('Invalid login');
  }
  const token = jwt.sign({ id: user._id }, 'secret');
  res.json({ token });
});`,
    highlights: [
      'Bcrypt integration for non-reversible password security.',
      'Explicit HTTP status handling for frontend state management.',
      'Cookie-based JWT storage to mitigate XSS vulnerabilities.',
    ],
  },
];

const CodeCraftPage = () => {
  const [focusedSnippet, setFocusedSnippet] = useState(null);
  const layoutRoot = useRef(null);
  const cardElements = useRef([]);

  // Logic Refactor: Using a more robust ref setter
  const registerCard = useCallback((el, i) => {
    if (el) cardElements.current[i] = el;
  }, []);

  // GSAP: Advanced stagger and scroll logic
  useLayoutEffect(() => {
    const animationContext = gsap.context(() => {
      gsap.from(cardElements.current, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        stagger: 0.15,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: layoutRoot.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, layoutRoot);

    return () => {
      animationContext.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Accessibility: Keyboard listener
  useEffect(() => {
    const handleExit = (e) => e.key === 'Escape' && setFocusedSnippet(null);
    window.addEventListener('keydown', handleExit);
    return () => window.removeEventListener('keydown', handleExit);
  }, []);

  return (
    <main ref={layoutRoot} className="container mx-auto py-24 px-6 lg:px-12 bg-background">
      {/* Narrative Header */}
      <header className="text-center mb-16">
        <motion.h1 
          className="text-5xl font-black tracking-tight text-primary uppercase"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Code Craft
        </motion.h1>
        <motion.p 
          className="mt-6 text-lg text-secondary/80 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Engineering high-performance systems requires attention to detail. 
          Compare my production-ready patterns against standard implementations.
        </motion.p>
      </header>

      {/* Action Prompt */}
      <section className="mb-20">
        <Link href="/services" className="group block p-10 bg-zinc-50 border border-zinc-200 rounded-3xl text-center transition-all hover:shadow-2xl hover:border-primary/20">
          <h3 className="text-2xl font-black text-primary mb-3">Elevate Your Infrastructure</h3>
          <p className="text-secondary font-medium">Expert consulting and full-stack architecture. Your first session is complimentary.</p>
          <div className="mt-6 text-xs font-bold uppercase tracking-widest text-primary/40 group-hover:text-primary transition-colors">Explore Services &rarr;</div>
        </Link>
      </section>

      {/* Snippet Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {REPOSITORY_DATA.map((item, i) => (
          <article 
            key={item.uid}
            ref={(el) => registerCard(el, i)}
            className="flex flex-col bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
          >
            <div className="p-8 flex flex-col h-full">
              <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6 italic">"{item.summary}"</p>

              {/* Code Preview Node */}
              <div className="bg-[#0d1117] p-4 rounded-xl mb-8 overflow-hidden">
                <SyntaxHighlighter
                  language={item.lang}
                  style={atomDark}
                  customStyle={{ background: 'transparent', fontSize: '0.7rem', padding: 0 }}
                >
                  {item.activeCode.split('\n').slice(0, 5).join('\n')}
                </SyntaxHighlighter>
              </div>

              <div className="mt-auto pt-6 border-t border-zinc-50 flex items-center justify-between">
                <button 
                  onClick={() => setFocusedSnippet(item)}
                  className="px-6 py-2.5 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-lg hover:brightness-110 transition-all"
                >
                  Deep Dive
                </button>
                <Link href="/services" className="text-[10px] font-bold text-zinc-400 hover:text-primary transition-colors uppercase">Consult &rarr;</Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Comparison Modal Overlay */}
      <AnimatePresence>
        {focusedSnippet && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-zinc-900/90 backdrop-blur-xl"
              onClick={() => setFocusedSnippet(null)}
            />
            
            <motion.div 
              initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 50, scale: 0.95 }}
              className="relative bg-white w-full max-w-6xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-black text-primary">{focusedSnippet.title}</h2>
                  <p className="text-zinc-500 mt-1 font-medium italic">{focusedSnippet.summary}</p>
                </div>
                <button onClick={() => setFocusedSnippet(null)} className="text-3xl font-light hover:rotate-90 transition-transform">&times;</button>
              </div>

              <div className="p-10 overflow-y-auto space-y-10 scroll-smooth">
                {/* Visual Indicators */}
                <div className="flex gap-4">
                  <span className="flex items-center gap-2 px-4 py-1.5 bg-rose-50 border border-rose-100 text-rose-700 text-[10px] font-black uppercase rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> Legacy Pattern
                  </span>
                  <span className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Optimized Build
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <section>
                    <h4 className="text-xs font-black uppercase text-rose-600 mb-3 tracking-widest">Typical Implementation</h4>
                    <SyntaxHighlighter language={focusedSnippet.lang} style={atomDark} className="rounded-2xl !p-6 !bg-zinc-800 text-xs">
                      {focusedSnippet.legacyCode}
                    </SyntaxHighlighter>
                  </section>
                  <section>
                    <h4 className="text-xs font-black uppercase text-emerald-700 mb-3 tracking-widest">Engineered Solution</h4>
                    <SyntaxHighlighter language={focusedSnippet.lang} style={atomDark} className="rounded-2xl !p-6 !bg-zinc-900 text-xs shadow-inner">
                      {focusedSnippet.activeCode}
                    </SyntaxHighlighter>
                  </section>
                </div>

                <div className="pt-8 border-t border-zinc-100">
                  <h4 className="text-lg font-black text-primary mb-4">Architecture Rationale</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {focusedSnippet.highlights.map((note, idx) => (
                      <li key={idx} className="p-5 bg-zinc-50 rounded-xl text-sm text-zinc-600 leading-relaxed border-l-4 border-emerald-500">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default CodeCraftPage;