import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, CheckCircle2, 
  Sparkles, Code, FileCode, Palette, Atom, Server, Database, Layers, Rocket 
} from 'lucide-react';
import { roadmapData } from '../../data/portfolioData';
import type { RoadmapMilestone } from '../../types';
import { soundManager } from '../../utils/sound';

export const RoadmapSection: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<RoadmapMilestone>(roadmapData[6]);

  const iconMap: Record<string, React.ReactNode> = {
    FileCode: <FileCode className="w-4 h-4 text-neutral-300" />,
    Palette: <Palette className="w-4 h-4 text-neutral-300" />,
    Code: <Code className="w-4 h-4 text-[#B8A7D9]" />,
    Atom: <Atom className="w-4 h-4 text-[#B8A7D9]" />,
    Server: <Server className="w-4 h-4 text-neutral-300" />,
    Database: <Database className="w-4 h-4 text-neutral-300" />,
    Layers: <Layers className="w-4 h-4 text-[#B8A7D9]" />,
    Rocket: <Rocket className="w-4 h-4 text-white" />,
  };

  return (
    <section id="roadmap" className="relative py-28 z-10 border-t border-white/5">
      <div className="section-inner container-x max-w-7xl mx-auto px-2 sm:px-4 lg:px-5">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-4 mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
            <span>(02)</span>
            <span>//</span>
            <span>EVOLUTIONARY ROADMAP</span>
          </div>

          <h2 className="section-title text-4xl sm:text-6xl font-extrabold uppercase tracking-tighter text-[#f4f4f0] max-w-4xl">
            The Developer Roadmap <br />
            <span className="text-neutral-500">From HTML to Systems Architect.</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-light">
            A methodical progression from foundational DOM rendering to full-stack engineering and enterprise backend services.
          </p>
        </div>

        {/* Stepper Grid */}
        <div className="relative mb-12">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-white/10 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 relative z-10">
            {roadmapData.map((milestone) => {
              const isSelected = selectedMilestone.step === milestone.step;
              const isFuture = milestone.status === 'future';

              return (
                <button
                  key={milestone.step}
                  onClick={() => {
                    soundManager.playSwitch();
                    setSelectedMilestone(milestone);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`flex flex-col items-center p-3 sm:p-4 rounded-2xl glass-panel text-center transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'border-[#B8A7D9] bg-neutral-900/90 shadow-xl scale-105'
                      : 'border-white/5 hover:border-white/20 hover:bg-neutral-900/60'
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full mb-2 uppercase ${
                      isFuture
                        ? 'bg-white/5 text-neutral-400 border border-white/10'
                        : isSelected
                        ? 'bg-[#B8A7D9]/20 text-[#B8A7D9] border border-[#B8A7D9]/40 font-bold'
                        : 'bg-white/5 text-neutral-400'
                    }`}
                  >
                    {milestone.yearOrPhase}
                  </span>

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all mb-2 ${
                      isSelected
                        ? 'bg-white/10 ring-1 ring-[#B8A7D9] text-white'
                        : 'bg-white/5 text-neutral-400 group-hover:bg-white/10'
                    }`}
                  >
                    {iconMap[milestone.icon] || <CheckCircle2 className="w-4 h-4 text-[#B8A7D9]" />}
                  </div>

                  <span
                    className={`text-xs font-semibold leading-tight line-clamp-2 ${
                      isSelected ? 'text-[#B8A7D9]' : 'text-neutral-300 group-hover:text-white'
                    }`}
                  >
                    {milestone.title}
                  </span>

                  {isSelected && (
                    <div className="absolute -bottom-1.5 w-2.5 h-2.5 rounded-full bg-[#B8A7D9] ring-4 ring-black" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Deep-Dive Inspection Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMilestone.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-10 rounded-3xl glass-panel border border-white/15 bg-[#080808] shadow-2xl relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Details & Narrative */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-[#B8A7D9] border border-white/10">
                    {selectedMilestone.yearOrPhase} • Step 0{selectedMilestone.step}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono uppercase ${
                      selectedMilestone.status === 'completed'
                        ? 'bg-neutral-800 text-neutral-300 border border-white/10'
                        : selectedMilestone.status === 'in-progress'
                        ? 'bg-[#B8A7D9]/20 text-[#B8A7D9] border border-[#B8A7D9]/30'
                        : 'bg-white/10 text-white border border-white/20'
                    }`}
                  >
                    {selectedMilestone.status === 'future' ? 'Target Horizon' : selectedMilestone.status}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {selectedMilestone.title}
                </h3>

                <p className="text-sm sm:text-base font-mono text-[#B8A7D9]">
                  {selectedMilestone.subtitle}
                </p>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                  {selectedMilestone.description}
                </p>

                {/* Skills Acquired Tags */}
                <div className="pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2.5">
                    Competencies Acquired & Exercised:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedMilestone.skillsAcquired.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-lg glass-panel border border-white/10 text-xs font-mono text-neutral-200"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Milestone Benchmark */}
              <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl glass-panel border border-white/10 bg-black/40 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#B8A7D9] flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#B8A7D9]" />
                    Deliverable / Milestone
                  </span>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {selectedMilestone.milestoneProject}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    Demonstrating practical implementation through real code repositories, testing, and production verification.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>PROGRESS STATUS</span>
                  <span className="text-white font-bold">{Math.round((selectedMilestone.step / roadmapData.length) * 100)}%</span>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
