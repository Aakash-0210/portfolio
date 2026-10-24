import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Command, FileText, ArrowUpRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { personalInfo } from '../../data/portfolioData';
import { soundManager } from '../../utils/sound';
import { scrollToTarget } from '../../utils/smoothScroll';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'tech-stack', 'projects', 'code-showcase', 'services', 'contact'];
    const observed = new Set<HTMLElement>();
    const updateActiveSection = (entries: IntersectionObserverEntry[]) => {
      const entering = entries.filter((entry) => entry.isIntersecting);
      if (!entering.length) return;
      const bandCenter = window.innerHeight * 0.25;
      const active = entering
        .sort((first, second) => Math.abs(first.boundingClientRect.top - bandCenter) - Math.abs(second.boundingClientRect.top - bandCenter))[0]?.target as HTMLElement | undefined;
      const activeId = active?.id;
      if (activeId) setActiveSection((current) => current === activeId ? current : activeId);
    };
    const sectionObserver = new IntersectionObserver(updateActiveSection, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });
    const syncSections = () => {
      const current = new Set(document.querySelectorAll<HTMLElement>(sectionIds.map((id) => `#${id}`).join(',')));
      current.forEach((element) => {
        if (observed.has(element)) return;
        observed.add(element);
        sectionObserver.observe(element);
      });
      observed.forEach((element) => {
        if (element.isConnected && sectionIds.includes(element.id)) return;
        sectionObserver.unobserve(element);
        observed.delete(element);
      });
    };

    syncSections();
    const mutationObserver = new MutationObserver(syncSections);
    mutationObserver.observe(document.querySelector('main') ?? document.body, {
      attributes: true,
      attributeFilter: ['id'],
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const scrollTo = (href: string) => {
    soundManager.playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector<HTMLElement>(href);
    if (target) {
      scrollToTarget(target, { duration: 0.9, forceAnimation: true });
    }
  };

  return (
    <>
      <header
        className="site-header fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#08080a]/95"
      >
        <div className="site-header-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo in the style of Abraham Bankole / Zuned Aalim */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#hero');
            }}
            className="site-brand group flex items-center gap-2.5 cursor-pointer select-none"
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
          <nav aria-label="Primary navigation" className="site-nav items-center gap-1 glass-panel px-3 py-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  onMouseEnter={() => soundManager.playHover()}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {isActive && (
                    <span className="site-nav-active-pill absolute inset-0 rounded-full bg-white/10 border border-white/20" />
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
          <div className="site-header-actions flex items-center gap-2 sm:gap-3">
            {/* GitHub Profile */}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
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
              onClick={() => soundManager.playClick()}
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
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="site-menu-toggle p-2 rounded-xl glass-panel border border-white/10 text-neutral-300 hover:text-white transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="mobile-navigation fixed inset-0 z-40 bg-black/98 backdrop-blur-2xl flex flex-col justify-between px-4 sm:px-6"
          >
            <div className="space-y-2">
              <p className="text-[11px] font-mono tracking-widest text-[#B8A7D9] uppercase mb-4">
                Directory / System Navigation
              </p>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl glass-panel border text-base font-mono uppercase tracking-wider transition-all ${
                      isActive
                        ? 'border-[#B8A7D9]/35 bg-[#B8A7D9]/10 text-white'
                        : 'border-white/5 hover:border-white/20 text-neutral-200 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#B8A7D9]">({link.index})</span>
                      <span>{link.label}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                  </button>
                );
              })}
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  soundManager.playClick();
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
                  soundManager.playClick();
                  setMobileMenuOpen(false);
                  onOpenPalette();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl glass-panel border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-wider"
              >
                <Command className="w-4 h-4 text-[#B8A7D9]" />
                <span>Open Command Palette (⌘K)</span>
              </button>
            </div>
          </nav>
      )}
    </>
  );
};
