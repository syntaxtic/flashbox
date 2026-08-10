# Flashbox

Flashcards for any topic, with exports for **Mochi**.

**`src/**/*.csv` is the source of truth.** App files under `mochi/` are generated — don’t hand-edit them as the archive.

## Commands

```bash
npm run id                          # one nanoid
npm run id -- 5                     # five ids
npm run id -- 3 hist                # hist_<nanoid> × 3
npm run id:fill -- path/to.csv      # fill blank id cells
npm run export                      # rebuild Mochi
```

Once a card is imported into an app, **never change its `id`**.

## Import

| App | File |
|-----|------|
| Mochi | `mochi/Trio.mochi` |

`mochi/Trio.md` is a readable mirror of the same deck — handy for diffs, not for import.

## Trio

How to fill `en` / `es` / `tr` (line layout, literal translations, conjugations, …) lives in [`src/trio/NOTES.md`](src/trio/NOTES.md).

## Ideas

1. API enrichment & validation of translations
2. No-code flow to add cards without editing the repo
3. Pictures, pronunciations, and other media on export
