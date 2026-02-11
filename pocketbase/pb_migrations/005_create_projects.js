migrate((app) => {
  const collection = new Collection({
    type: "base",
    name: "projects",
    listRule: "",
    viewRule: "",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      { type: "text", name: "slug", required: true },
      { type: "file", name: "thumbnail", maxSelect: 1, maxSize: 5242880 },
      { type: "file", name: "hero_image", maxSelect: 1, maxSize: 10485760 },
      { type: "url", name: "demo_url" },
      { type: "url", name: "repo_url" },
      { type: "relation", name: "technologies", collectionId: app.findCollectionByNameOrId("skills").id, cascadeDelete: false, maxSelect: 999 },
      { type: "bool", name: "featured" },
      { type: "bool", name: "published" },
      { type: "text", name: "title_en", required: true, max: 300 },
      { type: "text", name: "title_fr", required: true, max: 300 },
      { type: "text", name: "tagline_en", max: 500 },
      { type: "text", name: "tagline_fr", max: 500 },
      { type: "editor", name: "description_en" },
      { type: "editor", name: "description_fr" },
      { type: "autodate", name: "created", onCreate: true, onUpdate: false },
      { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_projects_slug ON projects (slug)",
    ],
  });
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("projects");
  app.delete(collection);
});
