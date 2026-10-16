import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Layers, Target, Zap, BookOpen, 
  Award, CheckCircle2, TrendingUp
} from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { soundManager } from '../../utils/sound';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'story' | 'vision' | 'values'>('story');

  const coreValueIcons: Record<string, React.ReactNode> = {
    'Architectural Integrity': <Layers className="w-4 h-4 text-[#B8A7D9]" />,
    'Product-First Engineering': <Target className="w-4 h-4 text-neutral-300" />,
    'Uncompromising Performance': <Zap className="w-4 h-4 text-[#B8A7D9]" />,
    'Continuous Mastery': <Sparkles className="w-4 h-4 text-[#B8A7D9]" />,
  };

  return (
    <section id="about" className="relative pt-24 pb-20 z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-4 mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
            <span>(01)</span>
            <span>//</span>
            <span>ABOUT ME</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-[#f4f4f0] max-w-3xl">
            Thoughtful software, built to last.
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-normal leading-8">
            I build fast, modern websites that help businesses grow. Available for freelance projects worldwide.
          </p>

          {/* Interactive Navigation Tabs */}
          <div role="tablist" aria-label="About sections" className="flex w-full sm:w-fit flex-nowrap items-center gap-1 sm:gap-2 p-1 rounded-full glass-panel border border-white/10 mt-4">
            <button
              onClick={() => {
                soundManager.playSwitch();
                setActiveTab('story');
              }}
              role="tab"
              aria-selected={activeTab === 'story'}
              className={`flex-1 sm:flex-none whitespace-nowrap px-2 sm:px-5 py-2 rounded-full text-[9px] sm:text-xs font-mono uppercase tracking-tight sm:tracking-wider text-center transition-all cursor-pointer ${
                activeTab === 'story'
                  ? 'bg-white text-black font-bold shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>(01) Story</span>
            </button>
            <button
              onClick={() => {
                soundManager.playSwitch();
                setActiveTab('values');
              }}
              role="tab"
              aria-selected={activeTab === 'values'}
              className={`flex-1 sm:flex-none whitespace-nowrap px-2 sm:px-5 py-2 rounded-full text-[9px] sm:text-xs font-mono uppercase tracking-tight sm:tracking-wider text-center transition-all cursor-pointer ${
                activeTab === 'values'
                  ? 'bg-white text-black font-bold shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span className="sm:hidden">(02) Values</span>
              <span className="hidden sm:inline">(02) Core Values</span>
            </button>
            <button
              onClick={() => {
                soundManager.playSwitch();
                setActiveTab('vision');
              }}
              role="tab"
              aria-selected={activeTab === 'vision'}
              className={`flex-1 sm:flex-none whitespace-nowrap px-2 sm:px-5 py-2 rounded-full text-[9px] sm:text-xs font-mono uppercase tracking-tight sm:tracking-wider text-center transition-all cursor-pointer ${
                activeTab === 'vision'
                  ? 'bg-white text-black font-bold shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              (03) Vision
            </button>
          </div>
        </div>

        {/* Bento Grid: Story & Technical DNA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Story Narrative Card */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-8 p-6 sm:p-10 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            {activeTab === 'story' && (
              <div className="space-y-7">
                <div className="flex items-center gap-2 text-xs font-mono text-[#B8A7D9] uppercase tracking-widest">
                  <BookOpen className="w-4 h-4" />
                  <span>My Journey</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug max-w-[30ch]">
                  From web foundations to full-stack engineering.
                </h3>
                <p className="text-neutral-300 leading-8 text-base sm:text-[1.0625rem] font-normal">
                  {personalInfo.story}
                </p>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="space-y-7">
                <div className="flex items-center gap-2 text-xs font-mono text-[#B8A7D9] uppercase tracking-widest">
                  <Target className="w-4 h-4" />
                  <span>My Focus</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug max-w-[30ch]">
                  Reliable software that feels effortless.
                </h3>
                <p className="text-neutral-300 leading-8 text-base sm:text-[1.0625rem] font-normal">
                  {personalInfo.vision}
                </p>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#B8A7D9] uppercase tracking-widest">
                  <Award className="w-4 h-4" />
                  <span>How I Work</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug max-w-[30ch]">
                  Thoughtful engineering, practical outcomes.
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {personalInfo.coreValues.map((v) => (
                    <div key={v.title} className="p-3.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 mb-1.5">
                        {coreValueIcons[v.title] || <CheckCircle2 className="w-4 h-4 text-[#B8A7D9]" />}
                        <h4 className="text-sm font-bold text-white">{v.title}</h4>
                      </div>
                      <p className="text-[13px] text-neutral-400 leading-6">{v.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-5 mt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-500">
              <span className="text-[#B8A7D9]">Based in India · Open to collaboration</span>
              <span>React · Java · Node.js</span>
            </div>
          </motion.div>

          {/* Quick Highlight Cards */}
          <div className="lg:col-span-4 flex flex-col gap-5 justify-between">
            {/* Developer DNA Card */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-slate-950/60 shadow-lg relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#B8A7D9] uppercase tracking-wide">Engineering Discipline</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8A7D9]" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                Dual Mindset: UI + Engine
              </h4>
              <p className="text-sm text-neutral-400 leading-6 mb-5">
                Balancing thoughtful interfaces with reliable backend systems.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-neutral-300">
                  <span>Frontend Precision</span>
                  <span className="text-[#B8A7D9]">98%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-[#B8A7D9] rounded-full" />
                </div>

                <div className="flex justify-between text-neutral-300 pt-1">
                  <span>Backend Architecture</span>
                  <span className="text-neutral-400">92%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-neutral-400 rounded-full" />
                </div>
              </div>
            </div>

            {/* Continuous Delivery Card */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-slate-950/60 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-[#B8A7D9] uppercase tracking-wide">Consistency</span>
                <TrendingUp className="w-4 h-4 text-[#B8A7D9]" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">
                Relentless Execution
              </h4>
              <p className="text-sm text-neutral-400 leading-6">
                I learn by building, sharing, and improving every day.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
