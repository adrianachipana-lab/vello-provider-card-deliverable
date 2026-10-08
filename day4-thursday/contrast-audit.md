# Contrast Audit — NeighborCard + NeighborProfile

Date: 2026-10-08
Method: Computed relative luminance per WCAG 2.1 using sRGB linearization.
Tool: Node.js script calculating L = 0.2126*R + 0.7152*G + 0.0722*B, ratio = (L1+0.05)/(L2+0.05).

## Results

| Combination | Foreground | Background | Ratio | AA normal (4.5:1) | AA large (3:1) |
| --- | --- | --- | --- | --- | --- |
| `--text-strong` on `--surface-card` (name, price value) | `#1B1C18` | `#FFFFFF` | 17.13:1 | Pass | Pass |
| `--text-body` on `--surface-card` (bio, service labels) | `#3D3F37` | `#FFFFFF` | 10.69:1 | Pass | Pass |
| `--text-muted` on `--surface-card` (meta, counts) | `#6E7064` | `#FFFFFF` | 5.04:1 | Pass | Pass |
| `--text-brand` on `--surface-card` (brand text) | `#466621` | `#FFFFFF` | 6.60:1 | Pass | Pass |
| `--text-brand` on `--surface-brand-tint` (Available badge, after fix) | `#466621` | `#EBF1DB` | 5.70:1 | Pass | Pass |
| `--text-brand` on `--surface-brand-tint` (Verified badge) | `#466621` | `#EBF1DB` | 5.70:1 | Pass | Pass |
| `--brand-on-primary` on `--brand-primary` (CTA button) | `#FFFFFF` | `#557E26` | 4.77:1 | Pass | Pass |
| `--text-muted` on `--color-bg` (page-level muted text) | `#6E7064` | `#F6F2E7` | 4.51:1 | Pass | Pass |
| `--text-body` in walk pill on `--surface-card` | `#3D3F37` | `#FFFFFF` | 10.69:1 | Pass | Pass |
| `--color-bg` checkmark on `--brand-primary` shield | `#F6F2E7` | `#557E26` | 4.27:1 | Fail (normal) | Pass |
| `--rating` stars on `--surface-card` | `#F4B740` | `#FFFFFF` | 1.80:1 | Fail | Fail |

## Issues found and resolutions

### 1. Available badge text — fixed

**Before:** Used `--brand-primary` (`#557E26`, green-600) on `--surface-brand-tint` (`#EBF1DB`).
Ratio: 4.12:1 — fails WCAG AA for normal text (12px, 600 weight).

**After:** Changed to `--text-brand` (`#466621`, green-700) on `--surface-brand-tint`.
Ratio: 5.70:1 — passes WCAG AA.

The badge text is 12px at font-weight 600, which is normal text under WCAG (large text requires >= 18px regular or >= 14px bold 700+). The darker green-700 is visually indistinguishable in context but measurably meets the threshold.

### 2. Rating stars — acceptable, not actionable

Ratio: 1.80:1 — fails both AA levels.

However, the stars are **decorative icons** paired with a numeric rating value (`4.9`) that uses `--text-strong` on `--surface-card` at 17.13:1. Per WCAG 1.4.1 (Use of Color), information is not conveyed by color alone — the number provides the same information. The stars also have `aria-label="Rated X.X out of 5"` for assistive technology.

The amber color is a Vello design-system decision (`--rating` token). Darkening the stars would break the design system's visual language. Flagged as an accepted trade-off, not a defect.

### 3. Shield checkmark stroke — acceptable

The checkmark stroke inside the verified shield uses `--color-bg` (`#F6F2E7`) on `--brand-primary` (`#557E26`).
Ratio: 4.27:1 — fails AA for normal text but the checkmark is a **graphical object**, not text.

WCAG 1.4.11 (Non-text Contrast) requires 3:1 for UI components and graphical objects. At 4.27:1, this passes the applicable criterion. No change needed.

## Summary

- 9 of 11 combinations pass WCAG AA for normal text.
- 1 combination was fixed (Available badge: 4.12 -> 5.70).
- 2 combinations are acceptable exceptions (decorative stars, graphical checkmark).
- All text that conveys information meets at minimum 4.5:1 on its background.
