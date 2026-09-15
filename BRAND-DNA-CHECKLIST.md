# Wellsprings Brand DNA Checklist

Read this **before** writing any new page, rewriting any existing one, or picking any image. If a page can't tick every box in the relevant section, it isn't ready to ship.

This document is the source of truth. It mirrors `mem://philosophy/brand-dna` and is the human-readable version of it.

---

## 1. The Whole Child framework (architecture)

Every page must clearly express one or more dimensions of the Whole Child. Not as a label, but in the language and the imagery.

| Dimension | Motto word | Color token       | Means                                                              |
| --------- | ---------- | ----------------- | ------------------------------------------------------------------ |
| Mind      | Think      | `--coral-600`     | Curiosity, clarity, sense-making — never memorisation              |
| Body      | Build      | `--sun-700`       | Making, sport, music, movement, doing hard things                  |
| Heart     | Belong     | `--sage-700`      | Known by name, kindness, character, community                      |

- [ ] I can name which dimension(s) this page expresses.
- [ ] The dominant accent color matches the dominant dimension.
- [ ] If the page covers all three (e.g. homepage, about), they appear in **equal weight** — never one favourite.

---

## 2. Two-tier motto (never collapse)

| Tier   | Words                       | Use for                                                                |
| ------ | --------------------------- | ---------------------------------------------------------------------- |
| Tier 1 | **Think · Build · Belong**  | Permanent / institutional: hero, header, admissions, formal contexts   |
| Tier 2 | **Wonder · Play · Belong**  | Warmer / child-facing: pre-primary, parent newsletters, social, soft  |

- [ ] The page uses Tier 1 OR Tier 2 deliberately, based on audience — not both jumbled together.
- [ ] No new slogan has been invented to replace either tier.
- [ ] Punctuation is `Word · Word · Word` (thin space + middle dot), never commas/hyphens.

---

## 3. Voice — Human, Observant, Balanced, Honest

Every line of copy passes all four tests:

- **Human** — written to a parent at a kitchen table, not a board of trustees.
- **Observant** — notice the child specifically. Small, real details over grand claims.
- **Balanced** — rigour AND warmth, marks AND character. Never one-sided.
- **Honest** — no superlatives we can't back. "Award-winning", "1000+ families", "CBSE" are facts; anything else must be true and grounded.

- [ ] No generic edtech / brochure phrasing ("world-class", "cutting-edge", "nurturing tomorrow's leaders", "holistic 360° outcomes").
- [ ] No exclamation marks. No emoji.
- [ ] Sentence case in all headings, buttons, nav items.
- [ ] The headline names a specific, observable thing — not an abstraction.
- [ ] If you removed the word "school", would the line still feel like Wellsprings? It should.

---

## 4. Imagery — common-sense rule

The image must **match the claim next to it**. If it doesn't, replace the image — never weaken the headline.

| Claim                        | Right image                                          | Wrong image                                  |
| ---------------------------- | ---------------------------------------------------- | -------------------------------------------- |
| Award-winning CBSE school    | Confident classroom, campus, teaching moment         | A child tying a shoelace                     |
| Think                        | Reading, observing, questioning, working out         | A pose, a smile-to-camera                    |
| Build                        | Making, sport, music, hands-on                       | A child sitting still                        |
| Belong                       | Teacher-with-child, group warmth, conversation       | A solo portrait                              |

- [ ] Every photograph carries a `<PhotoTag>` with **Think / Build / Belong** + a one-line observed caption.
- [ ] Pre-primary uses Tier 2 captions where appropriate (Wonder / Play / Belong).
- [ ] No stock cliché (children pointing at globes, four kids around one laptop, beaming faces).
- [ ] Image alt text describes the actual scene, not the marketing claim.

---

## 5. Page template (mandatory shape)

Every public page is built from these primitives in `src/components/page/`:

- `PageHero` — eyebrow + H1 + intro + tagged hero image, dimension-themed.
- `MottoStrip` — Tier 1 OR Tier 2 reminder, always present once.
- `MindBodyHeartGrid` — three blocks for content that maps to all three dimensions.
- `PhotoTag` — every image, every page.
- `SectionEyebrow` — small mono-cap label that carries the dimension color.

A page that doesn't use these primitives will drift out of voice. If you need a new primitive, **add it to `src/components/page/`** so the next page can re-use it.

---

## 6. SEO + share

- [ ] Unique `title` ≤ 60 chars, with the page's dimension or topic in it.
- [ ] Unique `description` ≤ 160 chars, in voice (Human/Observant).
- [ ] `og:title`, `og:description`, `og:image` (where there's a hero image) set per route.
- [ ] No reused homepage metadata on a sub-page.

---

## 7. Pre-publish gut check (60 seconds)

1. Read the H1 out loud. Does it sound like a thoughtful adult or a brochure?
2. Look at the hero image. Does it earn the headline next to it?
3. Find the motto. Is it Tier 1 or Tier 2 — and is that the right tier for this audience?
4. Skim the body. Is there a concrete, observed scene anywhere — or only abstractions?
5. Find an exclamation mark, an emoji, or a "world-class". Delete it.

If any answer is wrong, **don't ship**. Fix it.

---

## 8. Voice & tone — how we address a parent

Adopted for the homepage rewrite (Aug 2026). Apply to every parent-facing page.

**Do:**

1. **Speak to the parent.** "Your child", "you", "we". The reader is the subject of
   the sentence, not the school.
2. **Acknowledge the decision.** Choosing a school is a large, anxious choice. Say so
   plainly, once, rather than skipping straight to features.
3. **Make promises, not claims.** "Your child will be known by name" beats
   "we offer a nurturing environment". Short declaratives. Say the thing.
4. **One belief line, repeated.** *Every child arrives with something worth growing.*
   That is the homepage spine. Other pages may echo it; nothing should compete with it.
5. **One primary next step per page.** On the homepage that is **Book your visit**.
   Everything else is secondary in wording and weight.
6. **Plain, warm words.** known, looked after, welcomed, from the first week. No
   pedagogical jargon, no institutional register.
7. **Reassurance before proof.** Say what the day feels like for the child first;
   curriculum, board, and facilities follow as support.

**Don't:**

- No comparison, explicit or implied ("unlike other schools", "what sets us apart").
  Difference is shown by describing what we do.
- No superlatives without evidence ("the very best", "world-class", "excellence").
- Don't repeat *Think · Build · Belong* twice within one screen. Use it where it earns
  its place and let other sentences breathe.
- No hedging ("we aim to", "we strive to"). If we can't promise it, don't write it.
