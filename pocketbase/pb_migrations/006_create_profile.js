migrate((app) => {
  const collection = new Collection({
    type: "base",
    name: "profile",
    listRule: "",
    viewRule: "",
    createRule: null,
    updateRule: null,
    deleteRule: null,
    fields: [
      { type: "file", name: "avatar", maxSelect: 1, maxSize: 5242880 },
      { type: "email", name: "email" },
      { type: "text", name: "phone", max: 20 },
      { type: "file", name: "resume", maxSelect: 1, maxSize: 10485760 },
      { type: "text", name: "full_name_en", required: true, max: 200 },
      { type: "text", name: "full_name_fr", required: true, max: 200 },
      { type: "text", name: "headline_en", max: 500 },
      { type: "text", name: "headline_fr", max: 500 },
      { type: "editor", name: "bio_en" },
      { type: "editor", name: "bio_fr" },
    ],
  });
  app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("profile");
  app.delete(collection);
});
