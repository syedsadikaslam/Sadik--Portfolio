'use client';

import { useLayoutEffect, useRef, useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// 1️⃣ REFACTORED PROJECT REPOSITORY
const PROJECT_COLLECTION = [
  {
    title: "SadiKart – PERN E-Commerce Platform",
    brief: "A production-ready full-stack e-commerce platform built using the PERN stack.",
    overview: "SadiKart was built as a complete, real-world e-commerce ecosystem with a strong focus on scalability, security, and production-level architecture. The project demonstrates end-to-end full-stack development, covering backend API design, database modeling, and frontend state management. It simulates enterprise-grade workflows including role-based access and automated mailers.",
    solution: "Many basic e-commerce projects lack real-world workflows. SadiKart solves this by implementing secure authentication, admin product/order management, and dynamic discovery features closely simulating an enterprise platform.",
    blockers: "Designing JWT-based auth with RBAC, optimizing REST APIs, and managing complex state with Redux Toolkit were key challenges. Integrating transactional email via Brevo required careful architectural coordination.",
    roadmap: "Future scaling into a multi-vendor platform with seller dashboards, advanced sales analytics, and user-behavior-based recommendations.",
    stack: ["PostgreSQL", "Express.js", "React.js", "Node.js", "Redux Toolkit", "JWT", "Brevo Mail", "Tailwind CSS"],
    demoUrl: "https://sadikart.vercel.app",
    sourceUrl: "https://github.com/syedsadikaslam/SadiKart-Modern-E-Commerce-Platform-PERN-Redux-Brevo-Mail-",
    imagePath: "/snapshots/sadikart.png",
    kpi: { amount: "100+", text: "Users Signups" },
  },
  {
    title: "SadiKart – Admin Panel",
    brief: "A secure and feature-rich admin dashboard for managing a full-scale e-commerce platform.",
    overview: "Developed as a centralized control system to handle critical operations. Built with an emphasis on security and usability, enabling admins to manage inventory, orders, and users through a clean interface that mirrors real-world admin workflows.",
    solution: "Solves the lack of operational control in basic projects by offering a role-protected dashboard for monitoring the entire e-commerce ecosystem from one interface.",
    blockers: "Strict role-based access, scalable order flows, and handling real-time data updates while maintaining high performance across large datasets.",
    roadmap: "Expansion into multi-vendor management with sales forecasting, seller approvals, and advanced access permissions.",
    stack: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "PostgreSQL", "RBAC", "Tailwind CSS", "Cloudinary"],
    demoUrl: "https://sadikartadmin.vercel.app",
    sourceUrl: "https://github.com/syedsadikaslam/SadiKart-Modern-E-Commerce-Platform-PERN-Redux-Brevo-Mail-",
    imagePath: "/snapshots/sadikartadmin.png",
  },
  {
    title: "MODSSER ENTERPRISES – Construction Hub",
    brief: "A full-stack business platform featuring project showcases, automated inquiries, and AI support.",
    overview: "Digitally transforming a real-world construction business. Includes a professional project gallery, automated email handling for lead generation, and an AI-powered chatbot to improve client engagement and response times.",
    solution: "Combines a professional web presence with AI-driven client assistance, replacing manual communication with faster, automated workflows.",
    blockers: "Designing a brand-specific UI, building reliable backend APIs, and training a chatbot to handle domain-specific client questions.",
    roadmap: "Adding a dedicated admin dashboard for inquiry tracking, SEO optimization, and automated quotation generators.",
    stack: ["MongoDB", "Node.js", "Express.js", "Tailwind CSS", "Brevo Service", "AI Chatbot", "JavaScript"],
    demoUrl: "https://www.modsserenterprises.in",
    sourceUrl: "https://github.com/syedsadikaslam/MODSSER-ENTERPRISES-Construction-Website",
    imagePath: "/snapshots/modsserenterprises.png",
  },
  {
    title: "FloraScan – AI Plant Medic",
    brief: "AI-powered web app for plant identification, disease detection, and health assessment.",
    overview: "A modern platform designed for agriculture and gardening. Users upload images, and the app leverages Google Gemini AI to provide diagnostics, disease identification, and personalized plant care suggestions.",
    solution: "Eliminates the need for expert botanical knowledge for basic diagnostics, providing instant AI-driven insights for farmers and enthusiasts.",
    blockers: "Optimizing image upload processing, Gemini API integration, and rendering complex AI data in a user-friendly format.",
    roadmap: "Scan history dashboards, multilingual support, and mobile app integration for real-time field use.",
    stack: ["React.js", "Node.js", "Express.js", "Google Gemini API", "AI Analysis", "REST APIs", "Tailwind CSS"],
    demoUrl: "https://florascanai.vercel.app",
    sourceUrl: "https://github.com/syedsadikaslam/FloraScan-AI-Powered-Plant-Analysis-Tool",
    imagePath: "/snapshots/florascan.png",
  }
];

// 2️⃣ DYNAMIC KPI COUNTER
const MetricDisplay = ({ metric, label, isAnimated, onDark = false }) => {
  const countRef = useRef(null);
  const val = parseInt(metric);
  const suffix = metric.replace(val.toString(), "");

  useEffect(() => {
    const node = countRef.current;
    if (!node) return;

    const dataObj = { val: 0 };
    const tween = gsap.to(dataObj, {
      val: val,
      duration: 2,
      ease: "power2.out",
      paused: true,
      onUpdate: () => (node.innerText = Math.floor(dataObj.val) + suffix),
    });

    if (isAnimated) {
      ScrollTrigger.create({
        trigger: node,
        start: "top 90%",
        onEnter: () => tween.play(),
        once: true,
      });
    } else {
      tween.play();
    }
    return () => tween.kill();
  }, [val, suffix, isAnimated]);

  return (
    <div className={onDark ? "bg-zinc-50 p-6 rounded-2xl text-center shadow-inner my-6" : "mb-4"}>
      <h3 ref={countRef} className={`font-black ${onDark ? 'text-5xl text-primary' : 'text-2xl text-primary'}`}>0{suffix}</h3>
      <p className={`${onDark ? 'text-zinc-500' : 'text-xs text-zinc-400 font-bold uppercase'}`}>{label}</p>
    </div>
  );
};

// 3️⃣ INTERACTIVE WORK CARD
const WorkCard = ({ item, openModal }) => (
  <div 
    onClick={openModal}
    className="group bg-white rounded-2xl shadow-lg border border-zinc-100 overflow-hidden flex flex-col h-full transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-pointer"
  >
    <div className="h-52 w-full relative overflow-hidden bg-zinc-100">
      <Image 
        src={item.imagePath} 
        alt={item.title} 
        fill 
        className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
      />
      <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors" />
    </div>

    <div className="p-7 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-primary group-hover:text-indigo-600 transition-colors mb-2">{item.title}</h3>
      <p className="text-zinc-600 text-sm line-clamp-2 mb-4 italic">"{item.brief}"</p>

      {item.kpi && <MetricDisplay metric={item.kpi.amount} label={item.kpi.text} isAnimated={true} />}

      <div className="flex flex-wrap gap-1.5 mt-auto pt-4">
        {item.stack.slice(0, 4).map((s, i) => (
          <span key={i} className="text-[10px] font-bold px-2 py-1 bg-zinc-100 text-zinc-500 rounded-md border border-zinc-200 uppercase">{s}</span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-50">
        <span className="text-xs font-bold text-primary flex items-center gap-1"><ExternalLink size={12}/> Explore</span>
        <span className="text-xs font-bold text-zinc-400 flex items-center gap-1"><Github size={12}/> Source</span>
      </div>
    </div>
  </div>
);

// 4️⃣ REFACTORED PROJECT MODAL
const DetailOverlay = ({ project, exit }) => {
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(boxRef.current, { opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "expo.out" });
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 z-[1100] bg-zinc-900/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6" onClick={(e) => e.target === e.currentTarget && exit()}>
      <div ref={boxRef} className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col">
        <button onClick={exit} className="absolute top-5 right-6 z-50 text-zinc-400 hover:text-primary text-2xl font-light">✕</button>
        
        <div className="overflow-y-auto p-8 sm:p-12 space-y-10">
          <header>
            <h2 className="text-4xl font-black text-primary leading-tight">{project.title}</h2>
            <div className="h-1 w-20 bg-primary/20 mt-4 rounded-full" />
          </header>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
            <Image src={project.imagePath} alt="Project view" fill className="object-cover" />
          </div>

          {project.kpi && <MetricDisplay metric={project.kpi.amount} label={project.kpi.text} isAnimated={false} onDark={true} />}

          <div className="grid grid-cols-1 gap-8">
            {[
              { label: "Core Problem", data: project.solution },
              { label: "Technical Blockers", data: project.blockers },
              { label: "Execution Logic", data: project.overview },
              { label: "Vision", data: project.roadmap }
            ].map((section, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-primary font-bold text-lg flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" /> {section.label}
                </h4>
                <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">{section.data}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-4">
            {project.stack.map((s, i) => (
              <span key={i} className="px-3 py-1 bg-zinc-100 text-zinc-600 text-xs font-bold rounded-full border border-zinc-200">{s}</span>
            ))}
          </div>

          <footer className="flex gap-4 pt-6">
            <a href={project.demoUrl} target="_blank" className="flex-1 text-center py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">Launch Live</a>
            <a href={project.sourceUrl} target="_blank" className="flex-1 text-center py-4 bg-zinc-100 text-zinc-600 rounded-xl font-bold border border-zinc-200 hover:bg-zinc-200 transition-all">Git Repo</a>
          </footer>
        </div>
      </div>
    </div>
  );
};

// 5️⃣ MAIN PROJECTS SECTION
const ProjectsSection = () => {
  const root = useRef(null);
  const floatingBtn = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".reveal-card", {
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" }
      });

      if (floatingBtn.current) {
        gsap.to(floatingBtn.current, { scale: 1.08, repeat: -1, yoyo: true, duration: 1.5, ease: "sine.inOut" });
      }
    }, root);
    return () => context.revert();
  }, []);

  return (
    <section ref={root} id="portfolio" className="container mx-auto py-32 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-20 space-y-4">
        <h2 className="text-5xl font-black text-primary tracking-tighter">My Craft & Work</h2>
        <p className="text-zinc-500 max-w-xl mx-auto text-lg leading-relaxed">
          A selection of end-to-end applications built with performance, architecture, and user-intent in mind.
        </p>
      </header>

      {/* PROMO CARD */}
      <div className="mb-20">
        <Link href="/services" className="block p-10 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-3xl text-center group transition-all hover:shadow-2xl hover:border-indigo-200">
          <h3 className="text-2xl font-bold text-primary mb-3 group-hover:scale-105 transition-transform">Ready to start a project?</h3>
          <p className="text-zinc-600 text-sm sm:text-base max-w-lg mx-auto">
            I offer full-stack development, debugging, and consulting. Let's build something scalable together.
          </p>
          <div className="mt-6 font-black text-indigo-600 uppercase tracking-widest text-xs">View Services &rarr;</div>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {PROJECT_COLLECTION.map((work, idx) => (
          <div key={idx} className="reveal-card">
            <WorkCard item={work} openModal={() => setActiveProject(work)} />
          </div>
        ))}
      </div>

      {/* FLOAT BUTTON */}
      <Link href="/services" ref={floatingBtn} className="fixed bottom-10 right-10 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-2xl z-[100] hover:brightness-110 flex items-center gap-2">
        Hire Me
      </Link>

      {activeProject && <DetailOverlay project={activeProject} exit={() => setActiveProject(null)} />}
    </section>
  );
};

export default ProjectsSection;