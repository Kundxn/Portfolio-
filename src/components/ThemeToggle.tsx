import {Moon, Sun} from 'lucide-react';
import {cn} from '@/src/lib/utils';

export type Theme = 'dark' | 'light';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: (next: Theme) => void;
  className?: string;
}

export function ThemeToggle({theme, onToggle, className}: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => onToggle(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-400/75 dark:border-zinc-800 bg-white dark:bg-[#111114] shadow-sm dark:shadow-none text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors cursor-pointer',
        className
      )}
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
