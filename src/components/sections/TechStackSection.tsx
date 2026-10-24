import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Atom, Code, Coffee, Database, FileCode2, KeyRound, Leaf,
  Palette, Radio, Server, Wind, Network
} from 'lucide-react';
import { skillsData } from '../../data/portfolioData';
import { soundManager } from '../../utils/sound';
import { useGsapScrollReveal } from '../../hooks/useGsapScrollReveal';

type Category = 'All' | 'Frontend' | 'Backend' | 'Database';

const categories: Category[] = ['All', 'Frontend', 'Backend', 'Database'];
const stackOrder = [
  'HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS',
  'Node.js', 'Express.js', 'REST API', 'JWT Auth', 'Spring Boot', 'Java',
  'MySQL', 'MongoDB'
];
const marqueeRows = [
  ['React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Redux Toolkit', 'CSS3'],
  ['Node.js', 'Express.js', 'Spring Boot', 'Java', 'MySQL', 'MongoDB', 'REST APIs'],
];

const skills = skillsData
  .filter((skill) => stackOrder.includes(skill.name))
  .sort((a, b) => stackOrder.indexOf(a.name) - stackOrder.indexOf(b.name));

const skillIcons: Record<string, React.ReactNode> = {
  Atom: <Atom className="h-6 w-6" />,
  Code: <Code className="h-6 w-6" />,
  FileCode: <FileCode2 className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
  Wind: <Wind className="h-6 w-6" />,
  Server: <Server className="h-6 w-6" />,
  Radio: <Radio className="h-6 w-6" />,
  Coffee: <Coffee className="h-6 w-6" />,
  Database: <Database className="h-6 w-6" />,
  HardDrive: <Database className="h-6 w-6" />,
  Network: <Network className="h-6 w-6" />,
  KeyRound: <KeyRound className="h-6 w-6" />,
  Leaf: <Leaf className="h-6 w-6" />,
};

const skillsFor = (category: Category) =>
  category === 'All' ? skills : skills.filter((skill) => skill.category === category);

export const TechStackSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [marqueeActive, setMarqueeActive] = useState(false);
  useGsapScrollReveal(sectionRef);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const visibleSkills = skillsFor(activeCategory);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const observer = new IntersectionObserver(([entry]) => setMarqueeActive(entry.isIntersecting));
    observer.observe(marquee);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="portfolio-section tech-section relative isolate overflow-hidden z-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 75% 45% at 50% 33%, rgba(88, 28, 135, 0.12), transparent 100%), radial-gradient(ellipse 55% 40% at 10% 81%, rgba(55, 20, 85, 0.06), transparent 100%), radial-gradient(ellipse 55% 40% at 90% 86%, rgba(55, 20, 85, 0.06), transparent 100%)',
        }}
      />
      <div className="section-inner container-x relative z-10 mx-auto max-w-7xl px-2 sm:px-4 lg:px-5">
        <header data-gsap-reveal="left" className="section-header tech-header mb-6 sm:mb-12">
          <div className="mb-3 flex items-center justify-start gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-[#B8A7D9]">
            <span>(02)</span><span>//</span><span>TOOLS OF THE TRADE</span>
          </div>
          <h2 data-gsap-rule className="section-title text-left font-medium text-[#e7def2]">
            From interfaces to the systems behind them.
          </h2>
        </header>

        <div ref={marqueeRef} className="tech-marquee" data-marquee-active={marqueeActive} aria-hidden="true">
          {marqueeRows.map((row, rowIndex) => (
            <div className={`tech-marquee__lane tech-marquee__lane--${rowIndex + 1}`} key={rowIndex}>
              <div className="tech-marquee__track">
                {[false, true].map((isClone) => (
                  <div key={String(isClone)} className="tech-marquee__group">
                    {row.map((technology) => (
                      <span
                        key={technology}
                        className={`tech-marquee__item${isClone ? ' tech-marquee__item--clone' : ''}`}
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <nav data-gsap-reveal="scale" aria-label="Filter technologies" className="tech-filter mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setActiveCategory(category);
              }}
              onMouseEnter={() => soundManager.playHover()}
              aria-pressed={activeCategory === category}
              className={`rounded-full border px-3.5 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                activeCategory === category
                  ? 'border-[#B8A7D9]/50 bg-[#B8A7D9]/10 text-[#B8A7D9]'
                  : 'border-white/10 text-neutral-500 hover:border-white/20 hover:text-neutral-200'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.14 } }}
            variants={{
              hidden: { opacity: 0, y: 14 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.42, ease: 'easeOut', staggerChildren: 0.045, delayChildren: 0.04 },
              },
            }}
            className="tech-skill-grid mx-auto flex max-w-[680px] flex-wrap justify-center gap-3"
          >
            {visibleSkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.94 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32, ease: 'easeOut' } },
                }}
                className="tech-skill-card group flex h-[92px] w-[88px] flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition duration-200 hover:-translate-y-1 hover:border-[#B8A7D9]/35 hover:bg-white/[0.055] sm:h-24 sm:w-24"
              >
                <span
                  className="transition-transform duration-200 group-hover:scale-110"
                  style={{ color: skill.accentColor }}
                  aria-hidden="true"
                >
                  {skillIcons[skill.iconName] ?? <Code className="h-6 w-6" />}
                </span>
                <span className="max-w-full truncate px-1 text-[10px] font-medium text-neutral-300 transition-colors group-hover:text-white">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <p data-gsap-reveal="up" className="mt-7 text-center text-[10px] font-mono uppercase tracking-widest text-neutral-600">
          {String(visibleSkills.length).padStart(2, '0')} technologies / full-stack development
        </p>
      </div>
    </section>
  );
};
