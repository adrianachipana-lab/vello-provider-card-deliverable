import { useState } from "react";
import { Star, MapPin, ShieldCheck, ChevronRight } from "lucide-react";

// Typical AI first-pass: hardcoded hex values, Tailwind classes, no semantic tokens,
// simplified data shape, missing states.

export default function NeighborCard({ neighbor = defaultNeighbor, onClick }) {
  return (
    <div
      className="flex items-center gap-3 w-full max-w-sm rounded-2xl border p-4 cursor-pointer transition-shadow hover:shadow-lg"
      style={{
        backgroundColor: "#FFFFFF",
        borderColor: "rgba(27,28,24,0.08)",
        boxShadow: "0 4px 16px rgba(27,28,24,0.06)",
      }}
      onClick={() => onClick?.(neighbor)}
    >
      {/* Avatar — uses initials instead of real photo */}
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold relative"
        style={{ backgroundColor: "#16462F", color: "#F6F2E7" }}
        aria-hidden="true"
      >
        {neighbor.initials}
        {neighbor.verified && (
          <span className="absolute -bottom-1 -right-1">
            <ShieldCheck size={14} fill="#557E26" stroke="#FFFFFF" />
          </span>
        )}
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3
            className="truncate text-base font-semibold"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif", color: "#1B1C18" }}
          >
            {neighbor.name}
          </h3>
        </div>

        <p className="text-sm opacity-70" style={{ color: "#1B1C18" }}>
          {neighbor.bio}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span
            className="text-sm font-medium"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "#16462F" }}
          >
            ${neighbor.price}/{neighbor.unit}
          </span>
          <span
            className="inline-flex items-center gap-1 text-sm opacity-80"
            style={{ color: "#1B1C18" }}
          >
            <MapPin size={13} aria-hidden="true" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {neighbor.walkMinutes} min
            </span>
          </span>
          <span
            className="inline-flex items-center gap-1 text-sm"
            aria-label={`Rated ${neighbor.rating}`}
          >
            <Star size={14} fill="#F4B740" stroke="#F4B740" aria-hidden="true" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#1B1C18" }}>
              {neighbor.rating}
            </span>
          </span>
        </div>
      </div>

      {/* Chevron */}
      <ChevronRight size={20} className="shrink-0 opacity-40" />
    </div>
  );
}

const defaultNeighbor = {
  name: "Maya Rivera",
  initials: "MR",
  bio: "Dog walker & pet sitter",
  verified: true,
  rating: 4.9,
  price: 24,
  unit: "walk",
  walkMinutes: 6,
};
