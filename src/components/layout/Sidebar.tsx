"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { Language, Category } from "@/lib/types";
import { getTranslator } from "@/i18n/translations";
import ThemeToggle from "@/components/theme/ThemeToggle";
import LanguagePicker from "@/components/i18n/LanguagePicker";

export default function Sidebar({
                                  open,
                                  onClose,
                                  lang,
                                  languages,
                                  categories,
                                }: {
  open: boolean;
  onClose: () => void;
  lang: string;
  languages: Language[];
  categories: Category[];
}) {
  const t = getTranslator(lang);

  const tf = (record: Record<string, unknown>, field: string): string => {
    const val = record[`${field}_${lang}`];
    return typeof val === "string" ? val : "";
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
      <>
        {/* Backdrop */}
        {open && (
            <div
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
                onClick={onClose}
            />
        )}

        {/* Panel */}
        <div
            className={`fixed top-0 right-0 z-50 h-full w-72 bg-surface border-l border-border shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
                open ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full">
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-surface-alt transition-colors"
                  aria-label="Close menu"
              >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
              <SidebarLink
                  href={`/${lang}`}
                  label={t("nav.home")}
                  onClick={onClose}
              />
              <SidebarLink
                  href={`/${lang}/projects`}
                  label={t("nav.projects")}
                  onClick={onClose}
              />
              {categories.length > 0 && (
                  <div className="pt-4 pb-2">
                    <div className="text-xs font-medium text-text-muted uppercase tracking-wider px-3">
                      Categories
                    </div>
                  </div>
              )}
              {categories.map((cat) => (
                  <SidebarLink
                      key={cat.id}
                      href={`/${lang}/${cat.slug}`}
                      label={tf(cat, "title")}
                      onClick={onClose}
                      iconName={cat.icon}
                  />
              ))}
            </nav>

            {/* Bottom controls */}
            <div className="p-4 border-t border-border flex items-center justify-between gap-2">
              {/* Force direction="up" because we are at the bottom of the screen */}
              <LanguagePicker lang={lang} languages={languages} direction="up" />
              <ThemeToggle direction="up" />
            </div>
          </div>
        </div>
      </>
  );
}

import { Icon } from "@/components/ui/Icon";

// ... (rest of the file)

function SidebarLink({
                       href,
                       label,
                       onClick,
                       iconName,
                     }: {
  href: string;
  label: string;
  onClick: () => void;
  iconName?: string;
}) {
  return (
      <Link
          href={href}
          onClick={onClick}
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-text-muted hover:text-text hover:bg-surface-alt transition-colors"
      >
        {iconName && <Icon value={iconName} className="w-5 h-5" />}
        {label}
      </Link>
  );
}