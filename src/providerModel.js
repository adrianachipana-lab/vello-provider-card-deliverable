/*
 * Shared ProviderCard data contract and copy rules.
 *
 * Imported by the React component (src/components/ProviderCard.jsx) AND by the
 * prototype integration (vello-provider-card-integration.js), so the audited card and
 * the card shown in Vello render from one shape. Field names follow the prototype's
 * NEIGHBORS records where one exists (photo, bio, reviews, walk/blocks/mi, available).
 *
 * Proposed fields, not yet in the prototype model (see CLAUDE.md §4 and §10):
 *   verificationStatus  replaces `verified: boolean`
 *   pricing             replaces `price` + `unit`
 *   vouches             new entity
 */

export const PROVIDER_STATES = {
  vouched: {
    id: "provider-tomas",
    name: "Tomás Rivera",
    photo: null, // Field supported; no approved photo asset exists yet (CLAUDE.md §10).
    cat: "dog",
    bio: "Morning and evening walks around Owl's Head Park.",
    verificationStatus: "identity_verified",
    available: true,
    rating: 4.9,
    reviews: 26,
    walk: 6,
    blocks: 4,
    mi: 0.3,
    pricing: { type: "fixed", amount: 18, unit: "walk" },
    vouches: [
      { neighborName: "Priya", completedBookings: 11 },
      { neighborName: "Denise", completedBookings: 2 },
    ],
  },
  noVouch: {
    id: "provider-lena",
    name: "Lena Ortiz",
    photo: null,
    cat: "cleaning",
    bio: "Deep cleans and move-out cleans, supplies included.",
    verificationStatus: "identity_verified",
    available: true,
    rating: 4.7,
    reviews: 8,
    walk: 12,
    blocks: 8,
    mi: 0.6,
    pricing: { type: "range", minimum: 45, maximum: 70, unit: "visit" },
    vouches: [],
  },
  quote: {
    id: "provider-owen",
    name: "Owen Price",
    photo: null,
    cat: "handyman",
    bio: "Plaster repair and wall patching, quoted after a visit.",
    verificationStatus: "unverified",
    available: false,
    rating: null,
    reviews: 0,
    walk: 18,
    blocks: 12,
    mi: 0.9,
    pricing: { type: "quote" },
    vouches: [{ neighborName: "Samira", completedBookings: 1 }],
  },
};

// The unavailable state is the vouched provider with availability removed: same person,
// so the only visible difference is the missing badge (the absence is the information).
PROVIDER_STATES.unavailable = {
  ...PROVIDER_STATES.vouched,
  id: "provider-tomas-unavailable",
  available: false,
};

export const STATE_LABELS = {
  vouched: "Named vouch",
  unavailable: "Unavailable",
  noVouch: "No vouches",
  quote: "Quote · unverified",
};

export const DISTANCE_FORMATS = ["walk", "blocks", "mi"];

// Mirrors the prototype's DIST_ICON / distanceLabel so both renderers agree. Split into
// value + words so the number can be JetBrains Mono and the words Hanken (CLAUDE.md §3).
export const DIST_ICON = { walk: "footprints", blocks: "milestone", mi: "map-pin" };

export function distanceParts(provider, format = "walk") {
  if (format === "blocks") return { value: `${provider.blocks}`, words: "blocks" };
  if (format === "mi") return { value: `${provider.mi}`, words: "mi away" };
  return { value: `${provider.walk}`, words: "min walk" };
}

export function isVerified(provider) {
  return provider.verificationStatus === "identity_verified";
}

export function hasRating(provider) {
  return provider.rating != null && provider.reviews > 0;
}

/*
 * Copy follows the pricing type. "from" is never used: it implied a range for fixed
 * prices, and a range already shows both ends.
 *   fixed → "$18" + "/ walk"
 *   range → "$45–$70" + "/ visit"
 *   quote → "Quote required"
 */
export function priceParts(pricing) {
  if (pricing.type === "quote") {
    return { value: null, unit: null, text: "Quote required", label: "Price: quote required" };
  }
  if (pricing.type === "range") {
    return {
      value: `$${pricing.minimum}–$${pricing.maximum}`,
      unit: `/ ${pricing.unit}`,
      text: null,
      label: `Price: ${pricing.minimum} to ${pricing.maximum} dollars per ${pricing.unit}`,
    };
  }
  return {
    value: `$${pricing.amount}`,
    unit: `/ ${pricing.unit}`,
    text: null,
    label: `Price: ${pricing.amount} dollars per ${pricing.unit}`,
  };
}

/*
 * Named, attributable vouch. Returns null when there are no vouches so the caller
 * renders the neutral empty sentence (never a placeholder name, never "0 neighbors").
 *
 * The compact list card shows only the strongest named vouch on one line. Adding
 * "· 1 other neighbor vouched" wrapped to a second line and pushed the card to 192px
 * (native .nb ≈ 155px, budget ±15%). `otherCount` is returned for detail screens.
 */
export const NO_VOUCH_TEXT = "No recognizable neighbor vouches yet.";

export function trustLineParts(vouches, providerName) {
  if (!vouches?.length) return null;
  const [strongest] = [...vouches].sort((a, b) => b.completedBookings - a.completedBookings);
  const providerFirstName = providerName.split(" ")[0];
  const times = strongest.completedBookings === 1 ? "once" : `${strongest.completedBookings} times`;
  return {
    name: strongest.neighborName,
    rest: ` booked ${providerFirstName} ${times}`,
    otherCount: vouches.length - 1,
  };
}
