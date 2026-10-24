import React, { useState, useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { personalInfo } from '../../data/portfolioData';
import { createGmailComposeUrl } from '../../utils/email';
import { soundManager } from '../../utils/sound';
import { useGsapScrollReveal } from '../../hooks/useGsapScrollReveal';
import { scrollToTarget } from '../../utils/smoothScroll';

const currentYear = new Date().getFullYear();

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const footerRef = useRef<HTMLElement>(null);
  useGsapScrollReveal(footerRef);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60_000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    scrollToTarget('#hero', { duration: 0.9, forceAnimation: true });
  };

  return (
    <footer ref={footerRef} className="portfolio-footer relative z-10 border-t border-white/10 pt-20 pb-12">
      <div className="section-inner container-x max-w-7xl mx-auto px-2 sm:px-4 lg:px-5">
        
        {/* Giant Editorial Footer Heading like Zuned Aalim / Abraham Bankole */}
        <div data-gsap-stagger className="footer-callout pb-16 border-b border-white/10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div data-gsap-item>
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8A7D9] block mb-2">
              (CONTACT // COLLABORATION)
            </span>
            <h2 data-gsap-rule="wide" className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-[#f4f4f0] leading-none">
              HAVE AN IDEA? <br />
              <span className="text-neutral-500 hover:text-[#B8A7D9] transition-colors">
                LET'S TALK.
              </span>
            </h2>
          </div>

          <div data-gsap-item className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href={createGmailComposeUrl(personalInfo.email)}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              className="px-8 py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs font-mono uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Say Hello ↗</span>
            </a>
          </div>
        </div>

        {/* Middle Navigation & Information Grid */}
        <div data-gsap-stagger className="footer-directory grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-white/10">
          
          {/* Brand & Telemetry */}
          <div data-gsap-item className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#B8A7D9]" />
              <h4 className="text-base font-extrabold text-white tracking-tight uppercase">
                {personalInfo.name}
              </h4>
            </div>

            <p className="footer-bio text-xl sm:text-2xl text-neutral-400 max-w-2xl font-normal leading-6">
              Full Stack Developer & Software Engineer. Focused on systems architecture, high-concurrency Java Servlets, Node, and modern React SPAs.
            </p>

            {/* Live Clock */}
            <div className="flex items-center gap-2 text-xs font-mono tabular-nums whitespace-nowrap text-[#B8A7D9] pt-1">
              <span>LOCAL TIME:</span>
              <span className="text-white font-bold">{time || 'LIVE'}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div data-gsap-item className="space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
              Directory
            </h5>
            <ul className="space-y-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
              <li>
                <a href="#about" onClick={() => soundManager.playClick()} className="hover:text-white transition-colors flex items-center justify-between">
                  <span>(01) About</span>
                  <span className="text-neutral-600">↗</span>
                </a>
              </li>
              <li>
                <a href="#tech-stack" onClick={() => soundManager.playClick()} className="hover:text-white transition-colors flex items-center justify-between">
                  <span>(02) Tech Tools</span>
                  <span className="text-neutral-600">↗</span>
                </a>
              </li>
              <li>
                <a href="#projects" onClick={() => soundManager.playClick()} className="hover:text-white transition-colors flex items-center justify-between">
                  <span>(03) Selected Works</span>
                  <span className="text-neutral-600">↗</span>
                </a>
              </li>
              <li>
                <a href="#services" onClick={() => soundManager.playClick()} className="hover:text-white transition-colors flex items-center justify-between">
                  <span>(05) Services</span>
                  <span className="text-neutral-600">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Featured Works */}
          <div data-gsap-item className="space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
              Featured Works
            </h5>
            <ul className="space-y-2 text-xs font-mono text-neutral-400">
              <li>
                <a href="#projects" onClick={() => soundManager.playClick()} className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Crypto Tracker</span>
                  <span className="text-[#B8A7D9]">[React]</span>
                </a>
              </li>
              <li>
                <a href="#projects" onClick={() => soundManager.playClick()} className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Laundry Platform</span>
                  <span className="text-neutral-400">[Java/SQL]</span>
                </a>
              </li>
              <li>
                <a href="#projects" onClick={() => soundManager.playClick()} className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Task Management</span>
                  <span className="text-[#B8A7D9]">[Node/Mongo]</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div data-gsap-item className="space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
              Channels
            </h5>
            <div className="flex flex-col gap-2.5">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playClick()}
                className="flex items-center gap-2.5 text-xs font-mono uppercase text-neutral-400 hover:text-white transition-colors group"
              >
                <GithubIcon className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                <span>GitHub Profile</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playClick()}
                className="flex items-center gap-2.5 text-xs font-mono uppercase text-neutral-400 hover:text-white transition-colors group"
              >
                <LinkedinIcon className="w-4 h-4 text-[#B8A7D9]" />
                <span>LinkedIn</span>
              </a>

              <a
                href={createGmailComposeUrl(personalInfo.email)}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playClick()}
                className="flex items-center gap-2.5 text-xs font-mono uppercase text-neutral-400 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                <span>Direct Mail</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div data-gsap-reveal="up" className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            <span>© {currentYear} Aakash Prajapati. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#B8A7D9]">
              ENGINEERED WITH REACT 19 & THREE.JS
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <span className="whitespace-nowrap">TOP ↑</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
