# CLAUDE.md — Vello component guardrails (revised)

Scope: the ProviderCard implementation and any Vello component derived from it.

## Source of truth

- The Vello Design System (https://vello-design-system.vercel.app) and the Vello
  prototype are authoritative. The product brief defines the three roles (Requester,
  Provider, Community Admin), the hyperlocal scope, and the trust-scales-locally bet.
- Use the semantic token layer in component CSS, never raw hex values.
- If a value cannot be traced to a documented token, do not guess. Add it to the
  unresolved-design-questions list and ask the designer.

## How to use this guardrail with Claude

This file alone is not enough. For best results, load these documents into
Claude's context before generating or reviewing a Vello component:

1. **This CLAUDE.md** — the rules and token tables below.
2. **The Vello Design System** — load the full design system page or paste its
   token/component documentation so Claude can reference exact values.
3. **The Vello Product Brief** — roles, flows, and the trust-scales-locally bet
   give Claude the product context it needs to make correct decisions about trust
   signals, empty states, and data shapes.
4. **The Vello Prototype HTML** — if integrating into the app, Claude needs to
   see the existing screen structure and CSS classes to match the native anatomy
   instead of inventing its own layout.
5. **Relevant interview transcripts** — when a component involves trust, pricing,
   or user-facing copy, the raw research evidence prevents Claude from inventing
   plausible-sounding but unverified claims.

The more specific the context, the less the guardrail has to catch. A guardrail
without context produces "technically compliant" output that still drifts. Context
plus guardrail produces faithful output. This was the main lesson of the
iteration: v1 of this file had rules but no context, and Claude drifted on every
property. Adding the design system and brief as context reduced drift measurably
before the guardrail even needed to intervene.

## Token reference

### Color primitives (definition layer only — never use directly in components)

| Token              | Value     |
| ------------------ | --------- |
| `--white`          | `#FFFFFF` |
| `--paper`          | `#F6F2E7` |
| `--paper-2`        | `#EFEADB` |
| `--forest-800`     | `#16462F` |
| `--green-100`      | `#EBF1DB` |
| `--green-200`      | `#D7E3BD` |
| `--green-600`      | `#557E26` |
| `--green-700`      | `#466621` |
| `--coral-500`      | `#F0623B` |
| `--amber-500`      | `#F4B740` |
| `--ink-100`        | `#EFEEE1` |
| `--ink-150`        | `#E5E4D6` |
| `--ink-200`        | `#D6D6C6` |
| `--ink-500`        | `#6E7064` |
| `--ink-700`        | `#3D3F37` |
| `--ink-900`        | `#1B1C18` |

### Semantic aliases (use these in component styles)

| Token                     | Maps to         | Role                              |
| ------------------------- | --------------- | --------------------------------- |
| `--color-bg`              | `--paper`       | Page background                   |
| `--color-bg-subtle`       | `--paper-2`     | Subtle/secondary background       |
| `--surface-card`          | `--white`       | Card surface                      |
| `--surface-brand-deep`    | `--forest-800`  | Deep brand surface (avatar bg)    |
| `--surface-brand-tint`    | `--green-100`   | Light brand tint (badges)         |
| `--brand-primary`         | `--green-600`   | Primary action (buttons)          |
| `--brand-primary-hover`   | `--green-700`   | Primary action hover              |
| `--brand-on-primary`      | `--white`       | Text on primary actions           |
| `--text-strong`           | `--ink-900`     | Headings, names, key data         |
| `--text-body`             | `--ink-700`     | Body copy, descriptions           |
| `--text-muted`            | `--ink-500`     | Secondary info, counts, labels    |
| `--text-brand`            | `--green-700`   | Brand-colored text, vouch names   |
| `--border-default`        | `--ink-150`     | Card borders, dividers            |
| `--border-strong`         | `--ink-200`     | Emphasized borders                |
| `--border-subtle`         | `--ink-100`     | Light dividers inside cards       |
| `--border-focus`          | `--green-600`   | Focus state border                |
| `--rating`                | `--amber-500`   | Star rating icon only             |
| `--accent`                | `--coral-500`   | Warm accent (persimmon)           |

### Typography

| Role                 | Font family           | CSS variable       |
| -------------------- | --------------------- | ------------------- |
| Display / names      | Bricolage Grotesque   | `--font-display`    |
| Body / UI copy       | Hanken Grotesk        | `--font-sans`       |
| Numeric data         | JetBrains Mono        | `--font-mono`       |

Size scale: `--text-xs`, `--text-sm`, `--text-base`, `--text-md`, `--text-xl`, `--text-4xl`.
Weights: `--fw-medium`, `--fw-semibold`, `--fw-bold`.
Line height: `--lh-relaxed` for body paragraphs.

Rules:
- Never use JetBrains Mono for a label or a name.
- Never use Bricolage Grotesque for body copy.
- Provider names always use `--font-display` at `--fw-bold`.

### Spacing, radii, and elevation

- Spacing follows a **4px rhythm**. Do not add arbitrary values.
- Radii: `--radius-xs`, `--radius-sm`, `--radius-md` (14px), `--radius-lg` (20px),
  `--radius-pill` (999px).
- Elevation: `--shadow-md` = `0 6px 18px rgba(25, 28, 25, 0.09)`.
  `--shadow-brand` = `0 14px 34px rgba(85, 126, 38, 0.2)`.
- Focus ring: `--focus-ring` = `0 0 0 3px rgba(85, 126, 38, 0.32)`.

## Visual fidelity

- Implement documented interaction states: default, hover, active, focus-visible,
  disabled, empty, and error when applicable.
- When integrating into the Vello prototype, match the native screen composition
  before adding new CSS. Prefer existing app classes: `section`, `section__head`,
  `neighbors`, `nb`, `nb__body`, `nb__meta`, `nb__tap`.
- Do not create standalone demo shells, overlays, floating launchers, or full-width
  cards that visually separate the component from the product flow.
- The home screen is the polished reference. Other screens carry planted UX issues
  intentionally — do not "fix" the prototype structure, only add your component.

## Trust semantics

- `VerifiedBadge` means identity/safety verification only. It must not imply skill,
  competence, reliability, or an overall trust score. These are separate, currently
  unmodeled signals.
- `Rating` is an aggregate score. `TrustLine` is a named, attributable neighbor
  vouch. Keep their data and presentation distinct.
- Never invent a neighbor name or show "0 neighbors," which may imply distrust.
  Use an explicit neutral empty state.
- The product bet is "trust scales locally" — neighborhood-scoped verification,
  shared reviews, and repeat bookings. Components must reinforce this.

## Data contract

- Vouches use `{ neighborName, completedBookings }`; do not pass preformatted
  sentences as data.
- Verification uses an explicit status: `identity_verified` or `unverified`,
  not a generic boolean.
- Pricing is a discriminated shape:
  - `{ type: "fixed", amount, unit, currency }`
  - `{ type: "range", minimum, maximum, currency }`
  - `{ type: "quote" }`
- Provider object includes: `id`, `name`, `initials`, `service`,
  `verificationStatus`, `rating` (nullable), `ratingCount`, `walkMinutes`,
  `pricing`, `vouches[]`.
- If the UI needs a field that does not exist in the model, flag the required
  schema/API change instead of silently mocking it.

## Accessibility floor

- Use semantic HTML: `<article>` for the card, `<h2>` for the provider name with
  an `id` for `aria-labelledby`, `<button>` for actions (not `<div onClick>`).
- All buttons: minimum 44x44px target and visible `:focus-visible` styling using
  `box-shadow: var(--focus-ring)`.
- Never rely on color alone to communicate status. Icons that repeat adjacent text
  are decorative: `aria-hidden="true"`.
- Rating has an `aria-label` describing the value and count.
- Dynamic confirmation text uses `role="status"` and `aria-live="polite"`.
- Respect `prefers-reduced-motion`: disable transitions and animations.
- Verify text/background contrast meets WCAG AA (4.5:1 for normal text, 3:1 for
  large text).
- Test keyboard navigation: Tab, Shift+Tab, Enter, and Space.

## Audit process

For every reviewed property, record: component/property, expected semantic token or
accessibility rule, generated result, judgment, and correction. Preserve the initial
guardrails and generated component so the before/after decision trail remains visible.

## Integration history

- 2026-09-16: First HTML integration used a launcher/overlay. Worked technically,
  but failed product fidelity — component felt outside the Vello app.
- 2026-09-16: Second version inserted the card near the top of Home, but it
  dominated the screen and used custom structure instead of Vello's native pattern.
- 2026-09-16: Corrected integration uses the existing Home section/list/card
  anatomy (`section` + `neighbors` + `nb`) with minimal ProviderCard-specific
  styling for data not already represented by the native card.

## Unresolved questions

1. Does ProviderCard use `--shadow-md`, `--shadow-sm`, or no elevation in its
   canonical state?
2. Should an unverified provider show no badge or an explicit "Not identity
   verified" label?
3. Is the neutral no-vouch sentence approved product copy?
4. Which semantic token defines the avatar background: `--surface-brand-deep` or
   a provider-specific token?
5. What are the exact values for `--radius-xs` and `--radius-sm`? The design
   system references them but the prototype CSS only defines `--radius-md` (14px),
   `--radius-lg` (20px), and `--radius-pill` (999px).
