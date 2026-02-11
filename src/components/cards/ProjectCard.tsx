import Image from "next/image";
import Link from "next/link";
import type { Project, Skill } from "@/lib/types";
import { getFileUrl } from "@/lib/pocketbase";
import { Icon } from "@/components/ui/Icon";

export default function ProjectCard({
  project,
  lang,
}: {
  project: Project;
  lang: string;
}) {
  const title = (project[`title_${lang}`] as string) || project.title_en;
  const tagline = (project[`tagline_${lang}`] as string) || "";
  const technologies = project.expand?.technologies ?? [];

  return (
    <Link
      href={`/${lang}/projects/${project.slug}`}
      className="group block rounded-xl border border-border overflow-hidden hover:border-accent/40 hover:shadow-lg transition-all duration-300"
    >
      {/* Thumbnail */}
      {project.thumbnail && (
        <div className="relative aspect-video bg-surface-alt overflow-hidden">
          <Image
            src={getFileUrl(project, project.thumbnail)}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-5">
        <h3 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
          {title}
        </h3>

        {tagline && (
          <p className="text-sm text-text-muted mb-3 line-clamp-2">
            {tagline}
          </p>
        )}

        {/* Tech badges */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((skill: Skill) => {
              const skillName =
                (skill[`name_${lang}`] as string) || skill.name_en;
              return (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-alt text-xs text-text-muted"
                >
                  {skill.icon && <Icon value={skill.icon} className="w-3.5 h-3.5" />}
                  {skillName}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </Link>
  );
}
