import {Award} from 'lucide-react';
import {CERTIFICATIONS} from '@/src/data/portfolio';

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="border-t border-zinc-400/75 dark:border-zinc-800/80 py-10 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2
            id="certifications-heading"
            className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Certifications
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((cert) => (
            <article
              key={cert.id}
              className="flex flex-col justify-between rounded-xl border border-zinc-400/75 dark:border-zinc-800 bg-white dark:bg-[#111114] shadow-sm dark:shadow-none p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {cert.issuer}
                  </span>
                  {cert.credentialCode ? (
                    <span className="font-mono tabular-nums">{cert.credentialCode}</span>
                  ) : (
                    <Award className="h-4 w-4 text-zinc-400 dark:text-zinc-500" aria-hidden="true" />
                  )}
                </div>
                <h3 className="mt-3 font-display text-base font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
                  {cert.title}
                </h3>
              </div>

              <p className="mt-4 border-t border-zinc-400/60 dark:border-zinc-800/80 pt-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                {cert.domain}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
