import type { Resource } from "@/lib/types";
import { getFileUrl } from "@/lib/pocketbase";
import { FileText, Image, Video, Link, Code, Paperclip } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const typeIcons: Record<Resource["type"], LucideIcon> = {
  document: FileText,
  image: Image,
  video: Video,
  link: Link,
  code: Code,
};

export default function ResourceList({
  resources,
  lang,
}: {
  resources: Resource[];
  lang: string;
}) {
  // Show resource if: no lang set (available for all) or lang matches current
  const filtered = resources.filter((r) => {
    if (!r.lang) return true; // no lang = all languages
    const resourceLangCode = r.expand?.lang?.code;
    return !resourceLangCode || resourceLangCode === lang;
  });

  if (filtered.length === 0) return null;

  return (
    <div className="space-y-2">
      {filtered.map((resource) => {
        const title =
          (resource[`title_${lang}`] as string) || resource.title_en;
        const TypeIcon = typeIcons[resource.type] || Paperclip;

        const href = resource.file
          ? getFileUrl(resource, resource.file)
          : resource.url || "#";

        return (
          <a
            key={resource.id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-accent/40 hover:bg-surface-alt transition-all group"
          >
            <TypeIcon className="w-5 h-5 text-text-muted" />
            <span className="flex-1 text-sm font-medium group-hover:text-accent transition-colors">
              {title}
            </span>
            <span className="text-xs text-text-muted uppercase">
              {resource.type}
            </span>
          </a>
        );
      })}
    </div>
  );
}
