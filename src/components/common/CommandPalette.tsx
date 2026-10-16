import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, FileText, Mail, Volume2, VolumeX, Sparkles, X } from 'lucide-react';
import { GithubIcon } from './BrandIcons';
import { soundManager } from '../../utils/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onCopyEmail: () => void;
}

interface PaletteAction {
  id: string;
  category: 'Navigation' | 'Projects' | 'Quick Actions';
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenResume,
  onCopyEmail,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const actions: PaletteAction[] = [
    {
      id: 'nav-about',
      category: 'Navigation',
      title: '(01) About Aakash & Philosophy',
      description: 'Explore personal story, engineering vision & metrics',
      icon: <Sparkles className="w-4 h-4 text-[#B8A7D9]" />,
      action: () => onNavigate('about'),
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: '(02) Tech Tools',
      description: 'React, Node, Java Servlets, JDBC, MySQL, MongoDB & tools',
      icon: <ArrowRight className="w-4 h-4 text-neutral-300" />,
      action: () => onNavigate('tech-stack'),
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: '(03) Selected Works & Case Studies',
      description: 'Deep dive into Crypto Tracker, Laundry Platform & Task System',
      icon: <ArrowRight className="w-4 h-4 text-[#B8A7D9]" />,
      action: () => onNavigate('projects'),
    },
    {
      id: 'nav-code',
      category: 'Navigation',
      title: '(04) Developer Lab & GitHub Activity',
      description: 'Interactive terminal simulator, commit heatmap, and code snippets',
      icon: <Command className="w-4 h-4 text-neutral-300" />,
      action: () => onNavigate('code-showcase'),
    },
    {
      id: 'nav-services',
      category: 'Navigation',
      title: '(05) Engineering Services',
      description: 'Full-Stack, UI/UX, REST APIs & Distributed Backend',
      icon: <ArrowRight className="w-4 h-4 text-neutral-300" />,
      action: () => onNavigate('services'),
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: '(06) Contact & Hire',
      description: 'Direct transmission channel or email',
      icon: <Mail className="w-4 h-4 text-[#B8A7D9]" />,
      action: () => onNavigate('contact'),
    },
    {
      id: 'proj-crypto',
      category: 'Projects',
      title: 'Crypto Tracker Intelligence',
      description: 'React, TanStack Query, Zustand, CoinGecko API',
      icon: <Sparkles className="w-4 h-4 text-[#B8A7D9]" />,
      action: () => onNavigate('projects'),
    },
    {
      id: 'proj-laundry',
      category: 'Projects',
      title: 'Laundry Service Platform',
      description: 'React, Java Servlets, JDBC, MySQL, Session Management',
      icon: <Sparkles className="w-4 h-4 text-white" />,
      action: () => onNavigate('projects'),
    },
    {
      id: 'proj-task',
      category: 'Projects',
      title: 'Task Management System',
      description: 'React, Node.js, Express, MongoDB, Redux Toolkit',
      icon: <Sparkles className="w-4 h-4 text-[#B8A7D9]" />,
      action: () => onNavigate('projects'),
    },
    {
      id: 'act-resume',
      category: 'Quick Actions',
      title: 'View Resume',
      description: 'Preview or download Aakash Prajapati’s resume',
      icon: <FileText className="w-4 h-4 text-white" />,
      action: () => onOpenResume(),
    },
    {
      id: 'act-copy-email',
      category: 'Quick Actions',
      title: 'Copy Email Address',
      description: 'apg8128@gmail.com',
      icon: <Mail className="w-4 h-4 text-[#B8A7D9]" />,
      action: () => onCopyEmail(),
    },
    {
      id: 'act-github',
      category: 'Quick Actions',
      title: 'Open GitHub Profile',
      description: 'github.com/Aakash-0210',
      icon: <GithubIcon className="w-4 h-4 text-slate-300" />,
      action: () => window.open('https://github.com/Aakash-0210', '_blank'),
    },
    {
      id: 'act-sound',
      category: 'Quick Actions',
      title: soundManager.isMuted() ? 'Enable Sound FX' : 'Mute Sound FX',
      description: 'Toggle Web Audio micro-interactions',
      icon: soundManager.isMuted() ? (
        <VolumeX className="w-4 h-4 text-neutral-400" />
      ) : (
        <Volume2 className="w-4 h-4 text-[#B8A7D9]" />
      ),
      action: () => {
        soundManager.toggleMute();
      },
    },
  ];

  const filteredActions = actions.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      soundManager.playSwitch();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundManager.playHover();
        setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundManager.playHover();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          soundManager.playClick();
          filteredActions[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99990] flex items-start justify-center pt-20 px-4 sm:px-6">
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
        />

        <motion.div
          className="relative w-full max-w-2xl rounded-2xl glass-panel border border-white/15 bg-[#080808] shadow-2xl overflow-hidden flex flex-col z-10"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Top Search Input */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3 bg-black/40">
            <Search className="w-4 h-4 text-[#B8A7D9]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
                soundManager.playKey();
              }}
              placeholder="Type to search (e.g. projects, skills, resume, contact)..."
              className="flex-1 bg-transparent border-none text-white placeholder-neutral-500 text-sm focus:outline-none font-mono"
            />
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-neutral-400">
                ESC
              </span>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredActions.length === 0 ? (
              <div className="py-8 text-center text-sm font-mono text-neutral-500">
                No matching results found for "{query}".
              </div>
            ) : (
              filteredActions.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      soundManager.playClick();
                      item.action();
                      onClose();
                    }}
                    onMouseEnter={() => {
                      setSelectedIndex(index);
                      soundManager.playHover();
                    }}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white/10 border border-white/20 text-white shadow-sm'
                        : 'text-neutral-300 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-lg ${
                          isSelected ? 'bg-white/15 text-white' : 'bg-white/5 text-neutral-400'
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="truncate">
                        <div className="text-sm font-medium flex items-center gap-2">
                          <span>{item.title}</span>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/5 text-[#B8A7D9] border border-white/5">
                            {item.category}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 truncate font-light">{item.description}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-xs font-mono text-[#B8A7D9] flex items-center gap-1 pl-2">
                        ↵ Select
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-4 py-2.5 bg-black/60 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <div className="flex items-center gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
            <div className="text-[#B8A7D9]">NAVIGATION PALETTE</div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
