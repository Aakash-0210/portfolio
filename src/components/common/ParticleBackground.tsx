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

    </div>
  );
};
