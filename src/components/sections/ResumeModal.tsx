import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, FileText, X } from 'lucide-react';
import { soundManager } from '../../utils/sound';
import { downloadResume } from '../../utils/resume';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const resumeUrl = `${import.meta.env.BASE_URL}AAKASH_RESUME.pdf`;

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[99990] flex items-center justify-center p-3 sm:p-6">
        <motion.button
          type="button"
          aria-label="Close resume preview"
          className="fixed inset-0 bg-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.section
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-10 flex h-[92vh] max-h-[1000px] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#080808] shadow-2xl"
        >
          <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-black/60 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#B8A7D9]">
              <FileText className="h-4 w-4" />
              <span>Resume Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  downloadResume();
                }}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-mono font-bold uppercase tracking-wide text-black transition-colors hover:bg-neutral-200"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
              <button
                type="button"
                aria-label="Close resume preview"
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="cursor-pointer rounded-full border border-white/10 p-2 text-neutral-400 transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <iframe
            title="Aakash Prajapati resume PDF"
            src={`${resumeUrl}#toolbar=1&navpanes=0&zoom=80`}
            loading="lazy"
            className="min-h-0 w-full flex-1 bg-neutral-800"
          />
        </motion.section>
      </div>
    )}
  </AnimatePresence>
);
