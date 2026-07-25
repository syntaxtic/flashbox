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

  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  const header = (lines[0] || "").split(",");
  const idCol = header.indexOf("id");
  if (idCol === -1) {
    console.error("No `id` column found in header.");
    process.exit(1);
  }

  let filled = 0;
  const out = lines.map((line, i) => {
    if (i === 0 || line.trim() === "") return line;
    const cols = line.split(",");
    while (cols.length < header.length) cols.push("");
    if (!String(cols[idCol] || "").trim()) {
      cols[idCol] = makeId();
      filled++;
    }
    return cols.join(",");
  });

  fs.writeFileSync(file, out.join("\n"));
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
