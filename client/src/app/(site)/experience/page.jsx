'use client';

import ExperienceTimeline from '@/components/ExperienceTimeline';

/**
 * REFACTORED CAREER REPOSITORY
 * Data has been refined to reflect your role as a Lead Full Stack Engineer.
 */
const CAREER_HISTORY = [
  {
    category: 'corporate',
    period: 'Sep 2023 – Mar 2024',
    designation: 'Lab Invigilator & IT Operations Lead',
    organization: 'TCS iON',
    highlights: [
      'Orchestrated technical lab operations during high-stakes examinations, maintaining 100% academic compliance and integrity standards.',
      'Administered critical IT infrastructure including network troubleshooting and hardware maintenance to facilitate seamless digital assessments.'
    ]
  },
  {
    category: 'corporate',
    period: 'Aug 2023 - Oct 2023',
    designation: 'ML Engineer & Data Science Associate',
    organization: 'YBI Foundation',
    highlights: [
      'Architected end-to-end machine learning pipelines involving complex data preprocessing, advanced feature engineering, and model validation using Scikit-Learn.'
    ]
  },
  {
    category: 'academic',
    period: 'Sep 2022 - Oct 2026',
    designation: 'B.Tech in Computer Science & Engineering',
    organization: 'Dr. A. P. J. Abdul Kalam Technical University, Lucknow',
    highlights: [
      'Serving as Lead Full Stack Engineer & System Architect for major aggregator platform projects.'
    ]
  },
  {
    category: 'academic',
    period: 'Apr 2018 - May 2020',
    designation: 'Higher Secondary Education (Class XII)',
    organization: 'Hasanpur College Samastipur',
    highlights: []
  },
  {
    category: 'academic',
    period: 'Apr 2019 - Mar 2020',
    designation: 'Secondary School Education (Class X)',
    organization: 'SKJP High School Samastipur',
    highlights: []
  }
];

export default function ExperiencePage() {
  /**
   * FIX: Ensure the prop name passed here matches what ExperienceTimeline expects.
   * If your component uses 'experience', use that. If it uses 'history', update it.
   */
  return (
    <main className="min-h-screen bg-background py-20">
      <ExperienceTimeline history={CAREER_HISTORY} />
    </main>
  );
}