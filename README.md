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
| Mochi | Verbs | `mochi/verbs.mochi` |

The sibling `.md` files are readable mirrors of the same decks — handy for diffs, not for import.

## Babbel

Cards from the Babbel app in a plain English → Spanish format (`en` / `es` only). See [`src/babbel/NOTES.md`](src/babbel/NOTES.md).

## Verbs

Spanish verb conjugations, one verb + tense per card: the front names the verb and tense (in Spanish, e.g. `presente de indicativo`), the back lists the form for all six persons. Subdecks group by mood's short name (`indicativo`, `subjuntivo`). See [`src/verbs/NOTES.md`](src/verbs/NOTES.md).

## Ideas

1. API enrichment & validation of translations
2. No-code flow to add cards without editing the repo
3. Pictures, pronunciations, and other media on export
