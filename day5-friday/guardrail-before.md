# CLAUDE.md — Vello frontend guardrails

Scope: components under `src/components/vello/**`. Applies to NeighborCard and anything reusing its tokens.

## Tokens — no invention
- Only these six colors exist: paper `#F6F2E7`, forest `#16462F`, olive `#557E26`,
  persimmon `#F0623B`, amber `#F4B740`, ink `#1B1C18`. Never introduce a new hex value,
  including for shadows/tints — derive tints from these six via opacity, not new colors.
- Fonts have fixed roles: Bricolage Grotesque = display/names only. Hanken Grotesk = all
  body/UI copy. JetBrains Mono = numeric/data values only (price, distance, counts).
  Never use JetBrains Mono for a label or a name; never use Bricolage for body copy.
- Spacing follows a 4px rhythm. Radii are generous (prefer 12-20px, never 0 or fully square).

## Trust signals are not interchangeable
- `Rating` (stars) and availability status are different signals and must render
  differently. Never collapse availability into a rating, and never show a neighbor
  as "Available" without an actual availability flag in the data.
- The verified mark is an SVG shield on the avatar, not a text badge. It reflects
  identity/safety verification only. It must never be shown or implied as a proxy
  for skill, competence, or reliability — those are separate, currently-unmodeled
  signals. Do not add a single merged "trust score."

## Accessibility floor (non-negotiable, check before calling anything done)
- Every interactive element has a visible focus state using the olive ring — never remove
  the outline without replacing it.
- Rating and badges must have an `aria-label` or equivalent text alternative; they are not
  purely decorative.
- Minimum tap target 44x44px on any button/icon-button, even if the visual size is smaller.
- Verify color contrast for any new text/background pairing against the six tokens above
  before shipping it — don't assume a token pair is accessible just because it's on-brand.

## Data contract discipline
- Any new field a component displays (e.g., a new trust signal, a new neighbor stat) must
  be checked against the actual data model before being wired up. If the field doesn't
  exist yet, say so explicitly instead of mocking it silently and moving on.
- Flag, don't silently resolve: if a design requirement implies a schema change (new
  entity, new state, new relationship), stop and surface it rather than inventing a shape
  for it.

## Process
- Don't "fix" a token mismatch by picking the nearest brand color from memory — ask, or
  fall back to the nearest of the six defined tokens and flag the substitution.
- Every component ships with a one-paragraph note on what was assumed and why, for the
  design-fidelity audit.
