migrate((app) => {
  const collection = new Collection({
    type: "base",
    name: "items",
    listRule: "",
    viewRule: "",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      { type: "relation", name: "category", collectionId: app.findCollectionByNameOrId("categories").id, cascadeDelete: false, maxSelect: 1 },
      { type: "text", name: "title_en", required: true, max: 300 },
      { type: "text", name: "title_fr", required: true, max: 300 },
      { type: "editor", name: "description_en" },
      { type: "editor", name: "description_fr" },
      { type: "autodate", name: "created", onCreate: true, onUpdate: false },
      { type: "autodate", name: "updated", onCreate: true, onUpdate: true },
    ],
  });
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("items");
  app.delete(collection);
});
