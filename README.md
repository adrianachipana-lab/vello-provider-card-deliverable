# Vello ProviderCard — Friday demo package

This package demonstrates the full AI-assisted design-fidelity loop:

1. Review the initial AI output in `before/`.
2. Compare it with the Vello semantic design tokens.
3. Read `design-fidelity-audit.md` for the property-by-property judgment.
4. Compare the earlier guardrails (`before/CLAUDE-v1.md`, `before/CLAUDE-v2.md`) with
   the current root `CLAUDE.md` (v3.1). `guardrail-evolution.md` explains what the AI got
   wrong at each step and which rule fixed it.
5. Run the corrected component and switch among its four documented states and three distance formats.

## Run locally

```bash
npm install
npm run dev
```

Then open:

- `http://localhost:5173/`: the standalone ProviderCard mirror.
- `http://localhost:5173/Vello-Prototype-with-provider-card.html`: the card inside the Vello
  prototype ("Trusted on your block", second card). Use the "ProviderCard state" control at the
  top-left. The integration is an ES module, so it needs the dev server and won't run from `file://`.

Both renderers read `src/providerModel.js`.

For a production verification:

```bash
npm run build
npm run preview
```

## Suggested demo order

- Show the initial component and guardrails.
- Point out one semantic-token failure and one accessibility failure.
- Explain why vouches and pricing required data-contract changes.
- Show the revised guardrails.
- Run the corrected component and demonstrate its four states plus keyboard focus.
- Close with the unresolved questions for the designer.
