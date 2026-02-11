migrate((app) => {
  const collection = app.findCollectionByNameOrId("settings");
  const record = new Record(collection);
  record.set("accent_color", "#c45c5c");
  app.save(record);
}, (app) => {
  // No rollback needed for seed data
});
