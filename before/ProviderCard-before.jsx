import { useState } from "react";
import { Star, MapPin, ShieldCheck } from "lucide-react";

const tokens = {
  paper: "#F6F2E7",
  forest: "#16462F",
  olive: "#557E26",
  persimmon: "#F0623B",
  amber: "#F4B740",
  ink: "#1B1C18",
};

function VerifiedBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: "#E7EFDC", color: tokens.olive }}
    >
      <ShieldCheck size={12} strokeWidth={2} aria-hidden="true" />
      Verified
    </span>
  );
}

function Rating({ value, count }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-sm"
      style={{ color: tokens.ink }}
      aria-label={`Rated ${value} out of 5 from ${count} bookings`}
    >
      <Star size={14} fill={tokens.amber} stroke={tokens.amber} aria-hidden="true" />
      <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{value.toFixed(1)}</span>
      <span className="opacity-60">({count})</span>
    </span>
  );
}

function TrustLine({ vouches }) {
  if (!vouches || vouches.length === 0) {
    return (
      <p className="text-sm opacity-70" style={{ color: tokens.ink }}>
        No neighbors have used this provider yet.
      </p>
    );
  }
  const [first, ...rest] = vouches;
  const restCount = rest.length;
  return (
    <p className="text-sm" style={{ color: tokens.ink }}>
      <span style={{ color: tokens.forest, fontWeight: 600 }}>{first}</span>
      {restCount > 0 ? ` and ${restCount} other neighbor${restCount > 1 ? "s" : ""}` : ""} used
      this provider
    </p>
  );
}

export default function ProviderCard({ provider = defaultProvider, onRequest }) {
  const [pressed, setPressed] = useState(false);

  return (
    <article
      className="w-full max-w-sm rounded-2xl border p-4 transition-shadow"
      style={{
        backgroundColor: tokens.paper,
        borderColor: "rgba(27,28,24,0.08)",
        boxShadow: pressed
          ? "0 1px 2px rgba(27,28,24,0.08)"
          : "0 4px 16px rgba(27,28,24,0.06)",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold"
          style={{ backgroundColor: tokens.forest, color: tokens.paper }}
          aria-hidden="true"
        >
          {provider.initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className="truncate text-base font-semibold"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: tokens.ink }}
            >
              {provider.name}
            </h3>
            {provider.verified && <VerifiedBadge />}
          </div>

          <p className="text-sm opacity-70" style={{ color: tokens.ink }}>
            {provider.service}
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <Rating value={provider.rating} count={provider.ratingCount} />
            <span
              className="inline-flex items-center gap-1 text-sm opacity-80"
              style={{ color: tokens.ink }}
            >
              <MapPin size={13} aria-hidden="true" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {provider.walkMinutes} min walk
              </span>
            </span>
          </div>
        </div>

        <div
          className="shrink-0 text-right text-sm font-medium"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: tokens.forest }}
        >
          {provider.priceLabel}
        </div>
      </div>

      <div className="mt-3 border-t pt-3" style={{ borderColor: "rgba(27,28,24,0.08)" }}>
        <TrustLine vouches={provider.vouches} />
      </div>

      <button
        type="button"
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        onClick={() => onRequest?.(provider)}
        className="mt-3 w-full rounded-xl px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          backgroundColor: tokens.olive,
          color: tokens.paper,
          outlineColor: tokens.olive,
        }}
      >
        Request {provider.service.split(" ")[0].toLowerCase()}
      </button>
    </article>
  );
}

const defaultProvider = {
  name: "Tomás Rivera",
  initials: "TR",
  service: "Dog walking",
  verified: true,
  rating: 4.9,
  ratingCount: 26,
  walkMinutes: 6,
  priceLabel: "$18/walk",
  vouches: ["Priya used him 11 times", "2 other neighbors"],
};
