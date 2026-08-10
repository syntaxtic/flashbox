#!/usr/bin/env node
/**
 * Generate stable card ids with nanoid.
 *
 *   npm run id                 → 1 id
 *   npm run id -- 5            → 5 ids
 *   npm run id -- 3 hist       → 3 ids: hist_…
 *   npm run id:fill -- src/x.csv  → fill blank id cells (in place)
 */
const fs = require("fs");
const { nanoid } = require("nanoid");
const { parseCsv, objectsToCsv } = require("./lib/csv");

const args = process.argv.slice(2);

function makeId(prefix) {
  const id = nanoid(12);
  return prefix ? `${prefix}_${id}` : id;
}

function fillCsv(file) {
  if (!file || !fs.existsSync(file)) {
    console.error("Usage: npm run id:fill -- <path-to.csv>");
    process.exit(1);
  }

  const rows = parseCsv(fs.readFileSync(file, "utf8"));
  const header = (rows[0] || []).map((h) => h.trim());
  const idCol = header.indexOf("id");
  if (idCol === -1) {
    console.error("No `id` column found in header.");
    process.exit(1);
  }

  let filled = 0;
  const objects = rows.slice(1).map((cols) => {
    const obj = {};
    for (let i = 0; i < header.length; i++) obj[header[i]] = cols[i] ?? "";
    if (!String(obj.id).trim()) {
      obj.id = makeId();
      filled++;
    }
    return obj;
  });

  fs.writeFileSync(file, objectsToCsv(objects, header));
  console.log(`Filled ${filled} blank id(s) in ${file}`);
}

if (args[0] === "fill") {
  fillCsv(args[1]);
  process.exit(0);
}

const count = Math.max(1, parseInt(args[0], 10) || 1);
const prefixArg = Number.isFinite(parseInt(args[0], 10)) ? args[1] : args[0];
const prefix =
  prefixArg && !/^\d+$/.test(prefixArg) ? prefixArg : undefined;

for (let i = 0; i < count; i++) {
  console.log(makeId(prefix));
}
