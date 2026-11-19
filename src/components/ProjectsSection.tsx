import * as React from 'react';
import {ArrowUpRight, Github, Layers} from 'lucide-react';
import {PROJECTS, type ProjectItem} from '@/src/data/portfolio';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/src/components/ui/card';
import {Button} from '@/src/components/ui/button';
import {Dialog} from '@/src/components/ui/dialog';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);
  const [failedImages, setFailedImages] = React.useState<Record<string, boolean>>({});

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-t border-zinc-400/75 dark:border-zinc-800/80 py-10 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2
              id="projects-heading"
              className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              Projects
            </h2>
          </div>
          <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">
            Production systems engineered for low-latency performance, container isolation, and measurable user growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project) => {
            const imgFailed = Boolean(failedImages[project.id]);
            return (
              <Card key={project.id} className="flex flex-col overflow-hidden">
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-zinc-400/60 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                  {!imgFailed ? (
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({...prev, [project.id]: true}))
                      }
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 text-center text-zinc-400">
                      <Layers className="h-7 w-7 text-blue-500" aria-hidden="true" />
                      <p className="font-display text-sm font-medium text-zinc-200">
                        {project.title}
                      </p>
                    </div>
                  )}
                </div>

                <CardHeader className="pb-4">
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {project.subtitle}
                  </p>
                  <CardTitle className="mt-1 text-xl sm:text-2xl">
                    {project.title}
                  </CardTitle>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  <div className="border-t border-zinc-400/60 dark:border-zinc-800/80 pt-4">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Key Outcomes
                    </p>
                    <p className="mt-1.5 font-mono text-xs sm:text-sm tabular-nums text-zinc-900 dark:text-zinc-100">
                      {project.metrics.join(' · ')}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Stack
                    </p>
                    <p className="mt-1.5 font-mono text-xs text-zinc-600 dark:text-zinc-300">
                      {project.techStack.join(' · ')}
                    </p>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-400/60 dark:border-zinc-800/80 pt-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-zinc-400/80 dark:border-zinc-800 bg-zinc-50 dark:bg-transparent px-4 py-2 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors whitespace-nowrap shrink-0"
                      >
                        <Github className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>GitHub</span>
                      </a>
                    )}
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Architecture Notes</span>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Architecture Deep-Dive Modal */}
      <Dialog
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        title={selectedProject ? `${selectedProject.title} — Architecture` : ''}
        subtitle={selectedProject?.techStack.join(' · ')}
      >
        {selectedProject && (
          <div className="space-y-6">
            <div>
              <h4 className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Engineering Challenge
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {selectedProject.architecture.problem}
              </p>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                System Design &amp; Solution
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {selectedProject.architecture.solution}
              </p>
            </div>

            <div>
              <h4 className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Implementation Highlights
              </h4>
              <ul className="mt-2 space-y-2">
                {selectedProject.architecture.highlights.map((note, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-2.5 shrink-0 bg-blue-600 dark:bg-blue-500"
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-zinc-400/60 dark:border-zinc-800 pt-5">
              <h4 className="font-display text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Layer Breakdown
              </h4>
              <dl className="mt-3 divide-y divide-zinc-400/60 dark:divide-zinc-800/80 border border-zinc-400/60 dark:border-zinc-800 rounded-lg">
                {selectedProject.architecture.stackRoles.map((row) => (
                  <div
                    key={row.layer}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-4 py-3 text-sm"
                  >
                    <dt className="font-medium text-zinc-800 dark:text-zinc-200">
                      {row.layer}
                    </dt>
                    <dd className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
                      {row.technology}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-zinc-400/75 dark:border-zinc-800 px-4 py-2 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>View Source</span>
                </a>
              )}
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
              >
                <span>Open Live Demo</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </Dialog>
    </section>
  );
}
