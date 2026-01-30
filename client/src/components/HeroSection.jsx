"use client";

import { useLayoutEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import RightSidebar from "@/components/RightSidebar";

const HeroSection = () => {
  const heroWrapper = useRef(null);
  const sidePanelRef = useRef(null);

  const handleParallax = useCallback((e) => {
    if (window.innerWidth <= 768) return;
    const { clientX, clientY } = e;
    const { innerWidth: w, innerHeight: h } = window;
    const xMult = clientX / w - 0.5;
    const yMult = clientY / h - 0.5;

    gsap.utils.toArray(".parallax-layer").forEach((layer) => {
      const moveSpeed = layer.dataset.speed || 1;
      gsap.to(layer, {
        x: xMult * 40 * moveSpeed,
        y: yMult * 30 * moveSpeed,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline();
      mainTl.from(
        ".hero-animate",
        {
          opacity: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        },
        0.5,
      );

      if (sidePanelRef.current) {
        gsap.to(sidePanelRef.current, {
          x: "100%",
          opacity: 0,
          scrollTrigger: {
            trigger: heroWrapper.current,
            start: "bottom 80%",
            end: "bottom 50%",
            scrub: 1,
          },
        });
      }

      gsap.to(".ticker-inner", {
        xPercent: -50,
        repeat: -1,
        duration: 25,
        ease: "none",
      });

      const element = heroWrapper.current;
      element.addEventListener("mousemove", handleParallax);
      return () => element.removeEventListener("mousemove", handleParallax);
    }, heroWrapper);
    return () => ctx.revert();
  }, [handleParallax]);

  const checklist = [
    "Resilient Digital Architecture",
    "High-Performance MERN Solutions",
    "Scalable Deployment Specialist",
  ];

  const services = [
    "SCALABLE ARCHITECTURE",
    "SEAMLESS USER EXPERIENCE",
    "END-TO-END DEPLOYMENT",
    "INTERACTIVE STORYTELLING",
    "HIGH-PERFORMANCE SYSTEMS",
    "PIXEL PERFECT DESIGN",
  ];

  return (
    <section
      id="hero"
      ref={heroWrapper}
      className="relative w-full min-h-screen overflow-hidden bg-white flex flex-col justify-between"
    >
      <RightSidebar ref={sidePanelRef} />

      {/* Background Soft Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-blue-50/50 rounded-full blur-[120px] -z-10" />

      {/* CONTAINER: Fixed Gap for Mobile to remove space between photo and text */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-20 items-center grow pt-0 md:pt-0">
        
        {/* RIGHT IMAGE (Order 1 on Mobile) */}
        <div className="order-1 md:order-2 relative flex justify-center items-center">
          {/* COMPACT UNIQUE ORBITING BADGE */}
          <div
            className="parallax-layer absolute -left-6 md:-left-12 top-1/4 z-40 group cursor-none scale-90 md:scale-100"
            data-speed="1.4"
          >
            <div className="relative w-24 h-24 md:w-36 md:h-36 flex items-center justify-center">
              <div className="absolute inset-0 animate-[spin_12s_linear_infinite] group-hover:[animation-play-state:paused]">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                  <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                  <text className="text-[9px] uppercase font-black tracking-[4px] fill-zinc-400">
                    <textPath xlinkHref="#circlePath">• FULL STACK • DEPLOYMENT •</textPath>
                  </text>
                </svg>
              </div>

              <div className="relative flex flex-col items-center justify-center w-16 h-16 md:w-24 md:h-24 bg-zinc-900 text-white rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden">
                <div className="flex items-baseline gap-0.5 z-10">
                  <span className="text-xl md:text-3xl font-black tracking-tighter">6</span>
                  <span className="text-blue-400 group-hover:text-white text-base md:text-lg font-black transition-colors">+</span>
                </div>
                <span className="text-[6px] md:text-[8px] uppercase tracking-[0.15em] font-bold leading-tight text-zinc-400 group-hover:text-white/90 text-center px-2 z-10 transition-colors">
                  Live <br /> Projects
                </span>
              </div>
            </div>
          </div>

          <div className="parallax-layer relative z-10 w-[320px] md:w-[480px] lg:w-[550px] aspect-[4/5] mb-0" data-speed="1.2">
            <Image
              src="/profile.png"
              alt="MD SADIK"
              fill
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
              priority
            />
          </div>
        </div>

        {/* LEFT CONTENT (Mobile Order 2) - GAP REMOVED WITH -MT-20 */}
        <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left -mt-10 md:mt-0 z-20">
          <div className="hero-animate mb-6 px-4 py-1 bg-zinc-100 rounded-full text-zinc-500 text-[10px] font-bold tracking-widest uppercase inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Available for Hire
          </div>

          <div className="hero-animate mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-zinc-900 leading-[0.9]">
              Hello ! <br />
            </h1>
          </div>

          <div className="hero-animate text-xl md:text-2xl text-zinc-600 mb-6 font-medium">
            — I'm a{" "}
            <TypeAnimation
              sequence={[
                "Full-Stack Developer", 2000,
                "Database Designer", 2000,
                "Deployment Engineer", 2000,
              ]}
              wrapper="span"
              speed={50}
              className="text-zinc-900 font-bold underline decoration-zinc-300"
              repeat={Infinity}
            />
          </div>

          <ul className="hero-animate space-y-0 mb-10 text-left">
            {checklist.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-zinc-600 font-medium">
                <Check size={18} className="text-zinc-900" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>

          <div className="hero-animate flex flex-row items-center justify-center md:justify-start gap-5 w-full md:w-auto mt-0">
            <a
              href="#contact"
              className="px-5 py-2.5 bg-zinc-900 text-white rounded-lg text-xs md:text-sm font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all shadow-md shadow-zinc-100 whitespace-nowrap cursor-pointer"
            >
              Let's Talk <ArrowRight size={14} />
            </a>

            <Link
              href="/codecraft"
              className="text-xs md:text-sm font-bold text-zinc-900 border-b-2 border-zinc-200 hover:border-zinc-900 transition-all pb-1 whitespace-nowrap"
            >
              My Process &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Scrolling Ticker */}
      <div className="w-full pt-16 pb-8 md:pt-24 md:pb-12 relative z-30 overflow-hidden bg-transparent">
        <div className="ticker-inner flex whitespace-nowrap gap-10 md:gap-14">
          {[...services, ...services, ...services, ...services].map((service, i) => (
            <div key={i} className="flex items-center gap-10 md:gap-14 group">
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-zinc-500 uppercase transition-colors duration-500 group-hover:text-zinc-900">
                {service}
              </span>
              <div className="w-1 h-1 bg-zinc-300 rounded-full" />
            </div>
          ))}
        </div>
        <style jsx>{`
          .ticker-inner {
            display: flex;
            width: fit-content;
            animation: loop 40s linear infinite;
          }
          @keyframes loop {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default HeroSection;
