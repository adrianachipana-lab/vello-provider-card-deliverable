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
- `design-fidelity-audit.md` reframes the neighbor data shape and distance formats as data-contract/system decisions, not just UI copy.

Still useful to add for presentation:

- A short spoken reflection: "Design owns the product/user-experience decision; engineering contributes feasibility, state modeling, data contracts, and verification."
- Best system-decision example: the neighbor data shape. A neighbor card needs photo (not initials), availability status, multiple distance formats (walk/blocks/mi), and unit pricing — each of these is a schema decision, not just a visual one.

## Tuesday: Discovery & Research

Manual asks for:

- Audited synthesis, two problem statements, and an entity list.
- At least one correction where AI overstated or invented confidence.

Current artifact coverage:

- We do not have transcripts in this repo, so we cannot truthfully claim a transcript-backed synthesis.
- `design-fidelity-audit.md` does capture product implications mentioned in the component brief: trust signals, availability state, and distance representation.

Presentation-safe framing:

- Say: "For this package, the available evidence was the Vello prototype/design-system brief, not raw transcripts."
- Do not invent research quotes.
- Use the verified product assumptions only:
  - Requesters need trust signals that are local and attributable.
  - Neighbors have different availability states that must be communicated.
  - Distance can be expressed as walk time, blocks, or miles depending on context.
  - Verification must be modeled separately from rating/reputation.

Candidate problem statements:

1. Requesters browsing neighbors need a way to distinguish identity verification, aggregate rating, and availability because those signals answer different trust and timing questions.
2. Requesters comparing neighbors across service categories need distance and pricing that adapts to context because "6 min walk" and "0.3 mi" serve different user needs, and "from $24 / walk" is different from a flat rate.

Entities implied:

- `Neighbor`
- `Verification`
- `Availability`
- `Rating`
- `Pricing`
- `Service`
- `Distance`
- `Request`
- `Booking`
- `Neighborhood`

## Wednesday: UX Architecture & Flows

Manual asks for:

- A revised flow artifact.
- A state/API contract table.
- Gaps and assumptions caught during stress testing.

Current artifact coverage:

- The implemented component and integration exposed a UX-architecture issue: the card cannot be treated as a standalone page if the product location is Home neighbor browsing.
- `vello-design-qa.md` identifies IA issues across Home, request detail, booking, profile, and admin.

Recommended demo flow to explain:

1. User lands on Home.
2. User sees search, open request, and neighbor options.
3. User browses neighbors in "Trusted on your block".
4. User taps NeighborCard.
5. System opens the neighbor's profile.

State/API implications:

| State | Trigger | UI | Data/API implication |
| --- | --- | --- | --- |
| Neighbor available | `available: true` | Show coral "Available" badge | Availability state required in data |
| Neighbor unavailable | `available: false` | No badge shown | Badge must not render without flag |
| Identity verified | Verification approved | SVG shield mark on avatar | Verification status stored separately |
| Distance format | User preference or proximity | "6 min walk" / "4 blocks" / "0.3 mi" | Three distance fields needed: `walk`, `blocks`, `mi` |
| Featured neighbor | `featured: true` | `nb--featured` class adds emphasis | Featured flag in data |

## Thursday: UI Craft, Systems & Critique

Manual asks for:

- Human critique vs AI critique.
- Token drift findings.
- Accessibility findings.
- Missing states.

Current artifact coverage:

- `design-fidelity-audit.md` is the main token/a11y audit.
- `vello-design-qa.md` is the broader product-design QA.
- `before/NeighborCard-before.jsx` preserves the initial AI-generated version.
- `src/components/NeighborCard.jsx` preserves the corrected React component.

Strongest findings to present:

- Initials instead of real photos.
- ShieldCheck icon instead of the custom SVG shield mark.
- No availability state in the first version.
- Single star instead of 5-star rendering.
- MapPin instead of Footprints icon.
- Raw hex and Tailwind classes instead of semantic tokens and Vello CSS classes.
- `<div onClick>` instead of `<button>`.

## Friday: Faithful Code + Proof

Manual asks for:

- Working component.
- One-page fidelity audit.
- Unresolved-value questions.
- Guardrail used.
- Before/after proof that guardrails reduced drift.

Current artifact coverage:

- Working standalone component: `src/components/NeighborCard.jsx`.
- Guardrail: `CLAUDE.md`.
- Fidelity audit: `design-fidelity-audit.md`.
- Broader design QA: `vello-design-qa.md`.
- Before version: `before/NeighborCard-before.jsx`.

Most-used artifact/guardrail:

- The most-used and most important "skill" was `CLAUDE.md`.
- It acted as the local Claude guardrail for semantic tokens, visual anatomy (CSS classes, icons, elements), data contracts, accessibility, and prototype integration.
- It was improved after failures: first to prevent token drift, then to enforce real photos, the SVG shield, availability state, 5-star rendering, and the correct distance icon.

## Final Demo Narrative

Recommended sequence:

1. Open the original Vello prototype.
2. Explain that the first component drifted on photos, icons, states, and data shape.
3. Show `before/NeighborCard-before.jsx` and identify token/data/a11y drift.
4. Show `CLAUDE.md` as the guardrail used to reduce drift.
5. Show the corrected component with the state toggle (Available, Not available, Perfect rating).
6. Show `design-fidelity-audit.md` as proof of verification.
7. Show `vello-design-qa.md` as broader product/design critique.
8. Close with the system decisions engineering contributed: neighbor data shape, distance formats, availability modeling, verified mark.

## What Not To Claim

- Do not claim transcript-backed research unless actual transcripts are present.
- Do not say AI "solved" the design.
- Do not say the improved card is final design approval.
- Frame the improved card as a proposed direction that still needs designer review.
