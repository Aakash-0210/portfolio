import React, { useEffect, useRef, useState } from 'react';
import { servicesData } from '../../data/portfolioData';

const STAGE_SCROLL_VH = 110;

export const ServicesSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const incomingPanelRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const activeIndexRef = useRef(0);
  const transitionProgress = activeIndex === servicesData.length - 1
    ? 0
    : Math.max(0, Math.min(1, scrollProgressRef.current - activeIndex));
  const activeService = servicesData[activeIndex];
  const incomingService = servicesData[activeIndex + 1];
  const rowHeight = typeof window !== 'undefined' && window.innerWidth >= 640 ? 96 : 80;
  const panelHeight = typeof window !== 'undefined' ? window.innerHeight - 96 : 0;
  const incomingTop = panelHeight - (panelHeight - (activeIndex + 1) * rowHeight) * transitionProgress;

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

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveStage = () => {
      if (window.innerWidth < 640 || animationFrame) return;

      animationFrame = requestAnimationFrame(() => {
        animationFrame = 0;
        const track = trackRef.current;
        if (!track) return;

        const stickyOffset = 96;
        const passedTrackTop = stickyOffset - track.getBoundingClientRect().top;
        const stageHeight = window.innerHeight * (STAGE_SCROLL_VH / 100);
        const nextProgress = Math.max(
          0,
          Math.min(servicesData.length - 0.001, passedTrackTop / stageHeight),
        );

        scrollProgressRef.current = nextProgress;
        const nextIndex = Math.min(servicesData.length - 1, Math.floor(nextProgress));

        if (activeIndexRef.current !== nextIndex) {
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
        }

        const incomingPanel = incomingPanelRef.current;
        if (incomingPanel && Number(incomingPanel.dataset.serviceIndex) === nextIndex + 1) {
          const rowHeight = window.innerWidth >= 640 ? 96 : 80;
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

    updateActiveStage();
    window.addEventListener('scroll', updateActiveStage, { passive: true });
    window.addEventListener('resize', updateActiveStage);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', updateActiveStage);
      window.removeEventListener('resize', updateActiveStage);
    };
  }, []);

  return (
    <section id="services" className="relative z-10 border-t border-white/10 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-12 max-w-4xl sm:mb-16">
          <div className="mb-5 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
            <span>(05)</span>
            <span>//</span>
            <span>Services &amp; Expertise</span>
          </div>
          <h2 className="max-w-4xl text-4xl font-extrabold uppercase tracking-tighter text-[#f4f4f0] sm:text-5xl xl:text-6xl">
            What I Do <span className="text-neutral-500">/ Full-Lifecycle Engineering.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base text-neutral-400 sm:text-lg">
            I help startups and engineering teams turn specifications into resilient, scalable systems that perform under load.
          </p>
        </header>

        <div className="sm:hidden">
          {servicesData.map((service, index) => (
            <article
              key={service.id}
              className="grid grid-cols-[minmax(4.5rem,0.5fr)_minmax(0,1.5fr)] border-t border-white/15 py-5"
            >
              <span className="font-mono text-xl font-medium tracking-tight text-[#d8d7cf]">
                ({String(index + 1).padStart(2, '0')})
              </span>
              <div>
                <h3 className="text-2xl font-semibold leading-tight tracking-[-0.05em] text-[#d8d7cf]">
                  {service.title}
                </h3>
                {renderServiceDetails(service)}
              </div>
            </article>
          ))}
        </div>

        <div
          ref={trackRef}
          className="relative hidden sm:block"
          style={{ height: `${servicesData.length * STAGE_SCROLL_VH}vh` }}
        >
          <div className="sticky top-24 z-20 min-h-[calc(100vh-6rem)] border-t border-white/15 bg-[#070708]">
            {servicesData.slice(0, activeIndex + 1).map((service, index) => (
              <div
                key={service.id}
                className="grid w-full grid-cols-[minmax(4.5rem,0.5fr)_minmax(0,1.5fr)] items-center border-t border-white/15 sm:h-24 sm:grid-cols-[minmax(4.5rem,1fr)_1.05fr] h-20"
              >
                <span className="self-start py-5 font-mono text-xl font-medium tracking-tight text-[#d8d7cf] sm:text-2xl lg:text-3xl">
                  ({String(index + 1).padStart(2, '0')})
                </span>
                <div>
                  <h3 className="text-2xl font-semibold leading-tight tracking-[-0.05em] text-[#d8d7cf] sm:text-3xl lg:text-4xl">
                    {service.title}
                  </h3>
                </div>
              </div>
            ))}

            <div
              key={activeService.id}
              className="grid grid-cols-[minmax(4.5rem,0.5fr)_minmax(0,1.5fr)] sm:grid-cols-[minmax(4.5rem,1fr)_1.05fr]"
            >
              <div aria-hidden="true" />
              <div key={`details-${activeService.id}`}>
                {renderServiceDetails(activeService)}
              </div>
            </div>

            {incomingService && (
              <div
                ref={incomingPanelRef}
                aria-hidden="true"
                className="absolute left-0 right-0 top-0 z-30 bg-[#070708]"
                data-service-index={activeIndex + 1}
                style={{
                  transform: `translateY(${incomingTop}px)`,
                  height: `${Math.max(0, panelHeight - (activeIndex + 1) * rowHeight)}px`,
                  backgroundColor: '#070708',
                }}
              >
                <div
                  className="grid w-full grid-cols-[minmax(4.5rem,0.5fr)_minmax(0,1.5fr)] items-center border-t border-white/15 sm:h-24 sm:grid-cols-[minmax(4.5rem,1fr)_1.05fr] h-20"
                >
                  <span className="self-start py-5 font-mono text-xl font-medium tracking-tight text-[#d8d7cf] sm:text-2xl lg:text-3xl">
                    ({String(activeIndex + 2).padStart(2, '0')})
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold leading-tight tracking-[-0.05em] text-[#d8d7cf] sm:text-3xl lg:text-4xl">
                      {incomingService.title}
                    </h3>
                  </div>
                </div>

                <div
                  className="grid grid-cols-[minmax(4.5rem,0.5fr)_minmax(0,1.5fr)] sm:grid-cols-[minmax(4.5rem,1fr)_1.05fr]"
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
