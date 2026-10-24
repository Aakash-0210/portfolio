import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface VantaEffect {
  destroy: () => void;
  req?: number;
  animationLoop?: () => number;
  isOnScreen?: () => boolean;
  triggerMouseMove?: (x: number, y: number) => void;
}

type VantaNetFactory = (options: {
  el: HTMLElement;
  THREE: typeof THREE;
  color: number;
  backgroundColor: number;
  points: number;
  maxDistance: number;
  spacing: number;
  showDots: boolean;
  mouseControls: boolean;
  touchControls: boolean;
  gyroControls: boolean;
  scale: number;
  scaleMobile: number;
}) => VantaEffect;

export function VantaScene({ paused = false }: { paused?: boolean }) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(paused);
  const syncAnimationRef = useRef<() => void>(() => {});
  const [motionAllowed, setMotionAllowed] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [touchDevice, setTouchDevice] = useState(
    () => window.matchMedia('(pointer: coarse)').matches,
  );
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setMotionAllowed(!preference.matches);
    const pointerPreference = window.matchMedia('(pointer: coarse)');
    const syncPointerPreference = () => setTouchDevice(pointerPreference.matches);
    preference.addEventListener?.('change', syncPreference);
    pointerPreference.addEventListener?.('change', syncPointerPreference);
    return () => {
      preference.removeEventListener?.('change', syncPreference);
      pointerPreference.removeEventListener?.('change', syncPointerPreference);
    };
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
    syncAnimationRef.current();
  }, [paused]);

  useEffect(() => {
    const element = mountRef.current;
    if (!element || !motionAllowed || touchDevice) return;
    let disposed = false;
    let visible = false;
    let effect: VantaEffect | undefined;

    const syncAnimation = () => {
      if (!effect) return;
      const shouldAnimate = visible && !document.hidden && !pausedRef.current;
      if (shouldAnimate) {
        if (effect.req === undefined) effect.animationLoop?.();
      } else if (effect.req !== undefined) {
        window.cancelAnimationFrame(effect.req);
        effect.req = undefined;
      }
    };
    syncAnimationRef.current = syncAnimation;

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    }, { threshold: 0.2 });
    visibilityObserver.observe(element);

    const handleDocumentVisibility = () => syncAnimation();
    const handlePointerMove = (event: PointerEvent) => {
      if (!visible || !effect?.triggerMouseMove) return;
      const bounds = element.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      if (x >= 0 && y >= 0 && x <= bounds.width && y <= bounds.height) {
        effect.triggerMouseMove(x, y);
      }
    };

    document.addEventListener('visibilitychange', handleDocumentVisibility);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const start = async () => {
      try {
        setLoadFailed(false);
        const module = await import('vanta/dist/vanta.net.min');
        if (disposed) return;
        const initialize = (module.default ?? module) as VantaNetFactory;
        effect = initialize({
          el: element,
          THREE,
          color: 0xb8a7d9,
          backgroundColor: 0x08080b,
          points: 5,
          maxDistance: 14,
          spacing: 24,
          showDots: false,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          scale: 2.1,
          scaleMobile: 0.65,
        });
        // Vanta normally reads layout every frame to check visibility and also
        // keeps a requestAnimationFrame alive while off-screen. Intersection
        // Observer lets this scene avoid both costs during page scroll.
        effect.isOnScreen = () => visible;
        syncAnimation();
      } catch {
        if (!disposed) setLoadFailed(true);
      }
    };

    void start();
    return () => {
      disposed = true;
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', handleDocumentVisibility);
      window.removeEventListener('pointermove', handlePointerMove);
      syncAnimationRef.current = () => {};
      effect?.destroy();
    };
  }, [motionAllowed, touchDevice]);

  return (
    <div className="interactive-scene-frame relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#08080b]">
      <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />
      {(!motionAllowed || touchDevice || loadFailed) && <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,167,217,0.17),transparent_64%)]" />}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.3)_100%)]" />
      <div className="absolute top-4 left-4 sm:top-8 sm:left-6 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-[#B8A7D9] flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B8A7D9]" />
        <span>VANTA · WEBGL NETWORK</span>
      </div>
      <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-6 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-neutral-300 pointer-events-none">
        {!motionAllowed ? 'STATIC · REDUCED MOTION' : touchDevice ? 'STATIC · TOUCH DEVICE' : loadFailed ? 'WEBGL FALLBACK ACTIVE' : paused ? 'PAUSED · RESUME PREVIEW' : 'POINTER RESPONSIVE'}
      </div>
    </div>
  );
}
