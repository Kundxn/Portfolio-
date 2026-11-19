import {EXPERIENCES} from '@/src/data/portfolio';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-zinc-400/75 dark:border-zinc-800/80 py-10 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2
            id="experience-heading"
            className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Experience
          </h2>
        </div>

        <ol className="divide-y divide-zinc-400/75 dark:divide-zinc-800/80 border-t border-zinc-400/75 dark:border-zinc-800/80">
          {EXPERIENCES.map((exp) => (
            <li
              key={exp.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-8"
            >
              <div className="md:col-span-4 space-y-1.5">
                <p className="font-mono text-sm tabular-nums text-blue-600 dark:text-blue-400">
                  {exp.period}
                </p>
                <p className="font-display text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {exp.company}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{exp.location}</p>
              </div>

              <div className="md:col-span-8">
                <h3 className="font-display text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {exp.role}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {exp.highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1 w-3 shrink-0 bg-blue-600 dark:bg-blue-500"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
