import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ExternalLink, CheckCircle2, 
  Layers, AlertTriangle, ShieldCheck 
} from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import type { Project } from '../../types';
import { soundManager } from '../../utils/sound';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'challenges' | 'sandbox'>('architecture');

  // Interactive Sandbox state for Crypto Tracker
  const [cryptoSearch, setCryptoSearch] = useState('Bitcoin');
  const [simulatedPrice, setSimulatedPrice] = useState(64820);
  
  // Interactive Sandbox state for Laundry Platform
  const [orderStage, setOrderStage] = useState<'Received' | 'Washing' | 'Ironing' | 'Ready' | 'Delivered'>('Washing');

  // Interactive Sandbox state for Task Management
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Implement JWT refresh rotation', priority: 'High', status: 'In Progress' },
    { id: '2', title: 'Optimize compound B-Tree indexes', priority: 'Urgent', status: 'Done' },
    { id: '3', title: 'Audit connection pool limits', priority: 'Medium', status: 'Review' },
  ]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99990] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl glass-panel border border-white/15 bg-[#080808] shadow-2xl z-10 overflow-hidden"
        >
          {/* Top Header */}
          <div className="p-6 sm:p-8 border-b border-white/10 flex items-start justify-between gap-4 bg-black/40">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-[#B8A7D9] border border-white/10 uppercase">
                  {project.category}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  SYSTEM ARCHITECTURE SPECIFICATION
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#B8A7D9] font-mono mt-1">
                {project.tagline}
              </p>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-2 rounded-xl glass-panel border border-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 px-6 sm:px-8 py-3 border-b border-white/5 bg-neutral-900/50">
            <button
              onClick={() => {
                soundManager.playSwitch();
                setActiveTab('architecture');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-white text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              (01) Architecture
            </button>
            <button
              onClick={() => {
                soundManager.playSwitch();
                setActiveTab('challenges');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'challenges'
                  ? 'bg-white text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              (02) Bottlenecks & Fixes
            </button>
            <button
              onClick={() => {
                soundManager.playSwitch();
                setActiveTab('sandbox');
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'sandbox'
                  ? 'bg-white text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              (03) Sandbox Simulation
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-sm">
            {/* TAB 1: ARCHITECTURE */}
            {activeTab === 'architecture' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#B8A7D9]" />
                    Layer-by-Layer Architectural Breakdown
                  </h4>
                  <p className="text-neutral-300 font-light leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                {/* Layer Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {project.architectureDetails.map((item) => (
                    <div
                      key={item.layer}
                      className="p-4 rounded-2xl glass-panel border border-white/5 bg-black/40"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8A7D9]" />
                        <h5 className="font-mono text-xs font-bold text-[#B8A7D9] uppercase">
                          {item.layer}
                        </h5>
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed font-light">
                        {item.details}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Verified Metrics */}
                <div className="pt-2">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-3">
                    Validated Performance Metrics:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                        <span className="text-xl font-bold font-mono text-white block">
                          {m.value}
                        </span>
                        <span className="text-[11px] text-neutral-400 font-mono mt-0.5 block">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CHALLENGES & SOLUTIONS */}
            {activeTab === 'challenges' && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl glass-panel border border-white/10 bg-neutral-900 space-y-2">
                  <div className="flex items-center gap-2 text-neutral-300 font-mono text-xs font-bold uppercase">
                    <AlertTriangle className="w-4 h-4 text-[#B8A7D9]" />
                    <span>The Engineering Challenge</span>
                  </div>
                  <p className="text-neutral-200 text-sm leading-relaxed font-light">
                    {project.challenges}
                  </p>
                </div>

                <div className="p-5 rounded-2xl glass-panel border border-white/10 bg-neutral-900 space-y-2">
                  <div className="flex items-center gap-2 text-white font-mono text-xs font-bold uppercase">
                    <ShieldCheck className="w-4 h-4 text-[#B8A7D9]" />
                    <span>Architectural Resolution</span>
                  </div>
                  <p className="text-neutral-200 text-sm leading-relaxed font-light">
                    {project.solution}
                  </p>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                    Core Capabilities:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feat) => (
                      <div
                        key={feat}
                        className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-neutral-300 flex items-start gap-2.5 font-light"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#B8A7D9] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SANDBOX */}
            {activeTab === 'sandbox' && (
              <div className="space-y-6">
                {project.id === 'crypto-tracker' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl glass-panel border border-white/10 bg-black/60 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                        <span>LIVE TICKER SIMULATOR (TANSTACK CACHING)</span>
                        <span className="text-[#B8A7D9]">BUFFER: 60S STALE</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={cryptoSearch}
                          onChange={(e) => setCryptoSearch(e.target.value)}
                          placeholder="Search token (e.g. Ethereum, Solana)..."
                          className="flex-1 px-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-sm text-white focus:outline-none focus:border-white/40"
                        />
                        <button
                          onClick={() => {
                            soundManager.playClick();
                            setSimulatedPrice((p) => p + (Math.random() > 0.5 ? 240 : -180));
                          }}
                          className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono text-xs font-bold transition-colors cursor-pointer uppercase"
                        >
                          Simulate Tick
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="text-sm font-bold text-white block">{cryptoSearch || 'Bitcoin'} / USD</span>
                          <span className="text-xs font-mono text-neutral-400">Volume 24h: $38.4B</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold font-mono text-[#B8A7D9] block">
                            ${simulatedPrice.toLocaleString()}
                          </span>
                          <span className="text-xs font-mono text-white">+3.84% (1h)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {project.id === 'laundry-service-platform' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl glass-panel border border-white/10 bg-black/60 space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                        <span>JAVA SERVLET LIFECYCLE STEPPER</span>
                        <span className="text-[#B8A7D9]">JDBC: ACID COMMITTED</span>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-mono">
                        {(['Received', 'Washing', 'Ironing', 'Ready', 'Delivered'] as const).map((stage) => {
                          const isActive = orderStage === stage;
                          return (
                            <button
                              key={stage}
                              onClick={() => {
                                soundManager.playSwitch();
                                setOrderStage(stage);
                              }}
                              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-white text-black font-bold shadow'
                                  : 'text-neutral-400 hover:text-white'
                              }`}
                            >
                              {stage}
                            </button>
                          );
                        })}
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-neutral-300 space-y-1">
                        <div>CURRENT STATUS: <span className="text-[#B8A7D9] font-bold">{orderStage.toUpperCase()}</span></div>
                        <div>SESSION: <span className="text-neutral-500">JSESSIONID=7F8A39C09E1...</span></div>
                        <div>ORDER ID: <span className="text-white">#ORD-9842</span> (Customer: John Doe)</div>
                      </div>
                    </div>
                  </div>
                )}

                {project.id === 'task-management-system' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl glass-panel border border-white/10 bg-black/60 space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                        <span>REDUX TOOLKIT & MONGODB KANBAN</span>
                        <span className="text-[#B8A7D9]">COMPOUND INDEX: HIT</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {tasks.map((task) => (
                          <div
                            key={task.id}
                            className="p-3.5 rounded-xl bg-white/5 border border-white/10"
                          >
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white block w-fit mb-2">
                              {task.priority}
                            </span>
                            <h5 className="font-semibold text-white text-xs mb-1">{task.title}</h5>
                            <span className="text-[11px] font-mono text-neutral-400">
                              Status: {task.status}
                            </span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          soundManager.playSuccess();
                          setTasks((prev) => [
                            ...prev,
                            {
                              id: String(Date.now()),
                              title: `Optimistic Task #${prev.length + 1}`,
                              priority: 'Normal',
                              status: 'To Do',
                            },
                          ]);
                        }}
                        className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono text-xs font-bold uppercase transition-colors cursor-pointer"
                      >
                        + Add Optimistic Task
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-6 border-t border-white/10 bg-black/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 text-neutral-300 border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel border border-white/10 hover:border-white/25 text-xs font-mono uppercase text-neutral-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>

              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold uppercase transition-colors shadow"
                >
                  <span>Live App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
