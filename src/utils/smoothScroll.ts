import type Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
let wakeLenis: (() => void) | null = null;

interface ScrollToTargetOptions {
  duration?: number;
  forceAnimation?: boolean;
}

export function setLenisInstance(instance: Lenis | null, wake?: () => void) {
  lenisInstance = instance;
  wakeLenis = wake ?? null;
}

export function scrollToTarget(target: HTMLElement | string, options: ScrollToTargetOptions = {}) {
  const element = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!element) return;

  const sectionTop = element.getBoundingClientRect().top + window.scrollY;
  const hasSectionHeader = Boolean(element.querySelector<HTMLElement>('.section-header'));
  const headerTop = hasSectionHeader
    ? sectionTop + Number.parseFloat(window.getComputedStyle(element).paddingTop || '0')
    : sectionTop;
  const headerOffset = hasSectionHeader
    ? Math.min(112, Math.max(104, window.innerHeight * 0.15))
    : 0;
  const destination = Math.max(0, headerTop - headerOffset);
  const reducedMotion = !options.forceAnimation
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (lenisInstance) {
    const reducedMotionFallback = options.forceAnimation && lenisInstance.prefersReducedMotion;
    lenisInstance.scrollTo(destination, reducedMotion
      ? { immediate: true }
      : {
          ...(reducedMotionFallback ? { programmatic: false } : {}),
          duration: options.duration ?? 0.9,
          easing: (progress: number) => (1 - Math.cos(Math.PI * progress)) / 2,
        });
    wakeLenis?.();
    return;
  }

  window.scrollTo({ top: destination, behavior: reducedMotion ? 'auto' : 'smooth' });
}
