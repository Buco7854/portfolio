import type { Skill } from "@/lib/types";
import { getTranslator } from "@/i18n/translations";
import { Icon } from "@/components/ui/Icon";

export default function SkillsGrid({
  skills,
  lang,
}: {
  skills: Skill[];
  lang: string;
}) {
  const t = getTranslator(lang);

  if (skills.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">
          {t("skills.title")}
        </h2>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => {
            const name =
              (skill[`name_${lang}`] as string) || skill.name_en;
            return (
              <span
                key={skill.id}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-alt border border-border text-sm font-medium hover:border-accent/40 hover:bg-accent-subtle transition-colors"
              >
                {skill.icon && <Icon value={skill.icon} className="w-4 h-4" />}
                {name}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
