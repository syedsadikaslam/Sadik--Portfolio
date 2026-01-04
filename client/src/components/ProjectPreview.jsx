'use client';

import { useLayoutEffect, useRef, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// Refactored Data Structure
const PORTFOLIO_WORKS = [
  {
    name: "SadiKart – PERN E-Commerce Platform",
    info: "A production-ready PERN stack e-commerce platform featuring secure authentication, intelligent product discovery, automated email flows, and a powerful admin system.",
    stats: { amount: "100+", text: "User Signups" },
    url: "https://sadikart.vercel.app",
    thumb: "/snapshots/sadikart.png",
  },
  {
    name: "SadiKart – Admin Panel",
    info: "A secure role-based admin dashboard for managing products, inventory, orders, and users in a full-scale e-commerce ecosystem.",
    url: "https://sadikartadmin.vercel.app",
    thumb: "/snapshots/sadikartadmin.png",
  },
  {
    name: "FloraScan – AI Powered Plant Analysis Tool",
    info: "A modern full-stack AI-based plant analysis application built with React, Node.js, Express.js, and the Google Gemini API. It allows users to upload plant images and receive intelligent insights such as plant identification, health analysis, disease detection, and personalized care recommendations.",
    url: "https://florascanai.vercel.app",
    thumb: "/snapshots/florascan.png",
  },
];

// Refactored Counter Component
const DynamicTracker = ({ target, subtitle }) => {
  const displayRef = useRef(null);
  const wrapperRef = useRef(null);
  
  const numericLimit = parseInt(target);
  const labelSuffix = target.replace(numericLimit.toString(), '');

  useEffect(() => {
    const textNode = displayRef.current;
    const boxNode = wrapperRef.current;
    if (!textNode || !boxNode) return;

    const dataObj = { current: 0 };
    const counterAnim = gsap.to(dataObj, {
      current: numericLimit,
      duration: 2.2,
      ease: 'expo.out',
      paused: true,
      onUpdate: () => {
        textNode.innerText = Math.floor(dataObj.current) + labelSuffix;
      },
      onComplete: () => {
        gsap.to(boxNode, {
          scale: 1.05,
          boxShadow: '0 10px 30px -10px rgba(59, 130, 246, 0.5)',
          duration: 0.4,
          yoyo: true,
          repeat: 1,
        });
      },
    });

    ScrollTrigger.create({
      trigger: textNode,
      start: 'top 90%',
      onEnter: () => counterAnim.play(),
      once: true,
    });

    return () => counterAnim.kill();
  }, [numericLimit, labelSuffix]);

  return (
    <div ref={wrapperRef} className="mt-5 text-center bg-primary/5 rounded-xl py-4 px-4 border border-primary/10 transition-all">
      <h3 ref={displayRef} className="text-3xl font-black text-primary">
        0{labelSuffix}
      </h3>
      <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider mt-1">{subtitle}</p>
    </div>
  );
};

const ProjectPreview = () => {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const scope = gsap.context(() => {
      // Image Parallax/Zoom Logic Refactored
      const visualLayers = gsap.utils.toArray('.visual-asset');
      visualLayers.forEach((asset) => {
        gsap.fromTo(asset,
          { scale: 1.25, y: '-8%' },
          {
            scale: 1,
            y: '0%',
            ease: 'none',
            scrollTrigger: {
              trigger: asset.closest('.work-card-outer'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.5,
            },
          }
        );
      });

      // Entrance Stagger Logic
      gsap.from('.work-card-outer', {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top 85%',
        },
      });
    }, mainRef);

    return () => scope.revert();
  }, []);

  return (
    <div ref={mainRef} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PORTFOLIO_WORKS.map((work, i) => (
          <Link
            href={work.url || '#'}
            key={i}
            target="_blank"
            rel="noopener noreferrer"
            className="block group work-card-outer h-full"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 h-full flex flex-col">
              
              {/* Media Container */}
              <div className="w-full h-56 relative overflow-hidden bg-zinc-50">
                <Image
                  src={work.thumb}
                  alt={work.name}
                  fill
                  className="object-cover visual-asset transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Information Section */}
              <div className="p-7 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3 leading-snug">
                    {work.name}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed font-medium">
                    {work.info}
                  </p>
                </div>

                {/* Conditional Stats Tracking */}
                {work.stats && (
                  <DynamicTracker
                    target={work.stats.amount}
                    subtitle={work.stats.text}
                  />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectPreview;