import { readFile } from "node:fs/promises";

const raw = await readFile(new URL("../appwrite-config.js", import.meta.url), "utf8");
const get = (key) => {
  const match = raw.match(new RegExp(key + ':\\s*"([^"]+)"'));
  if (!match) throw new Error("Missing Appwrite config key: " + key);
  return match[1];
};
const endpoint = get("endpoint").replace(/\/$/, "");
const projectId = get("projectId");
const databaseId = get("databaseId");
const tableId = get("tableId");
const origin = "https://itdaynamic96-hub.github.io";
const url = new URL(endpoint + "/tablesdb/" + encodeURIComponent(databaseId) + "/tables/" + encodeURIComponent(tableId) + "/rows");
url.searchParams.append("queries[]", "limit(1)");
try {
  const response = await fetch(url, {
    headers: { "X-Appwrite-Project": projectId, "Origin": origin }
  });
  const allowOrigin = response.headers.get("access-control-allow-origin");
  let rowCount = "unknown";
  if (response.ok) {
    const body = await response.json();
    rowCount = Array.isArray(body.rows) ? body.rows.length : "unknown";
    console.log("Appwrite public TablesDB API reachable: HTTP " + response.status + "; sample rows returned: " + rowCount);
  } else {
    const rawDetail = await response.text();
    const detail = rawDetail.replace(/<style[\\s\\S]*?<\\/style>/gi, " ").replace(/<script[\\s\\S]*?<\\/script>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\\s+/g, " ").trim().slice(-700);
    console.warn("Appwrite public TablesDB API returned HTTP " + response.status + ": " + detail);
  }
  if (allowOrigin === origin || allowOrigin === "*") {
    console.log("Appwrite CORS response includes the GitHub Pages origin.");
  } else {
    console.warn("Appwrite CORS origin was not confirmed in this non-browser check. Ensure the Web Platform hostname is registered: itdaynamic96-hub.github.io");
  }
} catch (error) {
  console.warn("Appwrite API smoke check could not complete: " + error.message);
}
