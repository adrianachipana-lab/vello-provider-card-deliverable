import { ChevronRight, Footprints, MapPin, Milestone, Star } from "lucide-react";
import {
  NO_VOUCH_TEXT,
  distanceParts,
  hasRating,
  isVerified,
  priceParts,
  trustLineParts,
} from "../providerModel";

/*
 * Standalone mirror of the prototype's NeighborCard anatomy (.nb), driven by the shared
 * model in src/providerModel.js. Inside the prototype, vello-provider-card-integration.js
 * renders the same data with the prototype's real components. This file exists so the
 * card can be reviewed and tested outside the bundled prototype.
 */

const DISTANCE_ICONS = { walk: Footprints, blocks: Milestone, mi: MapPin };

// Same shape as the prototype's VerifiedMark (olive shield + cream check). Its label
// reads "Background-checked" there. Wording pending design, see CLAUDE.md §10 Q3.
function VerifiedMark() {
  return (
    <svg className="verified-mark" viewBox="0 0 24 24" role="img" aria-label="Identity verified">
      <path
        className="verified-mark__shield"
        d="M12 2.2 4.6 5v6.1c0 4.6 3.1 7.9 7.4 9.6 4.3-1.7 7.4-5 7.4-9.6V5L12 2.2Z"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        className="verified-mark__check"
        d="m8.4 12 2.5 2.5 4.7-5"
        fill="none"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function initials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] || "")
    .join("")
    .toUpperCase();
}

function Avatar({ provider }) {
  return (
    <span className="provider-avatar">
      {provider.photo ? (
        <img className="provider-avatar__img" src={provider.photo} alt="" />
      ) : (
        <span className="provider-avatar__fallback" aria-hidden="true">
          {initials(provider.name)}
        </span>
      )}
      {isVerified(provider) && (
        <span className="provider-avatar__mark">
          <VerifiedMark />
        </span>
      )}
    </span>
  );
}

function Rating({ provider }) {
  if (!hasRating(provider)) {
    return <span className="rating rating--empty">No ratings yet</span>;
  }
  const filled = Math.round(provider.rating);
  return (
    <span className="rating">
      <span className="rating__stars" role="img" aria-label={`${provider.rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={i < filled ? "rating__star" : "rating__star rating__star--empty"}
            fill="currentColor"
            aria-hidden="true"
          />
        ))}
      </span>
      <span className="rating__value" aria-hidden="true">
        {provider.rating.toFixed(1)}
      </span>
    </span>
  );
}

function TrustLine({ provider }) {
  const trust = trustLineParts(provider.vouches, provider.name);
  if (!trust) return <span className="trust-line trust-line--empty">{NO_VOUCH_TEXT}</span>;
  return (
    <span className="trust-line">
      <strong>{trust.name}</strong>
      {trust.rest}
    </span>
  );
}

function Price({ pricing }) {
  const price = priceParts(pricing);
  if (price.text) return <span className="price price--text">{price.text}</span>;
  return (
    <span className="price">
      <span className="price__value">{price.value}</span> <span className="price__unit">{price.unit}</span>
    </span>
  );
}

function Distance({ provider, format }) {
  const Icon = DISTANCE_ICONS[format];
  const { value, words } = distanceParts(provider, format);
  return (
    <span className="distance">
      <Icon className="distance__icon" aria-hidden="true" />
      <span className="distance__value">{value}</span> {words}
    </span>
  );
}

export function ProviderCard({ provider, distanceFormat = "walk", onSelect }) {
  return (
    <button type="button" className="provider-card" onClick={() => onSelect?.(provider)}>
      <Avatar provider={provider} />
      <span className="provider-card__body">
        <span className="provider-card__top">
          <span className="provider-card__name">{provider.name}</span>
          {provider.available && (
            <span className="availability">
              <span className="availability__dot" aria-hidden="true" />
              Available
            </span>
          )}
        </span>
        <span className="provider-card__bio">{provider.bio}</span>
        <TrustLine provider={provider} />
        <Price pricing={provider.pricing} />
        <span className="provider-card__meta">
          <Distance provider={provider} format={distanceFormat} />
          <Rating provider={provider} />
        </span>
      </span>
      <span className="provider-card__tap" aria-hidden="true">
        <ChevronRight />
      </span>
    </button>
  );
}
