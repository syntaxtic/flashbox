# Babbel — data notes

Cards collected from the Babbel app. Deliberately simple: **English front, Spanish back**, nothing else.

## Fields

`id`, `deck`, `subdeck`, `en`, `es` — that's the whole template. No `tr`, no part-of-speech block, no Wiktionary links. If a card needs the richer layout, it belongs in [`src/trio`](../trio/NOTES.md) instead.

- **`id`** — one nanoid per card. Never change it once the card is imported.
- **`deck`** — `babbel` for every row, so the whole source exports as one Mochi deck.
- **`subdeck`** — the Babbel course section (`newcomer 306`).
- **`en`** — the English side, one line. The word or phrase only.
- **`es`** — the Spanish side, one line. As Babbel gives it, including article and punctuation (`el pan`, `¿Cómo estás?`).

## Style

- Keep both sides to a **single line**. No explanatory block, no examples, no Markdown.
- Copy Babbel's wording rather than "improving" it — the point is to review what the app actually taught. Its inline hints stay too (`(lit. …)`, `(sg., informal)`, the infinitive after a conjugated sentence).
- Nouns keep their article on the Spanish side (`la casa`). Show both genders only if Babbel does.
- One card per Babbel item.

## Files

One flat CSV per course section, no `data/` or `media/` folders:

```text
src/babbel/newcomer_306.csv
```

## Export

English (`en`) is the front, Spanish (`es`) is the back. `npm run export -- babbel` writes `mochi/babbel.mochi` plus a readable `mochi/babbel.md` mirror.
