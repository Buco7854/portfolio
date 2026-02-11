import type { Metadata } from "next";
import { getProjects, getProfile } from "@/lib/api";
import { getFileUrl } from "@/lib/pocketbase";
import { getTranslator } from "@/i18n/translations";
import ProjectCard from "@/components/cards/ProjectCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = getTranslator(lang);
  const profile = await getProfile();

  const name = (profile?.[`full_name_${lang}`] as string) || profile?.full_name_en || "";
  const title = t("projects.all");
  const description = name ? `${title} – ${name}` : title;

  const images: { url: string; alt: string }[] = [];
  if (profile?.avatar) {
    images.push({ url: getFileUrl(profile, profile.avatar), alt: title });
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      ...(images.length > 0 && { images }),
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslator(lang);
  const projects = await getProjects({ published: true });

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          {t("projects.all")}
        </h1>

        {projects.length === 0 ? (
          <p className="text-text-muted">{t("projects.noProjects")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
