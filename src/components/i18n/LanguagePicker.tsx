"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Language } from "@/lib/types";
import Dropdown, { DropdownItem } from "@/components/ui/Dropdown";
import { Icon } from "@/components/ui/Icon";

export default function LanguagePicker({
                                           lang,
                                           languages,
                                           direction = "down",
                                       }: {
    lang: string;
    languages: Language[];
    direction?: "up" | "down";
}) {
    const pathname = usePathname();
    const router = useRouter();

    if (languages.length < 2) return null;

    const currentLang = languages.find((l) => l.code === lang) || languages[0];

    function switchLang(newLang: string) {
        const segments = pathname.split("/");
        if (segments.length > 1) {
            segments[1] = newLang;
            router.push(segments.join("/"));
        }
    }

    return (
        <Dropdown
            direction={direction}
            trigger={
                <button
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-alt transition-colors border border-transparent hover:border-border h-10"
                    title="Change language"
                >
          <span className="flex items-center justify-center text-lg leading-none">
            <Icon value={currentLang.flag} className="w-5 h-5 flex items-center justify-center" />
          </span>
                    <span className="text-sm font-medium uppercase">
            {currentLang.code}
          </span>
                    <span className="text-xs opacity-50">▼</span>
                </button>
            }
        >
            {languages.map((l) => (
                <DropdownItem
                    key={l.code}
                    onClick={() => switchLang(l.code)}
                    isActive={l.code === lang}
                    icon={<Icon value={l.flag} className="w-5 h-5 flex items-center justify-center" />}
                >
                    {l.name}
                </DropdownItem>
            ))}
        </Dropdown>
    );
}