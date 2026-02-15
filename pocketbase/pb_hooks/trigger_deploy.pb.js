/// <reference path="../pb_data/types.d.ts" />

// Triggers a GitHub Actions rebuild when any content changes in PocketBase.
//
// Requires environment variables:
//   GITHUB_TOKEN   - GitHub personal access token (fine-grained, repo scope)
//   GITHUB_REPO    - e.g. "Buco7854/portfolio-static-generator"

onRecordAfterCreateSuccess(function(e) {
  var collection = e.record.collection().name;
  var label = e.record.get("title_en")
    || e.record.get("title_fr")
    || e.record.get("name")
    || e.record.get("name_en")
    || e.record.get("full_name_en")
    || e.record.get("slug")
    || "";
  var msg = label ? "add " + collection + " '" + label + "'" : "add " + collection;

  var token = $os.getenv("GITHUB_TOKEN");
  var repo = $os.getenv("GITHUB_REPO");
  if (token && repo) {
    try {
      $http.send({
        url: "https://api.github.com/repos/" + repo + "/dispatches",
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token,
          "Accept": "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          event_type: "pocketbase-update",
          client_payload: { commit_message: msg },
        }),
      });
    } catch (err) {
      console.log("[deploy] Error: " + err);
    }
  }
  e.next();
}, "profile", "projects", "skills", "socials", "categories", "items", "resources", "settings", "languages");

onRecordAfterUpdateSuccess(function(e) {
  var collection = e.record.collection().name;
  var label = e.record.get("title_en")
    || e.record.get("title_fr")
    || e.record.get("name")
    || e.record.get("name_en")
    || e.record.get("full_name_en")
    || e.record.get("slug")
    || "";
  var msg = label ? "update " + collection + " '" + label + "'" : "update " + collection;

  var token = $os.getenv("GITHUB_TOKEN");
  var repo = $os.getenv("GITHUB_REPO");
  if (token && repo) {
    try {
      $http.send({
        url: "https://api.github.com/repos/" + repo + "/dispatches",
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token,
          "Accept": "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          event_type: "pocketbase-update",
          client_payload: { commit_message: msg },
        }),
      });
    } catch (err) {
      console.log("[deploy] Error: " + err);
    }
  }
  e.next();
}, "profile", "projects", "skills", "socials", "categories", "items", "resources", "settings", "languages");

onRecordAfterDeleteSuccess(function(e) {
  var collection = e.record.collection().name;
  var label = e.record.get("title_en")
    || e.record.get("title_fr")
    || e.record.get("name")
    || e.record.get("name_en")
    || e.record.get("full_name_en")
    || e.record.get("slug")
    || "";
  var msg = label ? "remove " + collection + " '" + label + "'" : "remove " + collection;

  var token = $os.getenv("GITHUB_TOKEN");
  var repo = $os.getenv("GITHUB_REPO");
  if (token && repo) {
    try {
      $http.send({
        url: "https://api.github.com/repos/" + repo + "/dispatches",
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token,
          "Accept": "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          event_type: "pocketbase-update",
          client_payload: { commit_message: msg },
        }),
      });
    } catch (err) {
      console.log("[deploy] Error: " + err);
    }
  }
  e.next();
}, "profile", "projects", "skills", "socials", "categories", "items", "resources", "settings", "languages");
