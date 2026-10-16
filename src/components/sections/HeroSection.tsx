import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Send, ArrowUpRight, Code2 } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { soundManager } from '../../utils/sound';

const HeroCanvas = lazy(() => import('../3d/HeroCanvas').then((module) => ({ default: module.HeroCanvas })));

interface HeroSectionProps {
  onOpenResume: () => void;
  resumePreviewOpen: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume, resumePreviewOpen }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [localTime, setLocalTime] = useState('');
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRenderCanvas(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.titles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
        }) + ' IST'
      );
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const scrollTo = (id: string) => {
    soundManager.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Top Editorial Telemetry Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-4 border-b border-white/10 text-xs font-mono text-[#B8A7D9]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B8A7D9] animate-pulse" />
            <span className="text-white font-semibold">AAKASH PRAJAPATI</span>
            <span className="text-neutral-600">•</span>
            <span>(00) / INTRODUCTION</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">LOCAL TIME: <strong className="text-white">{localTime || 'LIVE'}</strong></span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#B8A7D9]">
              AVAILABLE FOR WORK
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Massive Editorial Typography & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8 text-left">
            
            <div className="space-y-4 sm:space-y-5">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xl sm:text-2xl font-semibold tracking-tight text-[#f4f4f0]"
              >
                Hi, I’m Aakash
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 }}
                className="font-semibold leading-tight tracking-tight text-[#f4f4f0]"
              >
                <span className="flex flex-wrap items-baseline gap-x-2 text-2xl sm:text-3xl lg:text-4xl">
                  <span>A</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIndex}
                      initial={{ y: 12, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -12, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[#B8A7D9]"
                    >
                      {personalInfo.titles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl text-neutral-300">
                  Dedicated to Crafting
                </span>
                <span className="block mt-1 text-7xl sm:text-8xl lg:text-9xl font-bold leading-none tracking-[-0.045em] text-[#f4f4f0]">
                  Modern
                </span>
                <span className="block mt-1 text-2xl sm:text-3xl lg:text-4xl font-medium text-neutral-300">
                  Web Solutions
                </span>
              </motion.h1>
            </div>

            {/* Editorial Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              {/* View Projects */}
              <button
                onClick={() => scrollTo('projects')}
                onMouseEnter={() => soundManager.playHover()}
                className="px-6 py-3.5 rounded-full bg-[#f4f4f0] hover:bg-white text-black font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center gap-2 shadow-lg shadow-white/5 hover:scale-[1.02] transition-all cursor-pointer group"
              >
                <span>Selected Works</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              {/* Preview Resume */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenResume();
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="px-6 py-3.5 rounded-full glass-panel border border-white/10 hover:border-white/30 text-neutral-200 hover:text-white font-mono text-xs sm:text-sm uppercase flex items-center gap-2 hover:bg-white/5 transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#B8A7D9]" />
                <span>Resume / CV</span>
              </button>

              {/* Contact Me */}
              <button
                onClick={() => scrollTo('contact')}
                onMouseEnter={() => soundManager.playHover()}
                className="px-5 py-3.5 rounded-full glass-panel border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white font-mono text-xs sm:text-sm uppercase flex items-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact ↗</span>
              </button>
            </motion.div>

            {/* Quick Tech Strip in Monospace */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-400"
            >
              <span className="text-[#B8A7D9] flex items-center gap-1.5 mr-1 uppercase">
                <Code2 className="w-3.5 h-3.5 text-[#B8A7D9]" /> Stack:
              </span>
              {['React.js', 'JavaScript', 'Java', 'Spring Boot', 'Express', 'Node.js', 'MongoDB'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-md glass-panel border border-white/5 text-neutral-300 text-[11px]"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Column: 3D Holographic Canvas */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center">
            <Suspense fallback={
              <div className="relative w-full h-[450px] lg:h-[620px] flex items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(184,167,217,0.2),transparent_55%)]">
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                <div className="absolute top-4 left-4 sm:top-8 sm:left-6 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-[#B8A7D9] flex items-center gap-2 pointer-events-none animate-float shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8A7D9]" />
                  <span>SYSTEM ARCHITECTURE • V2.0</span>
                </div>
              </div>
            }>
              {shouldRenderCanvas ? <HeroCanvas paused={resumePreviewOpen} /> : null}
            </Suspense>
          </div>

        </div>

        {/* Bottom subtle scroll anchor */}
        <div className="relative pt-12 hidden md:flex items-center justify-between text-[11px] font-mono text-neutral-500 border-t border-white/5 mt-8">
          <span>[SCROLL TO EXPLORE ARCHITECTURE]</span>
          <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[#B8A7D9]">AAKASH PRAJAPATI • PORTFOLIO 2026</span>
          <span>(01 / 06)</span>
        </div>
      </div>
    </section>
  );
};
