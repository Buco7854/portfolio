import Image from "next/image";
import type { Profile, Social } from "@/lib/types";
import { getFileUrl } from "@/lib/pocketbase";
import { getTranslator } from "@/i18n/translations";
import RichText from "@/components/ui/RichText";
import { Icon } from "@/components/ui/Icon";

export default function Hero({
  profile,
  socials,
  lang,
}: {
  profile: Profile;
  socials: Social[];
  lang: string;
}) {
  const t = getTranslator(lang);
  const fullName =
    (profile[`full_name_${lang}`] as string) || profile.full_name_en;
  const headline =
    (profile[`headline_${lang}`] as string) || "";
  const bio = (profile[`bio_${lang}`] as string) || "";

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Avatar */}
          {profile.avatar && (
            <div className="mb-8">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-4 ring-accent/20 ring-offset-4 ring-offset-surface">
                <Image
                  src={getFileUrl(profile, profile.avatar)}
                  alt={fullName}
                  fill
                  sizes="160px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            {fullName}
          </h1>

          {/* Headline */}
          {headline && (
            <p className="text-lg sm:text-xl text-text-muted max-w-2xl mb-6">
              {headline}
            </p>
          )}

          {/* Bio */}
          {bio && (
            <div className="max-w-2xl text-text-muted mb-8">
              <RichText html={bio} />
            </div>
          )}

          {/* Contact + Resume */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-medium hover:bg-accent-hover transition-colors"
              >
                {t("hero.contact")}
              </a>
            )}
            {profile.resume && (
              <a
                href={getFileUrl(profile, profile.resume)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-text hover:border-accent hover:text-accent transition-colors"
              >
                {t("hero.resume")}
              </a>
            )}
          </div>

          {/* Socials */}
          {socials.length > 0 && (
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full text-text-muted hover:text-accent hover:bg-accent-subtle transition-colors"
                  title={s.name}
                >
                  {s.icon ? (
                    <Icon value={s.icon} className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{s.name}</span>
                  )}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
