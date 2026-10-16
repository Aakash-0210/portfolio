import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../../utils/sound';

interface LoadingScreenProps {
  onComplete: () => void;
}

const statusMessages = [
  'INITIALIZING SYSTEM ARCHITECTURE...',
  'LOADING EDITORIAL DESIGN SYSTEM...',
  'COMPILING REACT & TANSTACK QUERY STACK...',
  'ESTABLISHING JAVA SERVLETS & JDBC CONNECTIONS...',
  'WARMING UP 3D THREE.JS GRAPHICS ENGINE...',
  'SYSTEM READY • LAUNCHING WORKSPACE'
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessageIdx, setCurrentMessageIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          soundManager.playSuccess();
          setTimeout(onComplete, 500);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(prev + increment, 100);

        const msgIdx = Math.min(
          Math.floor((next / 100) * statusMessages.length),
          statusMessages.length - 1
        );
        setCurrentMessageIdx(msgIdx);

        return next;
      });
    }, 55);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center p-6 select-none"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Center Monogram Reveal */}
        <div className="relative mb-10 flex flex-col items-center">
          <motion.div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl glass-panel border border-white/20 flex items-center justify-center relative overflow-hidden shadow-2xl"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-extrabold text-3xl sm:text-4xl tracking-tighter text-[#f4f4f0]">
              AP
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-center"
          >
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight uppercase text-white font-mono">
              Aakash Prajapati
            </h1>
            <p className="text-[11px] font-mono tracking-widest uppercase text-[#B8A7D9] mt-1">
              Full Stack Developer & Engineer
            </p>
          </motion.div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-md flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span className="truncate pr-2 text-[#B8A7D9]">
              {statusMessages[currentMessageIdx]}
            </span>
            <span className="text-white font-bold">{progress}%</span>
          </div>

          <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden border border-white/5 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-neutral-500 via-[#B8A7D9] to-white rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 pt-1">
            <span>MEM: 64MB / OK</span>
            <span>SECURE BOOT: ACTIVE</span>
            <span>LATENCY: 12MS</span>
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onComplete();
          }}
          className="mt-10 px-4 py-1.5 rounded-full glass-pill text-xs font-mono text-neutral-400 hover:text-white hover:border-white/30 transition-all cursor-pointer uppercase"
        >
          [ESC / Click to Skip Intro]
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
