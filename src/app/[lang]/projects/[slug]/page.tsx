import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getResourcesByProject } from "@/lib/api";
import { getFileUrl } from "@/lib/pocketbase";
import { getTranslator } from "@/i18n/translations";
import type { Skill } from "@/lib/types";
import RichText from "@/components/ui/RichText";
import ResourceList from "@/components/ui/ResourceList";
import { Icon } from "@/components/ui/Icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  let project;
  try {
    project = await getProjectBySlug(slug);
  } catch {
    return { title: "Not Found" };
  }

  const title = (project[`title_${lang}`] as string) || project.title_en;
  const tagline = (project[`tagline_${lang}`] as string) || project.tagline_en || "";
  const description = tagline || title;

  const images: { url: string; alt: string }[] = [];
  if (project.thumbnail) {
    images.push({
      url: getFileUrl(project, project.thumbnail),
      alt: title,
    });
  } else if (project.hero_image) {
    images.push({
      url: getFileUrl(project, project.hero_image),
      alt: title,
    });
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      ...(images.length > 0 && { images }),
    },
    twitter: {
      card: images.length > 0 ? "summary_large_image" : "summary",
      title,
      description,
      ...(images.length > 0 && { images: images.map((i) => i.url) }),
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const t = getTranslator(lang);

  let project;
  try {
    project = await getProjectBySlug(slug);
  } catch {
    notFound();
  }

  const resources = await getResourcesByProject(project.id);

  const title = (project[`title_${lang}`] as string) || project.title_en;
  const tagline = (project[`tagline_${lang}`] as string) || "";
  const description = (project[`description_${lang}`] as string) || "";
  const technologies = project.expand?.technologies ?? [];

  return (
    <article>
      {/* Hero image */}
      {project.hero_image && (
        <div className="relative w-full aspect-[21/9] max-h-[400px] bg-surface-alt overflow-hidden">
          <Image
            src={getFileUrl(project, project.hero_image)}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          href={`/${lang}/projects`}
          className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-accent transition-colors mb-8"
        >
          &larr; {t("projects.all")}
        </Link>

        {/* Title + tagline */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h1>
        {tagline && (
          <p className="text-lg text-text-muted mb-6">{tagline}</p>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-medium hover:bg-accent-hover transition-colors"
            >
              {t("projects.demo")}
            </a>
          )}
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-text hover:border-accent hover:text-accent transition-colors"
            >
              {t("projects.repo")}
            </a>
          )}
        </div>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
              {t("projects.technologies")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {technologies.map((skill: Skill) => {
                const skillName =
                  (skill[`name_${lang}`] as string) || skill.name_en;
                return (
                  <span
                    key={skill.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-alt border border-border text-sm"
                  >
                    {skill.icon && <Icon value={skill.icon} className="w-4 h-4 text-text-muted" />}
                    {skillName}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="mb-12">
            <RichText html={description} />
          </div>
        )}

        {/* Resources */}
        {resources.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-3">
              {t("resources.title")}
            </h2>
            <ResourceList resources={resources} lang={lang} />
          </div>
        )}
      </div>
    </article>
  );
}
