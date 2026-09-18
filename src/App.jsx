import { useState } from "react";
import { NeighborCard } from "./components/NeighborCard";
import { Star, ArrowLeft, MessageCircle, Calendar, Shield, Clock, MapPin } from "lucide-react";

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
    about: "I've lived on 4th Ave for six years and I've been walking neighbourhood dogs for three of them. I keep it to two dogs at a time so everyone gets a real walk, and you'll get a photo and a short note after every visit.",
    since: "On Vello since 2023",
    responds: "Replies in ~20 min",
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
    services: [
      { label: "60-min neighborhood walk", price: 24, unit: "per walk" },
      { label: "30-min quick walk", price: 16, unit: "per walk" },
      { label: "Drop-in pet sitting", price: 30, unit: "per visit" },
    ],
    reviewsList: [
      { who: "Nadia H.", at: "2 weeks ago", stars: 5, text: "Maya sends a photo every single time. My beagle now waits by the door at 3." },
      { who: "Tom B.", at: "Apr 2026", stars: 5, text: "Reliable and genuinely kind with nervous dogs. Worth every dollar." },
    ],
  },
  unavailable: {
    id: "devon",
    name: "Devon Clarke",
    photo: PHOTO.devon,
    bio: "Handyman — shelves, leaky faucets, flat-pack furniture.",
    about: "Handyman work is my weekend trade — shelves, faucets, flat-pack furniture, picture walls. I bring my own tools and I'll tell you honestly if a job needs a licensed pro instead.",
    since: "On Vello since 2024",
    responds: "Replies in ~2 hrs",
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
    services: [
      { label: "Mount a TV or floating shelves", price: 65, unit: "flat" },
      { label: "Flat-pack furniture build", price: 45, unit: "flat" },
      { label: "Small plumbing fix", price: 55, unit: "flat" },
    ],
    reviewsList: [
      { who: "Grace L.", at: "3 weeks ago", stars: 5, text: "Two shelves, dead level, done in an hour. Cleaned up after himself too." },
      { who: "Jordan R.", at: "Mar 2026", stars: 4, text: "Great work. Ran a bit late but messaged me ahead of time." },
    ],
  },
  highRating: {
    id: "priya",
    name: "Priya Anand",
    photo: PHOTO.priya,
    bio: "Deep cleans & move-outs. Brings her own eco supplies.",
    about: "Deep cleans and move-outs are what I do best. I bring my own eco supplies — no harsh smells left behind, safe around pets and kids.",
    since: "On Vello since 2024",
    responds: "Replies in ~1 hr",
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
    services: [
      { label: "Deep clean, 3 hours", price: 90, unit: "per visit" },
      { label: "Move-out clean", price: 140, unit: "flat" },
      { label: "Kitchen & bath refresh", price: 60, unit: "per visit" },
    ],
    reviewsList: [
      { who: "Sofia M.", at: "1 week ago", stars: 5, text: "Spotless. She found grime I didn't know I had." },
      { who: "Hana K.", at: "May 2026", stars: 5, text: "Left the eco spray under the sink for next time. Lovely touch." },
    ],
  },
};

function NeighborProfile({ neighbor, onBack }) {
  return (
    <div className="profile">
      <button className="profile-back" type="button" onClick={onBack}>
        <ArrowLeft size={20} /> Back
      </button>

      <div className="profile-header">
        <img className="profile-photo" src={neighbor.photo} alt={neighbor.name} />
        <div className="profile-header-info">
          <h2 className="profile-name">{neighbor.name}</h2>
          <div className="profile-rating">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={16} fill={i < Math.round(neighbor.rating) ? "currentColor" : "none"} className="profile-star" />
            ))}
            <span className="data-value">{neighbor.rating.toFixed(1)}</span>
            <span className="profile-reviews">({neighbor.reviews} reviews)</span>
          </div>
          <div className="profile-meta-row">
            {neighbor.verified && (
              <span className="profile-verified">
                <Shield size={14} /> Verified
              </span>
            )}
            {neighbor.available && (
              <span className="profile-available">
                <span className="profile-dot"></span> Available
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="profile-stats">
        <div className="profile-stat">
          <Clock size={16} />
          <span>{neighbor.responds}</span>
        </div>
        <div className="profile-stat">
          <MapPin size={16} />
          <span>{neighbor.walk} min walk</span>
        </div>
        <div className="profile-stat">
          <Calendar size={16} />
          <span>{neighbor.since}</span>
        </div>
      </div>

      <div className="profile-section">
        <h3>About</h3>
        <p>{neighbor.about}</p>
      </div>

      <div className="profile-section">
        <h3>Services</h3>
        {neighbor.services.map((s, i) => (
          <div className="profile-service" key={i}>
            <span>{s.label}</span>
            <span className="profile-service-price">
              <span className="data-value">${s.price}</span> / {s.unit.replace("per ", "")}
            </span>
          </div>
        ))}
      </div>

      <div className="profile-section">
        <h3>Reviews</h3>
        {neighbor.reviewsList.map((r, i) => (
          <div className="profile-review" key={i}>
            <div className="profile-review-head">
              <strong>{r.who}</strong>
              <span>{r.at}</span>
            </div>
            <div className="profile-review-stars">
              {Array.from({ length: r.stars }, (_, j) => (
                <Star key={j} size={12} fill="currentColor" className="profile-star" />
              ))}
            </div>
            <p>{r.text}</p>
          </div>
        ))}
      </div>

      <button className="profile-cta" type="button">
        <MessageCircle size={18} />
        Request {neighbor.bio.split("—")[0].split("&")[0].trim().toLowerCase()}
      </button>
    </div>
  );
}

export function App() {
  const [exampleKey, setExampleKey] = useState("available");
  const [openProfile, setOpenProfile] = useState(null);

  if (openProfile) {
    return (
      <main className="demo-shell">
        <section className="demo-copy" aria-labelledby="demo-title">
          <p className="demo-eyebrow">Design-fidelity audit</p>
          <h1 id="demo-title">NeighborCard</h1>
          <p>
            Clicking a card opens the neighbor's profile — just like in the
            Vello prototype.
          </p>
        </section>
        <section className="preview-panel" aria-label="Neighbor profile">
          <NeighborProfile
            neighbor={openProfile}
            onBack={() => setOpenProfile(null)}
          />
        </section>
      </main>
    );
  }

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
              }}
              key={key}
            >
              {label}
            </button>
          ))}
        </fieldset>

        <p className="demo-note">
          Click the card to open the neighbor's profile.
        </p>
      </section>

      <section className="preview-panel" aria-label="NeighborCard preview">
        <NeighborCard
          neighbor={examples[exampleKey]}
          onClick={(n) => setOpenProfile(n)}
        />
      </section>
    </main>
  );
}
