import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, FileText } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { soundManager } from '../../utils/sound';
import { scrollToTarget } from '../../utils/smoothScroll';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoleIndex((previous) => (previous + 1) % personalInfo.titles.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
      }));
    };
    updateTime();
    const interval = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const scrollTo = (id: string, duration = 0.9) => {
    soundManager.playClick();
    const target = document.getElementById(id);
    if (target) scrollToTarget(target, { duration, forceAnimation: true });
  };

  return (
    <section id="hero" className="hero-section relative z-10">
      <div className="hero-container section-inner container-x mx-auto max-w-7xl px-2 sm:px-4 lg:px-5">
        <div className="hero-topline">
          <div className="hero-location hero-status-pill">
            <span className="hero-status-dot" />
            <span>{personalInfo.status}</span>
          </div>
          <span className="hero-availability">{personalInfo.location}<i aria-hidden="true">·</i> {localTime ? `${localTime} IST` : 'IST'}</span>
        </div>
        <div className="hero-layout">
          <div className="hero-copy-column">
            <h1 className="hero-title" aria-label={personalInfo.name}>
              <span className="hero-title-line"><span>{personalInfo.name}</span></span>
            </h1>

            <p className="hero-intro" aria-live="off">
              <span key={roleIndex} className="hero-role-transition">
                {personalInfo.titles[roleIndex]}
              </span>
            </p>
          </div>

          <div className="hero-details-row">
            <div className="hero-copy-block">
              <p className="hero-tagline">
                {personalInfo.tagline}
              </p>
            </div>

            <div className="hero-actions">
              <button
                type="button"
                onClick={() => scrollTo('projects', 0.9)}
                onMouseEnter={() => soundManager.playHover()}
                className="hero-button hero-button-primary"
              >
                Explore selected work <ArrowUpRight aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                onMouseEnter={() => soundManager.playHover()}
                className="hero-button hero-button-secondary hero-contact-button"
              >
                Contact me <ArrowUpRight aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onOpenResume();
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="hero-button hero-button-secondary"
              >
                <FileText aria-hidden="true" /> Resume
              </button>
            </div>
          </div>
        </div>
        <button type="button" onClick={() => scrollTo('about')} className="hero-scroll-cue" aria-label="Scroll to explore">
          <span>Scroll to explore</span>
          <ArrowDown aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};
