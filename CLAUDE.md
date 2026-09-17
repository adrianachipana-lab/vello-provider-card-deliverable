# CLAUDE.md — Vello component guardrails (revised)

Scope: the ProviderCard implementation and any Vello component derived from it.

## Source of truth

- The supplied Vello Design System and Vello prototype are authoritative.
- Use the semantic token layer in component CSS. Examples: `--surface-card`,
  `--brand-primary`, `--text-muted`, `--border-default`, `--rating`, and
  `--shadow-md`.
- Do not copy raw hex values into component styles, even when the value matches a
  documented primitive. Raw primitives belong only in the token-definition layer.
- If a value cannot be traced to a documented token, do not guess. Add it to the
  unresolved-design-questions list and ask the designer.

## Visual fidelity

- Typography roles are fixed: Bricolage Grotesque for display/provider names,
  Hanken Grotesk for body and UI copy, and JetBrains Mono only for numeric data.
- Use documented radii (`--radius-md`, `--radius-lg`, `--radius-pill`) and
  elevations (`--shadow-xs` through `--shadow-xl`, or `--shadow-brand`).
- Use the documented 4px spacing scale. Do not add an arbitrary size because it
  appears visually close.
- Implement documented interaction states: default, hover, active, focus-visible,
  disabled, empty, and error when applicable.
- When integrating a component into the Vello prototype, match the native screen
  composition before adding new CSS. Prefer existing app classes such as
  `section`, `section__head`, `neighbors`, `nb`, `nb__body`, `nb__meta`, and
  `nb__tap` over standalone demo shells, overlays, floating launchers, or
  full-width cards that visually separate the component from the product flow.

## Trust semantics

- `VerifiedBadge` means identity/safety verification only. It must not imply skill,
  competence, reliability, or an overall trust score.
- `Rating` is an aggregate score. `TrustLine` is a named, attributable neighbor
  vouch. Keep their data and presentation distinct.
- Never invent a neighbor name or show “0 neighbors,” which may imply distrust.
  Use an explicit neutral empty state.

## Data contract

- Vouches use `{ neighborName, completedBookings }`; do not pass preformatted
  sentences as data.
- Verification uses an explicit status such as `identity_verified` or `unverified`,
  not a generic trust boolean.
- Pricing is a discriminated shape: `fixed`, `range`, or `quote`. Do not assume
  every service has a fixed price.
- If the UI needs an unsupported field or relationship, flag the required model/API
  change instead of silently mocking it.

## Accessibility floor

- Use semantic HTML and associate the card with its visible provider heading.
- All buttons have a minimum 44×44px target and visible `:focus-visible` styling
  using `--focus-ring`.
- Never rely on color alone to communicate status. Icons that repeat adjacent text
  are decorative and use `aria-hidden="true"`.
- Dynamic confirmation text uses `role="status"` and `aria-live="polite"`.
- Respect `prefers-reduced-motion` and verify text/background contrast.
- Test keyboard navigation at minimum: Tab, Shift+Tab, Enter, and Space.

## Audit process

For every reviewed property, record: component/property, expected semantic token or
accessibility rule, generated result, judgment, and correction. Preserve the initial
guardrails and generated component so the before/after decision trail remains visible.

## Integration history

- 2026-09-16: The first HTML integration exposed `ProviderCard` through a separate
  launcher/overlay. It worked technically, but failed product fidelity because the
  component felt outside the Vello app.
- 2026-09-16: The next version inserted the card near the top of Home, but it still
  occupied too much visual space and used custom structure instead of Vello's native
  provider-list pattern.
- 2026-09-16: The corrected integration uses the existing Home section/list/card
  anatomy (`section` + `neighbors` + `nb`) and only adds minimal ProviderCard-specific
  styling for data not already represented by the native card.

## Unresolved questions

- If the design does not identify the semantic token for a property, record the
  property and current visual value here instead of guessing.
