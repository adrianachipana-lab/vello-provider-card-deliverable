# Human vs AI Critique — NeighborCard

## What I found first (human pass, no AI)
- Claude used initials instead of real photos — the prototype clearly uses photos
- The verified mark was a generic Lucide icon, not Vello's custom shield SVG
- Only 1 star rendered instead of 5
- No "Available" badge at all — Claude skipped the availability state
- The card was a div, not a button — broke keyboard navigation
- MapPin icon for distance instead of Footprints

## What Claude found (AI pass)
- Token drift across 7 properties: surface, border, shadow, text hierarchy, rating color, focus ring, distance pill border
- Missing prefers-reduced-motion media query
- Chevron missing aria-hidden
- Rating stars missing aria-label
- Avatar photo missing alt text
- Price unit not flexible enough for different service types

## What each pass uniquely caught
- **Human caught visual/structural errors**: wrong icons, wrong element type, missing states. These require knowing what the real Vello prototype looks like — Claude doesn't have that visual context.
- **AI caught systematic token issues**: went through every CSS property and checked if it mapped to a semantic token. More thorough on the mechanical audit than I would have been manually.
- **Both missed initially**: the distance format issue (3 formats vs 1) only came up when we looked at the data model, not the visual output.

## Resolution
Every disagreement was resolved against the design system or the prototype, not by opinion. If neither source answered the question, it went to the "questions for designer" list.
