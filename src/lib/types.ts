export interface PBRecord {
  id: string;
  collectionId: string;
  collectionName: string;
}

export interface Language extends PBRecord {
  code: string;
  name: string;
  flag: string;
  is_default: boolean;
}

export interface Skill extends PBRecord {
  name_en: string;
  name_fr: string;
  icon: string;
  [key: string]: unknown;
}

export interface Social extends PBRecord {
  name: string;
  icon: string;
  url: string;
}

export interface Category extends PBRecord {
  slug: string;
  icon: string;
  order: number;
  title_en: string;
  title_fr: string;
  [key: string]: unknown;
}

export interface Project extends PBRecord {
  slug: string;
  thumbnail: string;
  hero_image: string;
  demo_url: string;
  repo_url: string;
  technologies: string[];
  featured: boolean;
  published: boolean;
  title_en: string;
  title_fr: string;
  tagline_en: string;
  tagline_fr: string;
  description_en: string;
  description_fr: string;
  created: string;
  updated: string;
  expand?: {
    technologies?: Skill[];
  };
  [key: string]: unknown;
}

export interface Profile extends PBRecord {
  avatar: string;
  email: string;
  phone: string;
  resume: string;
  full_name_en: string;
  full_name_fr: string;
  headline_en: string;
  headline_fr: string;
  bio_en: string;
  bio_fr: string;
  [key: string]: unknown;
}

export interface Item extends PBRecord {
  category: string;
  title_en: string;
  title_fr: string;
  description_en: string;
  description_fr: string;
  created: string;
  updated: string;
  [key: string]: unknown;
}

export interface Settings extends PBRecord {
  accent_color: string;
}

export interface Resource extends PBRecord {
  title_en: string;
  title_fr: string;
  type: "document" | "image" | "video" | "link" | "code";
  file: string;
  url: string;
  lang: string; // relation ID to languages (empty = all languages)
  project: string; // relation ID to projects
  item: string; // relation ID to items
  expand?: {
    lang?: Language;
  };
  [key: string]: unknown;
}
