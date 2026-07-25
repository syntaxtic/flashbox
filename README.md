# Flashbox

General-purpose flashcards for **any topic** (languages, history, science, coding, trivia, definitions, formulas…), with exports for **Mochi** and **NeuraCache**.

## Layout

```
src/                 # source of truth
  template.csv       # empty CSV schema (copy this to start a deck)
  media/             # optional card images / audio (named by id)

mochi/               # Mochi import files (generated)
neuracache/          # NeuraCache import files (generated)
```

Keep **`src/*.csv`** as the master. Regenerate `mochi/` and `neuracache/` from CSV when data changes — don't hand-edit app exports as the long-term source.

## CSV schema

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

Copy `src/template.csv` when starting a new deck. Use one CSV per subject (e.g. `src/history.csv`, `src/biology.csv`) or keep everything in one file and split by `deck`.

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

Import: `mochi/*.mochi` (native zip with `data.edn`).

- Parent deck per subject
- Nested decks per `deck` / `subdeck`
- Cards: `front` / `---` / `back`
- `kind=category` rows included as title cards

Docs: [Mochi import / export format](https://mochi.cards/docs/import-and-export/mochi-format-reference/)

## NeuraCache

Import: `neuracache/*.md` (preferred) or `neuracache/*.csv` (iOS CSV import).

- One-line cards: `front : back #flashcard`
- `#tags` groups per `deck`
- `kind=category` rows included as title cards

Docs: [NeuraCache howto](https://neuracache.com/howto) · [Markdown flashcards](https://neuracache.com/markdown-flashcards)

## Typical workflow

1. Copy `src/template.csv` → `src/<subject>.csv` and add rows
2. Optionally drop media into `src/media/` named by `id`
3. Regenerate Mochi + NeuraCache exports from the CSV
4. Import the new files into each app
5. Commit when you're happy

## Conversion map

| CSV | → Mochi | → NeuraCache |
|-----|---------|--------------|
| `deck` / `subdeck` | nested deck | `#tags` group |
| `front` / `back` | `front\n---\nback` | `front : back #flashcard` |
| `id` | card id | `id` column / stable identity |
| `kind=category` | title card in deck | title flashcard in tag group |
| `image` | attachment in `.mochi` | local markdown image |
| `tags` / `level` / `example` | optional card body or fields | optional tags / extra lines |
