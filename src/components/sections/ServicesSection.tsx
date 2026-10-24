import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { servicesData } from '../../data/portfolioData';
import { useGsapScrollReveal } from '../../hooks/useGsapScrollReveal';

const STAGE_SCROLL_VH = 110;
const TABLET_STAGE_SCROLL_VH = 80;

export const ServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rowHeight, setRowHeight] = useState(() => window.innerWidth >= 1024 ? 128 : 96);
  const [stageScrollVh, setStageScrollVh] = useState(() => (
    window.innerWidth >= 1024 ? STAGE_SCROLL_VH : TABLET_STAGE_SCROLL_VH
  ));
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const incomingPanelRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const activeService = servicesData[activeIndex];
  const incomingService = servicesData[activeIndex + 1];
  useGsapScrollReveal(sectionRef);

  const renderServiceTitle = (service: typeof servicesData[number]) => (
    service.id === 'backend'
      ? <>Backend &amp; Database<br />Development</>
      : service.title
  );

  const renderServiceDetails = (service: typeof servicesData[number]) => (
    <div className="pb-2 pt-2 sm:pt-4">
      <p className="max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">
        {service.description}
      </p>

      <div className="mt-5">
        {service.deliverables.slice(0, service.id === 'frontend' ? 4 : 3).map((deliverable, detailIndex) => (
          <div
            key={deliverable}
            className={`items-start gap-3 py-3 ${detailIndex === Math.min(service.deliverables.length, service.id === 'frontend' ? 4 : 3) - 1 ? 'border-b-0' : 'border-b border-white/15'}`}
            style={{
              display: 'grid',
              gridTemplateColumns: '2.5rem minmax(0, 1fr)',
            }}
          >
            <span className="font-mono text-sm text-neutral-500">
              {String(detailIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-base font-medium tracking-tight text-[#d8d7cf] sm:text-lg lg:text-xl">
              {deliverable}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  useLayoutEffect(() => {
    const panel = incomingPanelRef.current;
    if (panel) panel.style.transform = `translateY(${window.innerHeight - 96}px)`;
  }, [activeIndex]);

  useEffect(() => {
    let animationFrame = 0;
    let trackTop = 0;

    const measureTrackTop = () => {
      const track = trackRef.current;
      if (track) trackTop = track.getBoundingClientRect().top + window.scrollY;
    };

    const updateActiveStage = () => {
      if (window.innerWidth < 768 || animationFrame) return;

      animationFrame = requestAnimationFrame(() => {
        animationFrame = 0;
        const track = trackRef.current;
        if (!track) return;

        const stickyOffset = 96;
        const passedTrackTop = window.scrollY - trackTop + stickyOffset;
        const stageHeight = window.innerHeight * (stageScrollVh / 100);
        const nextProgress = Math.max(
          0,
          Math.min(servicesData.length - 0.001, passedTrackTop / stageHeight),
        );

        const nextIndex = Math.min(servicesData.length - 1, Math.floor(nextProgress));

        if (activeIndexRef.current !== nextIndex) {
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
          window.requestAnimationFrame(() => {
            const nextPanel = incomingPanelRef.current;
            if (nextPanel) nextPanel.style.transform = `translateY(${window.innerHeight - stickyOffset}px)`;
          });
        }

        const incomingPanel = incomingPanelRef.current;
        if (incomingPanel && Number(incomingPanel.dataset.serviceIndex) === nextIndex + 1) {
          const panelHeight = window.innerHeight - stickyOffset;
          const progressWithinStage = nextIndex === servicesData.length - 1
            ? 0
            : nextProgress - nextIndex;
          const targetTop = (nextIndex + 1) * rowHeight;
          const incomingTop = panelHeight - (panelHeight - targetTop) * progressWithinStage;
          incomingPanel.style.transform = `translateY(${incomingTop}px)`;
        }
      });
    };

    const handleResize = () => {
      setRowHeight(window.innerWidth >= 1024 ? 128 : 96);
      setStageScrollVh(window.innerWidth >= 1024 ? STAGE_SCROLL_VH : TABLET_STAGE_SCROLL_VH);
      measureTrackTop();
      updateActiveStage();
    };

    const main = sectionRef.current?.closest('main');
    const layoutObserver = typeof ResizeObserver === 'undefined'
      ? undefined
      : new ResizeObserver(handleResize);
    if (main && layoutObserver) layoutObserver.observe(main);

    measureTrackTop();
    updateActiveStage();
    window.addEventListener('scroll', updateActiveStage, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      layoutObserver?.disconnect();
      window.removeEventListener('scroll', updateActiveStage);
      window.removeEventListener('resize', handleResize);
    };
  }, [rowHeight, stageScrollVh]);

  return (
    <section ref={sectionRef} id="services" className="portfolio-section services-section relative z-10">
      <div className="section-inner container-x mx-auto max-w-7xl px-2 sm:px-4 lg:px-5">
        <header data-gsap-reveal="left" className="section-header services-header mb-12 max-w-4xl sm:mb-16">
          <div className="mb-5 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
            <span>(05)</span>
            <span>//</span>
            <span>Services &amp; Expertise</span>
          </div>
          <h2 data-gsap-rule className="section-title max-w-4xl text-4xl font-extrabold uppercase tracking-tighter text-[#f4f4f0] sm:text-5xl xl:text-6xl">
            What I Do <span className="text-neutral-500">/ Full-Lifecycle Engineering.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base text-neutral-400 sm:text-lg">
            I help startups and engineering teams turn specifications into resilient, scalable systems that perform under load.
          </p>
        </header>

        <div data-gsap-stagger className="services-mobile-list md:hidden">
          {servicesData.map((service, index) => (
            <article
              key={service.id}
              data-gsap-item
              className={`grid grid-cols-[minmax(4.5rem,0.5fr)_minmax(0,1.5fr)] border-t border-white/15 pt-5 ${service.id === 'backend' ? 'pb-8' : 'pb-5'}`}
            >
              <span className="font-mono text-xl font-medium tracking-tight text-[#d8d7cf]">
                ({String(index + 1).padStart(2, '0')})
              </span>
              <div>
                <h3 className="w-full !text-left text-2xl font-semibold leading-tight tracking-[-0.05em] text-[#d8d7cf] sm:text-3xl lg:text-4xl">
                  {renderServiceTitle(service)}
                </h3>
                {renderServiceDetails(service)}
              </div>
            </article>
          ))}
        </div>

        <div
          ref={trackRef}
          className="services-scroll-track relative hidden md:block"
          style={{
            '--services-scroll-height': `${servicesData.length * stageScrollVh}vh`,
          } as React.CSSProperties & {
            '--services-scroll-height': string;
          }}
        >
          <div className="sticky top-24 z-20 min-h-[60vh] border-t border-white/15 bg-[#070708] xl:min-h-[100vh]">
            {servicesData.slice(0, activeIndex + 1).map((service, index) => (
              <div
                key={service.id}
                className="grid w-full grid-cols-[minmax(4.5rem,0.5fr)_minmax(0,1.5fr)] items-center border-t border-white/15 h-24 lg:h-32 lg:grid-cols-[minmax(4.5rem,1fr)_1.05fr]"
              >
                <span className="self-start py-5 font-mono text-xl font-medium tracking-tight text-[#d8d7cf] sm:text-2xl lg:text-3xl">
                  ({String(index + 1).padStart(2, '0')})
                </span>
                <div>
                  <h3 className="w-full !text-left text-2xl font-semibold leading-tight tracking-[-0.05em] text-[#d8d7cf] sm:text-3xl lg:text-4xl">
                    {renderServiceTitle(service)}
                  </h3>
                </div>
              </div>
            ))}

            <div
              key={activeService.id}
              className="grid grid-cols-[minmax(4.5rem,0.5fr)_minmax(0,1.5fr)] lg:grid-cols-[minmax(4.5rem,1fr)_1.05fr]"
            >
              <div aria-hidden="true" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`details-${activeService.id}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.26, ease: 'easeOut' }}
                >
                  {renderServiceDetails(activeService)}
                </motion.div>
              </AnimatePresence>
            </div>

            {incomingService && (
              <div
                ref={incomingPanelRef}
                aria-hidden="true"
                className="services-incoming-panel absolute left-0 right-0 top-0 z-30 bg-[#070708]"
                data-service-index={activeIndex + 1}
                style={{
                  height: `max(0px, calc(100dvh - 6rem - ${(activeIndex + 1) * rowHeight}px))`,
                  backgroundColor: '#070708',
                }}
              >
                <div
                  className="grid w-full grid-cols-[minmax(4.5rem,0.5fr)_minmax(0,1.5fr)] items-center border-t border-white/15 h-24 lg:h-32 lg:grid-cols-[minmax(4.5rem,1fr)_1.05fr]"
                >
                  <span className="self-start py-5 font-mono text-xl font-medium tracking-tight text-[#d8d7cf] sm:text-2xl lg:text-3xl">
                    ({String(activeIndex + 2).padStart(2, '0')})
                  </span>
                  <div>
                    <h3 className="w-full !text-left text-2xl font-semibold leading-tight tracking-[-0.05em] text-[#d8d7cf] sm:text-3xl lg:text-4xl">
                      {renderServiceTitle(incomingService)}
                    </h3>
                  </div>
                </div>

                <div
                  className="grid grid-cols-[minmax(4.5rem,0.5fr)_minmax(0,1.5fr)] lg:grid-cols-[minmax(4.5rem,1fr)_1.05fr]"
                >
                  <div aria-hidden="true" />
                  <div>{renderServiceDetails(incomingService)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
