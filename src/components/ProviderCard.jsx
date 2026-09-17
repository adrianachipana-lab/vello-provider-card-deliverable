import { MapPin, ShieldCheck, Star } from "lucide-react";

function VerifiedBadge() {
  return (
    <span className="verified-badge">
      <ShieldCheck size={14} strokeWidth={2} aria-hidden="true" />
      Identity verified
    </span>
  );
}

function Rating({ value, count }) {
  if (value == null || count === 0) {
    return <span className="rating rating--empty">No ratings yet</span>;
  }

  return (
    <span className="rating" aria-label={`Rated ${value.toFixed(1)} out of 5 from ${count} bookings`}>
      <Star className="rating-icon" size={15} fill="currentColor" aria-hidden="true" />
      <span className="data-value rating-value">{value.toFixed(1)}</span>
      <span className="rating-count" aria-hidden="true">({count})</span>
    </span>
  );
}

function TrustLine({ vouches }) {
  if (!vouches?.length) {
    return <p className="trust-line trust-line--empty">No recognizable neighbor vouches yet.</p>;
  }

  const [first, ...others] = vouches;
  const bookingText =
    first.completedBookings === 1
      ? "once"
      : `${first.completedBookings} times`;

  return (
    <p className="trust-line">
      <strong>{first.neighborName}</strong> booked this provider {bookingText}
      {others.length > 0 && ` · ${others.length} other neighbor${others.length > 1 ? "s" : ""} vouched`}
    </p>
  );
}

function Price({ pricing }) {
  if (pricing.type === "quote") {
    return <span className="price price--text">Quote required</span>;
  }

  if (pricing.type === "range") {
    return (
      <span className="price" aria-label={`From ${pricing.minimum} to ${pricing.maximum} dollars`}>
        ${pricing.minimum}–${pricing.maximum}
      </span>
    );
  }

  return (
    <span className="price" aria-label={`${pricing.amount} dollars per ${pricing.unit}`}>
      ${pricing.amount}<span className="price-unit">/{pricing.unit}</span>
    </span>
  );
}

export function ProviderCard({ provider, onRequest }) {
  return (
    <article className="provider-card" aria-labelledby={`${provider.id}-name`}>
      <div className="provider-main">
        <div className="provider-avatar" aria-hidden="true">{provider.initials}</div>

        <div className="provider-details">
          <div className="provider-heading">
            <h2 id={`${provider.id}-name`}>{provider.name}</h2>
            {provider.verificationStatus === "identity_verified" && <VerifiedBadge />}
          </div>
          <p className="provider-service">{provider.service}</p>

          <div className="provider-meta">
            <Rating value={provider.rating} count={provider.ratingCount} />
            <span className="distance">
              <MapPin size={15} aria-hidden="true" />
              <span className="data-value">{provider.walkMinutes} min</span> walk
            </span>
          </div>
        </div>

        <Price pricing={provider.pricing} />
      </div>

      <div className="trust-section">
        <TrustLine vouches={provider.vouches} />
      </div>

      <button className="request-button" type="button" onClick={() => onRequest?.(provider)}>
        Request {provider.service.toLowerCase()}
      </button>
    </article>
  );
}
