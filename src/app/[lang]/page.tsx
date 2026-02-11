import type { Metadata } from "next";
import { getProfile, getSocials, getProjects, getSkills } from "@/lib/api";
import { getFileUrl } from "@/lib/pocketbase";
import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import SkillsGrid from "@/components/sections/SkillsGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const profile = await getProfile();

  const name = (profile?.[`full_name_${lang}`] as string) || profile?.full_name_en || "Portfolio";
  const headline = (profile?.[`headline_${lang}`] as string) || profile?.headline_en || "";
  const title = name;
  const description = headline || `${name}'s portfolio`;

  const images: { url: string; alt: string }[] = [];
  if (profile?.avatar) {
    images.push({
      url: getFileUrl(profile, profile.avatar),
      alt: name,
    });
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
      card: images.length > 0 ? "summary_large_image" : "summary",
      title,
      description,
      ...(images.length > 0 && { images: images.map((i) => i.url) }),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const [profile, socials, featuredProjects, skills] = await Promise.all([
    getProfile(),
    getSocials(),
    getProjects({ published: true, featured: true }),
    getSkills(),
  ]);

  return (
    <>
      {profile && <Hero profile={profile} socials={socials} lang={lang} />}
      <FeaturedProjects projects={featuredProjects} lang={lang} />
      <SkillsGrid skills={skills} lang={lang} />
    </>
  );
}
