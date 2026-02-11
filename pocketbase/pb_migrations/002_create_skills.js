migrate((app) => {
  const collection = new Collection({
    type: "base",
    name: "skills",
    listRule: "",
    viewRule: "",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      { type: "text", name: "name_en", required: true, max: 100 },
      { type: "text", name: "name_fr", required: true, max: 100 },
      { type: "text", name: "icon", max: 8000 },
    ],
  });
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("skills");
  app.delete(collection);
});
