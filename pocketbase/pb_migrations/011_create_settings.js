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
      { type: "file", name: "favicon", maxSelect: 1, maxSize: 20971520, mimeTypes: ["image/svg+xml", "image/png", "image/jpeg", "image/webp", "image/x-icon", "image/vnd.microsoft.icon"] },
    ],
  });
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("settings");
  app.delete(collection);
});
