# Friday Demo Script

## One-Line Thesis

We used AI to generate and integrate a Vello ProviderCard, then treated the output as something to audit, not something to trust blindly. The main value was not the first generation; it was the verification loop: token fidelity, accessibility, data contract, and product fit inside the real Vello app.

## What We Built

- A corrected `ProviderCard` component.
- A Vello prototype copy with the component added into the Home experience.
- A floating comparison control:
  - `Actual`: baseline integration inside the provider list.
  - `Mejorada`: proposed improved card with clearer trusted-provider treatment.
- A design QA report for the broader Vello app.
- A reusable `CLAUDE.md` guardrail to reduce future drift.

## Demo Flow

1. Start with the original problem.

   "The first version rendered, but it was not faithful enough to Vello. It looked like a component page, not part of the app."

2. Show the before.

   Open `before/ProviderCard-before.jsx`.

   Call out:

   - Raw primitive colors instead of semantic tokens.
   - Custom shadow/border values.
   - Vouches passed as prewritten strings.
   - Pricing treated as one simple label.

3. Show the guardrail.

   Open `CLAUDE.md`.

   Say:

   "This was the artifact we used the most. It became the local design-system skill: semantic tokens, trust semantics, data contract, accessibility, and finally integration rules."

4. Show the corrected component.

   Open `src/components/ProviderCard.jsx` or the local app.

   Call out:

   - `verificationStatus` instead of a generic trusted boolean.
   - `vouches: [{ neighborName, completedBookings }]`.
   - pricing shape for `fixed`, `range`, and `quote`.
   - semantic CSS tokens.

5. Show the Vello integration.

   Open:

   `http://127.0.0.1:5174/vello-provider-card-deliverable/Vello-Prototype-with-provider-card.html`

   Use the floating toggle:

   - `Actual`: the safe baseline. The card behaves like a normal provider-list card.
   - `Mejorada`: the proposed improved treatment. It is easier to find, has clearer vouch hierarchy, and a stronger CTA.

6. Explain the iteration.

   "The first integration technically worked but failed design: it was a launcher and overlay. Then we put it near the top, but it took over the screen. The guardrail had to be updated: don't create a demo surface; use Vello's real composition first."

7. Show proof.

   Open `design-fidelity-audit.md`.

   Call out:

   - token drift found and fixed.
   - a11y issues found and fixed.
   - data-contract fixes.
   - unresolved questions for design.

8. Show product critique.

   Open `vello-design-qa.md`.

   Call out:

   - Home has too many competing surfaces.
   - trust signals need a consistent pattern.
   - booking should be lighter.
   - admin should not live casually inside requester profile.

## Prompt / Guardrail Iteration History

### Iteration 1: Generate a card

Prompt goal:

Create a Vello ProviderCard from the design tokens.

Result:

The card rendered, but it drifted:

- Used raw/primitive colors.
- Had custom shadows and borders.
- Treated vouches as strings.
- Assumed every provider has a fixed price.

What changed:

We added stricter guardrails in `CLAUDE.md`: semantic tokens only, explicit trust semantics, structured vouch data, and pricing as a discriminated model.

### Iteration 2: Make it run

Prompt goal:

Show the component locally.

Result:

It ran as its own Vite page. Technically correct, but wrong for the assignment because Vello was an existing app/prototype.

What changed:

We stopped treating the card as a standalone demo and moved toward integrating it into the original Vello prototype.

### Iteration 3: Add it to Vello

Prompt goal:

Add the component into `Vello-Prototype.html`.

Result:

First attempt used a launcher/overlay. It worked, but still felt separate from Vello.

What changed:

We updated `CLAUDE.md` with an integration rule: match native screen composition first; do not use overlays, floating launchers, or demo shells unless the product actually calls for them.

### Iteration 4: Put it inside Home

Prompt goal:

Make the card appear inside the app.

Result:

It appeared, but as a large standalone `Trusted provider` section. It was too dominant and did not fully respect Home hierarchy.

What changed:

We made a baseline version that uses Vello's existing provider-card anatomy: `section`, `neighbors`, `nb`, `nb__body`, `nb__meta`, `nb__tap`.

### Iteration 5: Compare actual vs improved

Prompt goal:

Show two versions so the design conversation is visible.

Result:

We added a floating toggle:

- `Actual`: baseline integration.
- `Mejorada`: proposed improved design treatment.

What changed:

The demo can now show not only the final result, but the design reasoning: where the component fits, where hierarchy improves, and what still needs designer review.

## Which Artifact We Used Most

The most-used artifact was `CLAUDE.md`.

Why:

- It started as a component guardrail.
- It became the rulebook for token fidelity.
- It captured the trust/data model rules.
- It captured accessibility requirements.
- It was updated after integration failures, which proves the prompt/skill improved through use.

Short demo line:

"The most valuable AI artifact was not the generated code. It was the guardrail. Every time the output failed, we made the guardrail more specific, then regenerated or corrected against it."

## What Engineering Contributed

- Caught token drift.
- Turned visual copy into data-contract requirements.
- Identified missing UI states.
- Verified accessibility requirements.
- Detected that a component can render correctly but still fail product fit.
- Created a repeatable guardrail so the next AI-generated component starts closer to the design system.

## Closing

This is the key lesson:

AI helped us move fast, but design fidelity came from verification. The better result came from asking: does this use the system, does it match the flow, does the data model support it, and does it belong in Vello?
