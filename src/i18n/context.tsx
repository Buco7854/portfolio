"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Language } from "@/lib/types";
import { getTranslator } from "./translations";

interface I18nContextValue {
  lang: string;
  languages: Language[];
  t: (key: string) => string;
  tf: <T extends Record<string, unknown>>(record: T, field: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  lang,
  languages,
  children,
}: {
  lang: string;
  languages: Language[];
  children: ReactNode;
}) {
  const t = getTranslator(lang);

  // Translate a field on a PB record: tf(project, "title") → project.title_en
  const tf = <T extends Record<string, unknown>>(
    record: T,
    field: string
  ): string => {
    const key = `${field}_${lang}`;
    const value = record[key];
    if (typeof value === "string") return value;
    return "";
  };

  return (
    <I18nContext.Provider value={{ lang, languages, t, tf }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
