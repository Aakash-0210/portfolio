import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Atom, Code, Coffee, Database, FileCode2, KeyRound, Leaf,
  Palette, Radio, Server, Wind, Network
} from 'lucide-react';
import { skillsData } from '../../data/portfolioData';
import { soundManager } from '../../utils/sound';

type Category = 'All' | 'Frontend' | 'Backend' | 'Database';

const categories: Category[] = ['All', 'Frontend', 'Backend', 'Database'];
const stackOrder = [
  'HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS',
  'Node.js', 'Express.js', 'REST API', 'JWT Auth', 'Spring Boot', 'Java',
  'MySQL', 'MongoDB'
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
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const visibleSkills = skillsFor(activeCategory);

  return (
    <section
      id="tech-stack"
      className="relative isolate overflow-hidden border-t border-white/5 py-16 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 75% 45% at 50% 33%, rgba(88, 28, 135, 0.12), transparent 100%), radial-gradient(ellipse 55% 40% at 10% 81%, rgba(55, 20, 85, 0.06), transparent 100%), radial-gradient(ellipse 55% 40% at 90% 86%, rgba(55, 20, 85, 0.06), transparent 100%)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-6 sm:mb-12">
          <div className="mb-3 flex items-center justify-start gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-[#B8A7D9]">
            <span>(02)</span><span>//</span><span>TOOLS OF THE TRADE</span>
          </div>
          <h2 className="text-center text-3xl font-light uppercase tracking-[0.05em] text-[#e7def2] sm:text-6xl sm:tracking-[0.08em]">
            Tech Stack
          </h2>
        </header>

        <nav aria-label="Filter technologies" className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                soundManager.playSwitch();
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

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="mx-auto flex max-w-[580px] flex-wrap justify-center gap-3"
          >
            {visibleSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: Math.min(index * 0.018, 0.14), ease: 'easeOut' }}
                className="group flex h-[92px] w-[88px] flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition duration-200 hover:-translate-y-1 hover:border-[#B8A7D9]/35 hover:bg-white/[0.055] sm:h-24 sm:w-24"
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

        <p className="mt-7 text-center text-[10px] font-mono uppercase tracking-widest text-neutral-600">
          {String(visibleSkills.length).padStart(2, '0')} technologies / full-stack development
        </p>
      </div>
    </section>
  );
};
