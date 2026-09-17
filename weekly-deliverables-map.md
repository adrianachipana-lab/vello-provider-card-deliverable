# Round Robin Vello Deliverables Map

Date: 2026-09-16
Purpose: Map the trainee-manual requirements to the artifacts produced in this project.

## What The Program Asks For

The week is not only about building one component. The final package should show that we can use AI as a collaborator, verify it, correct it, and explain how design decisions affect engineering.

The required story is:

1. Understand design vocabulary and where engineering contributes.
2. Read research as evidence and turn it into system implications.
3. Translate flows into states, routes, and API/data needs.
4. Audit UI for hierarchy, tokens, accessibility, and missing states.
5. Generate a component with AI, prove where it drifted, and fix it with guardrails.

## Monday: Design Foundations

Manual asks for:

- A one-page reflection on what design owns, what engineering contributes, and one design decision reframed as a system decision.
- Evidence that we understand product / UX / UI / visual design.

Current artifact coverage:

- `CLAUDE.md` captures design ownership boundaries as guardrails.
- `design-fidelity-audit.md` reframes pricing and vouches as data-contract/system decisions, not just UI copy.

Still useful to add for presentation:

- A short spoken reflection: "Design owns the product/user-experience decision; engineering contributes feasibility, state modeling, data contracts, and verification."
- Best system-decision example: provider pricing. A UI label like `$18/walk` turned into a discriminated data model: `fixed`, `range`, or `quote`.

## Tuesday: Discovery & Research

Manual asks for:

- Audited synthesis, two problem statements, and an entity list.
- At least one correction where AI overstated or invented confidence.

Current artifact coverage:

- We do not have transcripts in this repo, so we cannot truthfully claim a transcript-backed synthesis.
- `design-fidelity-audit.md` does capture interview-derived product implications mentioned in the component brief: trust/vouches and non-fixed pricing.

Presentation-safe framing:

- Say: "For this package, the available evidence was the Vello prototype/design-system brief, not raw transcripts."
- Do not invent research quotes.
- Use the verified product assumptions only:
  - Requesters need trust signals that are local and attributable.
  - Some services cannot be priced upfront.
  - Verification must be modeled separately from rating/reputation.

Candidate problem statements:

1. Requesters hiring local help need a way to distinguish identity verification, aggregate rating, and named neighbor trust because those signals answer different trust questions.
2. Requesters comparing providers need pricing that supports fixed, ranged, and quote-required services because not every local service can be accurately priced before inspection.

Entities implied:

- `Provider`
- `Verification`
- `Vouch`
- `Rating`
- `Pricing`
- `Service`
- `Request`
- `Booking`
- `Neighborhood`

## Wednesday: UX Architecture & Flows

Manual asks for:

- A revised flow artifact.
- A state/API contract table.
- Gaps and assumptions caught during stress testing.

Current artifact coverage:

- The implemented component and integration exposed a UX-architecture issue: the card cannot be treated as a standalone page if the product location is Home provider browsing.
- `vello-design-qa.md` identifies IA issues across Home, request detail, booking, profile, and admin.

Recommended demo flow to explain:

1. User lands on Home.
2. User sees search, open request, and provider options.
3. User compares providers using trust signals.
4. User taps ProviderCard.
5. System starts booking/message path.

State/API implications:

| State | Trigger | UI | Data/API implication |
| --- | --- | --- | --- |
| Provider available | Provider has availability | Show request/book CTA | Provider availability state required |
| No vouches | No local completed bookings | Neutral trust copy | `vouches: []` must be valid |
| Identity verified | Verification approved | Verified badge/shield | Verification status stored separately |
| Quote required | Price unknown | Show quote label | Pricing type must support `quote` |
| Booking started | User taps CTA | Toast/status feedback | Booking intent or draft booking event |

## Thursday: UI Craft, Systems & Critique

Manual asks for:

- Human critique vs AI critique.
- Token drift findings.
- Accessibility findings.
- Missing states.

Current artifact coverage:

- `design-fidelity-audit.md` is the main token/a11y audit.
- `vello-design-qa.md` is the broader product-design QA.
- `before/ProviderCard-before.jsx` preserves the initial AI-generated version.
- `src/components/ProviderCard.jsx` preserves the corrected React component.

Strongest findings to present:

- Raw hex and primitive-token usage drifted from semantic tokens.
- Vouches were initially treated as strings instead of structured data.
- Pricing was initially too simplistic.
- The first integrated version passed rendering but failed design context.
- The corrected integration reused Vello's native `section` / `neighbors` / `nb` anatomy.

## Friday: Faithful Code + Proof

Manual asks for:

- Working component.
- One-page fidelity audit.
- Unresolved-value questions.
- Guardrail used.
- Before/after proof that guardrails reduced drift.

Current artifact coverage:

- Working standalone component: `src/components/ProviderCard.jsx`.
- Working integrated prototype: `Vello-Prototype-with-provider-card.html`.
- Integration script: `vello-provider-card-integration.js`.
- Guardrail: `CLAUDE.md`.
- Fidelity audit: `design-fidelity-audit.md`.
- Broader design QA: `vello-design-qa.md`.
- Before version: `before/ProviderCard-before.jsx`.

Most-used artifact/guardrail:

- The most-used and most important "skill" was `CLAUDE.md`.
- It acted as the local Claude guardrail for semantic tokens, trust semantics, data contracts, accessibility, and prototype integration.
- It was improved after failures: first to prevent token drift, then to prevent demo-shell/overlay integrations that did not fit Vello's actual screen composition.

## Final Demo Narrative

Recommended sequence:

1. Open the original Vello prototype.
2. Explain that the first component was a standalone demo, not a real integration.
3. Show `before/ProviderCard-before.jsx` and identify token/data/a11y drift.
4. Show `CLAUDE.md` as the guardrail used to reduce drift.
5. Show the integrated prototype with the `Actual` / `Mejorada` toggle.
6. Explain that `Actual` is the baseline integration and `Mejorada` is the proposed design direction.
7. Show `design-fidelity-audit.md` as proof of verification.
8. Show `vello-design-qa.md` as broader product/design critique.
9. Close with the system decisions engineering contributed: pricing model, vouch model, verification state, UI states.

## What Not To Claim

- Do not claim transcript-backed research unless actual transcripts are present.
- Do not say AI "solved" the design.
- Do not say the improved card is final design approval.
- Frame the improved card as a proposed direction that still needs designer review.
