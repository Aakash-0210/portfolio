import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsData } from '../../data/portfolioData';
import { soundManager } from '../../utils/sound';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    soundManager.playSwitch();
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleNext = () => {
    soundManager.playSwitch();
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="relative py-28 z-10 border-t border-white/5">
      <div className="section-inner container-x max-w-7xl mx-auto px-2 sm:px-4 lg:px-5">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-4 mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
            <span>(08)</span>
            <span>//</span>
            <span>ENDORSEMENTS & COLLABORATIONS</span>
          </div>

          <h2 className="section-title text-4xl sm:text-6xl font-extrabold uppercase tracking-tighter text-[#f4f4f0] max-w-4xl">
            Peer Reviews <br />
            <span className="text-neutral-500">& Architecture Feedback.</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative max-w-4xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-12 rounded-3xl glass-panel border border-white/10 bg-neutral-900/80 shadow-2xl relative overflow-hidden"
            >
              <Quote className="absolute -top-4 -right-4 w-32 h-32 text-white/[0.02] pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-white/20 shadow-lg grayscale hover:grayscale-0 transition-all"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-white tracking-tight">
                      {current.name}
                    </h4>
                    <p className="text-xs font-mono text-[#B8A7D9]">
                      {current.role} • {current.companyOrContext}
                    </p>
                    <span className="text-[11px] text-neutral-400 font-light">
                      {current.relation}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1.5">
                  <div className="flex items-center gap-1 text-[#B8A7D9]">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#B8A7D9]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/10 uppercase">
                    {current.highlightTag}
                  </span>
                </div>
              </div>

              <blockquote className="text-base sm:text-xl text-neutral-200 font-light italic leading-relaxed pt-2">
                "{current.quote}"
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {testimonialsData.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => {
                    soundManager.playSwitch();
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-white'
                      : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl glass-panel border border-white/10 text-neutral-300 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl glass-panel border border-white/10 text-neutral-300 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
