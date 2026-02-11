"use client";

import { useState } from "react";
import type { Item, Resource } from "@/lib/types";
import RichText from "@/components/ui/RichText";
import ResourceList from "@/components/ui/ResourceList";
import { Icon } from "@/components/ui/Icon";
import { ChevronDown } from "lucide-react";

export default function ItemCard({
  item,
  resources,
  lang,
}: {
  item: Item;
  resources: Resource[];
  lang: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const title = (item[`title_${lang}`] as string) || item.title_en;
  const description = (item[`description_${lang}`] as string) || "";
  const filteredResources = resources.filter((r) => {
    if (!r.lang) return true;
    const code = r.expand?.lang?.code;
    return !code || code === lang;
  });
  const hasContent = !!description || filteredResources.length > 0;

  return (
    <div className="rounded-xl border border-border overflow-hidden hover:border-accent/40 transition-colors">
      <div
        className={`p-5 ${hasContent ? "cursor-pointer" : ""}`}
        onClick={() => hasContent && setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-lg">{title}</h3>
          {hasContent && (
            <button
              className="shrink-0 mt-1 text-text-muted hover:text-text transition-colors"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* Truncated preview when collapsed */}
        {!expanded && description && (
          <div className="mt-2 text-sm text-text-muted line-clamp-2">
            <RichText html={description} />
          </div>
        )}

        {/* Resource count badge */}
        {!expanded && filteredResources.length > 0 && (
          <div className="mt-3">
            <span className="inline-flex items-center gap-1 text-xs text-text-muted bg-surface-alt px-2 py-1 rounded-full">
              <Icon value="lucide:paperclip" className="w-4 h-4" /> {filteredResources.length}
            </span>
          </div>
        )}
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-border pt-4 space-y-4">
          {description && <RichText html={description} />}
          {filteredResources.length > 0 && (
            <ResourceList resources={resources} lang={lang} />
          )}
        </div>
      )}
    </div>
  );
}
