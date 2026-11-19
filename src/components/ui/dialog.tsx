import * as React from 'react';
import {X} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Dialog({open, onClose, title, subtitle, children}: DialogProps) {
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          <motion.div
            initial={prefersReducedMotion ? {opacity: 1} : {opacity: 0}}
            animate={{opacity: 1}}
            exit={prefersReducedMotion ? {opacity: 0} : {opacity: 0}}
            transition={{duration: 0.15}}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/75 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            initial={prefersReducedMotion ? {opacity: 1} : {opacity: 0, y: 12, scale: 0.98}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={prefersReducedMotion ? {opacity: 0} : {opacity: 0, y: 8, scale: 0.98}}
            transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
            className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-xl border border-zinc-400/75 dark:border-zinc-800 bg-white dark:bg-[#111114] text-zinc-900 dark:text-zinc-100 shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-zinc-400/60 dark:border-zinc-800 bg-white/95 dark:bg-[#111114]/95 backdrop-blur px-6 py-5">
              <div>
                <h2
                  id="dialog-title"
                  className="font-display text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
                >
                  {title}
                </h2>
                {subtitle && (
                  <p className="mt-1 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-400/75 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
