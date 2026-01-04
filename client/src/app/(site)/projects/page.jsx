'use client';

import { motion } from 'framer-motion';
import ProjectsSection from '@/components/ProjectsSection';


export default function ProjectsPage() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-background overflow-x-hidden"
    >
      
      <div className="relative pt-10">
        <ProjectsSection />
      </div>
    </motion.main>
  );
}