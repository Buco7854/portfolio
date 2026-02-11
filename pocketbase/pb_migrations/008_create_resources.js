migrate((app) => {
  const collection = new Collection({
    type: "base",
    name: "resources",
    listRule: "",
    viewRule: "",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      { type: "text", name: "title_en", required: true, max: 300 },
      { type: "text", name: "title_fr", required: true, max: 300 },
      { type: "select", name: "type", required: true, values: ["document", "image", "video", "link", "code"], maxSelect: 1 },
      { type: "file", name: "file", maxSelect: 1, maxSize: 52428800 },
      { type: "url", name: "url" },
      { type: "relation", name: "lang", collectionId: app.findCollectionByNameOrId("languages").id, cascadeDelete: false, maxSelect: 1 },
      { type: "relation", name: "project", collectionId: app.findCollectionByNameOrId("projects").id, cascadeDelete: false, maxSelect: 1 },
      { type: "relation", name: "item", collectionId: app.findCollectionByNameOrId("items").id, cascadeDelete: false, maxSelect: 1 },
    ],
  });
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("resources");
  app.delete(collection);
});
