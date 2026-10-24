import React, { Suspense, lazy, useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { ScrollProgress } from './components/common/ScrollProgress';
import { LenisController } from './components/common/LenisController';
import { ParticleBackground } from './components/common/ParticleBackground';
import type { ToastMessage } from './components/common/Toast';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { soundManager } from './utils/sound';
import { copyTextToClipboard } from './utils/clipboard';
import { personalInfo } from './data/portfolioData';
import { scrollToTarget } from './utils/smoothScroll';

const CustomCursor = lazy(() => import('./components/common/CustomCursor').then((module) => ({ default: module.CustomCursor })));
const Toast = lazy(() => import('./components/common/Toast').then((module) => ({ default: module.Toast })));
const Footer = lazy(() => import('./components/layout/Footer').then((module) => ({ default: module.Footer })));
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

const LoadedSectionMarker = ({ onLoaded, children }: { onLoaded: () => void; children: React.ReactNode }) => {
  useLayoutEffect(() => onLoaded(), [onLoaded]);
  return <>{children}</>;
};

const DeferredSection = ({
  id,
  reserveHeight,
  fallbackClassName,
  children,
}: {
  id: string;
  reserveHeight: string;
  fallbackClassName: string;
  children: React.ReactNode;
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const markLoaded = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!('IntersectionObserver' in window)) {
      setNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setNearViewport(true);
      observer.disconnect();
    }, { rootMargin: '1100px 0px' });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const fallback = <SectionFallback className={fallbackClassName} />;

  return (
    <div
      ref={sectionRef}
      id={loaded ? undefined : id}
      style={loaded ? undefined : { minHeight: reserveHeight, scrollMarginTop: '6rem' }}
    >
      {nearViewport ? (
        <Suspense fallback={fallback}>
          <LoadedSectionMarker onLoaded={markLoaded}>{children}</LoadedSectionMarker>
        </Suspense>
      ) : fallback}
    </div>
  );
};

export const App: React.FC = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandPaletteWasOpened, setCommandPaletteWasOpened] = useState(false);
  const [resumePreviewOpen, setResumePreviewOpen] = useState(false);
  const [resumeWasOpened, setResumeWasOpened] = useState(false);
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    soundManager.init();

    // Global keyboard shortcut: Ctrl+K / Cmd+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteWasOpened(true);
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const pointerPreference = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!pointerPreference.matches) return;

    const enableCursor = () => setCursorEnabled(true);
    window.addEventListener('pointermove', enableCursor, { once: true, passive: true });
    return () => window.removeEventListener('pointermove', enableCursor);
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
    setResumeWasOpened(true);
    setResumePreviewOpen(true);
  };

  const handleOpenPalette = () => {
    setCommandPaletteWasOpened(true);
    setCommandPaletteOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      scrollToTarget(el);
    }
  };

  return (
    <div className="relative min-h-screen text-[#f4f4f0] font-sans">
      <LenisController />
      {/* 2. Custom Magnetic Cursor */}
      {cursorEnabled && (
        <Suspense fallback={null}>
          <CustomCursor />
        </Suspense>
      )}

      {/* 3. Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* 4. Ambient Dynamic Particle & Aurora Background */}
      <ParticleBackground />

      {/* 5. Sticky Floating Header */}
      <Navbar
        onOpenPalette={handleOpenPalette}
        onOpenResume={handleOpenResume}
      />

      {/* 6. Main Storytelling Experience Sections */}
      <main className="relative z-10">
        <HeroSection onOpenResume={handleOpenResume} />

        <DeferredSection id="about" reserveHeight="100svh" fallbackClassName="min-h-[40vh]">
          <AboutSection />
        </DeferredSection>

        <DeferredSection id="tech-stack" reserveHeight="100svh" fallbackClassName="min-h-[40vh]">
          <TechStackSection />
        </DeferredSection>

        <DeferredSection id="projects" reserveHeight="220svh" fallbackClassName="min-h-[50vh]">
          <ProjectsSection />
        </DeferredSection>

        <DeferredSection id="code-showcase" reserveHeight="100svh" fallbackClassName="min-h-[45vh]">
          <CodeShowcaseSection />
        </DeferredSection>

        <DeferredSection id="services" reserveHeight="330svh" fallbackClassName="min-h-[40vh]">
          <ServicesSection />
        </DeferredSection>

        <DeferredSection id="contact" reserveHeight="100svh" fallbackClassName="min-h-[35vh]">
          <ContactSection onNotify={addToast} />
        </DeferredSection>
      </main>

      {/* 7. Minimalist Luxury Footer */}
      <Suspense fallback={<div aria-hidden="true" className="min-h-[20vh]" />}>
        <Footer />
      </Suspense>

      {resumeWasOpened && (
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={resumePreviewOpen}
            onClose={() => setResumePreviewOpen(false)}
          />
        </Suspense>
      )}

      {/* 8. Command Palette (⌘K) */}
      {commandPaletteWasOpened && (
        <Suspense fallback={null}>
          <CommandPalette
            isOpen={commandPaletteOpen}
            onClose={() => setCommandPaletteOpen(false)}
            onNavigate={handleNavigate}
            onOpenResume={handleOpenResume}
            onCopyEmail={handleCopyEmail}
          />
        </Suspense>
      )}

      {/* 9. Floating Interactive Toasts */}
      {toasts.length > 0 && (
        <Suspense fallback={null}>
          <Toast
            toasts={toasts}
            onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
          />
        </Suspense>
      )}
    </div>
  );
};

export default App;
