import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'card' | 'text' | 'button'>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || !supportsFinePointer) {
      return;
    }
    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (interactiveEl) {
        const type = interactiveEl.getAttribute('data-cursor') || 'hover';
        const label = interactiveEl.getAttribute('data-cursor-label') || '';
        setCursorState(type as any);
        setCursorLabel(label);
        return;
      }

      if (target.closest('button, a, input, textarea, select')) {
        setCursorState('button');
        setCursorLabel('');
        return;
      }

      if (target.closest('.glass-panel-hover, .project-card, .skill-card')) {
        setCursorState('card');
        setCursorLabel('VIEW');
        return;
      }

      setCursorState('default');
      setCursorLabel('');
    };

    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0] ?? e.changedTouches[0];
      if (!touch) return;

      setMousePosition({ x: touch.clientX, y: touch.clientY });
      setCursorState('default');
      setCursorLabel('');
      setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);
    const onTouchEnd = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (prefersReducedMotion || !supportsFinePointer) return null;

  if (!isVisible) return null;

  const isButton = cursorState === 'button';
  const isCard = cursorState === 'card';
  const hasLabel = Boolean(cursorLabel);

  return (
    <>
      {/* Outer Follower Circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center font-mono text-[9px] font-bold tracking-widest uppercase text-white"
        animate={{
          x: mousePosition.x - (hasLabel ? 32 : isCard ? 28 : isButton ? 22 : 14),
          y: mousePosition.y - (hasLabel ? 32 : isCard ? 28 : isButton ? 22 : 14),
          width: hasLabel ? 64 : isCard ? 56 : isButton ? 44 : 28,
          height: hasLabel ? 64 : isCard ? 56 : isButton ? 44 : 28,
          backgroundColor: hasLabel || isCard
            ? 'rgba(255, 255, 255, 0.12)'
            : isButton
            ? 'rgba(184, 167, 217, 0.15)'
            : 'rgba(255, 255, 255, 0.04)',
          borderColor: isButton
            ? 'rgba(184, 167, 217, 0.6)'
            : isCard
            ? 'rgba(255, 255, 255, 0.6)'
            : 'rgba(255, 255, 255, 0.25)',
          borderWidth: 1,
          backdropFilter: hasLabel || isCard ? 'blur(4px)' : 'none',
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 350,
          mass: 0.5,
        }}
      >
        {cursorLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="tracking-widest"
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-white shadow-sm transition-transform duration-75 ease-out"
        style={{
          width: 5,
          height: 5,
          transform: `translate3d(${mousePosition.x - 2.5}px, ${mousePosition.y - 2.5}px, 0)`,
          opacity: isButton || hasLabel ? 0 : 1,
        }}
      />
    </>
  );
};
