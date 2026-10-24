import React, { useEffect, useRef } from 'react';

export const ScrollProgress: React.FC = () => {
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const element = progressRef.current;
      if (!element) return;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      element.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    };
    const scheduleUpdate = () => {
      if (frame === 0) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={progressRef} className="scroll-progress fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B8A7D9] via-[#B8A7D9] to-white origin-left z-[9998]" />;
};
