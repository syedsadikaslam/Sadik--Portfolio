'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';

const ContactSection = () => {
  const [isCopied, setIsCopied] = useState(false);
  const CONTACT_EMAIL = "mdsadiksadik464@gmail.com";

  // Refactored copy function for cleaner logic
  const executeCopy = useCallback(() => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(CONTACT_EMAIL);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  }, [CONTACT_EMAIL]);

  // Animation variants to make the code unique
  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  return (
    <motion.section
      id="contact"
      className="container mx-auto py-32 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

        {/* Info Column: Reach out via Email */}
        <motion.div 
          className="text-center md:text-left"
          variants={{
            hidden: { opacity: 0, x: -40 },
            visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.6 } }
          }}
        >
          <h3 className="text-lg font-semibold text-secondary mb-2">Email</h3>
          <div className="relative inline-block">
            <button
              onClick={executeCopy}
              className="text-xl font-bold text-primary cursor-pointer hover:text-secondary transition-all hover:scale-105 active:scale-95"
            >
              {CONTACT_EMAIL}
            </button>
            
            <AnimatePresence>
              {isCopied && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -5 }}
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-lg"
                >
                  Link Copied!
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <p className="text-[10px] uppercase tracking-wider text-secondary/60 mt-2 font-medium">
            (Tap to copy address)
          </p>
        </motion.div>

        {/* Core Column: Call to Action */}
        <motion.div 
          className="text-center order-first md:order-none flex flex-col items-center"
          variants={slideUp}
        >
          <h2 className="text-4xl font-bold tracking-tight text-primary mb-4">
            Get In Touch
          </h2>
          <p className="max-w-xs mx-auto text-lg text-secondary mb-8">
            Have a project in mind or just want to connect? My inbox is always open.
          </p>

          <motion.a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-block bg-primary text-white font-bold py-3.5 px-10 rounded-xl text-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Say Hello
          </motion.a>
        </motion.div>

        {/* Links Column: Digital Presence */}
        <motion.div 
          className="text-center md:text-right"
          variants={{
            hidden: { opacity: 0, x: 40 },
            visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.6 } }
          }}
        >
          <h3 className="text-lg font-semibold text-secondary mb-2">Socials</h3>
          <div className="flex justify-center md:justify-end items-center gap-6">
            <motion.a 
              href="https://github.com/syedsadikaslam"
              target="_blank" 
              rel="noreferrer"
              className="text-secondary hover:text-primary transition-colors"
              whileHover={{ y: -3 }}
              aria-label="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
              </svg>
            </motion.a>
            
            <motion.a 
              href="https://www.linkedin.com/in/Md-Sadik-9104a2252"
              target="_blank" 
              rel="noreferrer"
              className="text-secondary hover:text-primary transition-colors"
              whileHover={{ y: -3 }}
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default ContactSection;