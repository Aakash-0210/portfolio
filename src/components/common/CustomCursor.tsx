import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'card' | 'text' | 'button'>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const visibleRef = useRef(false);
  const cursorStateRef = useRef(cursorState);
  const cursorLabelRef = useRef(cursorLabel);
  const lastTargetRef = useRef<EventTarget | null>(null);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  const springX = useSpring(pointerX, { damping: 28, stiffness: 350, mass: 0.5 });
  const springY = useSpring(pointerY, { damping: 28, stiffness: 350, mass: 0.5 });
  const size = cursorLabel ? 52 : cursorState === 'card' ? 42 : cursorState === 'button' ? 28 : 18;
  const cursorX = useTransform(springX, (value) => value - size / 2);
  const cursorY = useTransform(springY, (value) => value - size / 2);
  const dotX = useTransform(pointerX, (value) => value - 2.5);
  const dotY = useTransform(pointerY, (value) => value - 2.5);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;

    if (prefersReducedMotion || !supportsFinePointer) {
      return;
    }

    const setMode = (state: typeof cursorState, label: string) => {
      if (cursorStateRef.current !== state) {
        cursorStateRef.current = state;
        setCursorState(state);
      }
      if (cursorLabelRef.current !== label) {
        cursorLabelRef.current = label;
        setCursorLabel(label);
      }
    };
    const show = () => {
      if (visibleRef.current) return;
      visibleRef.current = true;
      setIsVisible(true);
    };

    const onMouseMove = (e: MouseEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
      show();

      if (lastTargetRef.current === e.target) return;
      lastTargetRef.current = e.target;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('[data-cursor]') as HTMLElement | null;
      if (interactiveEl) {
        const type = interactiveEl.getAttribute('data-cursor') || 'hover';
        const label = interactiveEl.getAttribute('data-cursor-label') || '';
        setMode(type as typeof cursorState, label);
        return;
      }

      if (target.closest('button, a, input, textarea, select')) {
        setMode('button', '');
        return;
      }

      if (target.closest('.glass-panel-hover, .project-card, .skill-card')) {
        setMode('card', 'VIEW');
        return;
      }

      setMode('default', '');
    };

    const onMouseLeave = () => {
      visibleRef.current = false;
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [pointerX, pointerY]);

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
        style={{ x: cursorX, y: cursorY, width: size, height: size }}
        animate={{
          backgroundColor: hasLabel || isCard
            ? 'rgba(255, 255, 255, 0.07)'
            : isButton
            ? 'rgba(184, 167, 217, 0.08)'
            : 'rgba(255, 255, 255, 0.015)',
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
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-white shadow-sm transition-transform duration-75 ease-out"
        style={{ x: dotX, y: dotY, width: 5, height: 5, opacity: isButton || hasLabel ? 0 : 1 }}
      />
    </>
  );
};
