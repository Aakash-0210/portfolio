import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export const SoundToggle: React.FC = () => {
  const [muted, setMuted] = useState(soundManager.isMuted());

  const handleToggle = () => {
    const next = soundManager.toggleMute();
    setMuted(next);
  };

  return (
    <button
      onClick={handleToggle}
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-white/10 hover:border-white/25 text-xs font-mono text-neutral-400 hover:text-white transition-all cursor-pointer group"
      title={muted ? 'Enable sound FX' : 'Mute sound FX'}
    >
      {muted ? (
        <>
          <VolumeX className="w-3.5 h-3.5 text-neutral-500 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline text-neutral-500 uppercase">Mute</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#B8A7D9] group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline text-neutral-300 uppercase">Audio</span>
          <span className="flex items-end gap-0.5 h-2 ml-0.5">
            <span className="w-0.5 h-1.5 bg-[#B8A7D9] rounded-full animate-pulse" />
            <span className="w-0.5 h-2.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <span className="w-0.5 h-1 bg-[#B8A7D9] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </span>
        </>
      )}
    </button>
  );
};
