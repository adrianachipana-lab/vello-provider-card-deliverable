# Vello Design QA

Date: 2026-09-16
Scope: Original Vello prototype plus the integrated ProviderCard inside the requester flow.

## Executive read

Vello already has a strong visual language: warm neighborhood palette, rounded but not toy-like surfaces, good typography pairing, and a clear mobile-first service flow. The main opportunity is not a full redesign. It is tightening hierarchy and density so the app feels less like a beautiful prototype and more like a usable local-services product.

The highest-impact improvements are:

1. Reduce competing surfaces on Home.
2. Make trust signals more systematic across provider cards, request replies, and profile screens.
3. Strengthen booking decision hierarchy.
4. Separate requester, provider, and admin modes more clearly.
5. Turn prototype-only feedback into realistic product states.

## Findings

### 1. Home has too many high-emphasis modules

The Home screen currently stacks a large greeting, search, category chips, open request, provider list, map action, and popular services. Each module is visually polished, but the page has several "main things" competing for attention.

Design risk: users may not know whether Vello wants them to search, open their existing request, book a neighbor, or browse categories.

Recommendation:

- Keep search and open request as the two top-priority elements.
- Move category chips closer to the provider list as filters, not as a separate hero-like module.
- Make the integrated ProviderCard live inside `Trusted on your block`, not as its own top-level promotional section once QA is complete.
- Use one primary action path per viewport: search/request on top, provider browse below.

### 2. Provider trust signals are visually inconsistent

Trust appears as ratings, verification badges, vouches, available status, distance, and neighbor response counts. These signals are good individually, but each screen presents them differently.

Design risk: Vello's biggest product promise is trust, but the UI makes users re-interpret trust on every screen.

Recommendation:

- Define a trust row pattern: `Verified`, `distance`, `rating`, `named vouch`.
- Use the same order on Home provider cards, request responders, and provider profile.
- Keep identity verification visually separate from popularity/rating.
- Avoid oversized verification chips inside compact cards; use a small badge or shield mark plus text only when space allows.

### 3. Booking flow has good structure but too much form weight

The booking screen is comprehensive: provider summary, date/time, repeat, address, notes, and price summary. The risk is that it feels heavier than the local-service context requires.

Design risk: users may hesitate at confirmation because the screen reads like checkout instead of scheduling a neighbor.

Recommendation:

- Collapse optional fields like access notes and neighbor note behind lighter rows.
- Put the total in a sticky bottom confirmation area.
- Let date/time read as the primary decision, then address, then optional details.
- Use helper copy sparingly; current labels already carry most of the meaning.

### 4. Request detail mixes request summary and provider selection well, but hierarchy can improve

The request screen has a clear open/closed state and responders. However, the request details grid takes a lot of attention before the user reaches responders.

Design risk: when a user returns to this screen, they likely care more about replies than the original request metadata.

Recommendation:

- After first visit, compress the request summary into a smaller card.
- Make responder cards the dominant content.
- Add a stronger "best next action" affordance on each responder: book, message, or compare.
- Keep close-request as a lower-emphasis destructive action.

### 5. Profile and account settings feel product-real, but some rows are prototype noise

Profile includes useful areas: open request, stats, account rows, notification settings, and admin entry. The admin entry inside profile is useful for demoing but weak as product IA.

Design risk: requester-facing profile mixes consumer account concepts with internal moderation/admin concepts.

Recommendation:

- Hide admin entry behind a role switcher or workspace/account mode.
- Keep requester profile focused on identity, saved neighbors, payment, addresses, notifications.
- If admin must remain for demo, label it as "Admin demo" or put it in prototype chrome, not account settings.

### 6. Admin mode is visually strong but feels like a separate product

Admin desktop and mobile are dense, purposeful, and much more operational than the requester flow. That is good. The issue is the transition from consumer Vello into admin is abrupt.

Design risk: the prototype may appear to be demonstrating two products unless the role switch is explicit.

Recommendation:

- Add a role/context label before entering admin: "Moderation workspace".
- Use a different shell treatment or entry point.
- Keep admin visual density; do not make it as soft as the requester app.

### 7. Empty and success states are present, but they read as prototype placeholders

There are empty states and toasts, which is excellent. Some messages say things like "isn't part of this prototype".

Design risk: those messages break immersion during design review.

Recommendation:

- Replace prototype-only toasts with product-real language.
- Example: "Map view is next up" becomes "Map view unavailable in this demo" only if demo clarity matters, or "Showing nearby providers as a list" for product realism.
- Use success states to reinforce trust: "Request sent to Tomas. You will only be charged after booking is confirmed."

### 8. Visual rhythm is warm but sometimes over-carded

The app uses cards well, but some screens rely on many framed modules in sequence. This can make the interface feel heavier than necessary.

Design risk: Vello's friendly brand starts to feel busy.

Recommendation:

- Use full-width unframed section bands for grouping.
- Reserve raised cards for tappable providers, bookings, and important request containers.
- Reduce elevation on secondary cards.
- Avoid adding standalone new sections for individual components unless the section has product meaning.

## ProviderCard QA result

The integrated ProviderCard initially failed design fidelity twice:

1. It appeared as a launcher/overlay, which made it feel outside the app.
2. It then appeared as a large standalone section, which made it overpower the Home screen.

The current direction is better: it uses Vello's native provider-list anatomy. The next refinement should be placing it back into `Trusted on your block` after review, so it behaves as one provider among others rather than a highlighted QA artifact.

## A/B design comparison added

The integrated prototype now includes a floating comparison control:

- `Actual`: inserts the ProviderCard into the existing `Trusted on your block` list with minimal visual changes. This shows the safest baseline integration.
- `Mejorada`: keeps the card easy to find in a `Trusted provider` section, but gives it a more intentional Vello treatment: contained size, stronger vouch hierarchy, clearer CTA, and less "raw injected card" feeling.

Use `Actual` to compare against the existing provider-list pattern. Use `Mejorada` to judge the proposed improved design direction.

## Recommended next pass

1. Move ProviderCard into the existing `Trusted on your block` list permanently.
2. Standardize trust rows across provider cards and responder cards.
3. Compress Home so search/open request/provider browse are the only primary surfaces.
4. Lighten booking by making optional fields progressive.
5. Move admin out of requester profile into a role/demo switch.

## Design bar for future components

Future Vello components should pass these checks before implementation is accepted:

- Does it live in a real product location, not a demo surface?
- Does it reuse an existing screen pattern before adding new layout CSS?
- Does it preserve Home hierarchy instead of creating another top-level module?
- Does it express trust using the same vocabulary as other provider surfaces?
- Does it look correct inside a 375px mobile frame without becoming the whole screen?
