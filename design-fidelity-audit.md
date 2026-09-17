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

## Questions for the designer

1. Does ProviderCard use `--shadow-md`, `--shadow-sm`, or no elevation in its canonical state?
2. Should an unverified provider show no badge or an explicit “Not identity verified” label?
3. Is the neutral no-vouch sentence approved product copy?
4. Which semantic token should define the avatar background: `--surface-brand-deep` or another provider-specific token?

These questions remain open intentionally. No undocumented token was chosen to hide the uncertainty.
