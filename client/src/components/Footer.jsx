'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { scroller } from "react-scroll";
import { usePathname, useRouter } from "next/navigation";

const MainFooter = () => {
  const currentPath = usePathname();
  const navigationRouter = useRouter();
  const activeYear = new Date().getFullYear();
  const SUPPORT_EMAIL = "mdsadiksadik464@gmail.com";

  // Optimized smooth scroll handler
  const handleNavigation = (anchorId) => {
    const scrollConfig = {
      duration: 900,
      smooth: "easeInOutQuart",
      offset: -60
    };

    if (currentPath !== '/') {
      navigationRouter.push('/');
      // Slight delay to allow page transition before scrolling
      setTimeout(() => {
        scroller.scrollTo(anchorId, scrollConfig);
      }, 250);
    } else {
      scroller.scrollTo(anchorId, scrollConfig);
    }
  };

  return (
    <motion.footer
      id="main-footer"
      className="bg-background text-secondary py-12 border-t border-muted relative z-40"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Branding Section */}
        <div className="reveal-block">
          <h1 className="text-3xl font-extrabold text-primary tracking-tight uppercase">MD SADIK</h1>
          <p className="text-xs sm:text-sm text-secondary mt-1 font-medium italic">
            Full Stack Developer • AI/ML Enthusiast
          </p>
        </div>

        {/* Quick Navigation Hooks */}
        <nav className="flex justify-center items-center space-x-8 font-semibold">
          <button
            onClick={() => handleNavigation("about")}
            className="hover:text-primary transition-colors duration-200"
          >
            About
          </button>
          <Link href="/projects" className="hover:text-primary transition-colors duration-200">
            Projects
          </Link>
          <button
            onClick={() => handleNavigation("contact")}
            className="hover:text-primary transition-colors duration-200"
          >
            Contact
          </button>
        </nav>

        {/* Actions & Outreach */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-4">
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Link
              href="/services"
              className="inline-block bg-primary text-white font-bold py-3 px-10 rounded-xl text-lg shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-1"
            >
              Book a Service
            </Link>
          </motion.div>

          <motion.a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-primary font-bold border-b-2 border-primary/20 hover:border-primary transition-all pb-0.5"
            whileHover={{ scale: 1.05 }}
          >
            {SUPPORT_EMAIL}
          </motion.a>
        </div>

        {/* Social Connectivity */}
        <div className="flex justify-center space-x-7 mt-8">
          <motion.a
            href="https://github.com/syedsadikaslam"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.1 }}
            className="text-secondary hover:text-primary transition-colors"
            aria-label="GitHub Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
            </svg>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/Md-Sadik-9104a2252"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.1 }}
            className="text-secondary hover:text-primary transition-colors"
            aria-label="LinkedIn Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect width="4" height="12" x="2" y="9"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </motion.a>
        </div>

        <div className="pt-6 border-t border-muted/30">
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">
            © {activeYear} — Crafted by Sadik
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default MainFooter;