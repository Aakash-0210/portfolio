import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

export function ReactiveLinesScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !host || !context) return;

    const pointer: Point = { x: -1000, y: -1000 };
    const currentPointer: Point = { x: pointer.x, y: pointer.y };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let frame = 0;
    let visible = true;
    let time = 0;

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.35);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      currentPointer.x += (pointer.x - currentPointer.x) * 0.075;
      currentPointer.y += (pointer.y - currentPointer.y) * 0.075;

      const lineCount = Math.max(13, Math.round(height / 28));
      const spacing = height / (lineCount + 1);
      const timeOffset = reducedMotion.matches ? 0 : time;
      for (let index = 0; index < lineCount; index += 1) {
        const baseY = spacing * (index + 1);
        const distanceY = currentPointer.y - baseY;
        const influence = Math.exp(-(distanceY * distanceY) / (height * height * 0.025));
        const cursorPull = Math.max(-1, Math.min(1, (currentPointer.x - width / 2) / (width / 2)));
        const wave = Math.sin(index * 0.42 + timeOffset + baseY / height) * 11;
        const bend = influence * (currentPointer.y - baseY) * 0.46;
        const offset = wave + bend;

        context.beginPath();
        context.moveTo(-24, baseY + wave * 0.24);
        context.bezierCurveTo(
          width * 0.28,
          baseY - offset * 0.35 + cursorPull * influence * 22,
          width * 0.68,
          baseY + offset + cursorPull * influence * 34,
          width + 24,
          baseY + wave * 0.3,
        );
        context.strokeStyle = `rgba(184, 167, 217, ${0.1 + influence * 0.38 + (index % 4) * 0.015})`;
        context.lineWidth = index % 6 === 0 ? 1.2 : 0.72;
        context.stroke();
      }

      if (!reducedMotion.matches && visible) {
        time += 0.004;
        frame = window.requestAnimationFrame(draw);
      }
    };

    const movePointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const bounds = host.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
    };
    const resetPointer = () => {
      pointer.x = width * 0.5;
      pointer.y = height * 0.5;
    };
    const syncMotion = () => {
      window.cancelAnimationFrame(frame);
      if (reducedMotion.matches) draw();
      else if (visible) frame = window.requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      window.cancelAnimationFrame(frame);
      if (visible) {
        if (reducedMotion.matches) draw();
        else frame = window.requestAnimationFrame(draw);
      }
    });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(host);
    resizeObserver.observe(host);
    host.addEventListener('pointermove', movePointer);
    host.addEventListener('pointerleave', resetPointer);
    reducedMotion.addEventListener?.('change', syncMotion);
    resize();
    syncMotion();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener('pointermove', movePointer);
      host.removeEventListener('pointerleave', resetPointer);
      reducedMotion.removeEventListener?.('change', syncMotion);
    };
  }, []);

  return (
    <div ref={hostRef} className="interactive-scene-frame relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#08080b]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,167,217,0.12),transparent_68%)]" />
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
      <div className="absolute top-4 left-4 sm:top-8 sm:left-6 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-[#B8A7D9] flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B8A7D9]" />
        <span>REACTIVE LINES · ORIGINKIT REF.</span>
      </div>
      <div className="absolute bottom-6 right-4 sm:bottom-10 sm:right-6 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-neutral-300 pointer-events-none">
        POINTER · CURVATURE FIELD
      </div>
    </div>
  );
}
