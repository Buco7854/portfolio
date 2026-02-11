type TranslationMap = Record<string, Record<string, string>>;

const translations: TranslationMap = {
  en: {
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.more": "More",
    "projects.all": "All Projects",
    "projects.featured": "Featured Projects",
    "projects.viewAll": "View all projects",
    "projects.demo": "Live Demo",
    "projects.repo": "Source Code",
    "projects.technologies": "Technologies",
    "projects.noProjects": "No projects yet.",
    "hero.contact": "Contact",
    "hero.resume": "Resume",
    "skills.title": "Skills",
    "resources.title": "Resources",
    "resources.download": "Download",
    "resources.open": "Open",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
    "lang.switch": "Language",
    "error.noLanguages": "No languages configured. Please add at least one language in the admin panel.",
    "error.notFound": "Page not found",
    "category.noItems": "No items in this category yet.",
    "footer.rights": "All rights reserved.",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.projects": "Projets",
    "nav.more": "Plus",
    "projects.all": "Tous les projets",
    "projects.featured": "Projets en vedette",
    "projects.viewAll": "Voir tous les projets",
    "projects.demo": "Démo",
    "projects.repo": "Code source",
    "projects.technologies": "Technologies",
    "projects.noProjects": "Aucun projet pour le moment.",
    "hero.contact": "Contact",
    "hero.resume": "CV",
    "skills.title": "Compétences",
    "resources.title": "Ressources",
    "resources.download": "Télécharger",
    "resources.open": "Ouvrir",
    "theme.light": "Clair",
    "theme.dark": "Sombre",
    "theme.system": "Système",
    "lang.switch": "Langue",
    "error.noLanguages": "Aucune langue configurée. Veuillez ajouter au moins une langue dans le panneau d'administration.",
    "error.notFound": "Page non trouvée",
    "category.noItems": "Aucun élément dans cette catégorie pour le moment.",
    "footer.rights": "Tous droits réservés.",
  },
};

export function getTranslation(lang: string, key: string): string {
  return translations[lang]?.[key] ?? "";
}

export function getTranslator(lang: string) {
  return (key: string) => getTranslation(lang, key);
}
