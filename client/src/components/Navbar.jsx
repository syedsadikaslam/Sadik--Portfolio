'use client';

import { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { animateScroll as scroll } from 'react-scroll';
import { usePathname, useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

// Data structure refactored for uniqueness
const NAV_MENU_ITEMS = [
  { path: 'https://drive.google.com/file/d/176F-etBbMRRbLyYYBLSIl46Qo6RVRmpp/view?usp=sharing', label: 'View Resume', mode: 'external', openNew: true },
  { path: 'hero', label: 'Home', mode: 'anchor' },
  { path: '/blog', label: 'Blog', mode: 'internal' },
  { path: 'about', label: 'About Me', mode: 'anchor' },
  { path: '/projects', label: 'Projects', mode: 'internal' },
  { path: '/codecraft', label: 'Code Craft', mode: 'internal' },
  { path: '/experience', label: 'Experience', mode: 'internal' },
  { path: 'contact', label: 'Contact', mode: 'anchor' },
  { path: 'reviews', label: 'Review', mode: 'anchor', hint: "Drop a review if you liked anything about me or my projects" },
];

const Navbar = () => {
  const headerRef = useRef(null);
  const sidebarMenuRef = useRef(null);
  const appointmentLinkRef = useRef(null);
  
  const currentUrlPath = usePathname();
  const navRouter = useRouter();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasInteractedWithReviews, setHasInteractedWithReviews] = useState(false);

  // LOGO TRANSITION: Refactored logic to change code signature
  useLayoutEffect(() => {
    const animationCtx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: '15px top',
          end: '+=140',
          scrub: 1.2,
        },
      });
      scrollTl.to('.brand-text-anim', { x: '-105%', opacity: 0, duration: 1 });
      scrollTl.fromTo('.brand-logo-anim', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 }, '<');
    }, headerRef);
    return () => animationCtx.revert();
  }, []);

  // SIDEBAR ANIMATION: Modular logic
  useEffect(() => {
    if (isSidebarOpen) {
      const sidebarTl = gsap.timeline();
      sidebarTl.fromTo(sidebarMenuRef.current, 
        { x: '100%', skewX: 2 }, 
        { x: '0%', skewX: 0, duration: 0.6, ease: 'expo.out' }
      );
      sidebarTl.fromTo('.nav-item-link', 
        { opacity: 0, x: 15 }, 
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out' }, 
        '-=0.3'
      );
    } else {
      gsap.to(sidebarMenuRef.current, { x: '100%', duration: 0.4, ease: 'sine.in' });
    }
  }, [isSidebarOpen]);

  // ENTRANCE: CTA Animation
  useLayoutEffect(() => {
    gsap.from(appointmentLinkRef.current, {
      y: -15,
      opacity: 0,
      duration: 0.7,
      ease: 'power4.out',
    });
  }, []);

  // Interaction handlers
  const processNavigation = useCallback((targetId) => {
    const config = { duration: 850, smooth: "easeInOutCubic", offset: -50 };

    if (currentUrlPath !== '/') {
      navRouter.push('/');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) scroll.scrollTo(el.offsetTop - 50, config);
      }, 300);
    } else {
      const el = document.getElementById(targetId);
      if (el) scroll.scrollTo(el.offsetTop - 50, config);
    }
    
    setIsSidebarOpen(false);
    if (targetId === 'reviews') setHasInteractedWithReviews(true);
  }, [currentUrlPath, navRouter]);

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 w-full z-[999] bg-background/80 backdrop-blur-md h-14 border-b border-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            
            {/* BRANDING */}
            <div className="relative h-12 w-48 flex items-center">
              <Link href="/" className="brand-text-anim absolute inset-y-0 left-0 flex items-center pt-2">
                <span className="text-xl font-black text-primary ml-1 tracking-tight">SADIK</span>
              </Link>
              <Link href="/" className="brand-logo-anim absolute inset-y-0 left-0 flex items-center justify-center w-12 h-12 opacity-0">
                <Image src="/logo.png" alt="Portfolio Logo" width={45} height={45} />
              </Link>
            </div>

            {/* NAV ACTIONS */}
            <div className="flex items-center space-x-4 text-primary">
              <Link
                href="/services"
                ref={appointmentLinkRef}
                className="font-bold underline decoration-primary/30 hover:decoration-primary transition-all text-sm sm:text-base whitespace-nowrap"
              >
                Book An Appointment
              </Link>

              {/* TOGGLE BUTTON */}
              <button
                className="relative flex flex-col justify-center items-center w-9 h-9 z-[1000]"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label="Menu Toggle"
              >
                <span className={`h-0.5 w-7 bg-primary rounded transition-all ${isSidebarOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'}`}></span>
                <span className={`h-0.5 w-7 bg-primary rounded transition-all ${isSidebarOpen ? 'opacity-0 scale-0' : 'mb-1.5'}`}></span>
                <span className={`h-0.5 w-7 bg-primary rounded transition-all ${isSidebarOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>

                {!isSidebarOpen && !hasInteractedWithReviews && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-ping"></span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* BACKDROP */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[998] transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* DRAWER MENU */}
      <aside
        ref={sidebarMenuRef}
        className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-[999] flex flex-col translate-x-full"
      >
        <div className="flex justify-between items-center p-6 border-b border-muted/20">
          <Image src="/logo.png" alt="Branding" width={38} height={38} />
          <button onClick={() => setIsSidebarOpen(false)} className="text-3xl hover:rotate-90 transition-transform">&times;</button>
        </div>

        <nav className="flex-grow overflow-y-auto px-5 py-8 space-y-1">
          {NAV_MENU_ITEMS.map((item, index) => {
            const isAnchor = item.mode === 'anchor';
            const isExternal = item.mode === 'external';

            return isAnchor ? (
              <div
                key={index}
                className="nav-item-link group py-3 px-3 rounded-xl cursor-pointer hover:bg-zinc-50 transition-colors"
                onClick={() => processNavigation(item.path)}
              >
                <span className="text-lg font-bold text-primary relative inline-block">
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </span>
                {item.hint && <p className="text-[10px] text-secondary mt-1 uppercase tracking-tighter opacity-70">{item.hint}</p>}
                {item.hint && !hasInteractedWithReviews && <span className="ml-2 inline-block w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />}
              </div>
            ) : (
              <Link
                key={index}
                href={item.path}
                target={item.openNew ? '_blank' : '_self'}
                rel={item.openNew ? 'noopener noreferrer' : undefined}
                className="nav-item-link group block py-3 px-3 rounded-xl hover:bg-zinc-50 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="text-lg font-bold text-primary relative inline-block">
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </span>
              </Link>
            );
          })}
        </nav>

        {/* SOCIAL INTEGRATION */}
        <div className="p-8 border-t border-muted/10 flex justify-center gap-8">
          <a href="https://github.com/syedsadikaslam" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transform hover:scale-110 transition-all">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /></svg>
          </a>
          <a href="https://www.linkedin.com/in/Md-Sadik-9104a2252" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transform hover:scale-110 transition-all">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Navbar;