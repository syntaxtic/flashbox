/** Compose front/back from general or trio CSV rows. */

function titleCase(s) {
  return String(s || "")
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function slug(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function composeFront(row) {
  if (row.en != null && String(row.en).trim() !== "") {
    return String(row.en).trim();
  }
  return String(row.front || "").trim();
}

function composeBack(row) {
  const es = String(row.es || "").trim();
  const tr = String(row.tr || "").trim();
  if (es || tr) {
    // Em dashes — not `---` — so we don't collide with Mochi side breaks
    // or NeuraCache card separators.
    return [es, "", "———", "", tr].join("\n");
  }
  return String(row.back || "").trim();
}

function tagList(row) {
  const tags = new Set();
  // NeuraCache organizes via tags; deck name is redundant there — subdeck only.
  if (row.subdeck) tags.add(slug(row.subdeck));
  // CSV `tags` / pos / kind / level are kept in source for later; not exported yet.
  return [...tags].filter(Boolean);
}

/** Mochi keyword ids: alphanumeric only, ≥8 chars. */
function mochiId(raw) {
  let id = String(raw || "").replace(/[^0-9A-Za-z]/g, "");
  if (id.length < 8) id = (id + "xxxxxxxx").slice(0, 8);
  return id;
}

function ednString(s) {
  return (
    '"' +
    String(s)
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t") +
    '"'
  );
}

module.exports = {
  titleCase,
  slug,
  composeFront,
  composeBack,
  tagList,
  mochiId,
  ednString,
};
