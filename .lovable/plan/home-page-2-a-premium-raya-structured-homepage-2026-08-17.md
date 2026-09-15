# Home Page 2 — a premium, Raya-structured homepage

Keep the current homepage exactly as it is. Build a **second** homepage as a separate page, and let the navigation show both, so the management can compare and pick.

## Navigation

The "Home" item in the top navigation becomes a small dropdown with two entries:

- Home Page 1 — the existing page (unchanged, still at `/`)
- Home Page 2 — the new page (at `/home-2`)

Nothing else in the navigation changes. Once a favourite is chosen, the winner can be moved to `/` and the other removed.

## Structure of Home Page 2

Section by section, following the School of Raya rhythm but written and designed for Wellsprings — our navy/coral/sun/sage colours, Lora headings, Inter body, Think · Build · Belong framing.

1. **Full-bleed hero** — one large photograph edge to edge with a dark tint over it, a small location line ("Sarjapura, Bengaluru · CBSE"), a big headline where the second line is in italic, one short sentence beneath, and a single "Book a visit" button. No white box, no split layout.

2. **Statement slab** — a few short declarative lines in very large type on a plain background. Learning described plainly: it moves, it stumbles, it climbs.

3. **Three pillars** — Think, Build, Belong, each with a photo and one plain line of explanation. Tall, calm, no card clutter.

4. **The stages** — Pre-primary, Primary, Middle, Secondary as three-to-four tall panels with a photo and a one-line description, each linking to its curriculum page.

5. **Numbers** — a handful of large figures (campus, grades taught, teacher ratios, houses) with small labels.

6. **What it feels like to be here** — kept from the current site, the Raya "Campus as Character" equivalent: photography-led, describing the campus in plain words.

7. **Holistic Wellsprings** (replaces Raya's "Rayots Speak") — an expand-and-collapse list where each row opens to a paragraph plus a photo. Rows:
   - Campus & Infrastructure
   - Sports
   - Music & the Arts
   - STEM Lab
   - Vocational Classes
   - Clubs
   - Play to Speak
   - The Settlers Room

   Only one row open at a time, smooth open/close, keyboard accessible.

8. **Houses** — the four houses (Ember, Vale, Atlas, Cove) with their existing marks and one line each.

9. **Visit us** — address, phone, email, map, single "Book your visit" button. Same details as today.

All copy written in plain English — no jargon, no superlatives, no comparisons to other schools.

## Technical notes

- New route `src/routes/home-2.tsx` with its own `head()` metadata (unique title, description, og tags).
- New components under `src/components/home2/`: `FullBleedHero`, `StatementSlab`, `PillarPanels`, `StagePanels`, `NumbersRow`, `HolisticAccordion`, `HousesStrip`. Existing `Glimpses`, `Reveal`, `PhotoTag` and house SVGs are reused.
- `SITE_NAV` in `src/routes/__root.tsx` gains `children` on the Home item (the dropdown pattern already used by Curriculum), so both desktop and mobile menus pick it up automatically.
- Photography reuses the existing uploaded glimpse and page images; no placeholders. If a section has no suitable photo, it ships type-only rather than with a stand-in.
- `src/routes/index.tsx` is not modified.
