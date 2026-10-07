import { useState } from "react";
import { ProviderCard } from "./components/ProviderCard";
import { DISTANCE_FORMATS, PROVIDER_STATES, STATE_LABELS } from "./providerModel";

const DISTANCE_LABELS = { walk: "Minutes walk", blocks: "Blocks", mi: "Miles" };

function ToggleGroup({ legend, options, value, onChange }) {
  return (
    <fieldset className="demo-controls">
      <legend>{legend}</legend>
      {Object.entries(options).map(([key, label]) => (
        <button
          type="button"
          className="state-button"
          aria-pressed={value === key}
          onClick={() => onChange(key)}
          key={key}
        >
          {label}
        </button>
      ))}
    </fieldset>
  );
}

export function App() {
  const [stateKey, setStateKey] = useState("vouched");
  const [distanceFormat, setDistanceFormat] = useState("walk");
  const [lastRequest, setLastRequest] = useState("");

  return (
    <main className="demo-shell">
      <section className="demo-copy" aria-labelledby="demo-title">
        <p className="demo-eyebrow">Design-fidelity audit · guardrail v3</p>
        <h1 id="demo-title">ProviderCard</h1>
        <p>
          The Vello list card for one provider. It uses the native “Trusted on your block”
          anatomy and the same data model as the prototype integration. Verification sits on
          the avatar, the vouch names a real neighbor, and the price copy depends on the
          pricing type.
        </p>

        <ToggleGroup
          legend="Preview a state"
          options={STATE_LABELS}
          value={stateKey}
          onChange={(key) => {
            setStateKey(key);
            setLastRequest("");
          }}
        />
        <ToggleGroup
          legend="Distance shown as"
          options={Object.fromEntries(DISTANCE_FORMATS.map((f) => [f, DISTANCE_LABELS[f]]))}
          value={distanceFormat}
          onChange={setDistanceFormat}
        />

        <p className="demo-note">
          Inside the prototype, the same data renders through Vello’s own components. Run{" "}
          <code>npm run dev</code> and open <code>/Vello-Prototype-with-provider-card.html</code>.
        </p>
      </section>

      <section className="preview-panel" aria-label="ProviderCard preview">
        <ProviderCard
          provider={PROVIDER_STATES[stateKey]}
          distanceFormat={distanceFormat}
          onSelect={(provider) => setLastRequest(`Request started for ${provider.name}`)}
        />
        <p className="request-status" role="status" aria-live="polite">
          {lastRequest}
        </p>
      </section>
    </main>
  );
}
