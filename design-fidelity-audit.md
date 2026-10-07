# Design-fidelity audit — Vello ProviderCard

## Scope and method

This audit compares the first AI-generated `ProviderCard` with the supplied Vello
Design System. Each property is checked against the semantic token layer—not only
against a visually similar hexadecimal value. Accessibility issues are recorded as
the issue, violated rule, and correction. Untraceable values are questions for design.

## Property-by-property findings

| Property | Expected source/rule | AI-generated result | Judgment and correction |
| --- | --- | --- | --- |
| Card surface | `--surface-card` | `tokens.paper` (`#F6F2E7`) | Drift. The generated card used the page-background primitive as its surface. Replaced with `var(--surface-card)`. |
| Card border | `--border-default` | `rgba(27,28,24,0.08)` | Drift. Custom alpha was not traceable to the semantic layer. Replaced with `var(--border-default)`. |
| Card elevation | `--shadow-md` | `0 4px 16px rgba(27,28,24,0.06)` | Drift. Custom shadow. Replaced with documented `var(--shadow-md)`. |
| Card radius | `--radius-lg` (20px) | Tailwind `rounded-2xl` | Ambiguous and framework-dependent. Replaced with `var(--radius-lg)`. |
| Verification tint | `--surface-brand-tint` | Invented `#E7EFDC` | Failure. It violated the original “no invented hex” guardrail. Replaced with `var(--surface-brand-tint)`. |
| Primary action | `--brand-primary` / `--brand-on-primary` | Raw olive and paper primitives | Visually close but semantically wrong. Replaced with the semantic tokens. |
| Rating color | `--rating` for the star; semantic text colors for the numeric value | Raw amber primitive on the star while the surrounding text used raw ink | Partial. The corrected star uses `var(--rating)`, while the numeric value uses `--text-strong` so essential text is not communicated in low-contrast amber. |
| Text hierarchy | `--text-strong`, `--text-body`, `--text-muted`, `--text-brand` | Mostly one raw ink value plus opacity | Drift. Opacity obscured the intended semantic role. Replaced with explicit text tokens. |
| Demo background | `--color-bg-subtle` / `--paper-2` | Invented `#EFEAD9` | Failure. The official primitive is `#EFEADB`. The corrected demo consumes `var(--color-bg-subtle)`. |
| Focus treatment | `--focus-ring` | Tailwind outline colored with raw olive | Partial. A focus state existed, but not the documented treatment. Replaced with `box-shadow: var(--focus-ring)`. |

## Accessibility findings

| Issue | Rule broken | Fix |
| --- | --- | --- |
| The primary button used `py-2` and had no guaranteed target height. | Interactive targets must be at least 44×44px. | Added `min-height: 44px` to primary and demo controls. |
| The component exported a demo but did not provide a mounted, testable page. | Interactive behavior must be verifiable, including focus and status feedback. | Added a small Vite demo with three states and a polite live-region confirmation. |
| The “pressed” visual state was driven only by mouse events. | Interaction feedback must not depend on pointer-only events. | Removed pointer-specific React state; native button active/focus states now handle mouse and keyboard interaction. |
| Icons could be announced redundantly beside visible text. | Decorative icons should be hidden from assistive technology. | Retained `aria-hidden="true"` for icons that duplicate adjacent text. |
| No reduced-motion rule was present. | Motion should respect the user’s system preference. | Added a `prefers-reduced-motion` fallback. |

## Product and data-model corrections

The first version passed vouches as preformatted strings such as
`"Priya used him 11 times"`, although the component treated each item as a person’s
name. This produced incorrect copy and made the data impossible to reuse. The corrected
contract uses `{ neighborName, completedBookings }`.

The first version also assumed that every service had one flat `priceLabel`. Interview
evidence shows that some services cannot be priced before inspection. Pricing is now a
discriminated shape supporting fixed, range, and quote-required states. This is a system
decision surfaced by the component, not merely a copy change.

## What the first version got right

- It separated aggregate ratings from named neighbor vouches.
- It kept identity verification distinct from competence and reliability.
- It used semantic elements such as `article`, heading, and button.
- It provided a visible focus treatment, even though it did not use the correct token.
- It exposed the fixed-price assumption as a question rather than hiding it.

## Guardrail iteration

The first guardrail reduced Vello to six raw colors and therefore encouraged incorrect
implementation even while saying “no invention.” The revised guardrail requires semantic
tokens, a traceable data contract, explicit interaction states, accessibility checks, and
an unresolved-questions list. Both versions are retained to show the decision trail.

## Prototype integration iteration

The first prototype integration mounted `ProviderCard` through a launcher and overlay.
Although the component rendered, it failed the product-design requirement: it behaved
like a separate demo surface rather than a card inside the Vello flow. That approach was
removed.

The second integration placed the component near the top of Home, but the custom section
and expanded content made it dominate the phone frame. The corrected version now uses the
prototype's native provider-card anatomy (`section`, `neighbors`, `nb`, `nb__body`,
`nb__meta`, `nb__tap`) and only adds minimal styling for the corrected ProviderCard data:
identity verification, named vouch copy, distance, rating, and fixed pricing.

## Questions for the designer (v2, superseded)

1. ~~Does ProviderCard use `--shadow-md`, `--shadow-sm`, or no elevation in its canonical state?~~
   Answered by the source: `.nb` and DS `ProviderCard` have no elevation at rest; `--shadow-md` on hover.
2. Should an unverified provider show no badge or an explicit “Not identity verified” label? (open, `CLAUDE.md` §10 Q4)
3. Is the neutral no-vouch sentence approved product copy? (open)
4. ~~Which semantic token should define the avatar background?~~ Answered by the source: DS `Avatar`
   fallback is `--green-200` / `--green-800`, not `--surface-brand-deep`.

The current open list lives in `CLAUDE.md` §10.

---

# v3 pass, 2026-10-07

Applied `CLAUDE.md` v3 to both renderers. This pass found the gaps that became v3.1.
Measured in Chromium at a 375px app frame (prototype) and in the Vite demo.

## Step 1: what the source already had

- The DS bundle ships **`ProviderCard`**, `Avatar`, `Badge`, `Rating`. None had been used.
- Home renders providers with `NeighborCard` (`.nb`), built from `AvatarVerified` (DS
  `Avatar lg` + `VerifiedMark`), DS `Rating size="sm"`, and `DIST_ICON`/`distanceLabel`.
- DS `ProviderCard` shows "Available" as `Badge variant="brand"` (green). Home's
  `.nb__avail` is coral, so the prototype drifted from the DS.
- DS `Avatar` fallback is `--green-200`/`--green-800`. The old forest avatar was itself drift.

## Step 2: data mapping

`src/providerModel.js` now uses the prototype's names: `photo`, `bio`, `cat`, `reviews`,
`walk`/`blocks`/`mi`, `available`. Still proposed (flagged, not presented as existing):
`verificationStatus`, `pricing`, `vouches`.

## Property-by-property (prototype integration unless noted)

| Property | Expected source / rule | Before (v2) | After (v3) | Measured | Judgment |
| --- | --- | --- | --- | --- | --- |
| Data source | One shared model (§0.3) | Hard-coded copy in the integration script | Both renderers import `src/providerModel.js` | — | Fixed |
| Avatar | DS `Avatar lg` via `AvatarVerified` | Fake `vl-avatar--lg` span with initials | `VelloFlow.AvatarVerified` | 21×20px → **64×64px** | Fixed |
| Avatar fallback color | DS `Avatar` fallback | `--forest-800` + `--paper` | DS `--green-200` / `--green-800` | 6.60:1 | Fixed |
| Photo | `photo` field | Not modeled | Modeled; fixtures have no asset | — | Flagged, §10 Q9 |
| Verification | One signal: `VerifiedMark` on avatar | Mark **and** "Identity verified" chip | Mark only | 1 signal | Fixed |
| Availability | DS `Badge` brand | Missing | Native `.nb__avail` aligned to DS brand | 4.10 → **5.70:1** | Fixed + flagged §10 Q2 |
| Distance | `DIST_ICON` + 3 formats | `map-pin` + "min walk" only | Follows native format; footprints/milestone/map-pin | 3/3 formats | Fixed |
| Distance typography | Number Mono, words Hanken | All Mono | Split | — | Fixed (native still drifts, §10 Q8) |
| Rating | DS `Rating sm` | 1 star + value | DS `Rating` (5 stars + value); "No ratings yet" when empty | — | Fixed |
| Price copy | `fixed`/`range`/`quote` rules | "from $18" for a fixed price | `$18 / walk`, `$45–$70 / visit`, "Quote required" | — | Fixed |
| Vouch line | One named vouch, one line | 2 lines incl. "1 other neighbor vouched" + redundant pill | "Priya booked Tomás 11 times" | — | Fixed, §10 Q7 |
| Name | Diacritics kept | "Tomas" | "Tomás" | — | Fixed |
| Placement | Inside "Trusted on your block", after featured | "Mejorada": new section above categories (default) | 2nd card in the list; hidden on non-matching category | position 2 | Fixed |
| Height | ≤ 178px (native ≈ 155) | 246px "Mejorada" / 145px "Actual" | vouched 175 · unavailable 155 · no vouch 173 · quote 154 | all ≤ 178 | Fixed |
| Tap targets | One button per card | Card button + nested CTA | Whole card; native chevron decorative | 1 | Fixed |
| Toast | Live region | No role | `role="status"`, `aria-live="polite"` | — | Fixed |
| Focus | Visible, ≥ 3:1 | `--focus-ring` only (1.52:1) | 2px `--border-focus` outline + ring | **4.77:1** | Interim, §10 Q1 |
| Injected CSS | Semantic tokens only | `--forest-800`, `--paper`, `--green-200`, raw `rgba()`, `36px` | Semantic tokens; grep clean | 0 hits | Fixed |
| Demo control | 44px, baseline default, UI language, off-frame | 32px buttons, "Mejorada" default, covered the frame | "ProviderCard state", 4 states, 44px, top-left | 44px | Fixed |

## React mirror (`src/`)

| Property | Before (v2) | After (v3) | Measured |
| --- | --- | --- | --- |
| Anatomy | Standalone card with separate Request button and `h2` | `.nb` anatomy, whole card is the button, phrasing content only | — |
| Tokens | Partial token layer; `36px`, `6px` gaps, raw sizes | Full layer copied from prototype; component tokens traced to source; grep clean | 0 hits |
| Avatar text token | `--brand-on-primary` on forest | DS fallback tokens | 6.60:1 |
| Card elevation at rest | `--shadow-md` | none; `--shadow-md` on hover | — |
| Chevron | — | `--text-muted` on `--surface-sunken` (native uses `--text-subtle`, 2.82:1) | 4.32:1 |
| Height | — | vouched 174 · unavailable 157 · no vouch 174 · quote 157 | ≤ 178 |
| Keyboard | — | Tab / Shift+Tab / Enter / Space verified | outline 2px `--border-focus` |
| Build | — | `npm run build` passes | — |

Remaining raw values with no DS token: border widths (1px/1.5px), 2px hover lift, 2px focus
outline. Kept at native values on purpose (`CLAUDE.md` §2).

## Known limitation

Tapping the integrated card shows a confirmation toast instead of opening booking. The
prototype router (`onBook`) only accepts `NEIGHBORS` records, and adding Tomás there is a
data change outside this component.
