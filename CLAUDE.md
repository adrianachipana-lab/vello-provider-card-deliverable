# CLAUDE.md — Vello component guardrails (v3.1)

Scope: `ProviderCard`, its integration into the Vello prototype, and any Vello
component derived from it. Earlier versions are kept in `before/CLAUDE-v1.md` and
`before/CLAUDE-v2.md`; the "Change log" at the end says which failure produced each rule.
`guardrail-evolution.md` explains the history in Spanish.

Every rule here exists because an earlier AI pass got it wrong. When a rule and a
request conflict, stop and say so instead of quietly choosing one.

---

## 0. Workflow: run this every time, in order

1. **Look before building.** Before writing any code, check whether the design
   system **already ships the component** (§1: DS bundle component list), then read
   how the prototype uses it. List what the native version uses: component,
   classes, tokens, data fields, icons, copy pattern, states. Where the DS and the
   prototype disagree, write the disagreement down (§10).
2. **Map the data.** Compare the fields the UI needs with the prototype's data
   (§4). Every field you need is one of: *exists*, *renamed*, *missing*, or
   *proposed*. A proposed field is a schema question to flag (§10). Never mock it
   silently.
3. **Build from one source.** Data and copy rules live in `src/providerModel.js`.
   Both `src/components/ProviderCard.jsx` and `vello-provider-card-integration.js`
   import it. Never fix only one renderer, and never add a second copy of the data.
4. **Verify with numbers.** Run the Definition of Done (§9) in a browser. Measure
   contrast, avatar size, card height, and tap targets. Don't just reason about them.
5. **Record.** Update `design-fidelity-audit.md` with one row per property you
   checked (property · expected token/rule · before · after · measured · judgment).
   Add anything you couldn't resolve to §10. Never resolve it with a guess.

If a request is "make it better" or "fix it", that still means steps 1–5. A visual
improvement that skips step 1 has failed before it starts.

---

## 1. Source of truth: where to look

The supplied Vello design system and prototype are authoritative. A value or
pattern counts only if you can point to where it comes from. **When they conflict,
the DS component wins** unless it fails accessibility. Record the conflict in §10.

| Need | Where it lives |
| --- | --- |
| **List of DS components** (check first) | `@ds-bundle` header comment at the top of `extracted-vello-scripts/c7559a46-*.js` |
| DS `ProviderCard`, `Avatar`, `Badge`, `Rating`, `Button`, `Tag` | same file, `// components/...` sections (`window.VelloDesignSystem_182a1b`) |
| Tokens (color, type, space, radius, shadow, motion) | `:root` in `Vello-Prototype-with-provider-card.html` (grep `--`) |
| Home list card anatomy and CSS | `.nb`, `.nb__*` rules in the prototype HTML |
| `NeighborCard`, Home list, category filter | `extracted-vello-scripts/4e581db3-*.js` |
| `AvatarVerified`, `VerifiedMark`, `Chev`, `I`, `DIST_ICON`, `distanceLabel`, `NEIGHBORS`, `CATEGORIES` | `extracted-vello-scripts/f69c988e-*.js` (`window.VelloFlow`) |
| Prototype tweaks (distance format, featured glow) | `extracted-vello-scripts/be5f5683-*.js` (`TWEAK_DEFAULTS`) |

**Read the source before you ask the designer.** A question is only allowed if the
answer isn't in the files above. (v2 asked about card elevation and avatar color
when the source already answered both. v3 almost missed that the DS ships a
`ProviderCard`.)

---

## 2. Tokens

- Component CSS uses **semantic tokens only**. Primitives (`--forest-800`,
  `--paper`, `--green-200`, …) and raw `rgba()`/hex belong only in the
  token-definition block. This also applies to injected `<style>` strings, inline
  SVG fills, and "demo-only" chrome.
- When a DS component uses a primitive directly (e.g., Avatar fallback
  `--green-200`), add a **component token** in the token layer with a comment
  naming its source (`--avatar-fallback-bg: var(--green-200); /* DS Avatar */`).
  Don't put the primitive in component CSS.
- Sizes must be tokens too. Font sizes use `--text-*` (12/14/16/18/20/24/30…),
  spacing uses `--space-*` (4px steps), radii use `--radius-xs…2xl` (36px =
  `--radius-2xl`). The known exceptions with no DS token are border widths
  (1/1.5px), the 2px hover lift, and the 2px focus outline. Keep the native values
  and don't invent tokens for them.
- Known traced decisions (use these, don't re-ask):

| Property | Token / treatment | Source |
| --- | --- | --- |
| Card surface / border / radius | `--surface-card`, `1.5px solid var(--border-default)`, `--radius-lg` | `.nb`, DS `ProviderCard` |
| Card elevation at rest | none | `.nb`, DS `ProviderCard` |
| Card hover | `--shadow-md`, `translateY(-2px)`, transparent border | `.nb:hover`, `.vl-provider--interactive:hover` |
| Avatar | 64px (`lg`). Photo, or fallback `--green-200` bg / `--green-800` text (via component tokens). **Not** forest | DS `Avatar` |
| Verification | `VerifiedMark` shield on the avatar, `--brand-primary` fill | `AvatarVerified` |
| "Available" | DS `Badge` brand: `--text-brand` on `--brand-primary-tint`, dot `currentColor` | DS `ProviderCard` → `Badge variant="brand"` |
| Distance pill | `--text-brand` on `--green-50`, border `--green-200` (component tokens) | `.nb__walk` |
| Rating | DS `Rating size="sm"`: 5 stars `--rating`, value mono `--text-strong` | DS `Rating` |
| Focus (interim) | `outline: 2px solid var(--border-focus); outline-offset: 2px` **plus** `box-shadow: var(--focus-ring)` | §8 / §10 Q1 |

## 3. Typography roles

- Bricolage Grotesque (`--font-display`): provider names and section titles only.
- Hanken Grotesk (`--font-sans`): all body, label, badge, and button copy,
  **including words that sit next to numbers** ("min walk", "/ walk").
- JetBrains Mono (`--font-mono`): numeric values only (`$18`, `6`, `4.9`). Wrap
  the number in its own element so the surrounding words stay in Hanken. The
  native `.nb__walk` and "from $24" set the whole string in Mono. That's prototype
  drift (§10 Q8), don't copy it.
- Only use weights that are loaded.

## 4. Data contract: prototype vs. ProviderCard

`src/providerModel.js` is the contract. Field names follow the prototype's
`NEIGHBORS` record wherever one exists. **Never present a proposed field as if it
exists.**

| UI need | Prototype field | ProviderCard field | Status |
| --- | --- | --- | --- |
| Photo | `photo` | `photo` (DS initials fallback when null) | exists. Fixtures have no approved asset (§10 Q9) |
| Description | `bio` | `bio` | exists |
| Category | `cat` | `cat` | exists. The card follows the Home filter |
| Rating | `rating`, `reviews` | `rating`, `reviews` | exists |
| Distance | `walk`, `blocks`, `mi` + tweak `distanceFormat` | same | exists. Follows the native cards' format |
| Availability | `available` | `available` | exists |
| Verification | `verified: boolean` | `verificationStatus: "identity_verified" \| "unverified"` | **proposed** (§10 Q3/Q4) |
| Price | `price` + `unit` (always "from") | `pricing: fixed \| range \| quote` | **proposed** (§10 Q6) |
| Vouches | — | `vouches: [{ neighborName, completedBookings }]` | **proposed new entity** (§10 Q5) |

Copy rules (implemented in `providerModel.js`, don't re-implement them in a renderer):
- Price: `fixed` → `$18 / walk`; `range` → `$45–$70 / visit`; `quote` →
  "Quote required". Never "from".
- Vouch: `<Name> booked <Provider first name> <N times | once>`, using the vouch
  with the most completed bookings.
- Names keep their diacritics (Tomás).

## 5. Trust semantics

- **One verification signal per card.** In list cards it's the `VerifiedMark` on
  the avatar. A text chip "Identity verified" belongs only on detail screens.
  Never show both.
- `VerifiedMark` = identity/safety only. Never skill, reliability, or a merged
  trust score.
- `Rating` = aggregate. `TrustLine` = named, attributable vouch. Keep them
  separate. Never invent a name or show "0 neighbors". Use the neutral empty state
  ("No recognizable neighbor vouches yet.").
- **Compact list card shows one named vouch, on one line.** "· N other neighbors
  vouched" pushed the card to 192px. The other count (`otherCount`) is for detail
  screens (§10 Q7).
- **Don't repeat a signal.** No "Vouched by neighbors" pill next to a named vouch.
- Order inside the list card: avatar + mark → name + availability → bio (1 line)
  → vouch line → price → distance + rating.

## 6. Integration and layout

- **Reuse the native component, don't imitate it.** The prototype integration
  renders with `VelloFlow.AvatarVerified`, `VelloFlow.Chev`, `VelloFlow.I`
  (lucide), DS `Rating`, and native `.nb__*` classes. A copied class name doesn't
  bring the component's CSS or behavior (a fake `vl-avatar--lg` span rendered at
  21×20px).
- The standalone React card in `src/` is a **mirror** for review outside the
  bundle. It must match the native anatomy and measurements, using its own token
  layer.
- Placement: inside **"Trusted on your block"**, **after the first native card**
  (the featured neighbor keeps the top). Search, categories, and the open request
  stay above it. Hide the card when the active category doesn't match `cat`.
- Size budget: in the 375px frame the card's height must be within **±15% of a
  native `.nb`** (native ≈ 155px, so ≤ 178px). Measure every state.
- One tap target per card. The whole card is a `<button>`. No nested CTA.
  Everything inside it must be phrasing content (`span`, not `p`/`h*`).
- Prototype mechanics: the bundled HTML **replaces its `<html>` element after
  load**. Observe `document`, not `document.documentElement`, and re-mount when
  React re-renders the list. Lucide swaps `<i>` for `<svg>`, so re-render by
  replacing the host, not by diffing in place. The integration is an ES module:
  serve over http (`npm run dev`), don't open the file directly.
- Demo-only controls are allowed but follow §2 and §8, default to the baseline
  state, use the UI's language, and must not cover the phone frame.

## 7. States

| State | Required treatment | Fixture |
| --- | --- | --- |
| default | no elevation | all |
| hover | `.nb:hover` treatment | all |
| active | press feedback, respecting reduced motion | all |
| focus-visible | interim focus treatment (§2) | all |
| available | DS brand `Available` badge | `vouched`, `noVouch` |
| unavailable | badge absent; the absence is the information. No gray-out | `unavailable` |
| no vouches | neutral empty sentence | `noVouch` |
| no ratings | "No ratings yet" (not 0.0, not empty stars) | `quote` |
| unverified | no mark (pending §10 Q4) | `quote` |
| fixed / range / quote pricing | §4 copy rules | `vouched` / `noVouch` / `quote` |
| distance walk / blocks / mi | icon + words per `DIST_ICON` | React toggle, prototype tweak |
| error / loading | not designed: flag before building (§10 Q10) | — |

## 8. Accessibility and measured contrast

Requirements: semantic HTML, 44×44px minimum targets (demo chrome included),
`:focus-visible` on everything, `role="status"`/`aria-live="polite"` for
confirmations, decorative icons `aria-hidden="true"`, meaningful icons/marks with
`role="img"` + `aria-label`, `prefers-reduced-motion` respected, and keyboard
tested (Tab, Shift+Tab, Enter, Space). A list card is one `<button>` whose
accessible name starts with the provider name (native pattern). Headings belong
on non-interactive cards and detail screens.

**Contrast must be measured, never assumed.** Text needs 4.5:1 (3:1 for ≥18.66px
bold / 24px). Focus indicators, meaningful icons, and component boundaries that
are the only state cue need 3:1. Measured 2026-10-07:

| Pair | Ratio | Verdict / where |
| --- | --- | --- |
| `--text-strong` / `--surface-card` | 17.13 | pass: name, price |
| `--text-body` / `--surface-card` | 10.69 | pass: bio, vouch line, demo control |
| `--text-brand` / `--surface-card` | 6.60 | pass: vouch name |
| `--avatar-fallback-fg` / `--avatar-fallback-bg` | 6.60 | pass: initials |
| `--text-brand` / `--distance-pill-bg` | 6.13 | pass: distance |
| `--text-brand` / `--brand-primary-tint` | 5.70 | pass: Available badge (DS) |
| `--text-muted` / `--surface-card` | 5.04 | pass: price unit, "No ratings yet" |
| `--brand-primary` mark / `--surface-card` | 4.77 | pass: verified mark |
| `--border-focus` outline / `--surface-card` | 4.77 | pass: interim focus |
| `--brand-on-primary` / `--brand-primary` | 4.77 | pass (thin): pressed toggle |
| `--text-muted` / `--color-bg` | 4.51 | pass (edge) |
| `--text-muted` / `--surface-sunken` | 4.32 | pass as icon: chevron (React) |
| `--border-focus` outline / `--color-bg-subtle` | 3.97 | pass: focus on demo panel |
| `--text-muted` / `--color-bg-subtle` | 4.19 | **fail for text**: don't use |
| `--coral-700` / `--coral-100` (prototype "Available") | 4.10 | **fail**: replaced by DS brand badge |
| `--text-subtle` / `--surface-sunken` (native chevron) | 2.82 | **fail**: native drift, §10 Q8 |
| `--rating` star / `--surface-card` | 1.80 | fail. OK only because the value is shown as text |
| `--focus-ring` alone / `--surface-card` | 1.52 | **fail**: why the interim outline exists, §10 Q1 |
| `--border-strong` / `--surface-card` (toggle edge) | 1.47 | OK: fill (4.27) + label carry the state |

For any new pairing, compute the ratio and add a row.

## 9. Definition of Done (paste the results into the audit)

- [ ] §0 step 1 done: DS component list checked; native patterns reused, written down.
- [ ] Both renderers import `src/providerModel.js`. No second data copy.
- [ ] Grep is clean: no primitives, hex, or `rgba()` outside the token block / in injected CSS.
- [ ] No "from $" copy.
- [ ] Avatar 64×64 (measured). Exactly one verification signal. No repeated vouch signal.
- [ ] Distance follows walk/blocks/mi. Availability badge renders (DS brand).
- [ ] Every state ≤ 178px tall (measured).
- [ ] Card inside "Trusted on your block", 2nd position, hidden on non-matching category.
- [ ] Keyboard: Tab, Shift+Tab, Enter, Space. Focus visible (measured outline).
- [ ] Contrast recorded for every pairing used.
- [ ] `npm run build` passes. Screenshots at 375px saved.
- [ ] New open questions added to §10.

## 10. Open questions for design (don't resolve these by guessing)

1. `--focus-ring` alone measures 1.52:1. An interim solid `--border-focus` outline
   (4.77:1) was added on top of the ring. Should the DS focus token change?
2. The prototype's Home `.nb__avail` (coral, 4.10:1) contradicts the DS
   `ProviderCard`, whose Available badge is `Badge variant="brand"` (5.70:1). The
   integration aligns `.nb__avail` to the DS via one removable style block
   (`#vlpc-ds-alignment`). Confirm the DS version.
3. The native mark's label is "Background-checked" and ours says "Identity
   verified". Same check, or two levels?
4. Unverified provider: no mark (current), or an explicit "Not verified" label?
5. Is the vouch entity (`neighborName`, `completedBookings`) approved for the
   provider API? Who counts as a "recognizable" neighbor?
6. Is `pricing: fixed | range | quote` approved? Today's model always says "from".
7. Compact card shows only the strongest named vouch. Is the count of other
   vouches needed on the list, or only on the detail screen?
8. Native drift found while integrating: `.nb__walk` and "from $X" set words in
   Mono; the native chevron is 2.82:1; native `.nb` has no `:focus-visible` style;
   card padding 15px and meta gap 9px are off the 4px scale. Fix in the prototype,
   or treat as accepted?
9. Fixture providers have no approved photo asset, so they show the DS initials
   fallback. Supply photos or confirm fallback for providers without one.
10. The DS ships `ProviderCard` (separate Book button, price on the right, miles
    only) while Home uses `NeighborCard` (whole card tappable). Which is canonical
    for lists? Error/loading states are designed for neither.

---

## Change log: failure → rule

| Ver. | What the AI did wrong | Why it happened | Rule added |
| --- | --- | --- | --- |
| v1→v2 | Card on `paper` instead of `--surface-card`; invented `#E7EFDC`, custom shadows/borders | v1 only listed six raw colors | §2 semantic tokens only |
| v1→v2 | Vouches as sentences; one flat `priceLabel` | No data contract | §4 structured vouches, discriminated pricing |
| v2 | Launcher/overlay, then an oversized top section | Built a demo surface instead of placing it in the product | §6 placement |
| v2→v3 | Initials instead of photos; 21×20px avatar under the shield | Imitated DS class names | §6 reuse don't imitate; §9 measure |
| v2→v3 | Generic chip **plus** native mark | Didn't read `AvatarVerified` | §5 one verification signal |
| v2→v3 | No Available badge; only "min walk" + map-pin | Didn't compare data with `NEIGHBORS` | §0 step 2, §4 mapping |
| v2→v3 | Integration hard-coded `price: 18`, "from $18", "Tomas" | Two implementations | §0 step 3, shared model, copy rules |
| v2→v3 | "Mejorada" above categories, 246px, redundant pill, nested CTA | "Improve" read as "add emphasis" | §5, §6 size budget, single tap |
| v2→v3 | Primitives / raw rgba / literal sizes in injected CSS | Rule didn't cover demo CSS or sizes | §2 extended |
| v2→v3 | Shadow at rest; wrong avatar token; asked design anyway | Asked instead of reading | §1, §2 traced table |
| v2→v3 | Audit had no numbers; focus ring and Available failed unnoticed | "Verify contrast" with no method | §8 table, §9 DoD |
| v3→v3.1 | Nearly rebuilt a card the DS already ships; avatar planned on forest | §1 pointed at the prototype, not the DS component list | §0 step 1 + §1 "check DS list first", DS wins |
| v3→v3.1 | First integrated pass measured 192px | "1 other neighbor vouched" wrapped | §5 compact card = one vouch |
| v3→v3.1 | Integration didn't render at all on first try | Bundler replaces `<html>`; observer orphaned | §6 prototype mechanics |
| v3→v3.1 | `<p>` inside the card `<button>` | List card semantics weren't stated | §6 phrasing content, §8 list-card name |
| v3→v3.1 | Demo control covered the phone frame | No placement rule for demo chrome | §6 demo controls |
