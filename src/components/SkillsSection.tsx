import {Cloud, Code2, Cpu, Database, Layout, Server} from 'lucide-react';
import {SKILL_GROUPS, type SkillGroup} from '@/src/data/portfolio';
import {Card, CardContent, CardHeader, CardTitle} from '@/src/components/ui/card';

function renderCategoryIcon(iconKey: SkillGroup['iconKey']) {
  const iconClass = 'h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0';
  switch (iconKey) {
    case 'code':
      return <Code2 className={iconClass} aria-hidden="true" />;
    case 'layout':
      return <Layout className={iconClass} aria-hidden="true" />;
    case 'server':
      return <Server className={iconClass} aria-hidden="true" />;
    case 'database':
      return <Database className={iconClass} aria-hidden="true" />;
    case 'cloud':
      return <Cloud className={iconClass} aria-hidden="true" />;
    case 'cpu':
      return <Cpu className={iconClass} aria-hidden="true" />;
  }
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-t border-zinc-400/75 dark:border-zinc-800/80 py-10 sm:py-14"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2
            id="skills-heading"
            className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group) => (
            <Card key={group.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2.5">
                  {renderCategoryIcon(group.iconKey)}
                  <CardTitle className="text-base">{group.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {group.items.join(' · ')}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
