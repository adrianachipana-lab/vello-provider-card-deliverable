import { useState } from "react";
import { NeighborCard } from "./components/NeighborCard";

const PHOTO = {
  maya: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
  devon: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
  priya: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
};

const examples = {
  available: {
    id: "maya",
    name: "Maya Rivera",
    photo: PHOTO.maya,
    bio: "Dog walker & pet sitter, just up on 4th Ave.",
    rating: 4.9,
    reviews: 213,
    walk: 6,
    blocks: 4,
    mi: 0.3,
    price: 24,
    unit: "per walk",
    verified: true,
    available: true,
    featured: true,
  },
  unavailable: {
    id: "devon",
    name: "Devon Clarke",
    photo: PHOTO.devon,
    bio: "Handyman — shelves, leaky faucets, flat-pack furniture.",
    rating: 4.8,
    reviews: 96,
    walk: 9,
    blocks: 6,
    mi: 0.4,
    price: 65,
    unit: "flat",
    verified: true,
    available: false,
    featured: false,
  },
  highRating: {
    id: "priya",
    name: "Priya Anand",
    photo: PHOTO.priya,
    bio: "Deep cleans & move-outs. Brings her own eco supplies.",
    rating: 5.0,
    reviews: 51,
    walk: 12,
    blocks: 8,
    mi: 0.6,
    price: 90,
    unit: "per visit",
    verified: true,
    available: true,
    featured: false,
  },
};

export function App() {
  const [exampleKey, setExampleKey] = useState("available");
  const [lastAction, setLastAction] = useState("");

  return (
    <main className="demo-shell">
      <section className="demo-copy" aria-labelledby="demo-title">
        <p className="demo-eyebrow">Design-fidelity audit</p>
        <h1 id="demo-title">NeighborCard</h1>
        <p>
          The neighbor card from Vello's Home screen — generated with Claude,
          audited against the design system, and corrected for token fidelity
          and accessibility.
        </p>

        <fieldset className="demo-controls">
          <legend>Preview a component state</legend>
          {Object.entries({
            available: "Available + featured",
            unavailable: "Not available",
            highRating: "Perfect rating",
          }).map(([key, label]) => (
            <button
              type="button"
              className="state-button"
              aria-pressed={exampleKey === key}
              onClick={() => {
                setExampleKey(key);
                setLastAction("");
              }}
              key={key}
            >
              {label}
            </button>
          ))}
        </fieldset>

        <p className="demo-note">
          Compare each property with the Vello Design System — not merely with
          a matching hex value.
        </p>
      </section>

      <section className="preview-panel" aria-label="NeighborCard preview">
        <NeighborCard
          neighbor={examples[exampleKey]}
          onClick={(n) => setLastAction(`Opened ${n.name}'s profile`)}
        />
        <p className="request-status" role="status" aria-live="polite">
          {lastAction}
        </p>
      </section>
    </main>
  );
}
