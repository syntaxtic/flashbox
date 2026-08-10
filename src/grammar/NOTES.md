# Grammar — data notes

Spanish grammar points. The front names what's being asked; the back answers it. Backs are small blocks of text, not single lines — grammar doesn't fit the plain word-pair shape used by [`src/babbel`](../babbel/NOTES.md).

Two card shapes are in use:

- **Set card** — the front names a closed set (all subject pronouns, all reflexive pronouns), the back lists every member with one example each.
- **Slice card** — the same grid cut the other way: the front names one person (`1sg`), the back pairs each category with that person's form. Set and slice cards cover the same material from both directions, which is the point — recall by category *and* by person.
- **Rule card** — the front asks about a single rule or contrast, the back states it in one line plus an example or two.

## Fields

`id`, `deck`, `subdeck`, `front`, `back`.

- **`id`** — one nanoid per card. Never change it once the card is imported. Fill blanks with `npm run id:fill -- src/grammar/<file>.csv`.
- **`deck`** — `grammar` for every row.
- **`subdeck`** — the grammar area, in Spanish (`los pronombres`). Display label, so spacing and capitalization are fine; filenames stay slug-style (`los_pronombres.csv`).
- **`front`** — title line, blank line, one-line description. Quoted in the CSV.
- **`back`** — the answer block. Multiple lines, quoted in the CSV.

## Front

1. **Line 1** — the title, in bold. A qualifier in plain parentheses when it matters: `**Possessive Adjectives** (before a noun)`.
2. **Line 2** — empty.
3. **Line 3** — one line saying what the card holds. Lowercase, no final period.

```text
**Personal Pronouns** (Subject)

all subject pronouns (shown with *hablar* — to speak)
```

Say what the card is *about*. When examples lean on some incidental verb, mention it in passing so it doesn't read as the point of the card.

## Back

**Set card** — one bullet per member, the member in bold, the example in italics, separated by an em dash:

```text
- **yo** — *Yo hablo.*
- **tú** — *Tú hablas.*
```

**Slice card** — one bullet per category, the category in bold, that person's form plain. Short labels (`Poss. adj.`, not `Possessive adjectives`) so the column of forms stays scannable:

```text
- **Subject** — él / ella / usted
- **Poss. adj.** — su
```

**Rule card** — the rule on line 1, a blank line, then one example per line:

```text
ser — permanent traits, identity, origin

Ella es alta.
Yo soy de Turquía.
```

A caveat that applies to the whole set goes at the end, after a blank line, flagged with ⚠️:

```text
⚠️ le/les → **se** before lo/la/los/las:
*Se lo doy.* (not ~~le lo~~)
```

Light **Markdown** throughout (`*italic*`, `**bold**`, `→`, `~~strikethrough~~`) — enough to make the shape scannable, no more.

## Style

- **One set or one rule per card.** A rule card that needs "but also…" is two cards.
- **English for the rule, Spanish for the examples.** Don't mix the two in a line.
- **One example per member**, short enough to read at a glance.
- **Real examples**, ideally ones you've met in a lesson — not invented sentences nobody would say.

## Files

One flat CSV per grammar area, no subfolders:

```text
src/grammar/los_pronombres.csv
```

## Export

`front` is the front, `back` is the back. `npm run export -- grammar` writes `mochi/grammar.mochi` plus a readable `mochi/grammar.md` mirror.
