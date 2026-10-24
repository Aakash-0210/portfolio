import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Info, X } from 'lucide-react';
import { soundManager } from '../../utils/sound';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="toast-stack fixed bottom-6 right-6 z-[99995] flex w-full max-w-sm flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto flex items-center justify-between p-3.5 rounded-2xl glass-panel border border-white/15 bg-neutral-900/95 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-[#B8A7D9] shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-white shrink-0" />
              )}
              <div>
                <p className="text-xs font-mono font-bold uppercase text-white">{toast.title}</p>
                {toast.message && (
                  <p className="text-xs text-neutral-400 mt-0.5 font-light">{toast.message}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                onDismiss(toast.id);
              }}
              className="p-1 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
