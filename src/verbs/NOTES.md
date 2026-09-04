# Verbs — data notes

Spanish verb conjugations. One card per verb per tense: the front names the verb and the tense, the back lists the form for all six persons at once.

## Fields

`id`, `deck`, `subdeck`, `front`, `back`.

- **`id`** — one nanoid per card. Never change it once the card is imported. Fill blanks with `npm run id:fill -- src/verbs/<file>.csv`.
- **`deck`** — `verbs` for every row.
- **`subdeck`** — the tense, in Spanish (`presente de indicativo`, `pretérito indefinido`, `pretérito perfecto`, `imperativo`). One subdeck per file, matching the tense name that also appears on the card's `front`.
- **`front`** — the infinitive, then the tense name on its own line. No formatting. Quoted in the CSV (it's two lines).
- **`back`** — the six conjugated forms, one per line, no labels. Quoted in the CSV.

## Front

Two plain lines, no Markdown: the infinitive, then the tense name in Spanish. If the verb is irregular in this tense, append `*` right after the tense name, same line:

```text
hablar
presente de indicativo
```

```text
tener
presente de indicativo*
```

## Back

Six plain lines, no pronoun labels, no dashes — just the conjugated form, in person order (`yo`, `tú`, `él/ella/usted`, `nosotros`, `vosotros`, `ellos/ellas/ustedes`), one line per person even though the line itself doesn't say which:

```text
hablo
hablas
habla
hablamos
habláis
hablan
```

No example sentences — this deck drills the form, not usage. Sentence-level practice belongs elsewhere.

### Imperativo exception

Imperative mood has no `yo` form and often differs between affirmative and negative. Still six lines, same person order, but:

- **line 1 (`yo`)** — `—` (a plain em dash, no form exists)
- **lines 2–6** — affirmative and negative on the same line, separated by ` - `: `habla - no hables`

```text
—
habla - no hables
hable - no hable
hablemos - no hablemos
hablad - no habléis
hablen - no hablen
```

## Style

- **One verb + tense per card.** A new tense is a new card, not a bigger back.
- **Six lines always**, same person order, every card.
- **Plain forms only** — no formatting, no pronouns, no dashes, no accents dropped.

## Intro card

Each file's first row is a front-only card explaining the tense: no back. Plain text, short — the name, when it's used, and the general conjugation rule, nothing more:

```text
Presente de indicativo

Used for actions happening now, habits, or general facts. Regular verbs drop the infinitive ending and add: -o, -as, -a, -amos, -áis, -an (-ar); -o, -es, -e, -emos, -éis, -en (-er); -o, -es, -e, -imos, -ís, -en (-ir).
```

`back` is left empty for this row only — `npm run export` keeps front-only cards instead of skipping them.

## Files

One flat CSV per tense, no subfolders:

```text
src/verbs/presente_indicativo.csv
```

## Export

`front` is the front, `back` is the back. `npm run export -- verbs` writes `mochi/verbs.mochi` plus a readable `mochi/verbs.md` mirror.
