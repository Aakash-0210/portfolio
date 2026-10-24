import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setLenisInstance } from '../../utils/smoothScroll';

export function LenisController() {
  useEffect(() => {
    const lenis = new Lenis({
      anchors: { offset: -28 },
      duration: 0.78,
      lerp: 0.14,
      // Let the browser handle wheel scroll on its compositor thread. Lenis
      // remains responsible for deliberate in-page anchor transitions.
      smoothWheel: false,
      respectReducedMotion: true,
    });
    let frame = 0;
    let disposed = false;

    const scheduleFrame = () => {
      if (!disposed && !document.hidden && frame === 0) {
        frame = window.requestAnimationFrame(advance);
      }
    };

    const advance = (time: number) => {
      frame = 0;
      lenis.raf(time);
      if (lenis.isScrolling === 'smooth') scheduleFrame();
    };

    const wakeLenis = () => {
      lenis.time = performance.now();
      scheduleFrame();
    };

    const wakeOnAnchorClick = () => wakeLenis();
    const handleVisibilityChange = () => {
      if (document.hidden && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else if (lenis.isScrolling === 'smooth') {
        wakeLenis();
      }
    };

    window.addEventListener('click', wakeOnAnchorClick, true);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    setLenisInstance(lenis, wakeLenis);

    return () => {
      disposed = true;
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('click', wakeOnAnchorClick, true);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      setLenisInstance(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
