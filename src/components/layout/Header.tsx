"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Language, Profile, Category } from "@/lib/types";
import { getTranslator } from "@/i18n/translations";
import ThemeToggle from "@/components/theme/ThemeToggle";
import LanguagePicker from "@/components/i18n/LanguagePicker";
import Dropdown, { DropdownItem } from "@/components/ui/Dropdown";
import Sidebar from "./Sidebar";
import { Menu } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';

const MAX_VISIBLE_CATEGORIES = 2;

export default function Header({
  lang,
  languages,
  profile,
  categories,
}: {
  lang: string;
  languages: Language[];
  profile: Profile | null;
  categories: Category[];
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const t = getTranslator(lang);

  const tf = (record: Record<string, unknown>, field: string): string => {
    const val = record[`${field}_${lang}`];
    return typeof val === "string" ? val : "";
  };

  const siteName = profile ? tf(profile, "full_name") : "Portfolio";

  const visibleCategories = categories.slice(0, MAX_VISIBLE_CATEGORIES);
  const overflowCategories = categories.slice(MAX_VISIBLE_CATEGORIES);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Site name */}
            <Link
              href={`/${lang}`}
              className="text-lg font-semibold tracking-tight hover:text-accent transition-colors"
            >
              {siteName}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              <NavLink href={`/${lang}`} label={t("nav.home")} />
              <NavLink
                href={`/${lang}/projects`}
                label={t("nav.projects")}
              />
              {visibleCategories.map((cat) => (
                <NavLink
                  key={cat.id}
                  href={`/${lang}/${cat.slug}`}
                  label={tf(cat, "title")}
                />
              ))}
              {overflowCategories.length > 0 && (
                <Dropdown
                  trigger={
                    <button className="px-3 py-2 rounded-lg text-sm text-text-muted hover:text-text hover:bg-surface-alt transition-colors">
                      {t("nav.more")} <span className="text-xs opacity-50">▼</span>
                    </button>
                  }
                >
                  {overflowCategories.map((cat) => (
                    <DropdownItem
                      key={cat.id}
                      onClick={() => router.push(`/${lang}/${cat.slug}`)}
                      icon={cat.icon ? <Icon value={cat.icon} className="w-5 h-5" /> : undefined}
                    >
                      {tf(cat, "title")}
                    </DropdownItem>
                  ))}
                </Dropdown>
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <LanguagePicker lang={lang} languages={languages} />
                <ThemeToggle />
              </div>

              {/* Mobile hamburger */}


              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-surface-alt transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        lang={lang}
        languages={languages}
        categories={categories}
      />
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-lg text-sm text-text-muted hover:text-text hover:bg-surface-alt transition-colors"
    >
      {label}
    </Link>
  );
}
