import { getPb } from "./pocketbase";
import type {
  Language,
  Skill,
  Social,
  Category,
  Project,
  Profile,
  Settings,
  Item,
  Resource,
} from "./types";

// Languages (default language first)
export async function getLanguages(): Promise<Language[]> {
  try {
    return await getPb().collection("languages").getFullList<Language>({
      sort: "-is_default",
    });
  } catch {
    return [];
  }
}

// Skills
export async function getSkills(): Promise<Skill[]> {
  try {
    return await getPb().collection("skills").getFullList<Skill>();
  } catch {
    return [];
  }
}

// Socials
export async function getSocials(): Promise<Social[]> {
  try {
    return await getPb().collection("socials").getFullList<Social>();
  } catch {
    return [];
  }
}

// Categories
export async function getCategories(): Promise<Category[]> {
  try {
    return await getPb().collection("categories").getFullList<Category>({
      sort: "order",
    });
  } catch {
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category> {
  return getPb()
    .collection("categories")
    .getFirstListItem<Category>(`slug="${slug}"`);
}

// Profile
export async function getProfile(): Promise<Profile | null> {
  try {
    const records = await getPb().collection("profile").getFullList<Profile>();
    return records[0] ?? null;
  } catch {
    return null;
  }
}

// Settings
export async function getSettings(): Promise<Settings | null> {
  try {
    const records = await getPb().collection("settings").getFullList<Settings>();
    return records[0] ?? null;
  } catch {
    return null;
  }
}

// Projects
export async function getProjects(
  opts: { published?: boolean; featured?: boolean } = {}
): Promise<Project[]> {
  try {
    const filters: string[] = [];
    if (opts.published !== undefined) filters.push(`published=${opts.published}`);
    if (opts.featured !== undefined) filters.push(`featured=${opts.featured}`);

    return await getPb().collection("projects").getFullList<Project>({
      filter: filters.join(" && ") || undefined,
      expand: "technologies",
      sort: "-created",
    });
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  return getPb()
    .collection("projects")
    .getFirstListItem<Project>(`slug="${slug}"`, {
      expand: "technologies",
    });
}

// Items
export async function getItemsByCategory(categoryId: string): Promise<Item[]> {
  try {
    return await getPb().collection("items").getFullList<Item>({
      filter: `category="${categoryId}"`,
    });
  } catch {
    return [];
  }
}

// Resources
export async function getResourcesByProject(
  projectId: string
): Promise<Resource[]> {
  try {
    return await getPb().collection("resources").getFullList<Resource>({
      filter: `project="${projectId}"`,
      expand: "lang",
    });
  } catch {
    return [];
  }
}

export async function getResourcesByItem(itemId: string): Promise<Resource[]> {
  try {
    return await getPb().collection("resources").getFullList<Resource>({
      filter: `item="${itemId}"`,
      expand: "lang",
    });
  } catch {
    return [];
  }
}
