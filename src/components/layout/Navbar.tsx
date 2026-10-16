import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Command, FileText, Send, 
  Layers, Code2, Cpu, Compass, UserCheck, ArrowUpRight 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { personalInfo } from '../../data/portfolioData';
import { soundManager } from '../../utils/sound';

interface NavbarProps {
  onOpenPalette: () => void;
  onOpenResume: () => void;
}

const navLinks = [
  { label: 'About', href: '#about', index: '01' },
  { label: 'Stack', href: '#tech-stack', index: '02' },
  { label: 'Works', href: '#projects', index: '03' },
  { label: 'Dev Lab', href: '#code-showcase', index: '04' },
  { label: 'Services', href: '#services', index: '05' },
  { label: 'Contact', href: '#contact', index: '06' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenPalette, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    let scrollFrame = 0;

    const handleScroll = () => {
      if (scrollFrame) return;

      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const scrolled = window.scrollY > 30;
        setIsScrolled((current) => current === scrolled ? current : scrolled);

        const sections = ['about', 'tech-stack', 'projects', 'code-showcase', 'services', 'contact'];
        let nextActiveSection = 'hero';
        for (let index = sections.length - 1; index >= 0; index -= 1) {
          const section = sections[index];
          const el = document.getElementById(section);
          if (el && el.getBoundingClientRect().top <= 200) {
            nextActiveSection = section;
            break;
          }
        }
        setActiveSection((current) => current === nextActiveSection ? current : nextActiveSection);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(scrollFrame);
    };
  }, []);

  const scrollTo = (href: string) => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-black/85 backdrop-blur-xl border-b border-white/10'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo in the style of Abraham Bankole / Zuned Aalim */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#hero');
            }}
            className="group flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-lg glass-panel border border-white/10 flex items-center justify-center font-bold text-xs text-[#B8A7D9] group-hover:border-white/30 transition-colors">
              AP
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight uppercase text-white group-hover:text-[#B8A7D9] transition-colors">
                Aakash Prajapati
              </span>
              <span className="text-[10px] font-mono text-[#B8A7D9] tracking-widest uppercase">
                Software Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Clean, minimal, monospace numbered) */}
          <nav className="hidden lg:flex items-center gap-1 glass-panel px-3 py-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/20"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 leading-none">
                    <span className="text-[10px] leading-none text-[#B8A7D9]">{link.index}</span>
                    <span className="leading-none">{link.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Action Links: GitHub, LinkedIn, Resume */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* GitHub Profile */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center p-2 rounded-full glass-panel border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white transition-all"
              aria-label="Visit GitHub profile"
            >
              <GithubIcon className="w-4 h-4 text-[#B8A7D9]" />
            </a>
            {/* LinkedIn Profile */}
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 rounded-full glass-panel border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white transition-all"
              aria-label="Visit LinkedIn profile"
            >
              <LinkedinIcon className="w-4 h-4 text-[#B8A7D9]" />
            </a>

            {/* Resume Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenResume();
              }}
              className="hidden sm:flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono tracking-wider uppercase transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#B8A7D9]" />
              <span>CV</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-xl glass-panel border border-white/10 text-neutral-300 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden bg-black/98 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="space-y-2">
              <p className="text-[11px] font-mono tracking-widest text-[#B8A7D9] uppercase mb-4">
                Directory / System Navigation
              </p>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl glass-panel border border-white/5 hover:border-white/20 text-neutral-200 hover:text-white text-base font-mono uppercase tracking-wider transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#B8A7D9]">({link.index})</span>
                    <span>{link.label}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-bold text-xs font-mono uppercase tracking-wider"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPalette();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl glass-panel border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-wider"
              >
                <Command className="w-4 h-4 text-[#B8A7D9]" />
                <span>Open Command Palette (⌘K)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
