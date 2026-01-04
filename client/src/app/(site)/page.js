'use client';

import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col w-full overflow-x-hidden bg-background"
    >
      <HeroSection />
      
      {/* FIX: Maine space-y-24/32 ko hata diya hai. 
        Ab sections ke beech ka gap AboutSection aur ReviewsSection ki 
        internal padding se control hoga, jo zyada professional lagta hai.
      */}
      <div className="relative z-10">
        <AboutSection />
        
        {/* Is section ki padding ReviewsSection ke andar se control hogi */}
        <section className="reviews-scroll-container">
          <ReviewsSection />
        </section>
        
        <ContactSection />
      </div>

      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-zinc-50/5 to-transparent -z-10" />
    </motion.div>
  );
}