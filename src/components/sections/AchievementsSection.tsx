import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, CheckCircle2, 
  Sparkles, Cpu, Database, Flame 
} from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const milestoneBadges = [
    {
      title: 'Full Stack Engineering',
      issuer: 'End-to-End Enterprise Systems',
      description: 'Demonstrated capacity to integrate modern React SPAs with high-concurrency Java Servlets and Node runtimes.',
      icon: <Cpu className="w-5 h-5 text-[#B8A7D9]" />,
      date: 'VERIFIED 2026'
    },
    {
      title: 'ACID Transactional Security',
      issuer: 'Relational Database Engineering',
      description: 'Mastered isolation boundaries, rollback mechanics, and connection pooling in MySQL with JDBC.',
      icon: <Database className="w-5 h-5 text-neutral-300" />,
      date: 'VERIFIED 2026'
    },
    {
      title: 'React Concurrent & Server State',
      issuer: 'TanStack Query & Redux Toolkit',
      description: 'Expertise in eliminating waterfall fetches, orchestrating stale-while-revalidate, and atomic state selectors.',
      icon: <Sparkles className="w-5 h-5 text-[#B8A7D9]" />,
      date: 'VERIFIED 2026'
    },
    {
      title: '365+ Day Coding Consistency',
      issuer: 'Continuous Integration & GitHub Activity',
      description: 'Maintained relentless day-over-day focus on algorithmic solving, code reviews, and production software delivery.',
      icon: <Flame className="w-5 h-5 text-neutral-300" />,
      date: 'ACTIVE STREAK'
    }
  ];

  return (
    <section id="achievements" className="relative py-24 z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-4 mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
            <span>(07)</span>
            <span>//</span>
            <span>VERIFIED BENCHMARKS</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tighter text-[#f4f4f0] max-w-4xl">
            Engineering Milestones <br />
            <span className="text-neutral-500">& Quality Standards.</span>
          </h2>
        </div>

        {/* Milestone Badges Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {milestoneBadges.map((badge, idx) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-3xl glass-panel border border-white/10 hover:border-white/30 flex flex-col justify-between group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-colors">
                    {badge.icon}
                  </div>
                  <span className="text-[10px] font-mono text-[#B8A7D9] uppercase px-2 py-0.5 rounded bg-white/5 border border-white/5">
                    {badge.date}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-[#B8A7D9] transition-colors">
                  {badge.title}
                </h4>
                <p className="text-xs font-mono text-neutral-400 mt-1 mb-2">
                  {badge.issuer}
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {badge.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B8A7D9]" />
                <span>BENCHMARK VALIDATED</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
