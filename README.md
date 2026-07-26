# Flashbox

Flashcards for any topic, with exports for **Mochi** and **NeuraCache**.

**`src/**/*.csv` is the source of truth.** App files under `mochi/` and `neuracache/` are generated — don’t hand-edit them as the archive.

## Commands

```bash
npm run id                          # one nanoid
npm run id -- 5                     # five ids
npm run id -- 3 hist                # hist_<nanoid> × 3
npm run id:fill -- path/to.csv      # fill blank id cells
npm run export                      # rebuild Mochi + NeuraCache
```

Once a card is imported into an app, **never change its `id`**.

## Import

| App | File |
|-----|------|
| Mochi | `mochi/Trio.mochi` |
| NeuraCache | `neuracache/Trio.md` (or the folder); iOS CSV: `neuracache/Trio.csv` |

NeuraCache uses **tags** (`#trio` + `#subdeck`), not nested decks. Export tags are deck + subdeck only.

## Trio

How to fill `en` / `es` / `tr` (line layout, literal translations, conjugations, …) lives in [`src/trio/NOTES.md`](src/trio/NOTES.md).

## Ideas

1. API enrichment & validation of translations
2. No-code flow to add cards without editing the repo
3. Pictures, pronunciations, and other media on export
