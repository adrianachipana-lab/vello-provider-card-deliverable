# Unresolved Questions for the Designer

These values couldn't be traced to a documented token. Instead of guessing, we left them open.

## 1. Card elevation
Does the NeighborCard use --shadow-md, --shadow-brand (for featured), or no shadow at all?
We used shadow-md because it looked right, but the design system doesn't specify the official card elevation.

## 2. Available badge token
Should the Available badge background use var(--accent) at 10% opacity, or is there a specific token like --surface-accent-tint?

## 3. Unavailable state
When a neighbor isn't available, should the card hide entirely, show without the badge, or show with a grayed-out treatment?
Currently we show the card without the badge.

## 4. Verified mark token
The shield mark uses var(--brand-primary) for its fill. Is that the correct token, or should verification have its own token separate from brand actions?
The prototype uses var(--green-600) directly.
