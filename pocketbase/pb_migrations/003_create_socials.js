migrate((app) => {
  const collection = new Collection({
    type: "base",
    name: "socials",
    listRule: "",
    viewRule: "",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      { type: "text", name: "name", required: true, max: 100 },
      { type: "text", name: "icon", max: 8000 },
      { type: "url", name: "url", required: true },
    ],
  });
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("socials");
  app.delete(collection);
});
