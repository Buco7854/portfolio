import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getItemsByCategory,
  getResourcesByItem,
} from "@/lib/api";
import { getTranslator } from "@/i18n/translations";
import type { Resource } from "@/lib/types";
import ItemCard from "@/components/cards/ItemCard";
import { Icon } from "@/components/ui/Icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; categorySlug: string }>;
}): Promise<Metadata> {
  const { lang, categorySlug } = await params;

  let category;
  try {
    category = await getCategoryBySlug(categorySlug);
  } catch {
    return {};
  }

  const title = (category[`title_${lang}`] as string) || category.title_en;

  return {
    title,
    openGraph: {
      title,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
    },
  };
}

// Disambiguate from /[lang]/projects by checking if the slug is a known category
async function isCategorySlug(slug: string): Promise<boolean> {
  try {
    await getCategoryBySlug(slug);
    return true;
  } catch {
    return false;
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; categorySlug: string }>;
}) {
  const { lang, categorySlug } = await params;
  const t = getTranslator(lang);

  // Validate this is actually a category slug
  if (!(await isCategorySlug(categorySlug))) {
    notFound();
  }

  const category = await getCategoryBySlug(categorySlug);
  const items = await getItemsByCategory(category.id);

  // Fetch resources for all items
  const itemResourcesMap = new Map<string, Resource[]>();
  await Promise.all(
    items.map(async (item) => {
      const resources = await getResourcesByItem(item.id);
      itemResourcesMap.set(item.id, resources);
    })
  );

  const title = (category[`title_${lang}`] as string) || category.title_en;

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          {category.icon && (
            <Icon value={category.icon} className="w-8 h-8 text-text" />
          )}
          <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
        </div>

        {items.length === 0 ? (
          <p className="text-text-muted">{t("category.noItems")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                resources={itemResourcesMap.get(item.id) ?? []}
                lang={lang}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
