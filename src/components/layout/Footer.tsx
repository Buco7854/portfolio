import type { Social, Profile } from "@/lib/types";
import { getTranslator } from "@/i18n/translations";
import { Icon } from "@/components/ui/Icon";

export default function Footer({
  lang,
  socials,
  profile,
}: {
  lang: string;
  socials: Social[];
  profile: Profile | null;
}) {
  const t = getTranslator(lang);
  const name = profile
    ? (profile[`full_name_${lang}` as keyof Profile] as string) || profile.full_name_en
    : "Portfolio";

  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social links */}
          {socials.length > 0 && (
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-text-muted hover:text-accent hover:bg-surface-alt transition-colors"
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

          {/* Copyright */}
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} {name}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
