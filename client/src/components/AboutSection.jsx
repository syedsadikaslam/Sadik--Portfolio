'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import ProjectPreview from './ProjectPreview';

gsap.registerPlugin(ScrollTrigger);

// Data Objects
const TECH_STACK = [
  { label: 'React', icon: '/logos/react.svg' },
  { label: 'Node.js', icon: '/logos/nodejs.svg' },
  { label: 'Express', icon: '/logos/express.svg' },
  { label: 'MongoDB', icon: '/logos/mongodb.svg' },
  { label: 'PostgreSQL', icon: '/logos/postgresql.svg' },
  { label: 'JavaScript', icon: '/logos/js.svg' },
  { label: 'Postman', icon: '/logos/postman.svg' },
  { label: 'Tailwind', icon: '/logos/tailwind.svg' },
  { label: 'Python', icon: '/logos/python.svg' },
  { label: 'Git & GitHub', icon: '/logos/git.svg' },
  { label: 'Next.js', icon: '/logos/nextjs.svg' },
];

const CAREER_TIMELINE = [
  { period: '2021', description: 'Started my journey into web development, building foundational projects with React and Node.js.' },
  { period: '2023', description: 'Began taking on freelance work, successfully delivering e-commerce sites and portfolio pages for clients.' },
  { period: '2023+', description: 'Secured internships annually, gaining hands-on experience in both Full-Stack and Machine Learning environments.' }
];

const ACADEMIC_CREDENTIALS = [
  { title: 'Build and Deploy Workshop', provider: 'GeeksforGeeks', url: 'https://drive.google.com/file/d/1EKkdaCjUZ7lMxHUWJLNVJzcZWvSptkT6/view' },
  { title: 'Full Stack Web Development With MERN STACK & GenAl', provider: 'Udemy', url: 'https://www.udemy.com/certificate/UC-34322bb4-d487-4557-b64a-b1f21a552937/' },
  { title: 'Data Structures and Algorithms in C ', provider: 'Infosys Springboard', url: 'https://infyspringboard.onwingspan.com/assets/common/pdfjs-2.14.305-dist/web/viewer.html?file=https%3A%2F%2Finfyspringboard.onwingspan.com%2Fpublic-assets%2Finfosysheadstart%2Fcert%2Flex_auth_01317717336104140852_shared%2F1-1f690ab0-9d71-4647-9fb1-8c5388f5c6b2.pdf#page=1' },
  { title: 'C PROGRAMMING ', provider: 'DataFlair', url: 'https://drive.google.com/file/d/1BWWzIFEfy6ShTX2f8ppbo-riuNozgCt5/view' },
  { title: 'PYTHON PROGRAMMING ', provider: ' HCL GUVI', url: 'https://www.guvi.in/certificate?id=5V81hH5l83D6o313m9&getUri=true' },
  { title: 'Data Analysis using Excel', provider: 'Capgemini', url: 'http://www.edubridgeindia.com/certificate-detail?enrollment_number=EBEON1124956270' },
  { title: ' Data Analysis With Python ', provider: 'IBM', url: 'https://www.coursera.org/account/accomplishments/verify/TBNXA768FCDB' },
  { title: 'DIPLOMA IN FINANCIAL ACCOUNTING', provider: 'CHARLES COMPUTER LAB', url: 'https://drive.google.com/file/d/1Av_tm4SnNIm-EoeGkrsKQJCWqvZRKUnk/view' },
  { title: 'SPOKEN ENGLISH ', provider: 'Josh Talks', url: 'https://drive.google.com/file/d/1BbJn20FuLpSsEE7WIBKvaa5tX-Um_5Ud/view' }
];

const AboutSection = () => {
  const mainWrapper = useRef(null);
  const avatarContainerRef = useRef(null);

  useLayoutEffect(() => {
    let context = gsap.context(() => {
      gsap.from('.reveal-item', {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: mainWrapper.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      const arrows = gsap.utils.toArray('.visual-connector');
      arrows.forEach((arrow, idx) => {
        gsap.fromTo(arrow, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 + idx * 0.1 });
        gsap.to(arrow, { y: '+=5', repeat: -1, yoyo: true, ease: 'power1.inOut', duration: 2, delay: 1 + idx * 0.1 });
      });

      if (avatarContainerRef.current) {
        const profileImg = avatarContainerRef.current.querySelector('img');
        gsap.fromTo(profileImg,
          { scale: 1, y: '0%' },
          {
            scale: 1.35,
            y: '-8%',
            ease: "none",
            scrollTrigger: {
              trigger: avatarContainerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            }
          }
        );
      }
    }, mainWrapper);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={mainWrapper}
      id="about"
      className="container mx-auto py-28 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 items-start justify-center">

        {/* Intro Block */}
        <div className="reveal-item order-1 text-center lg:text-left">
          <h2 className="text-4xl font-bold tracking-tight text-primary mb-5">About Me</h2>
          <p className="max-w-xl mx-auto lg:mx-0 text-lg text-secondary leading-relaxed">
            A Computer Science Engineering student specializing in Full Stack Development and AI/ML.
            I have strengthened my skills through a certification in MERN Stack and Generative AI (GenAI),
            applying this knowledge to develop dynamic web applications.
          </p>
        </div>

        {/* Career Path */}
        <div className="reveal-item order-2 lg:order-3 text-center lg:text-left">
          <h3 className="text-2xl font-semibold text-primary mb-6">My Journey</h3>
          <div className="relative border-l-2 border-primary/20 mx-auto lg:mx-0 w-fit text-left">
            {CAREER_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative mb-10 ml-10">
                <div className="absolute -left-[49px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                <p className="font-bold text-lg text-primary">{item.period}</p>
                <p className="text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Profile Card - FIXED Image Optimization */}
        <div className="reveal-item order-3 lg:order-2 md:max-w-sm mx-auto flex flex-col items-center bg-white rounded-lg shadow-x overflow-hidden">
          <div ref={avatarContainerRef} className="w-[220px] h-[420px] relative overflow-hidden bg-gray-150 rounded-xl mx-auto">
            <Image
              src="/profile2.png"
              alt="MD SADIK"
              fill
              sizes="(max-width: 768px) 100vw, 220px" // Fix: Added sizes prop
              className="object-contain"
              priority
            />
          </div>
          <div className="w-full p-6 text-center">
            <h3 className="text-5xl font-bold text-primary mb-2">5+</h3>
            <p className="text-lg text-secondary mb-4">Projects Completed</p>
            <Link href="/projects" className="inline-flex items-center text-primary font-bold hover:underline">
              View Projects
              <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Visual Decoration - FIXED Aspect Ratio */}
        <div className="reveal-item hidden lg:block absolute top-[68%] left-[27%] w-48 h-24 pointer-events-none z-20">
          <Image
            src="/arrows.png"
            alt="Directional decoration"
            width={192}
            height={96}
            style={{ width: 'auto', height: 'auto' }} // Fix: Added auto styles
            className="visual-connector"
          />
        </div>
      </div>

      {/* Showcase Section */}
      <div className="reveal-item text-center mt-24 overflow-hidden">
        <h3 className="text-3xl font-bold text-primary mb-12 uppercase">Featured Projects</h3>
        <ProjectPreview />
        <div className="mt-8">
          <Link href="/projects" className="inline-flex items-center text-primary font-bold hover:underline group text-sm sm:text-base">
            <span className="whitespace-nowrap">To view details and to see all projects, click here</span>
            <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <Link
            href="/services"
            className="inline-block bg-primary text-white px-6 py-3 rounded-xl shadow-lg hover:bg-primary/90 transition-all duration-300 animate-pulse-slow"
          >
            Book a Service / Learn More
          </Link>
        </div>
      </div>

      {/* Toolkit Grid - FIXED Image Optimization inside loop */}
      <div className="reveal-item mt-24">
        <h3 className="text-3xl font-bold text-primary mb-12 text-center uppercase tracking-widest">My Toolkit</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 justify-items-center">
          {TECH_STACK.map((tool, i) => (
            <div key={i} className="flex flex-col items-center gap-3 hover:scale-110 transition-transform duration-300">
              <div className="w-14 h-14 relative">
                <Image
                  src={tool.icon}
                  alt={tool.label}
                  fill
                  sizes="56px" // Optimization for small icons
                  className="object-contain"
                />
              </div>
              <p className="text-xs font-black uppercase text-secondary/60">{tool.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Section */}
      <div className="relative py-20 px-6 bg-zinc-50 rounded-3xl mt-20">
        <h3 className="text-4xl font-bold text-primary text-center mb-14 tracking-tight uppercase">Certifications</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {ACADEMIC_CREDENTIALS.map((cert, index) => (
            <div key={index} className="relative group bg-white border border-zinc-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
              <div className="relative z-10 flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-primary/5 text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:text-primary/70 transition-colors">
                      {cert.title}
                    </a>
                  ) : (
                    <p className="font-bold text-primary">{cert.title}</p>
                  )}
                  <p className="text-[10px] font-black uppercase text-secondary/50 mt-1">Provider: {cert.provider}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;