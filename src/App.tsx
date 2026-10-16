import React, { Suspense, lazy, useState, useEffect } from 'react';
import { CustomCursor } from './components/common/CustomCursor';
import { LoadingScreen } from './components/common/LoadingScreen';
import { ScrollProgress } from './components/common/ScrollProgress';
import { ParticleBackground } from './components/common/ParticleBackground';
import { Toast } from './components/common/Toast';
import type { ToastMessage } from './components/common/Toast';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { soundManager } from './utils/sound';
import { copyTextToClipboard } from './utils/clipboard';
import { personalInfo } from './data/portfolioData';

const HeroSection = lazy(() => import('./components/sections/HeroSection').then((module) => ({ default: module.HeroSection })));
const AboutSection = lazy(() => import('./components/sections/AboutSection').then((module) => ({ default: module.AboutSection })));
const TechStackSection = lazy(() => import('./components/sections/TechStackSection').then((module) => ({ default: module.TechStackSection })));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection').then((module) => ({ default: module.ProjectsSection })));
const CodeShowcaseSection = lazy(() => import('./components/sections/CodeShowcaseSection').then((module) => ({ default: module.CodeShowcaseSection })));
const ServicesSection = lazy(() => import('./components/sections/ServicesSection').then((module) => ({ default: module.ServicesSection })));
const ContactSection = lazy(() => import('./components/sections/ContactSection').then((module) => ({ default: module.ContactSection })));
const ResumeModal = lazy(() => import('./components/sections/ResumeModal').then((module) => ({ default: module.ResumeModal })));
const CommandPalette = lazy(() => import('./components/common/CommandPalette').then((module) => ({ default: module.CommandPalette })));

const SectionFallback = ({ className = 'min-h-[30vh]' }: { className?: string }) => (
  <div aria-hidden className={`${className} w-full rounded-2xl border border-white/5 bg-white/[0.02]`} />
);

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [resumePreviewOpen, setResumePreviewOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    soundManager.init();

    // Global keyboard shortcut: Ctrl+K / Cmd+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToast = (title: string, message?: string, type: 'success' | 'info' = 'success') => {
    const id = String(Date.now());
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleCopyEmail = async () => {
    try {
      await copyTextToClipboard(personalInfo.email);
      soundManager.playSuccess();
      addToast('Email Copied to Clipboard!', personalInfo.email);
    } catch {
      soundManager.playClick();
      addToast('Unable to copy email', `Please copy this address manually: ${personalInfo.email}`, 'info');
    }
  };

  const handleOpenResume = () => {
    soundManager.playClick();
    setResumePreviewOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-[#f4f4f0] font-sans">
      {/* 1. Loading Experience Sequence */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* 2. Custom Magnetic Cursor */}
      <CustomCursor />

      {/* 3. Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* 4. Ambient Dynamic Particle & Aurora Background */}
      <ParticleBackground />

      {/* 5. Sticky Floating Header */}
      <Navbar
        onOpenPalette={() => setCommandPaletteOpen(true)}
        onOpenResume={handleOpenResume}
      />

      {/* 6. Main Storytelling Experience Sections */}
      <main className="relative z-10">
        <Suspense fallback={<SectionFallback className="min-h-screen" />}>
          <HeroSection
            onOpenResume={handleOpenResume}
            resumePreviewOpen={resumePreviewOpen}
          />
        </Suspense>

        <Suspense fallback={<SectionFallback className="min-h-[40vh]" />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionFallback className="min-h-[40vh]" />}>
          <TechStackSection />
        </Suspense>

        <Suspense fallback={<SectionFallback className="min-h-[50vh]" />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionFallback className="min-h-[45vh]" />}>
          <CodeShowcaseSection />
        </Suspense>

        <Suspense fallback={<SectionFallback className="min-h-[40vh]" />}>
          <ServicesSection />
        </Suspense>

        <Suspense fallback={<SectionFallback className="min-h-[35vh]" />}>
          <ContactSection onNotify={addToast} />
        </Suspense>
      </main>

      {/* 7. Minimalist Luxury Footer */}
      <Footer />

      <Suspense fallback={null}>
        <ResumeModal
          isOpen={resumePreviewOpen}
          onClose={() => setResumePreviewOpen(false)}
        />
      </Suspense>

      {/* 8. Command Palette (⌘K) */}
      <Suspense fallback={null}>
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onNavigate={handleNavigate}
          onOpenResume={handleOpenResume}
          onCopyEmail={handleCopyEmail}
        />
      </Suspense>

      {/* 9. Floating Interactive Toasts */}
      <Toast
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </div>
  );
};

export default App;
