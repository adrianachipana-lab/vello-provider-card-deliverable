import { useState } from "react";
import { ProviderCard } from "./components/ProviderCard";

const examples = {
  vouched: {
    id: "provider-tomas",
    name: "Tomás Rivera",
    initials: "TR",
    service: "Dog walking",
    verificationStatus: "identity_verified",
    rating: 4.9,
    ratingCount: 26,
    walkMinutes: 6,
    pricing: { type: "fixed", amount: 18, unit: "walk", currency: "USD" },
    vouches: [
      { neighborName: "Priya", completedBookings: 11 },
      { neighborName: "Denise", completedBookings: 2 },
    ],
  },
  noVouch: {
    id: "provider-maya",
    name: "Maya Chen",
    initials: "MC",
    service: "House cleaning",
    verificationStatus: "identity_verified",
    rating: 4.7,
    ratingCount: 8,
    walkMinutes: 12,
    pricing: { type: "range", minimum: 45, maximum: 70, currency: "USD" },
    vouches: [],
  },
  quote: {
    id: "provider-owen",
    name: "Owen Price",
    initials: "OP",
    service: "Plastering",
    verificationStatus: "unverified",
    rating: null,
    ratingCount: 0,
    walkMinutes: 18,
    pricing: { type: "quote" },
    vouches: [{ neighborName: "Samira", completedBookings: 1 }],
  },
};

export function App() {
  const [exampleKey, setExampleKey] = useState("vouched");
  const [lastRequest, setLastRequest] = useState("");

  return (
    <main className="demo-shell">
      <section className="demo-copy" aria-labelledby="demo-title">
        <p className="demo-eyebrow">Design-fidelity audit</p>
        <h1 id="demo-title">ProviderCard</h1>
        <p>
          A corrected Vello component using semantic design-system tokens, explicit trust
          signals, accessible interaction states, and a data contract that supports fixed,
          ranged, and quote-based pricing.
        </p>

        <fieldset className="demo-controls">
          <legend>Preview a component state</legend>
          {Object.entries({ vouched: "Named vouch", noVouch: "No vouch", quote: "Quote required" }).map(
            ([key, label]) => (
              <button
                type="button"
                className="state-button"
                aria-pressed={exampleKey === key}
                onClick={() => {
                  setExampleKey(key);
                  setLastRequest("");
                }}
                key={key}
              >
                {label}
              </button>
            ),
          )}
        </fieldset>

        <p className="demo-note">
          Compare each property with the official semantic layer—not merely with a matching
          hexadecimal value.
        </p>
      </section>

      <section className="preview-panel" aria-label="ProviderCard preview">
        <ProviderCard
          provider={examples[exampleKey]}
          onRequest={(provider) => setLastRequest(`Request started for ${provider.name}`)}
        />
        <p className="request-status" role="status" aria-live="polite">
          {lastRequest}
        </p>
      </section>
    </main>
  );
}
