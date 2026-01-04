'use client';

import { useLayoutEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import RightSidebar from '@/components/RightSidebar';

const HeroSection = () => {
  const heroWrapper = useRef(null);
  const sidePanelRef = useRef(null);

  // Logic refactored to be unique
  const handleParallax = useCallback((e) => {
    if (window.innerWidth <= 768) return;
    const { clientX, clientY } = e;
    const { innerWidth: w, innerHeight: h } = window;
    const xMult = (clientX / w) - 0.5;
    const yMult = (clientY / h) - 0.5;

    gsap.utils.toArray('.parallax-layer').forEach((layer) => {
      const moveSpeed = layer.dataset.speed || 1;
      gsap.to(layer, {
        x: xMult * 40 * moveSpeed,
        y: yMult * 30 * moveSpeed,
        duration: 0.8,
        ease: "power2.out"
      });
    });
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mainTl = gsap.timeline();
      mainTl.from(".hero-animate", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      }, 0.5);

      gsap.to(sidePanelRef.current, {
        x: '100%',
        opacity: 0,
        scrollTrigger: {
          trigger: heroWrapper.current,
          start: 'bottom 80%',
          end: 'bottom 50%',
          scrub: 1,
        },
      });

      const element = heroWrapper.current;
      element.addEventListener("mousemove", handleParallax);
      return () => element.removeEventListener("mousemove", handleParallax);
    }, heroWrapper);
    return () => ctx.revert();
  }, [handleParallax]);

  return (
    <section id="hero" ref={heroWrapper} className="relative w-full min-h-screen overflow-hidden bg-background">
      <RightSidebar ref={sidePanelRef} />

      <div className="relative z-10 w-full h-screen overflow-hidden">
        
        {/* MOBILE LAYOUT (Same UI, Unique Text) */}
        <div className="md:hidden flex flex-col items-center justify-center h-full px-4">
          <div className="hero-animate mb-6">
            <div className="w-85 h-65 rounded-full overflow-hidden">
              <Image src="/profile.png" alt="MD SADIK" width={175} height={192} className="w-full h-full object-cover" priority />
            </div>
          </div>
          <div className="flex justify-center space-x-12 mb-6">
            <div className="hero-animate text-center">
              <h3 className="text-5xl font-bold text-primary">1+</h3>
              <p className="text-secondary text-base font-medium">Industry<br />Experience</p>
            </div>
            <div className="hero-animate text-center">
              <h3 className="text-5xl font-bold text-primary">5+</h3>
              <p className="text-secondary text-base font-medium">Successful<br />Deployments</p>
            </div>
          </div>
          <div className="text-center">
            <h1 className="hero-animate text-7xl font-thin tracking-tighter text-primary mb-5">Hello</h1>
            <div className="hero-animate text-xl text-secondary mb-4">
              — I'm a{' '}
              <TypeAnimation
                sequence={['Full-Stack Developer', 2000, 'AI/ML Specialist', 2000, 'Technical Architect', 2000]}
                wrapper="span"
                speed={50}
                className="text-primary font-semibold"
                repeat={Infinity}
              />
            </div>
            <p className="hero-animate text-base text-secondary/80 max-w-sm mx-auto leading-relaxed">
              Beyond standard coding; I focus on architecting resilient digital systems and high-performance solutions.
            </p>
            <div className="hero-animate mt-6">
              <Link href="/codecraft" className="font-semibold text-primary border-b-2 border-primary/50">
                Discover my process &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT (Original UI, Layering Fix, Unique Text) */}
        <div className="hidden md:block">
          <div className="parallax-layer absolute left-25 md:left-40 w-[55%] top-10 md:top-10 z-0" data-speed="1">
            <Image src="/profile.png" alt="Md Sadik" width={1080} height={1350} className="w-[55%]" priority />
          </div>

          <div className="parallax-layer absolute top-[20%] left-[10%] text-left hero-animate z-10" data-speed="1.8">
            <h3 className="text-5xl md:text-6xl font-bold text-primary">1+</h3>
            <p className="text-secondary leading-tight">Industry <br />Experience</p>
          </div>

          <div className="parallax-layer absolute top-[20%] right-[10%] text-left hero-animate z-10" data-speed="1.8">
            <h3 className="text-5xl md:text-6xl font-bold text-primary">5+</h3>
            <p className="text-secondary leading-tight">Successful <br />Deployments</p>
          </div>

          <div className="parallax-layer absolute top-1/2 right-8 md:right-32 lg:right-40 transform -translate-y-1/2 z-20" data-speed="2.5">
            <h1 className="text-7xl md:text-9xl font-thin tracking-tighter text-primary hero-animate">Hello</h1>
            <div className="mt-4 text-lg text-secondary hero-animate">
              — I'm a{' '}
              <TypeAnimation
                sequence={['Full-Stack Developer', 2000, 'AI/ML Specialist', 2000, 'Technical Architect', 2000]}
                wrapper="span"
                speed={50}
                className="text-primary font-semibold"
                repeat={Infinity}
              />
            </div>
            <p className="mt-2 text-sm text-secondary/80 max-w-md hero-animate">
              Beyond standard coding; I focus on architecting resilient digital systems and high-performance solutions.
            </p>
            <div className="mt-8 hero-animate">
              <Link href="/codecraft" className="font-semibold text-primary border-b-2 border-primary/50 hover:border-primary transition-colors">
                Discover my process &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;