# Trio Lingua — data notes

How to fill CSV rows for this deck. Keep English structured and predictable so exporters can compose clean cards later.

## General notes

- Prefer **literal translations** when they still make sense. Match the source wording closely instead of substituting a natural but looser equivalent. Example: Spanish *con permiso* → English *with your permission* (not *excuse me*). If a freer gloss helps a learner, put it on an extra explanatory line — don’t replace the literal match.
- For **verb conjugations**, keep the English headword as a simple example sentence/fragment — not a stack of parenthetical roles. Prefer `you are (pl)` over `to be (you) (plural)`. Use the smallest label you need (`(pl)`, `(formal)`, …) only when English alone is ambiguous.

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
5. **One empty line** after the explanatory block (even if there were no explanatory lines).
6. **Last line** — Wiktionary link for this word.

Light **Markdown** is fine on those explanatory lines (not on line 1): `*italic*`, `**bold**`, `` `code` ``, and simple arrows like `→`. Keep it sparse — formatting should clarify, not decorate.

For the Wiktionary line: if the app renders Markdown links, prefer a short label:

```text
[Wiktionary](https://en.wiktionary.org/wiki/day)
```

Otherwise the bare URL is fine:

```text
https://en.wiktionary.org/wiki/day
```

Use the English Wiktionary entry that matches the headword on line 1 (`https://en.wiktionary.org/wiki/<word>`). For multi-word phrases, use underscores (`How_are_you`).

Do **not** put Spanish or Turkish in `en`. Those stay in `es` / `tr`.

### Examples

**Simple noun**

```text
day

noun

[Wiktionary](https://en.wiktionary.org/wiki/day)
```

**Noun with plural + short meaning**

```text
phenomenon

noun
an observable event or fact
phenomenon → phenomena

[Wiktionary](https://en.wiktionary.org/wiki/phenomenon)
```

**Irregular verb**

```text
run

verb
to move quickly on foot
run → ran → run
*She runs every morning.*
**synonym:** jog · **antonym:** walk

[Wiktionary](https://en.wiktionary.org/wiki/run)
```

**Adjective with learner tips**

```text
big

adjective
large in size
**synonym:** large, huge · **antonym:** small, little
**phrase:** a big deal

[Wiktionary](https://en.wiktionary.org/wiki/big)
```

**Phrase (no extra lines needed)**

```text
How are you?

phrase

[Wiktionary](https://en.wiktionary.org/wiki/How_are_you)
```

## Spanish (`es`)

## Turkish (`tr`)
