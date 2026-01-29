"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
  memo,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import useEmblaCarousel from "embla-carousel-react";
import useSWR from "swr";

gsap.registerPlugin(ScrollTrigger);

const fetcher = (url) => fetch(url).then((r) => r.json());

// 1️⃣ Star Component (Optimized)
const Star = memo(({ filled, isRatingStar }) => (
  <svg
    className={`w-5 h-5 transition-colors duration-300 ${isRatingStar ? "text-yellow-400" : "text-zinc-200"}`}
    fill={filled ? "currentColor" : "none"}
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

// 2️⃣ FlowingStars Component (Enhanced GSAP Logic)
const FlowingStars = ({ rating }) => {
  const fillRef = useRef(null);
  const componentRef = useRef(null);

  useLayoutEffect(() => {
    const scrollerEl = componentRef.current?.closest(
      ".reviews-scroll-container",
    );

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { width: "0%" },
        {
          width: `${rating * 20}%`,
          ease: "power2.out",
          duration: 1.2,
          scrollTrigger: {
            trigger: componentRef.current,
            start: "top 90%",
            scroller: scrollerEl || window,
          },
        },
      );
    }, componentRef);

    return () => ctx.revert();
  }, [rating]);

  return (
    <div
      ref={componentRef}
      className="relative flex items-center bg-zinc-50 px-2 py-1 rounded-full border border-zinc-100"
    >
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} />
        ))}
      </div>
      <div
        ref={fillRef}
        className="absolute top-0 left-0 h-full overflow-hidden w-0 px-2 py-1"
      >
        <div className="flex w-max">
          {[...Array(5)].map((_, i) => (
            <Star key={i} filled isRatingStar />
          ))}
        </div>
      </div>
    </div>
  );
};

const TimeAgo = ({ date }) => {
  const [text, setText] = useState("");
  useEffect(() => {
    if (date) setText(formatDistanceToNow(new Date(date), { addSuffix: true }));
  }, [date]);
  return (
    <p className="text-[10px] uppercase font-black tracking-widest text-zinc-400">
      {text}
    </p>
  );
};

// 3️⃣ Main Reviews Section
export default function ReviewsSection() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://sadik-portfolio-x51n.onrender.com";
  const { data: reviews = [], mutate } = useSWR(
    `${baseUrl}/api/reviews`,
    fetcher,
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAllReviewsModalOpen, setIsAllReviewsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    review: "",
    rating: 0,
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.rating) return setMessage("Please select a star rating.");
    try {
      const res = await fetch(`${baseUrl}/api/reviews/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        mutate();
        setIsAddModalOpen(false);
        setFormState({ name: "", review: "", rating: 0 });
        alert("Review Posted Successfully!");
      }
    } catch {
      setMessage("Submission error. Try again.");
    }
  };

  const truncate = (text, max = 110) =>
    text.length <= max
      ? { text, long: false }
      : { text: text.slice(0, max) + "...", long: true };

  return (
    <section
      id="reviews"
      className="container mx-auto py-32 px-6 lg:px-12 bg-background overflow-hidden"
    >
      <header className="text-center mb-20">
        <h2 className="text-5xl font-black tracking-tighter text-primary uppercase">
          Testimonials
        </h2>
        <div className="h-1.5 w-20 bg-primary/10 mx-auto mt-4 rounded-full" />
      </header>

      {reviews.length > 0 ? (
        <div className="relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6">
              {reviews.map((r, i) => {
                const { text, long } = truncate(r.review);
                return (
                  <div
                    key={r._id}
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 pl-6"
                  >
                    <div className="bg-white p-10 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full relative group">
                      {i === 0 && (
                        <div className="absolute -top-0 -right-0 bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg">
                          LATEST
                        </div>
                      )}
                      <div className="flex justify-between items-center mb-8">
                        <FlowingStars rating={r.rating} />
                        <TimeAgo date={r.createdAt} />
                      </div>
                      <p className="text-zinc-600 mb-8 flex-grow italic leading-relaxed text-lg font-medium">
                        "{text}"
                      </p>
                      {long && (
                        <button
                          onClick={() => setSelectedReview(r)}
                          className="text-primary font-black text-xs hover:underline mb-6 text-left uppercase tracking-widest"
                        >
                          Read Story
                        </button>
                      )}
                      <p className="font-black text-primary border-t border-zinc-50 pt-6 uppercase tracking-tight text-sm">
                        — {r.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute top-1/2 -left-4 -translate-y-1/2 w-12 h-12 bg-white shadow-2xl rounded-full flex items-center justify-center text-primary z-10 border border-zinc-50 hover:scale-110 transition-transform"
          >
            ←
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute top-1/2 -right-4 -translate-y-1/2 w-12 h-12 bg-white shadow-2xl rounded-full flex items-center justify-center text-primary z-10 border border-zinc-50 hover:scale-110 transition-transform"
          >
            →
          </button>
        </div>
      ) : (
        <p className="text-center text-zinc-400">
          Be the first to share your thoughts.
        </p>
      )}

      <div className="text-center mt-20 flex flex-col items-center gap-6">
        <button
          onClick={() => setIsAllReviewsModalOpen(true)}
          className="text-primary text-xs font-black uppercase tracking-[0.2em] border-b border-primary/20 hover:border-primary transition-all pb-1"
        >
          View All {reviews.length} Feedbacks
        </button>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-white font-black py-5 px-14 rounded-2xl shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all uppercase tracking-widest text-sm"
        >
          Write Review
        </button>
      </div>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-900/80 backdrop-blur-md z-[1200] flex items-center justify-center p-6"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ y: 50, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              className="bg-white rounded-[2.5rem] p-12 w-full max-w-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-3xl font-black text-primary tracking-tight">
                  Your Feedback
                </h3>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full p-5 bg-zinc-50 rounded-2xl border-none ring-1 ring-zinc-200 focus:ring-2 focus:ring-primary outline-none font-bold"
                  required
                />
                <textarea
                  placeholder="Tell your experience..."
                  rows="4"
                  value={formState.review}
                  onChange={(e) =>
                    setFormState({ ...formState, review: e.target.value })
                  }
                  className="w-full p-5 bg-zinc-50 rounded-2xl border-none ring-1 ring-zinc-200 focus:ring-2 focus:ring-primary outline-none font-medium"
                  required
                />
                <div className="flex justify-center gap-3 py-4 bg-zinc-50 rounded-2xl">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() =>
                        setFormState({ ...formState, rating: i + 1 })
                      }
                      className="cursor-pointer hover:scale-125 transition-transform"
                    >
                      <Star
                        filled={(hoverRating || formState.rating) > i}
                        isRatingStar
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-xl hover:brightness-110 transition-all uppercase"
                >
                  Submit Story
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {isAllReviewsModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-900/80 backdrop-blur-xl z-[1200] flex items-center justify-center p-6"
            onClick={() => setIsAllReviewsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-[3rem] shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-10 border-b flex justify-between items-center">
                <h3 className="text-4xl font-black text-primary tracking-tighter uppercase italic">
                  Client Stories
                </h3>
                <button
                  onClick={() => setIsAllReviewsModalOpen(false)}
                  className="text-4xl font-light hover:rotate-90 transition-transform"
                >
                  &times;
                </button>
              </div>
              <div className="p-10 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8 reviews-scroll-container bg-zinc-50/50">
                {reviews.map((r) => (
                  <div
                    key={r._id}
                    className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <FlowingStars rating={r.rating} />
                      <TimeAgo date={r.createdAt} />
                    </div>
                    <p className="text-zinc-600 italic leading-relaxed mb-6 font-medium">
                      "{r.review}"
                    </p>
                    <p className="font-black text-primary uppercase text-xs tracking-widest">
                      — {r.name}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-900/80 backdrop-blur-md z-[1200] flex items-center justify-center p-6"
            onClick={() => setSelectedReview(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-[3rem] p-14 w-full max-w-2xl shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-10">
                <FlowingStars rating={selectedReview.rating} />
                <TimeAgo date={selectedReview.createdAt} />
              </div>
              <p className="text-2xl text-zinc-700 italic leading-relaxed mb-12 font-medium">
                "{selectedReview.review}"
              </p>
              <p className="font-black text-primary text-right text-lg uppercase tracking-tight">
                — {selectedReview.name}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
