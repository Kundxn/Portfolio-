import * as React from 'react';
import {Download, Menu, X} from 'lucide-react';
import {PROFILE} from '@/src/data/portfolio';
import {ThemeToggle, type Theme} from '@/src/components/ThemeToggle';

const NAV_LINKS = [
  {label: 'About', href: '#about'},
  {label: 'Experience', href: '#experience'},
  {label: 'Projects', href: '#projects'},
  {label: 'Skills', href: '#skills'},
  {label: 'Contact', href: '#contact'},
];

interface NavbarProps {
  theme: Theme;
  onToggleTheme: (next: Theme) => void;
}

export function Navbar({theme, onToggleTheme}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-400/75 dark:border-zinc-800 bg-[#ECEEF2]/90 dark:bg-[#09090B]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-zinc-400/75 dark:border-zinc-800 bg-white dark:bg-[#111114] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          {/* Single-line navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap shrink-0 py-1 hover:text-zinc-900 dark:hover:text-zinc-50 hover:underline underline-offset-4 decoration-blue-600 dark:decoration-blue-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Primary header actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={PROFILE.resumeUrl}
            download="Kundan_Singh_Resume.pdf"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Download Resume</span>
          </a>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-zinc-400/75 dark:border-zinc-800 bg-[#ECEEF2] dark:bg-[#09090B] px-4 py-4"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
