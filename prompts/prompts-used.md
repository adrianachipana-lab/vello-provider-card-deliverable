# Prompts Used — NeighborCard

## Step 1: Generate the component

**Context loaded:** Vello Design System (tokens), Product Brief, CLAUDE.md v1

**Prompt:**
"Generate a NeighborCard for Vello using the design system tokens. The card shows: neighbor photo with verified mark, name, Available badge, bio, pricing with 'from $X / unit', distance with footprints icon in a pill, 5-star rating, and a navigation chevron. It's a tappable button. Use React + Lucide icons. Follow the CLAUDE.md rules."

**Result:** Component rendered but with token drift, Lucide ShieldCheck instead of native SVG shield, no availability state, div instead of button.

**What we learned:** The first guardrail was too weak. "Don't invent" isn't specific enough.

---

## Step 2: Audit token by token

**Context loaded:** The generated component (bad version), full design system, CLAUDE.md v2 with semantic tokens

**Prompt:**
"Compare this NeighborCard property by property against the Vello Design System. For each visual value (color, font, spacing, radius, shadow, border, icons), tell me: what semantic token or pattern it should use, what the component used, whether it matches or drifted, and what's the correction. Don't accept 'looks similar' — it has to be the exact token and the native pattern."

**Result:** Found 11 properties, 7 with drift. All corrected to semantic tokens. This was where most things got fixed.

**What we learned:** "Looks similar" is the most dangerous phrase. A color can match visually but be hardcoded instead of referencing the token.

---

## Step 3: Find product and accessibility errors

**Context loaded:** Corrected component, CLAUDE.md v3 with a11y and trust rules, Product Brief

**Prompt:**
"Review this NeighborCard against the CLAUDE.md accessibility rules and WCAG standards: is the card a button or div? Tap targets minimum 44px? Focus-visible states? prefers-reduced-motion? Correct ARIA usage? Does the Available badge rely on color alone? Does the chevron have aria-hidden? Do the stars have aria-label? Does the photo have alt text?"

**Result:** Found 5 issues: div instead of button, chevron without aria-hidden, rating without aria-label, photo without alt, no reduced-motion support. All corrected.

**What we learned:** Accessibility isn't opinion — it's measurable rules. Engineering can and should check these before shipping.

---

## Step 4: Integrate into the Vello prototype

**Context loaded:** Vello Prototype HTML, CLAUDE.md v4 with integration rules

**Prompt:**
"Integrate the NeighborCard into the Vello HTML prototype. Don't use an overlay, launcher, or demo surface. Insert the card using Vello's native classes: nb, nb__avatar, nb__vmark, nb__body, nb__top, nb__name, nb__avail, nb__bio, nb__price, nb__meta, nb__walk, nb__tap. The card should look like another neighbor in the Trusted on your block list, not an external component."

**Result:** First attempt was an overlay (failed — felt outside the app). Second was a large standalone section (dominated the screen). Third used the native nb structure and finally fit in.

**What we learned:** A component can render perfectly and still fail as a product. Integration rules had to go into the guardrail.

---

## Step 5: Generate the design fidelity audit

**Context loaded:** Before component, after component, full design system, CLAUDE.md final version

**Prompt:**
"Compare the before and after versions of this NeighborCard. For each property, document: what the design system expects, what the first version generated, the judgment (drift/correct/partial), and the correction applied. Also list accessibility findings with the rule broken and the fix. End with any values that can't be traced to a documented token — list those as questions for the designer."

**Result:** Complete audit with 11 properties, 7 drift findings, 5 a11y fixes, and 4 open questions.
