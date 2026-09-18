import { Star, Footprints, ChevronRight } from "lucide-react";

function VerifiedMark({ size = 25 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Background-checked">
      <path
        d="M12 2.2 4.6 5v6.1c0 4.6 3.1 7.9 7.4 9.6 4.3-1.7 7.4-5 7.4-9.6V5L12 2.2Z"
        fill="var(--brand-primary)"
        stroke="var(--surface-card)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="m8.4 12 2.5 2.5 4.7-5"
        fill="none"
        stroke="var(--color-bg)"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AvatarVerified({ src, name, verified }) {
  return (
    <span className="nb__avatar">
      <img className="nb__photo" src={src} alt={name} />
      {verified && (
        <span className="nb__vmark">
          <VerifiedMark />
        </span>
      )}
    </span>
  );
}

function Rating({ value, size = "sm" }) {
  if (value == null) return null;
  const stars = Math.round(value);
  return (
    <span
      className={`nb__rating nb__rating--${size}`}
      aria-label={`Rated ${value} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className="nb__star"
          size={size === "sm" ? 13 : 15}
          fill={i < stars ? "currentColor" : "none"}
          aria-hidden="true"
        />
      ))}
      <span className="data-value">{value.toFixed(1)}</span>
    </span>
  );
}

export function NeighborCard({ neighbor, distanceFormat = "walk", onClick }) {
  const distanceLabel = () => {
    if (distanceFormat === "blocks") return `${neighbor.blocks} blocks`;
    if (distanceFormat === "mi") return `${neighbor.mi} mi away`;
    return `${neighbor.walk} min walk`;
  };

  return (
    <button
      className={"nb" + (neighbor.featured ? " nb--featured" : "")}
      type="button"
      onClick={() => onClick?.(neighbor)}
      aria-label={`Open provider ${neighbor.name}`}
    >
      <AvatarVerified
        src={neighbor.photo}
        name={neighbor.name}
        verified={neighbor.verified}
      />

      <div className="nb__body">
        <div className="nb__top">
          <span className="nb__name">{neighbor.name}</span>
          {neighbor.available && (
            <span className="nb__avail">
              <i></i>Available
            </span>
          )}
        </div>

        <p className="nb__bio">{neighbor.bio}</p>

        <div className="nb__price">
          from <span className="data-value">${neighbor.price}</span>{" "}
          <span>/ {neighbor.unit.replace("per ", "")}</span>
        </div>

        <div className="nb__meta">
          <span className="nb__walk">
            <Footprints size={14} aria-hidden="true" />
            {distanceLabel()}
          </span>
          <Rating value={neighbor.rating} />
        </div>
      </div>

      <span className="nb__tap" aria-hidden="true">
        <ChevronRight size={20} />
      </span>
    </button>
  );
}
