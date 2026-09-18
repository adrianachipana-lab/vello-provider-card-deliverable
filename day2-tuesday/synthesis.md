# Tuesday Synthesis — Research themes, problem statements, and implied entities

## Evidence basis

This synthesis is based on the Vello product brief, the design system
documentation, and the prototype — not raw interview transcripts. Where a claim
rests on the brief rather than verbatim user quotes, it is marked accordingly.
No quotes were invented.

## Themes

### 1. Trust is local and attributable, not abstract

**Support:** The Vello brief centers on a "trust scales locally" bet: requesters
trust neighbors who are known in their neighborhood, not strangers with high
ratings on a city-wide platform. The prototype reinforces this by showing named
neighbor profiles with real photos, verified shield marks, and distance in
walking minutes — all signals that say "this person is nearby and known."

**Strength of evidence:** Strong at the product-vision level. The brief makes
this the core hypothesis. However, without transcripts we cannot confirm how many
real users articulated this distinction unprompted versus how many were responding
to a leading framing.

**Contradiction / complication:** The prototype also shows aggregate star ratings
prominently. If trust is truly local and attributable, the relative weight of
anonymous ratings versus verified neighbor identity needs testing. It is possible
that users rely on the star number more than the shield mark, which would weaken
the "attributable" part of the bet.

### 2. Identity verification and competence are different trust signals

**Support:** The brief and prototype separate a verified shield mark (identity
and safety checks completed) from ratings (aggregate service quality). The mark
never claims the neighbor is skilled — only that their identity has been confirmed.

**Strength of evidence:** Moderate. The design system enforces this separation
visually (shield mark on avatar vs stars in metadata row), but the brief does not
describe user research confirming that requesters understand the distinction. A
usability test would reveal whether users conflate "verified" with "good."

**Where Claude overstated confidence:** When asked to synthesize trust signals,
Claude initially described verification as "a strong trust driver that reassures
users." This overstates the evidence. The brief defines verification as an
identity check. Whether it reassures users — and how much — is an empirical
question the available evidence does not answer. The correction: verification is
a design decision with a specific, narrow meaning; its effect on user trust is
assumed, not proven.

### 3. Availability and distance are timing signals, not trust signals

**Support:** The NeighborCard shows "Available" as a coral badge and "6 min walk"
in a pill with footprints. These are not trust indicators — they answer "can I
get this service now?" and "how far away is this person?" The prototype treats
them as separate from the rating and verified mark.

**Strength of evidence:** Strong at the product-logic level. Availability is a
live state that changes; distance is a computed value from location. Neither is
about trustworthiness. But the card presents them alongside trust signals, so
users may read them as part of a holistic "should I pick this neighbor?" judgment.

**Implication caught:** The first AI-generated NeighborCard had no availability
state at all and reduced distance to a single number. This silently dropped two
signals the prototype treats as important. The correction was adding `available`
as a boolean and distance as three formats (`walk`, `blocks`, `mi`).

## Problem statements

1. **Requesters browsing neighbors need a way to distinguish identity
   verification, aggregate rating, and availability**, because those signals
   answer different questions — "is this person safe?", "are they generally
   good?", and "can I book them now?" — and collapsing them into one indicator
   hides the information requesters need to make a confident decision.

2. **Requesters comparing neighbors across service categories need pricing and
   distance that adapts to context**, because "from $24 / walk" is structurally
   different from a flat rate or hourly fee, and "6 min walk" serves a different
   user need than "0.3 mi away" — a single format for either forces either
   misleading precision or missing data.

## Entities implied by the verified themes

| Entity | Key attributes | Relationship |
| --- | --- | --- |
| Neighbor | name, photo, bio, service category | has one Verification, one Rating, one Pricing, one Availability |
| Verification | status (`verified`, `unverified`), verified date | belongs to Neighbor |
| Availability | available (boolean), updated timestamp | belongs to Neighbor |
| Rating | aggregate value, review count | belongs to Neighbor |
| Pricing | amount, unit (`per walk`, `per visit`, `flat`), currency | belongs to Neighbor + Service |
| Distance | walk (minutes), blocks (count), mi (decimal) | computed from Neighbor location + Requester location |
| Service | name, category | has many Neighbors |
| Request | description, status, location | belongs to Requester; has many Neighbor responses |
| Booking | status, date, confirmed price | belongs to Request + Neighbor |
| Neighborhood | name, boundary | has many Neighbors, many Requesters |

## Where I corrected Claude

1. **Trust confidence overstatement.** Claude described verification as a "strong
   trust driver." The evidence only shows it is a design-level separation of
   identity from competence. Whether users feel reassured is untested. Corrected
   to: "verification is defined as identity-only; its trust effect is assumed."

2. **Missing availability.** Claude's first component generation had no availability
   state at all — no `available` field, no badge rendering. This was not just a
   UI omission — it dropped a core signal the prototype shows prominently.
   Corrected by adding `available` to the data shape and rendering the coral
   `nb__avail` badge.

3. **Simplified distance.** Claude initially used a single `walkMinutes` number.
   The prototype stores three distance representations (`walk`, `blocks`, `mi`)
   and switches between them. Corrected to a multi-format distance model with
   a `distanceFormat` prop.
