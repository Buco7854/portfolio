import Link from "next/link";
import type { Project } from "@/lib/types";
import { getTranslator } from "@/i18n/translations";
import ProjectCard from "@/components/cards/ProjectCard";

export default function FeaturedProjects({
  projects,
  lang,
}: {
  projects: Project[];
  lang: string;
}) {
  const t = getTranslator(lang);

  if (projects.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {t("projects.featured")}
          </h2>
          <Link
            href={`/${lang}/projects`}
            className="text-sm text-accent hover:text-accent-hover transition-colors font-medium"
          >
            {t("projects.viewAll")} &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
