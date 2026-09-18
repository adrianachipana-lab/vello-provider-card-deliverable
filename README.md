# Vello NeighborCard — Friday demo package

This package demonstrates the full AI-assisted design-fidelity loop:

1. Review the initial AI output in `before/`.
2. Compare it with the Vello semantic design tokens.
3. Read `design-fidelity-audit.md` for the property-by-property judgment.
4. Compare the original guardrails with the corrected root `CLAUDE.md`.
5. Run the corrected component and switch among its documented states.

## Run locally

```bash
npm install
npm run dev
```

For a production verification:

```bash
npm run build
npm run preview
```

## Suggested demo order

- Show the initial component and guardrails.
- Point out one visual-anatomy failure (initials vs photos) and one accessibility failure (div vs button).
- Explain why the data shape required corrections (availability, distance formats, photo URL).
- Show the revised guardrails.
- Run the corrected component and demonstrate its states plus keyboard focus.
- Close with the unresolved questions for the designer.
