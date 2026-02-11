migrate((app) => {
  const collection = new Collection({
    type: "base",
    name: "categories",
    listRule: "",
    viewRule: "",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      { type: "text", name: "slug", required: true },
      { type: "text", name: "icon", max: 8000 },
      { type: "number", name: "order" },
      { type: "text", name: "title_en", required: true, max: 200 },
      { type: "text", name: "title_fr", required: true, max: 200 },
    ],
    indexes: [
      "CREATE UNIQUE INDEX idx_categories_slug ON categories (slug)",
    ],
  });
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("categories");
  app.delete(collection);
});
