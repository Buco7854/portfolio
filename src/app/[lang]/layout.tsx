import { notFound } from "next/navigation";
import { getLanguages, getProfile, getCategories, getSocials } from "@/lib/api";
import { I18nProvider } from "@/i18n/context";
import { getTranslator } from "@/i18n/translations";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const languages = await getLanguages();

  // No languages configured → show error
  if (languages.length === 0) {
    const t = getTranslator("en");
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠</div>
          <p className="text-text-muted text-lg">{t("error.noLanguages")}</p>
        </div>
      </div>
    );
  }

  // Invalid lang → 404
  const validLang = languages.find((l) => l.code === lang);
  if (!validLang) notFound();

  const [profile, categories, socials] = await Promise.all([
    getProfile(),
    getCategories(),
    getSocials(),
  ]);

  return (
    <I18nProvider lang={lang} languages={languages}>
      <div className="min-h-screen flex flex-col">
        <Header
          lang={lang}
          languages={languages}
          profile={profile}
          categories={categories}
        />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} socials={socials} profile={profile} />
      </div>
    </I18nProvider>
  );
}
