import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info';
}

interface NotificationToastProps {
  toasts: Toast[];
  setToasts: React.Dispatch<React.SetStateAction<Toast[]>>;
}

export default function NotificationToast({ toasts, setToasts }: NotificationToastProps) {
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        // Remove oldest toast
        setToasts(prev => prev.slice(1));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toasts, setToasts]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="flex items-center gap-3 rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-4 shadow-xl shadow-cyan-500/5 backdrop-blur-md pointer-events-auto"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
              {toast.type === 'success' ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Sparkles className="h-4 w-4 text-violet-400 animate-pulse" />
              )}
            </div>
            <p className="font-sans text-xs font-bold text-white tracking-wide">
              {toast.message}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
