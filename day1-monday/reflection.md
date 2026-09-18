# Monday Reflection — Design ownership, engineering contribution, and a system decision

## What design owns at Ravn

Design owns the decision-making process that shapes what gets built and how it
behaves in a user's hands. That includes problem framing, user research
strategy, information architecture, interaction flows, visual hierarchy, and the
design system that encodes all of those decisions as reusable rules. Design sets
the ceiling: the quality of the user experience, the coherence of the brand, and
the final call on trade-offs between competing user needs.

Design is not decoration applied after engineering finishes. It is the upstream
discipline whose decisions become engineering's constraints and specifications.

## What engineering contributes across the lifecycle

Engineering does not wait for handoff to add value. At every phase of the design
process there is a concrete contribution and a common failure mode:

| Phase | Engineering contribution | Failure mode |
| --- | --- | --- |
| Discover | Surface data-availability constraints early: what the system already tracks, what it does not, and what would require new instrumentation. | Dismissing qualitative findings as anecdotes and building confidently on untested assumptions. |
| Define | Challenge problem statements that silently assume a data shape. "Requesters need trust signals" is different from "requesters need a single trust score" — the first is a problem, the second smuggles in a schema decision. | Staying silent during framing and inheriting a vague spec. |
| Architect | Map IA objects to data entities and flag mismatches: if the design treats Verification, Rating, and Availability as one "trust" concept, the data model will collapse three distinct things. | Modeling only the happy path and discovering empty, error, and permission states in production. |
| Design | Verify token usage, accessibility baselines, and interaction states against the design system before implementation, not after. | Treating design as a screenshot to reverse-engineer instead of a spec to read. |
| Validate / Hand off | Provide a fidelity audit: token drift, missing states, semantic HTML, focus order, contrast. Return unresolved values as questions, not guesses. | Shipping "it renders" as "it's done." |

## One design decision reframed as a system decision

**The neighbor data shape.**

The original Vello NeighborCard looks like a simple card: photo, name, available
badge, bio, price, distance, stars, chevron. From a UI perspective it looks like
a layout decision — put the right things in the right places and render them.
But the data behind this card carries several decisions that are really schema
decisions.

First, **photo vs initials**. The prototype uses real photos, not generated
initials from the neighbor's name. This means the data model must include a
`photo` URL field, and the system needs to handle the case where a neighbor
hasn't uploaded one yet (fallback state). An AI generating this card defaulted
to initials — a shortcut that hides a missing data requirement.

Second, **availability status**. The "Available" badge with its coral dot is not
decoration — it is a live state. The data model needs an `available` boolean
(or richer status), and the system needs to decide: is this self-reported by
the neighbor? Computed from their calendar? Updated in real time? A UI badge
implies a data pipeline.

Third, **distance formats**. The card shows "6 min walk" but the data includes
three representations: `walk` (minutes), `blocks` (count), and `mi` (decimal
miles). This means the API must return all three, or the client must compute
them. It also means the display format is a preference or a proximity-based
decision, not a fixed string. One field is not enough.

Fourth, **unit pricing**. "from $24 / walk" looks like a label, but the
`"per walk"` unit varies by service category. A cleaner charges `"per visit"`,
a handyman might charge a flat rate. The `unit` field must be flexible, and the
"from" prefix signals that the listed price is a starting point. Treating price
as `$24/walk` hardcoded hides the unit variation and the "from" semantics.

This is the pattern that repeats: many "design" decisions are system decisions
in disguise. Engineering's job is to recognize them early enough to model them
correctly, instead of papering over the complexity with a simplified shape that
breaks the moment a second service type or display format appears.

## Takeaway

Design and engineering share the product, but they own different things. Design
owns the why and the what; engineering owns the how and the whether-it-holds-up.
The collaboration works when both sides name their assumptions early and treat
the design system — tokens, contracts, states — as the shared language between
the two disciplines.
