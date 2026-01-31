"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import ProjectPreview from "./ProjectPreview";

gsap.registerPlugin(ScrollTrigger);

// Data Objects (Purely preserved)
const TECH_STACK = [
  { label: "React", icon: "/logos/react.svg" },
  { label: "Node.js", icon: "/logos/nodejs.svg" },
  { label: "Express", icon: "/logos/express.svg" },
  { label: "MongoDB", icon: "/logos/mongodb.svg" },
  { label: "PostgreSQL", icon: "/logos/postgresql.svg" },
  { label: "JavaScript", icon: "/logos/js.svg" },
  { label: "Postman", icon: "/logos/postman.svg" },
  { label: "Tailwind", icon: "/logos/tailwind.svg" },
  { label: "Python", icon: "/logos/python.svg" },
  { label: "Java", icon: "/logos/java.svg" },
  { label: "Git & GitHub", icon: "/logos/git.svg" },
  { label: "Next.js", icon: "/logos/nextjs.svg" },
];

const CAREER_TIMELINE = [
  {
    period: "2021",
    description:
      "Started my journey into web development, building foundational projects with React and Node.js.",
  },
  {
    period: "2023",
    description:
      "Began taking on freelance work, successfully delivering e-commerce sites and portfolio pages for clients.",
  },
  {
    period: "2023+",
    description:
      "Secured internships annually, gaining hands-on experience in both Full-Stack and Machine Learning environments.",
  },
];

const ACADEMIC_CREDENTIALS = [
  {
    title: "Build and Deploy Workshop",
    provider: "GeeksforGeeks",
    url: "https://drive.google.com/file/d/1EKkdaCjUZ7lMxHUWJLNVJzcZWvSptkT6/view",
  },
  {
    title: "Full Stack Web Development With MERN STACK & GenAl",
    provider: "Udemy",
    url: "https://www.udemy.com/certificate/UC-34322bb4-d487-4557-b64a-b1f21a552937/",
  },
  {
    title: "Data Structures and Algorithms in C ",
    provider: "Infosys Springboard",
    url: "https://infyspringboard.onwingspan.com/assets/common/pdfjs-2.14.305-dist/web/viewer.html?file=https%3A%2F%2Finfyspringboard.onwingspan.com%2Fpublic-assets%2Finfosysheadstart%2Fcert%2Flex_auth_01317717336104140852_shared%2F1-1f690ab0-9d71-4647-9fb1-8c5388f5c6b2.pdf#page=1",
  },
  {
    title: "C PROGRAMMING ",
    provider: "DataFlair",
    url: "https://drive.google.com/file/d/1BWWzIFEfy6ShTX2f8ppbo-riuNozgCt5/view",
  },
  {
    title: "PYTHON PROGRAMMING ",
    provider: " HCL GUVI",
    url: "https://www.guvi.in/certificate?id=5V81hH5l83D6o313m9&getUri=true",
  },
  {
    title: "Data Analysis using Excel",
    provider: "Capgemini",
    url: "http://www.edubridgeindia.com/certificate-detail?enrollment_number=EBEON1124956270",
  },
  {
    title: " Data Analysis With Python ",
    provider: "IBM",
    url: "https://www.coursera.org/account/accomplishments/verify/TBNXA768FCDB",
  },
  {
    title: "DIPLOMA IN FINANCIAL ACCOUNTING",
    provider: "CHARLES COMPUTER LAB",
    url: "https://drive.google.com/file/d/1Av_tm4SnNIm-EoeGkrsKQJCWqvZRKUnk/view",
  },
  {
    title: "SPOKEN ENGLISH ",
    provider: "Josh Talks",
    url: "https://drive.google.com/file/d/1BbJn20FuLpSsEE7WIBKvaa5tX-Um_5Ud/view",
  },
];

const AboutSection = () => {
  const mainWrapper = useRef(null);
  const avatarContainerRef = useRef(null);

  useLayoutEffect(() => {
    let context = gsap.context(() => {
      gsap.from(".reveal-item", {
        opacity: 0,
        y: 60,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: mainWrapper.current,
          start: "top 80%",
        },
      });

      // Floating animation for tech icons
      gsap.to(".tech-card", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: { each: 0.1, from: "random" },
      });

      if (avatarContainerRef.current) {
        gsap.to(avatarContainerRef.current.querySelector("img"), {
          scale: 1.2,
          scrollTrigger: {
            trigger: avatarContainerRef.current,
            scrub: 1,
          },
        });
      }
    }, mainWrapper);
    return () => context.revert();
  }, []);

  return (
    <section
      ref={mainWrapper}
      id="about"
      className="relative py-20 px-5 lg:px-12 bg-zinc-50 dark:bg-[#050505] overflow-hidden transition-colors duration-700"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-center">
          {/* 1. Intro Block */}
          <div className="reveal-item order-1 space-y-8">
            <h2 className="text-4xl font-black tracking-tighter text-zinc-900 dark:text-white leading-[0.9]">
              About {" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                Me.
              </span>
            </h2>
            <p className="text-1xl text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              I'm a A Computer Science Engineering student specializing in Full
              Stack Development and AI/ML. I have strengthened my skills through
              a certification in MERN Stack and Generative AI (GenAI), applying
              this knowledge to develop dynamic web applications.{" "}
              <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                MERN Stack
              </span>{" "}
              power with{" "}
              <span className="text-zinc-900 dark:text-zinc-100 font-bold">
                GenAI
              </span>{" "}
              intelligence.
            </p>
          </div>

          {/* 2. Central Avatar Card */}
          <div className="reveal-item order-3 lg:order-2 flex flex-col items-center">
            <div
              ref={avatarContainerRef}
              className="relative w-[300px] h-[450px] group"
            >
              {/* Decorative Rings */}
              <div className="absolute -inset-4 border border-primary/20 rounded-[3rem] group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute -inset-8 border border-primary/10 rounded-[4rem] group-hover:scale-110 transition-transform duration-1000 delay-75" />

             <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] bg-white shadow-2xl border-4 border-zinc-100 dark:border-zinc-900">                <Image
                  src="/profile2.png"
                  alt="MD SADIK"
                  fill
                  className="object-cover transition-all duration-700"
                  priority
                />
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800">
                <p className="text-4xl font-black text-primary">6+</p>
                <p className="text-[10px] font-bold uppercase tracking-tighter text-zinc-400">
                  Deployed Apps
                </p>
              </div>
            </div>
          </div>

          {/* 3. Journey Timeline */}
          <div className="reveal-item order-2 lg:order-3">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-10">
              Milestones
            </h3>
            <div className="space-y-12">
              {CAREER_TIMELINE.map((item, idx) => (
                <div
                  key={idx}
                  className="relative pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 group"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-primary transition-colors" />
                  <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    {item.period}
                  </span>
                  <p className="mt-2 text-zinc-800 dark:text-zinc-200 font-bold leading-tight group-hover:text-primary transition-colors">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Showcase & Projects */}
        <div className="reveal-item mt-20 text-center">
          <h3 className="text-4xl font-black text-zinc-900 dark:text-white mb-10 mt-15 tracking-tight">
            CRAFTED PROJECTS
          </h3>
            <ProjectPreview />
          <div className="mt-12 space-y-8">
            <Link
              href="/projects"
              className="group text-lg font-bold text-zinc-500 hover:text-primary transition-all flex items-center justify-center gap-2"
            >
              Explore Complete Archive
              <svg
                className="w-5 h-5 group-hover:translate-x-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-block px-12 py-5 bg-primary text-white font-black rounded-2xl shadow-[0_20px_40px_rgba(var(--primary),0.3)] hover:scale-105 active:scale-95 transition-all"
            >
              HIRE ME NOW
            </Link>
          </div>
        </div>

        {/* 5. Toolkit Grid (The "Floating" effect) */}
        <div className="reveal-item mt-20">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.6em] text-zinc-400 mb-5">
            Standardized Toolkit
          </p>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {TECH_STACK.map((tool, i) => (
              <div
                key={i}
                className="tech-card flex flex-col items-center p-6 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 hover:border-primary/40 transition-all shadow-sm"
              >
                <div className="relative w-12 h-12 mb-4">
                  <Image
                    src={tool.icon}
                    alt={tool.label}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                  {tool.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Certifications (Glassmorphism) */}
        <div className="reveal-item mt-20 pb-0">
          <h3 className="text-center text-4xl font-black text-zinc-900 dark:text-white mb-5">
            CERTIFICATIONS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-0 py-0">
            {ACADEMIC_CREDENTIALS.map((cert, index) => (
              <a
                key={index}
                href={cert.url}
                target="_blank"
                className="group relative p-8 rounded-[2rem] bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-white/20 dark:border-white/5 hover:bg-primary transition-all duration-500 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-white/20">
                    <svg
                      className="w-5 h-5 text-primary group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-black text-zinc-900 dark:text-zinc-100 group-hover:text-white transition-colors leading-tight mb-2">
                    {cert.title}
                  </h4>
                  <p className="text-xs font-bold text-zinc-500 dark:text-zinc-500 group-hover:text-white/70 tracking-widest uppercase">
                    {cert.provider}
                  </p>
                </div>
                {/* Decorative background number */}
                <span className="absolute bottom-[-20%] right-[-5%] text-9xl font-black text-black/5 dark:text-white/5 group-hover:text-white/10 transition-colors">
                  0{index + 1}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
