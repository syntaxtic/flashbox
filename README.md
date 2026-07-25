# Flashbox

General-purpose flashcards for **any topic** (languages, history, science, coding, trivia, definitions, formulas…), with exports for **Mochi** and **NeuraCache**.

## Layout

```
src/                 # source of truth
  template.csv       # general (non-language) CSV schema
  media/             # optional card images / audio (named by id)
  trio-lingua/       # Spanish learning deck (EN / ES / TR)
    template.csv     # trilingual schema
    calendar.csv     # days, months, seasons, …
    nature.csv       # animals, plants, fruits, vegetables
    grammar.csv      # articles, pronouns, ser / estar
    numbers.csv      # cardinals, ordinals
    descriptions.csv # colors, common adjectives
    food.csv         # meals, drinks, restaurant, ordering
    travel.csv       # travel, transportation, places
    countries.csv    # countries, nationalities, languages
    phrases.csv      # everyday expressions
    weather.csv      # weather words and expressions

mochi/               # Mochi import files (generated)
neuracache/          # NeuraCache import files (generated)
```

Keep **`src/**/*.csv`** as the master. Regenerate `mochi/` and `neuracache/` from CSV when data changes — don't hand-edit app exports as the long-term source.

## CSV schema (general)

| Column | Required | Purpose |
|--------|----------|---------|
| `id` | yes | Stable id from **nanoid** (e.g. `V1StGXR8_Z5j` or `hist_V1StGXR8_Z5j`) — never hand-number |
| `deck` | yes | Top-level deck / category → deck / tag |
| `subdeck` | no | Nested deck / subcategory |
| `front` | yes | Card front (prompt / question / term) |
| `back` | yes | Card back (answer / definition) |
| `kind` | yes | `qa` \| `term` \| `definition` \| `concept` \| `fact` \| `formula` \| `phrase` \| `cloze` \| `category` |
| `tags` | no | Extra tags beyond the deck |
| `level` | no | Difficulty / grade (`easy`, `A2`, `101`, …) |
| `hint` | no | Optional hint shown with the prompt |
| `example` | no | Example / context / usage |
| `notes` | no | Extra explanation, mnemonics, caveats |
| `image` | no | Relative path under `src/media/` |
| `audio` | no | Relative path/URL for audio |
| `source` | no | Reference / citation |

Copy `src/template.csv` when starting a non-language deck.

## Trio Lingua schema (EN / ES / TR)

Languages live in **separate columns**. Exporters compose `front` / `back` at export time.

| Column | Required | Purpose |
|--------|----------|---------|
| `id` | yes | Stable nanoid (`cal_…`) |
| `deck` | yes | Always `trio-lingua` |
| `subdeck` | yes | e.g. `calendar` |
| `en` | yes | English prompt |
| `es` | yes | Spanish (include article for nouns: `el día`) |
| `tr` | yes | Turkish |
| `pos` | no | Part of speech: `noun`, `adverb`, `phrase`, … |
| `kind` | yes | `term` \| `phrase` \| … |
| + shared optionals | no | `tags`, `level`, `hint`, `example`, `notes`, `image`, `audio`, `source` |

One CSV per subdeck, named after it (`calendar.csv`, `nature.csv`). Copy `src/trio-lingua/template.csv` to start a new one.

**Export shape (planned):** front = `en *(pos)*` · back = `es` + blank line + `tr` (and later reverse-direction cards).

## Card ids (nanoid)

Ids are generated with [nanoid](https://github.com/ai/nanoid) — short, URL-safe, collision-resistant. Do not invent sequential numbers by hand.

```bash
npm run id                 # one id
npm run id -- 5            # five ids
npm run id -- 3 hist       # hist_<nanoid> × 3
npm run id:fill -- src/foo.csv   # fill blank id cells in place
```

Paste generated ids into the `id` column, or leave `id` blank while drafting and run `id:fill` before export. Once a card is imported into Mochi/NeuraCache, **never change its id**.

### `kind` values

- `qa` — question / answer
- `term` / `definition` — vocabulary or glossary
- `concept` / `fact` — general knowledge
- `formula` — math / science formulas
- `phrase` — expressions, idioms, language phrases
- `cloze` — fill-in-the-blank (put the gap on `front`)
- `category` — a title/section row rendered as a heading card

## Why CSV (not Markdown) as the source

- Columns stay explicit; empty fields stay empty
- Easy bulk edits in Sheets / Excel
- Reliable to parse and convert
- App formats (Mochi / NeuraCache markdown) are **outputs**, not the archive format

## Media

Both apps support pictures (and Mochi supports attachments).

```
src/media/
  hist-0002.jpg
  bio-0044.png
```

**Conventions**

- Name files by card `id` so links survive regenerating exports
- Prefer JPG / PNG / WebP; keep files small for phones
- Add media only where it helps
- Keep media in git while the repo stays small; otherwise store elsewhere and wire paths at export time

**How exports should look**

| App | Form |
|-----|------|
| NeuraCache | `![](media/hist-0002.jpg)` in the card; import the **folder** so images travel with the `.md` |
| Mochi | Same markdown image + file packed into the `.mochi` zip |

## Mochi

Import: `mochi/trio-lingua.mochi` (native zip with `data.edn`).

- Parent deck: **Trio Lingua**
- Nested decks per `subdeck` (Calendar, Nature, Grammar, …)
- Cards: `front` / `---` / `back` (markdown)
- Stable ids derived from CSV `id` (alphanumeric form for Mochi)

Also writes `mochi/trio-lingua.md` as a readable mirror for diffs — import the `.mochi` file into the app.

Docs: [Mochi import / export format](https://mochi.cards/docs/import-and-export/mochi-format-reference/)

## NeuraCache

Import: `neuracache/trio-lingua.md` (preferred) or `neuracache/trio-lingua.csv` (iOS CSV import).

- Multi-line cards (so Spanish + Turkish stay readable):
  ```
  front #flashcard #trio-lingua #calendar …
  
  es
  
  tr
  
  ---
  ```
- Tags from `deck` + `subdeck` only (`#trio-lingua #calendar`). CSV `tags` / `pos` / `kind` stay in source for later.
- CSV columns for re-import: `Question`, `Content`, `Tags`, `id`

Docs: [NeuraCache howto](https://neuracache.com/howto) · [Markdown flashcards](https://neuracache.com/markdown-flashcards)

## Typical workflow

1. Edit or add rows in `src/trio-lingua/*.csv` (or start from `template.csv`)
2. Optionally drop media into `src/media/` named by `id`
3. Regenerate exports:

```bash
npm run export
```

4. Import:
   - **Mochi:** `mochi/trio-lingua.mochi`
   - **NeuraCache:** `neuracache/trio-lingua.md` (or the folder); iOS can also use `neuracache/trio-lingua.csv`
5. Commit when you're happy

**Card shape on export:** front = `en *(pos)*` · back = `es` + blank line + `tr` (notes appended in italic when present).

## Conversion map

| CSV | → Mochi | → NeuraCache |
|-----|---------|--------------|
| `deck` / `subdeck` | nested deck | `#tags` group |
| `front` / `back` (general) | `front\n---\nback` | `front : back #flashcard` |
| `en` / `es` / `tr` / `pos` (trio-lingua) | composed front/back at export | same |
| `id` | card id | `id` column / stable identity |
| `kind=category` | title card in deck | title flashcard in tag group |
| `image` | attachment in `.mochi` | local markdown image |
| `tags` / `level` / `example` | optional (not exported as tags yet) | optional (not exported as tags yet) |

## Ideas / improvements

Future directions for this repo (not scheduled — just a backlog):

1. **API enrichment & validation** — use dictionary / translation APIs to check and improve EN / ES / TR, catch gender/article mistakes, and suggest related words or examples.
2. **No-code add flow** — a simple way to add cards without editing the repo by hand (form, Sheets sync, or CLI prompt that writes CSV + runs `id:fill` / `export`).
3. **Media enrichment** — attach pictures, audio pronunciations, and other media via the existing `image` / `audio` columns and pack them into Mochi / NeuraCache exports.

