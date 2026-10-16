import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import { projectsData } from '../../data/portfolioData';
import type { Project } from '../../types';

export const ProjectsSection: React.FC = () => {
  const renderProjectVisual = (project: Project) => {
    if (project.bannerVisual === 'crypto') {
      return (
        <div className="relative w-full h-60 sm:h-72 rounded-2xl bg-neutral-950/80 p-5 sm:p-6 overflow-hidden flex flex-col justify-between border border-white/10 group-hover:border-white/25 transition-colors">
          <div className="flex items-center justify-between z-10 text-xs font-mono">
            <div className="flex items-start gap-2 sm:items-center">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#B8A7D9] animate-pulse sm:mt-0" />
              <span className="text-white font-bold">COINGECKO MARKET DATA</span>
            </div>
            <span className="shrink-0 whitespace-nowrap text-[11px] text-neutral-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
              LIVE PRICES
            </span>
          </div>

          <div className="flex items-end justify-between gap-1.5 h-28 my-auto z-10 px-2">
            {[45, 62, 58, 80, 72, 95, 88, 110, 102, 130, 125, 145, 138, 160].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-neutral-800 group-hover:bg-[#B8A7D9] rounded-t transition-colors duration-300"
                  style={{ height: `${(height / 160) * 85}px` }}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (project.bannerVisual === 'chat') {
      return (
        <div className="relative w-full h-60 sm:h-72 rounded-2xl bg-neutral-950/80 p-5 sm:p-6 overflow-hidden flex flex-col justify-between border border-white/10 group-hover:border-white/25 transition-colors">
          <div className="flex items-center justify-between z-10 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-bold">REAL-TIME CHAT</span>
            </div>
            <span className="text-[11px] text-emerald-300 px-2 py-0.5 rounded bg-white/5 border border-white/5">
              SOCKET CONNECTED
            </span>
          </div>

          <div className="z-10 my-auto space-y-3 max-w-[82%]">
            <div className="w-fit rounded-2xl rounded-bl-sm bg-white/10 px-3.5 py-2 text-xs text-neutral-200">
              Hey, are you online?
              <span className="ml-2 text-[9px] text-neutral-500">10:42</span>
            </div>
            <div className="ml-auto w-fit rounded-2xl rounded-br-sm bg-[#B8A7D9]/20 px-3.5 py-2 text-xs text-white">
              Yes, just got your message.
              <span className="ml-2 text-[9px] text-neutral-400">10:42</span>
            </div>
            <div className="w-fit rounded-2xl rounded-bl-sm bg-white/10 px-3.5 py-2 text-xs text-neutral-200">
              Nice — the update is live.
              <span className="ml-2 text-[9px] text-neutral-500">10:43</span>
            </div>
          </div>

        </div>
      );
    }

    if (project.bannerVisual === 'laundry') {
      return (
        <div className="relative w-full h-60 sm:h-72 rounded-2xl bg-neutral-950/80 p-5 sm:p-6 overflow-hidden flex flex-col justify-between border border-white/10 group-hover:border-white/25 transition-colors">
          <div className="flex items-start justify-between gap-2 z-10 text-xs font-mono sm:items-center">
            <div className="flex min-w-0 items-start gap-2 sm:items-center">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white sm:mt-0" />
              <span className="text-white font-bold">JAVA SERVLETS + JDBC ENGINE</span>
            </div>
            <span className="shrink-0 whitespace-nowrap text-[11px] text-[#B8A7D9] px-2 py-0.5 rounded bg-white/5 border border-white/5">
              100% ACID
            </span>
          </div>

          {/* Minimalist Stepper */}
          <div className="grid grid-cols-4 gap-2 z-10 my-auto">
            {['Order Placed', 'Wash & Care', 'Quality Check', 'Dispatch'].map((step, i) => (
              <div
                key={step}
                className={`p-2 sm:p-3 rounded-xl border text-center transition-all ${
                  i <= 2
                    ? 'bg-white/10 border-white/20 text-white'
                    : 'bg-white/5 border-white/5 text-neutral-500'
                }`}
              >
                <div className="w-4 h-4 rounded-full mx-auto mb-1.5 flex items-center justify-center text-[10px] font-mono font-bold bg-white/10">
                  {i + 1}
                </div>
                <span className="block text-[10px] sm:text-[11px] font-medium leading-tight">
                  {step}
                </span>
              </div>
            ))}
          </div>

        </div>
      );
    }

    return (
      <div className="relative w-full h-60 sm:h-72 rounded-2xl bg-neutral-950/80 p-5 sm:p-6 overflow-hidden flex flex-col justify-between border border-white/10 group-hover:border-white/25 transition-colors">
        <div className="flex items-center justify-between z-10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B8A7D9]" />
            <span className="text-white font-bold">E-COMMERCE STORE</span>
          </div>
          <span className="text-[11px] text-neutral-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
            PRODUCT CATALOG
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 z-10 my-auto">
          {[
            { name: 'Everyday Bag', price: '$48', color: 'from-amber-700 to-orange-950' },
            { name: 'Classic Sneaker', price: '$72', color: 'from-stone-500 to-neutral-900' },
            { name: 'Studio Headphones', price: '$95', color: 'from-rose-900 to-neutral-950' },
          ].map((product) => (
            <div key={product.name} className="min-w-0 rounded-xl bg-white/5 border border-white/10 p-2.5">
              <div className={`aspect-[4/3] rounded-lg bg-gradient-to-br ${product.color} border border-white/10`} />
              <div className="mt-2 flex items-center justify-between gap-1 text-[10px] sm:text-[11px]">
                <span className="truncate text-neutral-300">{product.name}</span>
                <span className="shrink-0 font-mono text-white">{product.price}</span>
              </div>
              <div className="mt-1.5 text-[9px] font-mono uppercase tracking-wide text-[#B8A7D9]">Add to cart +</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="relative py-28 z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-4 mb-20 text-left">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
            <span>(03)</span>
            <span>//</span>
            <span>SELECTED WORKS</span>
          </div>

          <h2 className="whitespace-nowrap text-3xl sm:text-6xl font-extrabold uppercase tracking-tighter text-[#f4f4f0] max-w-4xl">
            Featured <span className="text-neutral-500">Projects.</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-light">
            Thoughtfully crafted full-stack platforms engineered with high-throughput database transactions, server state orchestration, and responsive interfaces.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-16">
          {projectsData.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-80px', amount: 0.15 }}
                transition={{ duration: 0.35 }}
                className="p-6 sm:p-10 rounded-3xl bg-[#08080a]/95 border border-white/10 shadow-lg relative overflow-hidden"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Visual Side */}
                  <div className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                    {renderProjectVisual(project)}
                  </div>

                  {/* Content Side */}
                  <div className={`lg:col-span-6 space-y-5 ${isReversed ? 'lg:order-1' : ''}`}>
                    {/* Index & Category */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-2xl font-bold font-mono text-[#B8A7D9]">
                        0{index + 1}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                        {project.category}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-1">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-300 text-sm leading-relaxed font-light">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded text-xs font-mono bg-white/5 text-neutral-300 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      {/* Source Code */}
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-full glass-panel border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>

                      {/* Live Demo */}
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2.5 rounded-full glass-panel border border-white/10 hover:border-white/30 text-[#B8A7D9] hover:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                        >
                          <span>Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
