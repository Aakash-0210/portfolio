import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Terminal, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { personalInfo } from '../../data/portfolioData';
import { createGmailComposeUrl } from '../../utils/email';
import { soundManager } from '../../utils/sound';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Giant Editorial Footer Heading like Zuned Aalim / Abraham Bankole */}
        <div className="pb-16 border-b border-white/10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8A7D9] block mb-2">
              (CONTACT // COLLABORATION)
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tighter text-[#f4f4f0] leading-none">
              HAVE AN IDEA? <br />
              <span className="text-neutral-500 hover:text-[#B8A7D9] transition-colors">
                LET'S TALK.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href={createGmailComposeUrl(personalInfo.email)}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-bold text-xs font-mono uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Say Hello ↗</span>
            </a>
          </div>
        </div>

        {/* Middle Navigation & Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-b border-white/10">
          
          {/* Brand & Telemetry */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#B8A7D9]" />
              <h4 className="text-base font-extrabold text-white tracking-tight uppercase">
                {personalInfo.name}
              </h4>
            </div>

            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Full Stack Developer & Software Engineer. Focused on systems architecture, high-concurrency Java Servlets, Node, and modern React SPAs.
            </p>

            {/* Live Clock */}
            <div className="flex items-center gap-2 text-xs font-mono tabular-nums whitespace-nowrap text-[#B8A7D9] pt-1">
              <span>LOCAL TIME:</span>
              <span className="text-white font-bold">{time || 'LIVE'}</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
              Directory
            </h5>
            <ul className="space-y-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
              <li>
                <a href="#about" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>(01) About</span>
                  <span className="text-neutral-600">↗</span>
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>(02) Tech Tools</span>
                  <span className="text-neutral-600">↗</span>
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>(03) Selected Works</span>
                  <span className="text-neutral-600">↗</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>(05) Services</span>
                  <span className="text-neutral-600">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Featured Works */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
              Featured Works
            </h5>
            <ul className="space-y-2 text-xs font-mono text-neutral-400">
              <li>
                <a href="#projects" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Crypto Tracker</span>
                  <span className="text-[#B8A7D9]">[React]</span>
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Laundry Platform</span>
                  <span className="text-neutral-400">[Java/SQL]</span>
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Task Management</span>
                  <span className="text-[#B8A7D9]">[Node/Mongo]</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
              Channels
            </h5>
            <div className="flex flex-col gap-2.5">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-xs font-mono uppercase text-neutral-400 hover:text-white transition-colors group"
              >
                <GithubIcon className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                <span>GitHub Profile</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-xs font-mono uppercase text-neutral-400 hover:text-white transition-colors group"
              >
                <LinkedinIcon className="w-4 h-4 text-[#B8A7D9]" />
                <span>LinkedIn</span>
              </a>

              <a
                href={createGmailComposeUrl(personalInfo.email)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-xs font-mono uppercase text-neutral-400 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                <span>Direct Mail</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            <span>© {new Date().getFullYear()} Aakash Prajapati. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#B8A7D9]">
              ENGINEERED WITH REACT 19 & THREE.JS
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <span>TOP ↑</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
