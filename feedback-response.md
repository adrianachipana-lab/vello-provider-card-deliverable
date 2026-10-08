# Feedback Response — NeighborCard Improvements

Mentor feedback received after initial deliverable review.
This document maps each point to what was done.

## 1. Entregables tempranos incompletos (Early deliverables incomplete)

**What was missing:** Day 1-2 deliverables existed but had stale references from the initial implementation. The day2 synthesis still described the Available badge as "coral" — a color that was already wrong and later fixed. The day3 flow table referenced the coral badge too.

**What was done:**
- Fixed stale "coral" references in `day2-tuesday/synthesis.md` and `day3-wednesday/flow-and-states.md` to match the corrected green badge.
- Added contrast ratio to the flow state table so the early deliverables carry the same rigor as the later audit work.

## 2. Badge Available arreglado despues del deadline (Available badge fixed after deadline)

**What happened:** The Available badge went through three states:
1. **Missing entirely** — first AI generation had no availability state.
2. **Coral/red** — second version added the badge but used `--accent` (coral-500), a semantic error caught during visual review. A red dot next to "Available" contradicts the meaning.
3. **Green (brand-primary)** — corrected to use `--brand-primary` (green-600) with `--surface-brand-tint` background.

The fix from coral to green happened after the initial submission deadline. This was documented in `day4-thursday/fidelity-audit.md` under "Errors found during visual review" but the timeline was not explicit.

**What was done now:**
- Ran a contrast audit on the green badge and found it still failed WCAG AA: `--brand-primary` (#557E26) on `--surface-brand-tint` (#EBF1DB) = 4.12:1, below the 4.5:1 threshold for 12px text.
- Changed badge text and dot from `--brand-primary` (green-600) to `--text-brand` (green-700, #466621), which gives 5.70:1 — passing AA.
- Applied the same fix to the profile view's `.profile-available` and `.profile-dot`.

**Lesson:** The late fix happened because the visual review was treated as optional rather than part of the core workflow. Code-level audits caught token drift but not semantic color errors. Going forward: render and visually inspect the component before considering the audit complete.

## 3. Agregar medidas de contraste (Add contrast measurements)

**What was missing:** The fidelity audit checked token usage and accessibility semantics (aria labels, button elements, focus rings) but did not include measured WCAG contrast ratios.

**What was done:**
- Created `day4-thursday/contrast-audit.md` with computed contrast ratios for all 11 foreground/background combinations used in the NeighborCard and NeighborProfile.
- Method: relative luminance per WCAG 2.1 using sRGB linearization, computed with a Node.js script.
- Found and fixed 1 failing combination (Available badge: 4.12 -> 5.70).
- Documented 2 acceptable exceptions: amber rating stars (decorative, paired with numeric value) and shield checkmark (graphical object, passes 1.4.11 at 4.27:1).

## 4. Mejorar la grabacion (Improve the recording)

This is outside the scope of code changes. The recording should:
- Show the before/after of the Available badge (coral -> green -> contrast-fixed green).
- Walk through the contrast audit table with specific numbers.
- Demonstrate the component in all three states (available, unavailable, perfect rating).
- Keep the narrative tight: what drifted, how it was caught, what was fixed, what the numbers prove.

## Files changed in this PR

| File | Change |
| --- | --- |
| `src/styles.css` | Available badge and dot: `--brand-primary` -> `--text-brand` for WCAG AA contrast |
| `day4-thursday/contrast-audit.md` | New: full contrast ratio audit with measurements |
| `day2-tuesday/synthesis.md` | Fix stale "coral" reference to "green" |
| `day3-wednesday/flow-and-states.md` | Fix stale "coral" reference, add contrast ratio |
| `feedback-response.md` | This document |
