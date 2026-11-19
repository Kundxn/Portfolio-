import {PROFILE, STATS} from '@/src/data/portfolio';
import {AnimatedCounter} from '@/src/components/AnimatedCounter';

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-zinc-400/75 dark:border-zinc-800/80 py-10 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <h2
              id="about-heading"
              className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              About
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {PROFILE.aboutParagraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className="max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Full-Width 4-Column Impact Metrics Row */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.id}
              className="rounded-xl border border-zinc-400/75 dark:border-zinc-800 bg-white dark:bg-[#111114] shadow-sm dark:shadow-none p-6"
            >
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                <AnimatedCounter
                  target={stat.target}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <p className="mt-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {stat.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
