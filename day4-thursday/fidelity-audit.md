# Design-fidelity audit — Vello NeighborCard

## Scope and method

This audit compares the first AI-generated `NeighborCard` with the supplied Vello
Design System. Each property is checked against the semantic token layer—not only
against a visually similar hexadecimal value. Accessibility issues are recorded as
the issue, violated rule, and correction. Untraceable values are questions for design.

## Property-by-property findings

| Property | Expected source/rule | AI-generated result | Judgment and correction |
| --- | --- | --- | --- |
| Avatar photo | Real `<img>` with `nb__photo` class, circular | Used initials in a colored circle (`#16462F` bg) | Failure. The prototype uses actual photos, not initials. Replaced with `<img>` sourced from `neighbor.photo`. |
| Verified mark | SVG shield path positioned at bottom-right of avatar via `nb__vmark` | Lucide `ShieldCheck` icon, wrong semantic | Drift. The design uses a custom SVG shield with a checkmark, not a generic icon. Replaced with the correct SVG `VerifiedMark` component using `var(--brand-primary)`. |
| Available badge | Coral dot + "Available" text, using `nb__avail` class and `--accent` token | Not rendered at all — no availability state in data | Failure. The first version had no `available` field and no badge. Added `nb__avail` with the coral dot styled via `var(--accent)`. |
| Bio text | `nb__bio` class, `--text-body` color | Generic `text-sm opacity-70` with raw `#1B1C18` | Drift. Opacity hacks instead of the semantic `--text-body` token. Replaced with `nb__bio` class consuming the correct token. |
| Price display | "from $24 / walk" format via `nb__price` class | `$24/walk` — missing "from" prefix, no unit separation | Drift. The prototype always shows "from $X / unit". Corrected to match the format with `nb__price` class. |
| Distance pill | Footprints icon + "6 min walk" in `nb__walk` class, pill shape | MapPin icon + "6 min" — wrong icon, no pill, truncated label | Failure. Wrong icon (MapPin instead of Footprints), missing the "walk" suffix, and no pill styling. Replaced with `Footprints` icon, full label, and `nb__walk` pill. |
| Star rating | 5 amber stars (filled/unfilled) + "4.9" via `nb__rating`, using `--rating` token | Single `Star` icon with raw `#F4B740` fill + number | Failure. Only one star instead of five. Raw hex instead of `var(--rating)`. Replaced with 5-star rendering using the semantic token. |
| Card surface | `--surface-card` | `#FFFFFF` hardcoded | Drift. Correct value but wrong source — should come from the semantic token. Replaced with `var(--surface-card)`. |
| Card border | `--border-default` | `rgba(27,28,24,0.08)` | Drift. Custom alpha not traceable to the semantic layer. Replaced with `var(--border-default)`. |
| Chevron | `nb__tap` class, `ChevronRight` icon, decorative (`aria-hidden`) | ChevronRight present but no `nb__tap` wrapper, no `aria-hidden` | Partial. Icon existed but without proper Vello class or accessibility attribute. Wrapped in `nb__tap` with `aria-hidden="true"`. |
| Card element | `<button>` with `nb` class for the whole card | `<div>` with `onClick` — not a real button | Failure. The card must be a `<button>` for keyboard accessibility. Replaced `<div>` with `<button type="button">`. |

## Accessibility findings

| Issue | Rule broken | Fix |
| --- | --- | --- |
| The card was a `<div>` with an `onClick`, not focusable by keyboard. | Interactive elements must be native buttons or links. | Changed to `<button type="button">` with the `nb` class. |
| No `aria-label` on the card button. | Interactive containers need an accessible name. | Added `aria-label="Open provider {name}"`. |
| Single star icon provided no count or "out of 5" context. | Rating must describe the value for assistive technology. | Added `aria-label="Rated X.X out of 5"` on the rating container with 5 rendered stars. |
| No reduced-motion rule was present. | Motion should respect the user's system preference. | Added a `prefers-reduced-motion` fallback. |
| Decorative icons (footprints, chevron) lacked `aria-hidden`. | Decorative icons should be hidden from assistive technology. | Added `aria-hidden="true"` on all decorative icons. |

## Product and data-model corrections

The first version used a simplified data shape with `initials` instead of `photo`,
no `available` field, no `bio`, a single `walkMinutes` number instead of multiple
distance formats (`walk`, `blocks`, `mi`), and a flat `unit` string instead of the
`"per walk"` format the prototype expects. The corrected contract uses the full
neighbor data shape: `{ id, name, photo, bio, rating, reviews, walk, blocks, mi,
price, unit, verified, available, featured }`.

The first version also omitted the "from" prefix on pricing, which matters — it
signals that the listed price is a starting point, not a guarantee. This is a
product-copy decision, not just formatting.

## What the first version got right

- It included a verified mark, even though it used the wrong icon.
- It had a chevron for navigation affordance.
- It showed the rating value, just not with the full 5-star rendering.
- It included distance information, albeit with the wrong icon and truncated label.
- It kept the name in display font (Bricolage Grotesque).

## Guardrail iteration

The first guardrail reduced Vello to six raw colors and therefore encouraged incorrect
implementation even while saying "no invention." The revised guardrail requires semantic
tokens, the correct SVG verified mark (not a Lucide icon), real photos (not initials),
availability state, full distance format support, 5-star rendering, and the proper
Vello CSS class anatomy (`nb`, `nb__body`, `nb__avail`, `nb__bio`, `nb__price`,
`nb__meta`, `nb__walk`, `nb__tap`, `nb__avatar`, `nb__vmark`).

## Prototype integration iteration

The first prototype integration rendered the NeighborCard as a standalone demo card.
Although the component worked, it failed the product-design requirement: it behaved
like a separate demo surface rather than a card inside the Vello flow. That approach was
removed.

The corrected version uses the prototype's native neighbor-card anatomy (`nb`,
`nb__body`, `nb__meta`, `nb__tap`, `nb__avatar`, `nb__vmark`) and renders inside the
"Trusted on your block" section as one card among others.

## Questions for the designer

1. Does the NeighborCard use `--shadow-md`, `--shadow-sm`, or no elevation in its canonical state?
2. Should the "Available" badge disappear when a neighbor is unavailable, or show an explicit "Unavailable" state?
3. What is the exact distance threshold for switching from "X min walk" to "X blocks" to "X mi away"?
4. Should the verified shield mark appear on unverified neighbors as a grayed-out state, or not appear at all?

These questions remain open intentionally. No undocumented token was chosen to hide the uncertainty.
