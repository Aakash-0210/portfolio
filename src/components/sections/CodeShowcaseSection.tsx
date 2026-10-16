import React, { useEffect, useRef, useState } from 'react';
import { CornerDownLeft } from 'lucide-react';
import { githubStats } from '../../data/githubData';
import { personalInfo } from '../../data/portfolioData';
import { soundManager } from '../../utils/sound';

export const CodeShowcaseSection: React.FC = () => {
  // Terminal Simulator State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    { cmd: 'whoami', output: 'Aakash Prajapati — Full Stack Developer & Software Engineer' },
    { cmd: 'stack --summary', output: 'HTML5, CSS3, JavaScript, React.js, Tailwind CSS, Node.js, Express.js, REST API, JWT Auth, Spring Boot, Java, Java Servlets, MySQL, MongoDB' },
  ]);
  const terminalOutputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const terminalOutput = terminalOutputRef.current;
    if (terminalOutput) {
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  }, [terminalHistory]);

  const executeCommand = (command: string) => {
    soundManager.playClick();
    const cleanCmd = command.trim().toLowerCase();
    let output = '';

    switch (cleanCmd) {
      case 'help':
        output = 'Available commands: whoami, bio, stack --summary, skills, projects, streak, contact, clear';
        break;
      case 'whoami':
        output = `${personalInfo.name} — ${personalInfo.role}`;
        break;
      case 'bio':
        output = 'I specialize in building fast, reliable, and user-friendly full-stack web applications. I help small businesses and startups turn ideas into high-quality websites and products that actually work and scale.';
        break;
      case 'skills':
        output = 'Frontend: responsive interfaces, reusable components, and client-side state. Backend: REST API design, authentication, and server-side services. Data: relational schema design, transaction handling, NoSQL modeling, and query optimization.';
        break;
      case 'stack --summary':
        output = 'HTML5, CSS3, JavaScript, React.js, Tailwind CSS, Node.js, Express.js, REST API, JWT Auth, Spring Boot, Java, Java Servlets, MySQL, MongoDB';
        break;
      case 'projects':
        output = '1. Crypto Tracker (React+Query) | 2. Laundry Platform (Java+JDBC) | 3. Task Management (Node+Mongo)';
        break;
      case 'streak':
        output = `Current Streak: ${githubStats.currentStreak} days 🔥 | Longest Streak: ${githubStats.longestStreak} days`;
        break;
      case 'contact':
        output = `Email: ${personalInfo.email} | GitHub: ${personalInfo.github}`;
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        output = `Command not recognized: "${command}". Type "help" for valid commands.`;
        break;
    }

    setTerminalHistory((prev) => [...prev, { cmd: command, output }]);
    setTerminalInput('');
  };

  return (
    <section id="code-showcase" className="relative py-28 z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-4 mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8A7D9]">
            <span>(04)</span>
            <span>//</span>
            <span>DEVELOPER LAB</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tighter text-[#f4f4f0] max-w-4xl">
            Interactive <span className="text-neutral-500">Terminal.</span>
          </h2>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl font-light">
            Explore my profile, skills, and projects through a set of interactive terminal commands.
          </p>
        </div>

        {/* Centered terminal with static command reference */}
        <div className="grid grid-cols-1 gap-5 items-stretch lg:grid-cols-12 lg:gap-4">
          <aside className="flex flex-col justify-center gap-5 px-2 lg:col-span-3 lg:items-end">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 lg:text-right">Available commands</p>
            <div className="space-y-4 font-mono text-xs lg:text-right">
              {[
                ['whoami', 'show profile'],
                ['bio', 'read biography'],
                ['stack --summary', 'list core stack'],
                ['skills', 'view technologies'],
              ].map(([command, description]) => (
                <div key={command} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <p className="text-[#B8A7D9]">$ {command}</p>
                  <p className="mt-1 pl-3 text-neutral-500 lg:pl-0">{description}</p>
                </div>
              ))}
            </div>
          </aside>
          
          {/* Interactive Web Terminal */}
          <div className="w-full rounded-3xl glass-panel border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[440px] lg:col-span-6">
            <div className="px-4 py-3 bg-neutral-950/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-600" />
                <span className="text-xs font-mono text-neutral-400 ml-2">
                  bash: aakash@portfolio:~
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#B8A7D9]">TTY v1.2</span>
            </div>

            <div ref={terminalOutputRef} className="p-4 overflow-y-auto flex-1 font-mono text-xs text-neutral-300 space-y-3 bg-black/95">
              <div className="text-neutral-500">
                Welcome to Aakash's Terminal. Type a command from the reference or enter <span className="text-white font-bold">help</span>.
              </div>

              {terminalHistory.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2 text-[#B8A7D9]">
                    <span>$</span>
                    <span className="text-white font-bold">{item.cmd}</span>
                  </div>
                  <div className="text-neutral-400 pl-4 border-l border-white/10 leading-relaxed font-light">
                    {item.output}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (terminalInput) executeCommand(terminalInput);
              }}
              className="p-3 bg-neutral-950 border-t border-white/10 flex items-center gap-2"
            >
              <span className="text-xs font-mono text-[#B8A7D9] font-bold">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => {
                  setTerminalInput(e.target.value);
                  soundManager.playKey();
                }}
                placeholder="type command..."
                className="flex-1 bg-transparent border-none text-xs font-mono text-white placeholder-neutral-600 focus:outline-none"
              />
              <button
                type="submit"
                className="text-neutral-500 hover:text-white p-1 transition-colors cursor-pointer"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          <aside className="flex flex-col justify-center gap-5 px-2 lg:col-span-3">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500">More commands</p>
            <div className="space-y-4 font-mono text-xs">
              {[
                ['projects', 'show selected work'],
                ['streak', 'show GitHub streak'],
                ['contact', 'show contact details'],
                ['clear', 'clear terminal output'],
              ].map(([command, description]) => (
                <div key={command} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
                  <p className="text-[#B8A7D9]">$ {command}</p>
                  <p className="mt-1 pl-3 text-neutral-500">{description}</p>
                </div>
              ))}
            </div>
          </aside>

        </div>

      </div>
    </section>
  );
};
