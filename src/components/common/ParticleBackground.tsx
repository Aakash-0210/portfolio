import React from 'react';

export const ParticleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* 1. Subtle Architectural Grid with Radial Mask */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-30"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 15%, #000 50%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 15%, #000 50%, transparent 100%)'
        }}
      />

      {/* 2. Subtle Silver Ambient Glow */}
      <div 
        className="absolute top-[45%] -right-32 w-[550px] h-[550px] rounded-full"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.035), transparent 70%)' }}
      />

      {/* 3. Subtle Film Grain Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};
