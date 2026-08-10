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

| App | Deck | File |
|-----|------|------|
| Mochi | Babbel | `mochi/babbel.mochi` |
| Mochi | Grammar | `mochi/grammar.mochi` |

The sibling `.md` files are readable mirrors of the same decks — handy for diffs, not for import.

## Babbel

Cards from the Babbel app in a plain English → Spanish format (`en` / `es` only). See [`src/babbel/NOTES.md`](src/babbel/NOTES.md).

## Grammar

Spanish grammar points, one rule per card: a question on the front, a short rule plus examples on the back (`front` / `back`). See [`src/grammar/NOTES.md`](src/grammar/NOTES.md).

## Ideas

1. API enrichment & validation of translations
2. No-code flow to add cards without editing the repo
3. Pictures, pronunciations, and other media on export
