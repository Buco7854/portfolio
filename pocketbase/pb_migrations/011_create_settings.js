migrate((app) => {
  const collection = new Collection({
    type: "base",
    name: "settings",
    listRule: "",
    viewRule: "",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      { type: "text", name: "accent_color", max: 7 },
    ],
  });
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("settings");
  app.delete(collection);
});
