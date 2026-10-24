import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';

type RevealScope = RefObject<HTMLElement | null>;

/** Runs section entrance animations once, without a scroll-linked frame loop. */
export function useGsapScrollReveal(scopeRef: RevealScope) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const entrances = new Map<HTMLElement, () => void>();
        const register = (element: HTMLElement, initial: gsap.TweenVars, play: () => void) => {
          gsap.set(element, initial);
          entrances.set(element, play);
        };

        scope.querySelectorAll<HTMLElement>('[data-gsap-rule]').forEach((heading) => {
          register(heading, { '--gsap-rule-progress': 0 }, () => {
            gsap.to(heading, {
              '--gsap-rule-progress': 1,
              duration: 0.9,
              ease: 'power2.out',
              clearProps: '--gsap-rule-progress',
            });
          });
        });

        scope.querySelectorAll<HTMLElement>('[data-gsap-bar]').forEach((bar) => {
          register(bar, { scaleX: 0, transformOrigin: 'left center' }, () => {
            gsap.to(bar, {
              scaleX: 1,
              duration: 1.15,
              ease: 'power3.out',
              clearProps: 'transform',
            });
          });
        });

        scope.querySelectorAll<HTMLElement>('[data-gsap-stagger]').forEach((group) => {
          const items = [...group.querySelectorAll<HTMLElement>('[data-gsap-item]')];
          if (!items.length) return;

          gsap.set(items, { autoAlpha: 0, y: 26, scale: 0.985 });
          entrances.set(group, () => {
            gsap.to(items, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.78,
              stagger: 0.12,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
            });
          });
        });

        scope.querySelectorAll<HTMLElement>('[data-gsap-reveal]').forEach((element) => {
          const direction = element.dataset.gsapReveal;
          const offsets: Record<string, gsap.TweenVars> = {
            up: { y: 28 },
            left: { x: -38 },
            right: { x: 38 },
            scale: { y: 14, scale: 0.94 },
          };
          const initial = { autoAlpha: 0, ...(offsets[direction ?? 'up'] ?? offsets.up) };
          register(element, initial, () => {
            gsap.to(element, {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.82,
              ease: 'power3.out',
              clearProps: 'transform,opacity,visibility',
            });
          });
        });

        const reveal = (entries: IntersectionObserverEntry[], observer?: IntersectionObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            observer?.unobserve(element);
            const play = entrances.get(element);
            if (!play) return;
            entrances.delete(element);
            play();
          });
        };

        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver(reveal, {
            rootMargin: '0px 0px -10% 0px',
            threshold: 0,
          });
          entrances.forEach((_, element) => observer.observe(element));
          return () => observer.disconnect();
        }

        entrances.forEach((play) => play());
        return () => entrances.clear();
      });

      return () => media.revert();
    }, scope);

    return () => context.revert();
  }, [scopeRef]);
}
