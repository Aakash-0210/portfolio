import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import { projectsData } from '../../data/portfolioData';
import type { Project } from '../../types';

export const ProjectsSection: React.FC = () => {
  const renderProjectVisual = (project: Project) => {
    if (project.bannerVisual === 'crypto') {
      return (
        <div className="relative w-full h-60 sm:h-72 rounded-2xl bg-neutral-950/80 p-5 sm:p-6 overflow-hidden flex flex-col justify-between border border-white/10">
          <div className="z-10 flex items-center justify-between gap-2 text-xs font-mono">
            <div className="flex min-w-0 flex-1 items-start gap-2 sm:items-center">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#B8A7D9] sm:mt-0" />
              <span className="min-w-0 truncate text-white font-bold">COINGECKO MARKET DATA</span>
            </div>
            <span className="shrink-0 whitespace-nowrap rounded border border-white/5 bg-white/5 px-1.5 py-0.5 text-[9px] text-neutral-400 sm:px-2 sm:text-[11px]">
              LIVE PRICES
            </span>
          </div>

          <div className="flex w-full items-end justify-between gap-1.5 h-28 my-auto z-10">
            {[45, 62, 58, 80, 72, 95, 88, 110, 102, 130, 125, 145, 138, 160].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-neutral-800 rounded-t"
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
        <div className="relative w-full h-60 sm:h-72 rounded-2xl bg-neutral-950/80 p-5 sm:p-6 overflow-hidden flex flex-col justify-between border border-white/10">
          <div className="z-10 flex items-center justify-between gap-2 text-xs font-mono">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
              <span className="min-w-0 truncate text-white font-bold">REAL-TIME CHAT</span>
            </div>
            <span className="shrink-0 whitespace-nowrap rounded border border-white/5 bg-white/5 px-1.5 py-0.5 text-[9px] text-emerald-300 sm:px-2 sm:text-[11px]">
              SOCKET CONNECTED
            </span>
          </div>

          <div className="z-10 my-auto w-full space-y-3">
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
        <div className="relative w-full h-60 sm:h-72 rounded-2xl bg-neutral-950/80 p-5 sm:p-6 overflow-hidden flex flex-col justify-between border border-white/10">
          <div className="z-10 flex items-start justify-between gap-2 text-xs font-mono sm:items-center">
            <div className="flex min-w-0 flex-1 items-start gap-2 sm:items-center">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white sm:mt-0" />
              <span className="min-w-0 truncate text-white font-bold">JAVA SERVLETS + JDBC ENGINE</span>
            </div>
            <span className="shrink-0 whitespace-nowrap rounded border border-white/5 bg-white/5 px-1.5 py-0.5 text-[9px] text-[#B8A7D9] sm:px-2 sm:text-[11px]">
              100% ACID
            </span>
          </div>

          {/* Minimalist Stepper */}
          <div className="grid w-full grid-cols-4 gap-2 z-10 my-auto">
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
      <div className="relative w-full h-60 sm:h-72 rounded-2xl bg-neutral-950/80 p-5 sm:p-6 overflow-hidden flex flex-col justify-between border border-white/10">
        <div className="z-10 flex items-center justify-between gap-2 text-xs font-mono">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#B8A7D9]" />
            <span className="min-w-0 truncate text-white font-bold">E-COMMERCE STORE</span>
          </div>
          <span className="shrink-0 whitespace-nowrap rounded border border-white/5 bg-white/5 px-1.5 py-0.5 text-[9px] text-neutral-400 sm:px-2 sm:text-[11px]">
            PRODUCT CATALOG
          </span>
        </div>

        <div className="grid w-full grid-cols-3 gap-2.5 z-10 my-auto">
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
    <section id="projects" className="portfolio-section projects-section relative z-10">
      <div className="section-inner container-x max-w-7xl mx-auto px-2 sm:px-4 lg:px-5">
        
        {/* Section Header */}
        <div className="section-header projects-header flex flex-col space-y-4 mb-20 text-left">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
            <span>(03)</span>
            <span>//</span>
            <span>SELECTED WORKS</span>
          </div>

          <h2 className="section-title text-3xl sm:text-6xl font-extrabold uppercase tracking-tighter text-[#f4f4f0] max-w-4xl">
            Featured <span className="text-neutral-500">Projects.</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-normal leading-8">
            Thoughtfully crafted full-stack platforms engineered with high-throughput database transactions, server state orchestration, and responsive interfaces.
          </p>
        </div>

        {/* Projects List */}
        <div className="project-list">
          {projectsData.map((project, index) => (
            <article key={project.id} className="project-card project-card-layout">
              <div className="project-visual-viewport">
                {renderProjectVisual(project)}
              </div>

              <div className="project-card-content">
                <div className="project-card-kicker">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{project.category}</span>
                </div>

                <div className="project-card-heading">
                  <h3>{project.title}</h3>
                  <p>{project.tagline}</p>
                </div>

                <p className="project-card-description text-neutral-300 text-base leading-relaxed font-light">
                  {project.description}
                </p>

                <div className="project-card-tech" aria-label="Technologies used">
                  {project.techStack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="project-card-actions">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-panel border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>

                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="glass-panel border border-white/10 hover:border-white/30 text-[#B8A7D9] hover:text-white"
                    >
                      <span>Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
