migrate((app) => {
  const collection = new Collection({
    type: "base",
    name: "languages",
    listRule: "",
    viewRule: "",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      { type: "text", name: "code", required: true, max: 5 },
      { type: "text", name: "name", required: true, max: 100 },
      { type: "text", name: "flag", max: 50 },
      { type: "bool", name: "is_default" },
    ],
  });
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("languages");
  app.delete(collection);
});
