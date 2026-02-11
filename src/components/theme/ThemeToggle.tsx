"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Dropdown, { DropdownItem } from "@/components/ui/Dropdown";
import { Icon } from "@/components/ui/Icon";

type Theme = "light" | "dark" | "system";

const themes: { id: Theme; label: string; icon: string }[] = [
  { id: "light", label: "Light", icon: "lucide:sun" },
  { id: "dark", label: "Dark", icon: "lucide:moon" },
  { id: "system", label: "System", icon: "lucide:laptop" },
];

export default function ThemeToggle({
  direction = "down",
}: {
  direction?: "up" | "down";
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const currentTheme = (mounted ? theme : "system") as Theme;
  const currentOption =
    themes.find((t) => t.id === currentTheme) || themes[2];

  return (
    <Dropdown
      direction={direction}
      trigger={
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-alt transition-colors border border-transparent hover:border-border h-10"
          aria-label="Toggle theme"
          title={`Theme: ${currentOption.label}`}
        >
          <span className="w-5 flex items-center justify-center text-lg leading-none">
            <Icon value={currentOption.icon} className="w-5 h-5" />
          </span>
          <span className="text-xs opacity-50">▼</span>
        </button>
      }
    >
      {themes.map((t) => (
        <DropdownItem
          key={t.id}
          onClick={() => setTheme(t.id)}
          isActive={currentTheme === t.id}
          icon={<Icon value={t.icon} className="w-5 h-5" />}
        >
          {t.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
