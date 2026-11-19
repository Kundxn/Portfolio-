import {GraduationCap} from 'lucide-react';
import {EDUCATION} from '@/src/data/portfolio';

export function EducationSection() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="border-t border-zinc-400/75 dark:border-zinc-800/80 py-10 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2
            id="education-heading"
            className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Education
          </h2>
        </div>

        <div className="rounded-xl border border-zinc-400/75 dark:border-zinc-800 bg-white dark:bg-[#111114] shadow-sm dark:shadow-none p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
            <div className="md:col-span-4 space-y-1.5">
              <p className="font-mono text-sm tabular-nums text-blue-600 dark:text-blue-400">
                {EDUCATION.period}
              </p>
              <p className="font-display text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {EDUCATION.institution}
              </p>
              <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Punjab, India
              </p>
            </div>

            <div className="md:col-span-8">
              <div className="flex items-start gap-3">
                <GraduationCap
                  className="mt-1 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {EDUCATION.degree} ({EDUCATION.specialization})
                  </h3>
                  <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Relevant Coursework
                  </p>
                  <p className="mt-1.5 font-mono text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {EDUCATION.coursework.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
