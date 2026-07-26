# Trio — data notes

How to fill CSV rows for this deck. Keep English structured and predictable so exporters can compose clean cards later.

## General notes

- **Fields in use:** `id`, `deck`, `subdeck`, `en`, `es`, `tr` — nothing else for now. Extra columns are easy to add later; keep the CSV template minimal.
- **`deck` / `subdeck` names** are display labels, not code identifiers — spacing and capitalization are fine (`Numbers 101`, `Phrases A`). Filenames can stay slug-style (`numbers_101.csv`); the exporter will slug tags when needed.
- Prefer **literal translations** when they still make sense. Match the source wording closely instead of substituting a natural but looser equivalent. Example: Spanish *con permiso* → English *with your permission* (not *excuse me*). If a freer gloss helps a learner, put it on an extra explanatory line — don’t replace the literal match.
- For **verb conjugations**, keep the English headword as a simple example sentence/fragment — not a stack of parenthetical roles. Prefer `you are (pl)` over `to be (you) (plural)`. Use the smallest label you need (`(pl)`, `(formal)`, …) only when English alone is ambiguous.
- **Exports:** English (`en`) is the **front** of the card. The **back** is Spanish (`es`) first, then Turkish (`tr`), separated by a dashed line with an empty line before and after the separator:

  ```text
  <spanish>

  ---

  <turkish>
  ```
- **Verbs** are a special category — dedicated notes for how we handle them will come later. For now, don’t treat them like regular vocabulary rows.
- **Phrases** go in dedicated subdecks (`Phrases A`, …), not mixed into word lists. Keep vocabulary CSVs to simple words.
- **Wiktionary:** only for **single-word** lemmas (after dropping a Spanish article if present). Skip the link for phrases, multi-word expressions, and hyphenated compounds (`twenty-one`, `fin de semana`, …) — those pages are unreliable or missing. Append `#English` on `en` links and `#Spanish` on `es` links so the page jumps straight to that language section (anchors are capitalized).

## English (`en`)

When adding a new word, put the English content in **`en`** using this line layout (real newlines inside the CSV cell, quoted):

1. **Line 1** — the word only. No type, no parentheses, no extra gloss.
2. **Line 2** — empty.
3. **Line 3** — part of speech: `noun`, `verb`, `adjective`, `adverb`, `phrase`, …
4. **Further lines** (optional, one idea per line, only when useful):
   - A very short dictionary-style meaning
   - Inflection if irregular: plural for nouns (`phenomenon → phenomena`), or past / participle for verbs (`run → ran → run`)
   - One example sentence if something is special about usage
   - Synonyms, antonyms, or common phrases that help a new learner
5. **One empty line** after the explanatory block (even if there were no explanatory lines) — **only when** a Wiktionary link follows.
6. **Last line (single-word entries only)** — Wiktionary link for this word. **Omit** for phrases and multi-word heads.

Light **Markdown** is fine on those explanatory lines (not on line 1): `*italic*`, `**bold**`, `` `code` ``, and simple arrows like `→`. Keep it sparse — formatting should clarify, not decorate.

For the Wiktionary line: if the app renders Markdown links, prefer a short label:

```text
[Wiktionary](https://en.wiktionary.org/wiki/day#English)
```

Otherwise the bare URL is fine:

```text
https://en.wiktionary.org/wiki/day#English
```

Use the English Wiktionary entry that matches the headword on line 1 (`https://en.wiktionary.org/wiki/<word>#English`).

Do **not** put Spanish or Turkish in `en`. Those stay in `es` / `tr`.

### Examples

**Simple noun**

```text
day

noun

[Wiktionary](https://en.wiktionary.org/wiki/day#English)
```

**Noun with plural + short meaning**

```text
phenomenon

noun
an observable event or fact
phenomenon → phenomena

[Wiktionary](https://en.wiktionary.org/wiki/phenomenon#English)
```

**Irregular verb**

```text
run

verb
to move quickly on foot
run → ran → run
*She runs every morning.*
**synonym:** jog · **antonym:** walk

[Wiktionary](https://en.wiktionary.org/wiki/run#English)
```

**Adjective with learner tips**

```text
big

adjective
large in size
**synonym:** large, huge · **antonym:** small, little
**phrase:** a big deal

[Wiktionary](https://en.wiktionary.org/wiki/big#English)
```

**Phrase (no Wiktionary)**

```text
How are you?

phrase
```

## Spanish (`es`)

When adding Spanish content in **`es`**, use this line layout (real newlines inside the CSV cell, quoted):

1. **Line 1** — the Spanish form(s) with article and gender where they apply. No type, no parentheses, no extra gloss.
   - Nouns: include the article; show both genders when both exist (`el hermano, la hermana`). One-gender nouns stay singular with their article (`el día`, `la casa`).
   - Adjectives: show masculine and feminine forms when they differ (`hermoso, hermosa`). No article.
   - Verbs: infinitive only (`correr`). No article.
   - Phrases: the phrase as spoken (`¿Cómo estás?`). No article.
2. **Line 2** — empty.
3. **Line 3** — part of speech: `noun`, `verb`, `adjective`, `adverb`, `phrase`, …
4. **Further lines** (optional, one idea per line, only when useful):
   - A very short dictionary-style meaning (in English is fine — this is a learner aid, not a second translation column)
   - Inflection if irregular: plural for nouns (`el lápiz → los lápices`), or key conjugations / past participle for verbs when irregular (`ir → voy / fui / ido`)
   - One example sentence if something is special about usage
   - Synonyms, antonyms, or common phrases that help a new learner
5. **One empty line** after the explanatory block (even if there were no explanatory lines) — **only when** a Wiktionary link follows.
6. **Last line (single-word lemmas only)** — Wiktionary link. **Omit** for phrases and multi-word heads (ignore a leading *el/la/los/las* when judging “single word”).

Light **Markdown** is fine on those explanatory lines (not on line 1): `*italic*`, `**bold**`, `` `code` ``, and simple arrows like `→`. Keep it sparse — formatting should clarify, not decorate.

For the Wiktionary line: if the app renders Markdown links, prefer a short label:

```text
[Wiktionary](https://en.wiktionary.org/wiki/hermano#Spanish)
```

Otherwise the bare URL is fine:

```text
https://en.wiktionary.org/wiki/hermano#Spanish
```

Use the English Wiktionary entry for the Spanish lemma (`https://en.wiktionary.org/wiki/<word>#Spanish`). For gendered pairs, link the masculine lemma.

Do **not** put English or Turkish in `es`. Those stay in `en` / `tr`.

### Examples

**Gendered noun pair**

```text
el hermano, la hermana

noun

[Wiktionary](https://en.wiktionary.org/wiki/hermano#Spanish)
```

**One-gender noun with plural tip**

```text
el lápiz

noun
pencil
el lápiz → los lápices

[Wiktionary](https://en.wiktionary.org/wiki/lápiz#Spanish)
```

**Adjective (masc / fem)**

```text
hermoso, hermosa

adjective
beautiful
**synonym:** bello, bonito · **antonym:** feo

[Wiktionary](https://en.wiktionary.org/wiki/hermoso#Spanish)
```

**Irregular verb**

```text
ir

verb
to go
ir → voy / fui / ido
*Voy a la escuela.*

[Wiktionary](https://en.wiktionary.org/wiki/ir#Spanish)
```

**Phrase (no Wiktionary)**

```text
¿Cómo estás?

phrase
```

## Turkish (`tr`)

Put **only the Turkish translation** in **`tr`**. One line, the gloss itself — no article/gender layout, no part of speech, no extra tips, no Wiktionary link.

Do **not** put English or Spanish in `tr`. Those stay in `en` / `es`.
