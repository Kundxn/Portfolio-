import * as React from 'react';
import {ArrowDownRight, Github, Linkedin, Mail, Terminal} from 'lucide-react';
import {motion, useReducedMotion} from 'motion/react';
import {PROFILE} from '@/src/data/portfolio';

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [imageError, setImageError] = React.useState(false);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 pb-10 sm:pt-8 sm:pb-14"
    >
      {/* Utility Sub-Bar: Location metadata */}
      <div className="mb-8 sm:mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-400/75 dark:border-zinc-800/80 pb-4">
        <p className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
          {PROFILE.location}
        </p>
      </div>

      {/* Split Hero: Editorial Typographic Lead + Matching-Height Studio Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, y: 12}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
          className="lg:col-span-7 flex flex-col justify-between py-1"
        >
          <div>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
              B.E. Computer Science &amp; Engineering (Cloud Computing)
            </p>

            <h1
              id="hero-heading"
              className="mt-4 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.08] text-zinc-900 dark:text-zinc-50 text-balance"
            >
              {PROFILE.name}
            </h1>

            <p className="mt-3 font-display text-xl sm:text-2xl font-medium tracking-tight text-zinc-700 dark:text-zinc-300 text-balance">
              {PROFILE.headline}
            </p>

            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {PROFILE.pitch}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
            >
              <span>View Projects</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>

            <div className="flex items-center gap-2.5">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kundan Singh on GitHub"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-400/75 dark:border-zinc-800 bg-white dark:bg-[#111114] shadow-sm dark:shadow-none text-zinc-700 dark:text-zinc-400 hover:border-zinc-500 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kundan Singh on LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-400/75 dark:border-zinc-800 bg-white dark:bg-[#111114] shadow-sm dark:shadow-none text-zinc-700 dark:text-zinc-400 hover:border-zinc-500 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                aria-label={`Email Kundan Singh at ${PROFILE.email}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-400/75 dark:border-zinc-800 bg-white dark:bg-[#111114] shadow-sm dark:shadow-none text-zinc-700 dark:text-zinc-400 hover:border-zinc-500 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : {opacity: 0, scale: 0.985}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
          className="lg:col-span-5"
        >
          <div className="relative h-72 sm:h-96 lg:h-full min-h-[300px] w-full overflow-hidden rounded-xl border border-zinc-400/75 dark:border-zinc-800 bg-white dark:bg-[#111114] shadow-sm dark:shadow-none">
            {!imageError ? (
              <img
                src={PROFILE.heroImage}
                alt={PROFILE.heroImageAlt}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 text-center text-zinc-400">
                <Terminal className="h-8 w-8 text-blue-500" aria-hidden="true" />
                <p className="font-display text-sm font-medium text-zinc-200">
                  {PROFILE.name} — Full Stack &amp; Cloud Architecture
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
