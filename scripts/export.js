#!/usr/bin/env node
/**
 * Export src CSVs to Mochi + NeuraCache.
 *
 *   npm run export
 *   npm run export -- trio
 */
const fs = require("fs");
const path = require("path");
const os = require("os");
const { execFileSync } = require("child_process");
const { parseCsv, rowsToObjects, objectsToCsv } = require("./lib/csv");
const {
  titleCase,
  composeFront,
  composeBack,
  tagList,
  mochiId,
  ednString,
} = require("./lib/compose");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const MOCHI_DIR = path.join(ROOT, "mochi");
const NEURA_DIR = path.join(ROOT, "neuracache");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function listCsvFiles(filter) {
  const files = [];

  function collect(dir) {
    for (const name of fs.readdirSync(dir)) {
      if (name === "media") continue;
      const full = path.join(dir, name);
      const st = fs.statSync(full);
      if (st.isDirectory()) {
        collect(full);
        continue;
      }
      if (!st.isFile() || !name.endsWith(".csv") || name === "template.csv") {
        continue;
      }
      const rel = path.relative(SRC, full);
      const top = rel.split(path.sep)[0];
      // filter = project folder (e.g. trio) or bare csv name
      if (!filter || top === filter || top === `${filter}.csv`) {
        files.push(full);
      }
    }
  }

  collect(SRC);
  return files;
}

function loadCards(files) {
  const cards = [];
  for (const file of files) {
    const rows = rowsToObjects(parseCsv(fs.readFileSync(file, "utf8")));
    for (const row of rows) {
      const front = composeFront(row);
      const back = composeBack(row);
      if (!front || !back) continue;
      if (!row.id) {
        console.warn(`skip (no id): ${path.relative(ROOT, file)} → ${front}`);
        continue;
      }
      cards.push({
        ...row,
        tags_csv: row.tags || "",
        front,
        back,
        tags: tagList(row),
      });
    }
  }
  return cards;
}

function groupBy(cards, keyFn) {
  const map = new Map();
  for (const c of cards) {
    const key = keyFn(c);
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(c);
  }
  return map;
}

function posKey(n) {
  return String(n).padStart(5, "0");
}

function roman(n) {
  const map = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let x = n;
  let out = "";
  for (const [v, s] of map) {
    while (x >= v) {
      out += s;
      x -= v;
    }
  }
  return out || String(n);
}

function csvGroup(c) {
  const raw = String(c.tags_csv || "").trim();
  return raw ? raw.split(/[|,]/)[0].trim() : "general";
}

function buildMochiEdn(deckName, cards) {
  // Nest cards inside each deck (official sample / working exporters).
  // Include :name so cards appear in Mochi's list UI.
  const parentId = mochiId(`deck${deckName}`);
  const bySub = groupBy(cards, (c) => c.subdeck || "general");
  const deckBlocks = [
    `{:name ${ednString(titleCase(deckName))}\n  :id :${parentId}}`,
  ];

  let subIdx = 0;
  for (const [sub, subCards] of bySub) {
    subIdx++;
    const childId = mochiId(`deck${deckName}${sub}`);
    const cardForms = subCards.map((c, i) => {
      const content = `${c.front}\n---\n${c.back}`;
      // Match working exporters: nest under deck, set :name for list UI
      return (
        `{:id :${mochiId(c.id)}\n` +
        `    :name ${ednString(c.front)}\n` +
        `    :pos ${ednString(posKey(i + 1))}\n` +
        `    :content ${ednString(content)}}`
      );
    });

    deckBlocks.push(
      `{:name ${ednString(titleCase(sub))}\n` +
        `  :id :${childId}\n` +
        `  :parent-id :${parentId}\n` +
        `  :cards [${cardForms.join("\n          ")}]}`
    );
  }

  return `{:version 2\n :decks [${deckBlocks.join("\n        ")}]}\n`;
}

function writeMochi(deckName, cards) {
  ensureDir(MOCHI_DIR);
  const edn = buildMochiEdn(deckName, cards);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "flashbox-mochi-"));
  const ednPath = path.join(tmp, "data.edn");
  fs.writeFileSync(ednPath, edn, "utf8");

  const out = path.join(MOCHI_DIR, `${deckName}.mochi`);
  if (fs.existsSync(out)) fs.unlinkSync(out);
  execFileSync("zip", ["-j", "-q", out, ednPath]);
  fs.rmSync(tmp, { recursive: true, force: true });

  fs.writeFileSync(
    path.join(MOCHI_DIR, `${deckName}.md`),
    buildNeuraMarkdown(deckName, cards, {
      heading: `${titleCase(deckName)} — Mochi mirror`,
    }),
    "utf8"
  );

  return out;
}

/**
 * NeuraCache "two-sided" cards keep a rich multi-line front:
 *
 *   #flashcard #tag
 *   <front>
 *   - - -
 *   <back>
 *   - - -
 *
 * Card content uses `———` (em dashes) so it never looks like a `- - -` rule.
 */
function buildNeuraMarkdown(deckName, cards, opts = {}) {
  const lines = [
    `# ${opts.heading || titleCase(deckName)}`,
    "",
    "Import this `.md` (or the whole `neuracache` folder) into NeuraCache.",
    "",
    "Two-sided cards: English on the front, Spanish + Turkish on the back.",
    "",
  ];

  const bySub = groupBy(cards, (c) => c.subdeck || "general");
  let section = 0;
  for (const [sub, subCards] of bySub) {
    section++;
    lines.push(`## ${roman(section)}. ${titleCase(sub)}`, "");

    const byGroup = groupBy(subCards, csvGroup);
    for (const [group, groupCards] of byGroup) {
      if (byGroup.size > 1) {
        lines.push(`### ${titleCase(group)}`, "");
      }
      for (const c of groupCards) {
        const hashTags = ["#flashcard", ...c.tags.map((t) => `#${t}`)].join(" ");
        lines.push(hashTags, "", c.front, "", "- - -", "", c.back, "", "- - -", "");
      }
    }
  }

  return lines.join("\n");
}

function writeNeura(deckName, cards) {
  ensureDir(NEURA_DIR);
  const mdPath = path.join(NEURA_DIR, `${deckName}.md`);
  fs.writeFileSync(mdPath, buildNeuraMarkdown(deckName, cards), "utf8");

  const csvPath = path.join(NEURA_DIR, `${deckName}.csv`);
  fs.writeFileSync(
    csvPath,
    objectsToCsv(
      cards.map((c) => ({
        Question: c.front,
        Content: c.back,
        Tags: c.tags.join(" "),
        id: c.id,
      })),
      ["Question", "Content", "Tags", "id"]
    ),
    "utf8"
  );

  return { mdPath, csvPath };
}

function main() {
  const filter = process.argv[2] || null;
  const files = listCsvFiles(filter);
  if (!files.length) {
    console.error("No CSV files found under src/");
    process.exit(1);
  }

  const cards = loadCards(files);
  console.log(`Loaded ${cards.length} cards from ${files.length} file(s)`);

  for (const [deckName, deckCards] of groupBy(cards, (c) => c.deck || "flashbox")) {
    const mochiOut = writeMochi(deckName, deckCards);
    const neura = writeNeura(deckName, deckCards);
    console.log(`  ${deckName}: ${deckCards.length} cards`);
    console.log(`    Mochi      → ${path.relative(ROOT, mochiOut)}`);
    console.log(`    NeuraCache → ${path.relative(ROOT, neura.mdPath)}`);
    console.log(`                 ${path.relative(ROOT, neura.csvPath)}`);
  }

  for (const dir of [MOCHI_DIR, NEURA_DIR]) {
    const keep = path.join(dir, ".gitkeep");
    if (fs.existsSync(keep) && fs.readdirSync(dir).some((f) => f !== ".gitkeep")) {
      fs.unlinkSync(keep);
    }
  }
}

main();
