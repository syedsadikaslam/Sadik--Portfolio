'use client';

import React, { useState, useEffect, useRef, useCallback, useLayoutEffect, memo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import useEmblaCarousel from 'embla-carousel-react';
import useSWR from 'swr';

gsap.registerPlugin(ScrollTrigger);

// Data fetching configuration
const API_FETCHER = url => fetch(url).then(res => res.json());

// 1️⃣ Optimized Icon Component
const RatingIcon = memo(({ isActive, isHighlight }) => (
  <svg
    className={`w-5 h-5 ${isHighlight ? 'text-yellow-400' : 'text-zinc-200'}`}
    fill={isActive ? 'currentColor' : 'none'}
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
    />
  </svg>
));

// 2️⃣ Refactored Rating Animation
const AnimatedRating = ({ score }) => {
  const gradientRef = useRef(null);
  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    const parentContainer = wrapperRef.current?.closest('.reviews-scroll-container');

    const ctx = gsap.context(() => {
      // Reveal animation
      gsap.from(wrapperRef.current, { opacity: 0, scale: 0.9, duration: 0.5 });

      // Progressive fill animation
      gsap.to(gradientRef.current, {
        width: `${score * 20}%`,
        ease: 'expo.out',
        duration: 1.5,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top 90%',
          scroller: parentContainer || window,
        },
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [score]);

  return (
    <div ref={wrapperRef} className="relative flex items-center">
      <div className="flex">{[...Array(5)].map((_, i) => <RatingIcon key={i} />)}</div>
      <div ref={gradientRef} className="absolute top-0 left-0 h-full overflow-hidden w-0">
        <div className="flex w-max">
          {[...Array(5)].map((_, i) => <RatingIcon key={i} isActive isHighlight />)}
        </div>
      </div>
    </div>
  );
};

// 3️⃣ Safe Date Component
const RelativeDate = ({ timestamp }) => {
  const [formatted, setFormatted] = useState('');
  useEffect(() => {
    setFormatted(formatDistanceToNow(new Date(timestamp), { addSuffix: true }));
  }, [timestamp]);
  return <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">{formatted}</p>;
};

// 4️⃣ Main Section Component
export default function ReviewsSection() {
  const { data: testimonials = [], mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
    API_FETCHER
  );

  const [modalType, setModalType] = useState(null); // 'add' | 'all' | 'detail'
  const [focusReview, setFocusReview] = useState(null);
  const [inputData, setInputData] = useState({ name: '', review: '', rating: 0 });
  const [ratingHover, setRatingHover] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');

  const [sliderRef, sliderApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const onAddReview = async e => {
    e.preventDefault();
    if (!inputData.rating) return setStatusMsg('Select a star rating.');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData),
      });
      if (res.ok) {
        setStatusMsg('Review shared successfully!');
        setModalType(null);
        setInputData({ name: '', review: '', rating: 0 });
        mutate();
      }
    } catch {
      setStatusMsg('Submission failed. Try again.');
    }
  };

  return (
    <section id="reviews" className="container mx-auto pt-0 pb-32 px-4 ... ">
      <header className="text-center mb-20">
        <h2 className="text-4xl font-black tracking-tighter text-primary uppercase">Client Feedback</h2>
        <div className="h-1.5 w-16 bg-primary/20 mx-auto mt-4 rounded-full" />
      </header>

      {testimonials.length > 0 ? (
        <div className="relative group">
          <div className="overflow-hidden" ref={sliderRef}>
            <div className="flex -ml-6">
              {testimonials.map((item, idx) => (
                <div key={item._id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 pl-6">
                  <div className="bg-white border border-zinc-100 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col relative group">
                    {idx === 0 && (
                      <span className="absolute -top-0 -right-0 bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg">
                        NEW
                      </span>
                    )}
                    <div className="flex justify-between items-center mb-6">
                      <AnimatedRating score={item.rating} />
                      <RelativeDate timestamp={item.createdAt} />
                    </div>
                    <p className="text-zinc-600 mb-6 flex-grow italic leading-relaxed">
                      "{item.review.length > 110 ? item.review.slice(0, 110) + '...' : item.review}"
                    </p>
                    {item.review.length > 110 && (
                      <button onClick={() => { setFocusReview(item); setModalType('detail'); }} className="text-primary font-bold text-xs hover:underline mb-4 text-left">
                        Read Story
                      </button>
                    )}
                    <p className="font-black text-primary border-t border-zinc-50 pt-4 uppercase tracking-tighter text-sm">
                      — {item.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => sliderApi?.scrollPrev()} className="absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-primary z-10 hover:scale-110 transition-transform border border-zinc-50">←</button>
          <button onClick={() => sliderApi?.scrollNext()} className="absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 bg-white shadow-xl rounded-full flex items-center justify-center text-primary z-10 hover:scale-110 transition-transform border border-zinc-50">→</button>
        </div>
      ) : (
        <p className="text-center text-zinc-400 italic font-medium">No testimonials yet. Be the first!</p>
      )}

      <div className="text-center mt-20 flex flex-col items-center gap-6">
        {testimonials.length > 0 && (
          <button onClick={() => setModalType('all')} className="text-primary text-xs font-black uppercase tracking-widest border-b border-primary/20 hover:border-primary transition-all">
            View All {testimonials.length} Stories
          </button>
        )}
        <button onClick={() => setModalType('add')} className="bg-primary text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
          Leave A Review
        </button>
        {statusMsg && <p className="text-xs font-bold text-zinc-500 uppercase">{statusMsg}</p>}
      </div>

      {/* --- OVERLAY MODALS --- */}
      <AnimatePresence>
        {/* ADD REVIEW */}
        {modalType === 'add' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-[1100] flex items-center justify-center p-6" onClick={() => setModalType(null)}>
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10" onClick={e => e.stopPropagation()}>
              <form onSubmit={onAddReview} className="space-y-6">
                <h3 className="text-2xl font-black text-primary">Write A Review</h3>
                <input type="text" placeholder="Full Name" value={inputData.name} onChange={e => setInputData({ ...inputData, name: e.target.value })} required className="w-full p-4 bg-zinc-50 rounded-xl border-none ring-1 ring-zinc-200 focus:ring-2 focus:ring-primary outline-none" />
                <textarea placeholder="Share your experience..." rows="4" value={inputData.review} onChange={e => setInputData({ ...inputData, review: e.target.value })} required className="w-full p-4 bg-zinc-50 rounded-xl border-none ring-1 ring-zinc-200 focus:ring-2 focus:ring-primary outline-none" />
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} onMouseEnter={() => setRatingHover(i + 1)} onMouseLeave={() => setRatingHover(0)} onClick={() => setInputData({ ...inputData, rating: i + 1 })} className="cursor-pointer">
                      <RatingIcon isActive={(ratingHover || inputData.rating) > i} isHighlight />
                    </div>
                  ))}
                </div>
                <button type="submit" className="w-full py-4 bg-primary text-white font-black rounded-xl hover:shadow-lg transition-all">Publish Review</button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* ALL REVIEWS */}
        {modalType === 'all' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-zinc-900/60 backdrop-blur-md z-[1100] flex items-center justify-center p-6" onClick={() => setModalType(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-8 border-b flex justify-between items-center">
                <h3 className="text-2xl font-black text-primary">All Feedback</h3>
                <button onClick={() => setModalType(null)} className="text-3xl font-light hover:rotate-90 transition-transform">&times;</button>
              </div>
              <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8 reviews-scroll-container bg-zinc-50/50">
                {testimonials.map(r => (
                  <div key={r._id} className="bg-white p-8 rounded-2xl border border-zinc-100">
                    <div className="flex justify-between items-center mb-4">
                      <AnimatedRating score={r.rating} />
                      <RelativeDate timestamp={r.createdAt} />
                    </div>
                    <p className="text-zinc-600 italic mb-4 leading-relaxed">"{r.review}"</p>
                    <p className="font-black text-primary text-sm">— {r.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* SINGLE DETAIL */}
        {modalType === 'detail' && focusReview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-zinc-900/80 backdrop-blur-md z-[1100] flex items-center justify-center p-6" onClick={() => setModalType(null)}>
            <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="bg-white rounded-3xl p-12 max-w-2xl w-full relative" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-8">
                <AnimatedRating score={focusReview.rating} />
                <RelativeDate timestamp={focusReview.createdAt} />
              </div>
              <p className="text-xl text-zinc-700 italic leading-relaxed mb-8">"{focusReview.review}"</p>
              <p className="font-black text-primary text-right text-lg">— {focusReview.name}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}