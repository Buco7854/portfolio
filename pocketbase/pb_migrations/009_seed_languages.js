migrate((app) => {
  const collection = app.findCollectionByNameOrId("languages");

  const en = new Record(collection);
  en.set("code", "en");
  en.set("name", "English");
  en.set("flag", "🇬🇧");
  en.set("is_default", true);
  app.save(en);

  const fr = new Record(collection);
  fr.set("code", "fr");
  fr.set("name", "Français");
  fr.set("flag", "🇫🇷");
  fr.set("is_default", false);
  app.save(fr);
}, (app) => {
  const collection = app.findCollectionByNameOrId("languages");
  const en = app.findFirstRecordByFilter(collection, 'code="en"');
  if (en) app.delete(en);
  const fr = app.findFirstRecordByFilter(collection, 'code="fr"');
  if (fr) app.delete(fr);
});
