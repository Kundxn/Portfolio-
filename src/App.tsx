import * as React from 'react';
import {Navbar} from '@/src/components/Navbar';
import {HeroSection} from '@/src/components/HeroSection';
import {AboutSection} from '@/src/components/AboutSection';
import {ExperienceSection} from '@/src/components/ExperienceSection';
import {ProjectsSection} from '@/src/components/ProjectsSection';
import {SkillsSection} from '@/src/components/SkillsSection';
import {CertificationsSection} from '@/src/components/CertificationsSection';
import {EducationSection} from '@/src/components/EducationSection';
import {ContactSection} from '@/src/components/ContactSection';
import {type Theme} from '@/src/components/ThemeToggle';

export default function App() {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ks_theme');
        if (saved === 'light' || saved === 'dark') {
          return saved;
        }
      } catch {
        // Storage unavailable
      }
    }
    return 'dark';
  });

  const handleToggleTheme = React.useCallback((next: Theme) => {
    setTheme(next);
    if (typeof document !== 'undefined') {
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    try {
      localStorage.setItem('ks_theme', next);
    } catch {
      // Storage unavailable
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#ECEEF2] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-100 transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <EducationSection />
        <ContactSection />
      </main>
    </div>
  );
}
