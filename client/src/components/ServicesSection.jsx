'use client';

import { useRef, useLayoutEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Mail, Globe, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 1️⃣ Refactored Data Object
const PROFESSIONAL_OFFERINGS = [
  {
    name: "Website Development",
    Graphic: Globe,
    info: "I design and develop fully responsive, fast, and SEO-optimized websites using modern technologies like Next.js and Tailwind CSS. Each site is built with immense focus on detail, ensuring seamless user experience and performance.",
  },
  {
    name: "Consultancy",
    Graphic: Mail,
    info: "Get personalized digital consultancy on your online presence, website optimization, or project idea — your first session is absolutely free. If you purchase a website, consultancy remains free for future discussions too.",
  },
  {
    name: "Software Issue Fixing",
    Graphic: Wrench,
    info: "I troubleshoot and resolve software-related issues on laptops and computers, including system errors, slow performance, installation problems, and software conflicts. With years of experience, I provide precise, practical solutions to get your systems running smoothly.",
  },
];

export default function ServicesSection() {
  const containerNode = useRef(null);
  const actionAreaRef = useRef(null);

  // 2️⃣ Refactored Animation Engine
  useLayoutEffect(() => {
    const animationCtx = gsap.context(() => {
      // Logic for service card reveals
      gsap.fromTo(
        '.reveal-service-card',
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerNode.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Unique approach for interactive icon states
      const featureIcons = gsap.utils.toArray('.visual-icon-wrapper');
      featureIcons.forEach((icon) => {
        const hoverAnim = gsap.to(icon, { 
          scale: 1.15, 
          rotate: 8, 
          duration: 0.4, 
          paused: true, 
          ease: 'back.out(2)' 
        });
        
        icon.addEventListener('mouseenter', () => hoverAnim.play());
        icon.addEventListener('mouseleave', () => hoverAnim.reverse());
      });

      // Outreach section motion
      gsap.from(actionAreaRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        scrollTrigger: {
          trigger: actionAreaRef.current,
          start: 'top 95%',
        },
      });
    }, containerNode);

    return () => animationCtx.revert();
  }, []);

  return (
    <section ref={containerNode} className="container mx-auto py-32 px-4 sm:px-6 lg:px-8">
      {/* Intro Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black tracking-tight text-primary mb-4 uppercase">
          My Services
        </h2>
        <div className="h-1 w-16 bg-primary/20 mx-auto mb-6 rounded-full" />
        <p className="text-secondary max-w-2xl mx-auto text-lg leading-relaxed italic">
          Over the years, I’ve worked with immense focus, passion, and dedication
          to create digital solutions that truly help people. Your first consultancy
          is always <span className="font-bold text-primary not-italic underline decoration-primary/20">free</span>.
        </p>
      </div>

      {/* Offerings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {PROFESSIONAL_OFFERINGS.map((item, idx) => {
          const Visual = item.Graphic;
          return (
            <div
              key={idx}
              className="reveal-service-card group bg-white border border-zinc-100 rounded-3xl p-10 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:bg-primary/[0.03] flex flex-col items-center text-center"
            >
              <div className="mb-6 visual-icon-wrapper p-4 bg-zinc-50 rounded-2xl group-hover:bg-white transition-colors">
                <Visual className="w-12 h-12 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-extrabold text-primary mb-4 uppercase tracking-wide">
                {item.name}
              </h3>
              <p className="text-secondary text-sm leading-relaxed font-medium">
                {item.info}
              </p>
            </div>
          );
        })}
      </div>

      {/* Engagement Block */}
      <div ref={actionAreaRef} className="mt-24 text-center bg-zinc-50/50 py-16 rounded-[2rem] border border-zinc-100">
        <h3 className="text-3xl font-black text-primary mb-4 tracking-tight">
          Ready to book your free consultancy?
        </h3>
        <p className="text-secondary mb-10 max-w-lg mx-auto font-medium">
          I’m available on weekends (Saturday & Sunday). Connect with me directly
          via email or secure your slot using the form below.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSe7wYmNWGFWes-8lDIEtuTWKSuXBzQxMI-MJT84j3JkNfPN8A/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:brightness-110 transition-all active:scale-95"
          >
            Book Appointment
          </Link>
          <Link
            href="mailto:mdsadiksadik464@gmail.com"
            className="px-10 py-4 border-2 border-primary text-primary rounded-2xl font-black hover:bg-primary hover:text-white transition-all active:scale-95"
          >
            Email Me
          </Link>
        </div>
      </div>
    </section>
  );
}

export const metadata = {
  title: 'Services - Md Sadik',
  description: 'Explore the expert digital services provided by Md Sadik, including full-stack development and technical consultancy.',
};