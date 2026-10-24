import { useEffect, useId, useRef, useState } from 'react';
import type { Container } from '@tsparticles/engine';

let enginePromise: Promise<typeof import('@tsparticles/engine').tsParticles> | null = null;

function getParticleEngine() {
  if (!enginePromise) {
    enginePromise = Promise.all([
      import('@tsparticles/engine'),
      import('@tsparticles/slim'),
    ]).then(async ([engine, bundle]) => {
      await bundle.loadSlim(engine.tsParticles);
      return engine.tsParticles;
    });
  }
  return enginePromise;
}

interface TsParticlesSceneProps {
  paused?: boolean;
}

export function TsParticlesScene({ paused = false }: TsParticlesSceneProps) {
  const reactId = useId();
  const containerId = `hero-particles-${reactId.replace(/:/g, '')}`;
  const [loadFailed, setLoadFailed] = useState(false);
  const containerRef = useRef<Container | null>(null);
  const pausedRef = useRef(paused);
  const visibleRef = useRef(false);
  const reducedMotionRef = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const syncPlaybackRef = useRef<() => void>(() => {});

  useEffect(() => {
    const syncPlayback = () => {
      const container = containerRef.current;
      if (!container) return;
      if (visibleRef.current && !pausedRef.current && !reducedMotionRef.current) container.play();
      else container.pause();
    };
    syncPlaybackRef.current = syncPlayback;

    const element = document.getElementById(containerId);
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(element);

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => {
      reducedMotionRef.current = motionPreference.matches;
      syncPlayback();
    };
    motionPreference.addEventListener?.('change', syncMotionPreference);

    return () => {
      observer.disconnect();
      motionPreference.removeEventListener?.('change', syncMotionPreference);
      syncPlaybackRef.current = () => {};
    };
  }, [containerId]);

  useEffect(() => {
    pausedRef.current = paused;
    syncPlaybackRef.current();
  }, [paused]);

  useEffect(() => {
    let cancelled = false;
    let destroy: (() => void) | undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    reducedMotionRef.current = reducedMotion;

    const mountParticles = async () => {
      try {
        const engine = await getParticleEngine();
        if (cancelled) return;

        const container = await engine.load({
          id: containerId,
          options: {
            fullScreen: { enable: false },
            fpsLimit: 30,
            detectRetina: false,
            particles: {
              number: { value: 44, density: { enable: true, width: 760, height: 560 } },
              color: { value: ['#B8A7D9', '#f4f4f0', '#85808e'] },
              links: { enable: true, distance: 118, color: '#B8A7D9', opacity: 0.2, width: 0.7 },
              move: { enable: !reducedMotion, speed: 0.42, outModes: { default: 'out' } },
              opacity: { value: { min: 0.18, max: 0.72 } },
              shape: { type: 'circle' },
              size: { value: { min: 1, max: 2.6 } },
            },
            interactivity: {
              events: {
                onHover: { enable: !reducedMotion, mode: 'grab' },
                resize: { enable: true },
              },
              modes: { grab: { distance: 150, links: { opacity: 0.32 } } },
            },
          },
        });

        if (cancelled) {
          container?.destroy();
          return;
        }

        containerRef.current = container ?? null;
        destroy = () => container?.destroy();
        syncPlaybackRef.current();
      } catch {
        if (!cancelled) setLoadFailed(true);
      }
    };

    void mountParticles();
    return () => {
      cancelled = true;
      destroy?.();
      containerRef.current = null;
    };
  }, [containerId]);

  return (
    <div className="interactive-scene-frame relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#08080b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,167,217,0.17),transparent_64%)]" />
      {!loadFailed && <div id={containerId} className="absolute inset-0" aria-hidden="true" />}
      {loadFailed && <div className="absolute inset-0 bg-grid-pattern opacity-30" />}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-6 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-[#B8A7D9] flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B8A7D9]" />
        <span>PARTICLE FIELD · INTERACTIVE</span>
      </div>
      <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-6 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-neutral-300 pointer-events-none">
        {loadFailed ? 'CANVAS FALLBACK ACTIVE' : 'tsParticles · SLIM ENGINE'}
      </div>
    </div>
  );
}
