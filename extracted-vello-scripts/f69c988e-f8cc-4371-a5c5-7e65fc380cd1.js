/* Vello flow — shared primitives + prototype data.
   Everything is published on window.VelloFlow (babel scripts don't share scope). */

const I = (name, props = {}) => <i data-lucide={name} {...props}></i>;

/* Accessible shape-based verified mark: olive shield + cream check (DS June 2026). */
function VerifiedMark({ size = 25 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="Background-checked">
      <path d="M12 2.2 4.6 5v6.1c0 4.6 3.1 7.9 7.4 9.6 4.3-1.7 7.4-5 7.4-9.6V5L12 2.2Z"
        fill="var(--green-600)" stroke="var(--surface-card)" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="m8.4 12 2.5 2.5 4.7-5" fill="none" stroke="var(--paper)" strokeWidth="2.1"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AvatarVerified({ n, size = "lg" }) {
  const { Avatar } = window.VelloDesignSystem_182a1b;
  return (
    <span className="nb__avatar">
      <Avatar src={n.photo} name={n.name} size={size} />
      {n.verified && <span className="nb__vmark"><VerifiedMark /></span>}
    </span>
  );
}

/* Chevron used by the DS tappable-card pattern. */
const Chev = ({ cls = "" }) => (
  <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* Horizontal scroll row: edge fade + peek of the next item (DS ScrollRow). */
function ScrollRow({ children, className = "" }) {
  const { useEffect, useRef } = React;
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const update = () => {
    const root = rootRef.current, t = trackRef.current;
    if (!root || !t) return;
    const max = t.scrollWidth - t.clientWidth;
    root.setAttribute("data-more-left", String(t.scrollLeft > 2));
    root.setAttribute("data-more-right", String(t.scrollLeft < max - 2));
  };
  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    update();
    // Re-measure once real layout lands: mount runs before DS CSS injection
    // and webfont metrics settle, when scrollWidth still equals clientWidth.
    const r1 = requestAnimationFrame(update);
    const r2 = requestAnimationFrame(() => requestAnimationFrame(update));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
    const ro = window.ResizeObserver ? new ResizeObserver(update) : null;
    if (ro) { ro.observe(t); if (t.firstElementChild) ro.observe(t.firstElementChild); }
    t.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(r1); cancelAnimationFrame(r2);
      if (ro) ro.disconnect();
      t.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [children]);
  return (
    <div ref={rootRef} className={"vl-scrollrow " + className}>
      <div className="vl-scrollrow__fade vl-scrollrow__fade--l" aria-hidden="true"></div>
      <div ref={trackRef} className="vl-scrollrow__track">{children}</div>
      <div className="vl-scrollrow__fade vl-scrollrow__fade--r" aria-hidden="true"></div>
    </div>
  );
}

function useIcons() {
  // Each screen owns its own state, so it must re-run icon creation after its
  // own renders — a single call in the root component would miss them.
  // Guarded on unconverted <i>: lucide stamps data-lucide onto its output <svg>,
  // so an unguarded call re-replaces React-owned nodes on every render.
  React.useEffect(() => {
    if (!window.lucide) return;
    if (!document.querySelector("i[data-lucide]")) return;
    window.lucide.createIcons();
  });
}

function StatusBar() {
  return (
    <div className="statusbar">
      <span className="statusbar__time">9:41</span>
      <span className="statusbar__icons">{I("signal")}{I("wifi")}{I("battery-full")}</span>
    </div>
  );
}

function AppBar({ title, onBack, action }) {
  const { IconButton } = window.VelloDesignSystem_182a1b;
  return (
    <div className="appbar">
      <IconButton variant="ghost" label="Back" onClick={onBack}>{I("arrow-left")}</IconButton>
      <span className="appbar__title">{title}</span>
      {action || <span className="appbar__spacer"></span>}
    </div>
  );
}

/* Zero-data / no-results view (DS EmptyState pattern). */
function EmptyState({ icon = "inbox", title, text, action }) {
  return (
    <div className="empty">
      <span className="empty__med">{I(icon)}</span>
      <div className="empty__title">{title}</div>
      {text && <p className="empty__text">{text}</p>}
      {action && <div className="empty__act">{action}</div>}
    </div>
  );
}

function Sheet({ title, text, children, onDismiss }) {
  return (
    <React.Fragment>
      <div className="scrim" onClick={onDismiss}></div>
      <div className="sheet" role="dialog" aria-modal="true" aria-label={title}>
        <div className="sheet__grip"></div>
        <div className="sheet__title">{title}</div>
        {text && <p className="sheet__text">{text}</p>}
        {children}
      </div>
    </React.Fragment>
  );
}

function Toast({ text, desk }) {
  return <div className={"toast" + (desk ? " toast--desk" : "")}>{I("check")}<span>{text}</span></div>;
}

/* ---------------- Data ---------------- */
const CATEGORIES = [
  { id: "all", label: "All", icon: "compass" },
  { id: "cleaning", label: "Cleaning", icon: "sparkles" },
  { id: "dog", label: "Dog walking", icon: "dog" },
  { id: "handyman", label: "Handyman", icon: "wrench" },
  { id: "tutoring", label: "Tutoring", icon: "graduation-cap" },
];

const PHOTO = {
  maya: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
  devon: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
  priya: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
  marcus: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
  sofia: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
  grace: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
  tessa: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
};

const NEIGHBORS = [
  { id: "maya", name: "Maya Rivera", photo: PHOTO.maya, cat: "dog", service: "60-min neighborhood dog walk",
    bio: "Dog walker & pet sitter, just up on 4th Ave.", rating: 4.9, reviews: 213, walk: 6, blocks: 4, mi: 0.3,
    price: 24, unit: "per walk", verified: true, available: true, featured: true },
  { id: "devon", name: "Devon Clarke", photo: PHOTO.devon, cat: "handyman", service: "Mount a TV or floating shelves",
    bio: "Handyman — shelves, leaky faucets, flat-pack furniture.", rating: 4.8, reviews: 96, walk: 9, blocks: 6, mi: 0.4,
    price: 65, unit: "flat", verified: true, available: false },
  { id: "priya", name: "Priya Anand", photo: PHOTO.priya, cat: "cleaning", service: "Deep clean, 3 hours",
    bio: "Deep cleans & move-outs. Brings her own eco supplies.", rating: 5.0, reviews: 51, walk: 12, blocks: 8, mi: 0.6,
    price: 90, unit: "per visit", verified: true, available: true },
  { id: "marcus", name: "Marcus Tran", photo: PHOTO.marcus, cat: "dog", service: "45-min dog walk",
    bio: "Walks two dogs at a time. Weekday afternoons only.", rating: 4.8, reviews: 74, walk: 8, blocks: 5, mi: 0.4,
    price: 22, unit: "per walk", verified: true, available: true },
  { id: "sofia", name: "Sofia Marino", photo: PHOTO.sofia, cat: "cleaning", service: "Weekly apartment clean",
    bio: "Weekly and biweekly cleans on 79th and 80th St.", rating: 4.9, reviews: 128, walk: 11, blocks: 7, mi: 0.5,
    price: 90, unit: "per visit", verified: true, available: false },
  { id: "grace", name: "Grace Lin", photo: PHOTO.grace, cat: "tutoring", service: "Math & SAT tutoring",
    bio: "Math and SAT prep, grades 7–12. Library or your place.", rating: 5.0, reviews: 39, walk: 14, blocks: 9, mi: 0.7,
    price: 40, unit: "per hr", verified: true, available: true },
];

const byId = (id) => NEIGHBORS.find(n => n.id === id);

/* Per-neighbor profile detail (services, reviews, response time). */
const DETAIL = {
  maya: {
    about: "I've lived on 4th Ave for six years and I've been walking neighbourhood dogs for three of them. I keep it to two dogs at a time so everyone gets a real walk, and you'll get a photo and a short note after every visit.",
    since: "On Vello since 2023", responds: "Replies in ~20 min",
    services: [
      { label: "60-min neighborhood walk", price: 24, unit: "per walk" },
      { label: "30-min quick walk", price: 16, unit: "per walk" },
      { label: "Drop-in pet sitting", price: 30, unit: "per visit" },
    ],
    reviews: [
      { who: "Nadia H.", at: "2 weeks ago", stars: 5, text: "Maya sends a photo every single time. My beagle now waits by the door at 3." },
      { who: "Tom B.", at: "Apr 2026", stars: 5, text: "Reliable and genuinely kind with nervous dogs. Worth every dollar." },
    ],
  },
  devon: {
    about: "Handyman work is my weekend trade — shelves, faucets, flat-pack furniture, picture walls. I bring my own tools and I'll tell you honestly if a job needs a licensed pro instead.",
    since: "On Vello since 2024", responds: "Replies in ~2 hrs",
    services: [
      { label: "Mount a TV or floating shelves", price: 65, unit: "flat" },
      { label: "Flat-pack furniture build", price: 45, unit: "flat" },
      { label: "Small plumbing fix", price: 55, unit: "flat" },
    ],
    reviews: [
      { who: "Grace L.", at: "3 weeks ago", stars: 5, text: "Two shelves, dead level, done in an hour. Cleaned up after himself too." },
      { who: "Jordan R.", at: "Mar 2026", stars: 4, text: "Great work. Ran a bit late but messaged me ahead of time." },
    ],
  },
  priya: {
    about: "Deep cleans and move-outs are what I do best. I bring my own eco supplies — no harsh smells left behind, safe around pets and kids.",
    since: "On Vello since 2024", responds: "Replies in ~1 hr",
    services: [
      { label: "Deep clean, 3 hours", price: 90, unit: "per visit" },
      { label: "Move-out clean", price: 140, unit: "flat" },
      { label: "Kitchen & bath refresh", price: 60, unit: "per visit" },
    ],
    reviews: [
      { who: "Sofia M.", at: "1 week ago", stars: 5, text: "Spotless. She found grime I didn't know I had." },
      { who: "Hana K.", at: "May 2026", stars: 5, text: "Left the eco spray under the sink for next time. Lovely touch." },
    ],
  },
  marcus: {
    about: "Weekday afternoons only — I finish my shift at 2 and walk until about 6. Two dogs at a time, and I'm happy to do a meet-and-greet first.",
    since: "On Vello since 2025", responds: "Replies in ~45 min",
    services: [
      { label: "45-min dog walk", price: 22, unit: "per walk" },
      { label: "Two-dog walk", price: 34, unit: "per walk" },
    ],
    reviews: [
      { who: "Jordan R.", at: "May 2026", stars: 5, text: "Juniper did great. Photo attached to the walk summary, which I loved." },
      { who: "Ruth O.", at: "Apr 2026", stars: 5, text: "Punctual and easy to reach. My two go out together happily." },
    ],
  },
  sofia: {
    about: "I clean weekly and biweekly for a handful of homes on 79th and 80th. Same day, same time, every week — that's how I like to work.",
    since: "On Vello since 2023", responds: "Replies in ~3 hrs",
    services: [
      { label: "Weekly apartment clean", price: 90, unit: "per visit" },
      { label: "Biweekly clean", price: 105, unit: "per visit" },
    ],
    reviews: [
      { who: "Nadia H.", at: "2 weeks ago", stars: 5, text: "Three months in and she has never missed a week." },
      { who: "Tom B.", at: "Feb 2026", stars: 5, text: "Quiet, thorough, trustworthy with a key. Exactly what I wanted." },
    ],
  },
  grace: {
    about: "Math and SAT prep for grades 7 through 12. We can work at the Bay Ridge library or at your kitchen table — whichever helps your kid focus.",
    since: "On Vello since 2025", responds: "Replies in ~1 hr",
    services: [
      { label: "Math tutoring, 1 hour", price: 40, unit: "per hr" },
      { label: "SAT prep, 90 min", price: 55, unit: "per session" },
    ],
    reviews: [
      { who: "Hana K.", at: "1 month ago", stars: 5, text: "My daughter went from a C to an A- in one semester. Grace is patient." },
      { who: "Ruth O.", at: "Mar 2026", stars: 5, text: "Explains things three different ways until it lands. Rare skill." },
    ],
  },
};
const detailFor = (id) => DETAIL[id] || DETAIL.maya;

const POPULAR = [
  { id: "p1", title: "Weekly apartment clean", cat: "cleaning", catLabel: "Cleaning", by: "sofia",
    photo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=420&q=70", price: 90, unit: "per visit", rating: 4.9 },
  { id: "p2", title: "60-min neighborhood dog walk", cat: "dog", catLabel: "Dog walking", by: "marcus",
    photo: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=420&q=70", price: 24, unit: "per walk", rating: 4.8 },
  { id: "p3", title: "Mount a TV or floating shelves", cat: "handyman", catLabel: "Handyman", by: "devon",
    photo: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=420&q=70", price: 65, unit: "flat", rating: 4.8 },
  { id: "p4", title: "Math & SAT tutoring", cat: "tutoring", catLabel: "Tutoring", by: "grace",
    photo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=420&q=70", price: 40, unit: "per hr", rating: 5.0 },
];

const NAV = [
  { id: "home", label: "Home", icon: I("home") },
  { id: "bookings", label: "Bookings", icon: I("calendar") },
  { id: "messages", label: "Messages", icon: I("message-circle"), badge: 2 },
  { id: "profile", label: "Profile", icon: I("user") },
];

/* Jordan's open help request */
const REQUEST = {
  title: "Weekday afternoon walks for Juniper",
  catLabel: "Dog walking",
  posted: "Posted 2 days ago",
  when: "Weekdays at 3:00 PM",
  starts: "Mon, Jun 15",
  where: "4th Ave & 82nd St",
  budget: "$20–30",
  budgetUnit: "per walk",
  notes: "Juniper is a 4-year-old beagle — friendly, pulls a little on the leash. She needs a 45–60 minute walk while I'm at work, ideally the same person each day so she gets used to them. Keys can live in the lockbox by the door.",
};

const RESPONDERS = [
  { id: "maya", quote: 24, top: true, reply: "Hi Jordan! I walk two beagles on 82nd already and I'm free at 3 every weekday. Happy to do a meet-and-greet with Juniper first." },
  { id: "marcus", quote: 22, reply: "I can take the 3 PM slot Monday through Thursday. Fridays I finish at 2, so I'd need to come by a little earlier that day." },
  { id: "tessa", quote: 28, reply: "Available all five afternoons and I send photo updates after every walk. I'm two blocks over on 84th.",
    person: { id: "tessa", name: "Tessa Boyd", photo: PHOTO.tessa, rating: 4.7, reviews: 18, walk: 7, blocks: 5, mi: 0.4, verified: true } },
];

const responderPerson = (r) => r.person || byId(r.id);

/* ---------------- Admin queue ---------------- */
const QTYPES = [
  { id: "application", label: "ID check", short: "ID checks", icon: "user-check" },
  { id: "review", label: "Flagged review", short: "Reviews", icon: "star" },
  { id: "message", label: "Reported message", short: "Messages", icon: "message-circle" },
  { id: "listing", label: "Reported request", short: "Requests", icon: "file-text" },
  { id: "dispute", label: "Payment dispute", short: "Disputes", icon: "credit-card" },
];
const qtype = (id) => QTYPES.find(t => t.id === id) || QTYPES[0];

const SEVERITY = {
  high: { label: "High", variant: "danger" },
  med: { label: "Medium", variant: "warning" },
  low: { label: "Low", variant: "neutral" },
};

const QUEUE = [
  { id: "q1", type: "application", severity: "high", age: 31,
    subject: "ID photo doesn't match selfie", detail: "Applicant: Ruth Okafor · dog walking",
    who: "Ruth Okafor", photo: PHOTO.tessa,
    quote: "Automated check flagged a mismatch between the submitted licence photo and the liveness selfie.",
    evidence: ["Licence expires Mar 2027 — valid", "Liveness selfie retried 3 times", "Address matches Bay Ridge service area"],
    stats: [["0", "Bookings"], ["—", "Rating"], ["2d", "In review"]] },
  { id: "q2", type: "dispute", severity: "high", age: 26,
    subject: "Charged twice for one clean", detail: "$180 · booking #4821 · Priya Anand",
    who: "Nadia Hassan", photo: PHOTO.priya,
    quote: "I was charged $90 twice for the same Tuesday clean. Priya only came once and she confirms it.",
    evidence: ["Two identical charges 40s apart", "Provider confirms a single visit", "Card network dispute not yet filed"],
    stats: [["14", "Bookings"], ["4.9", "Rating"], ["1d", "Open"]] },
  { id: "q3", type: "message", severity: "high", age: 9,
    subject: "Asked to pay outside Vello", detail: "Thread with Devon Clarke · 3 messages",
    who: "Devon Clarke", photo: PHOTO.devon,
    quote: "Reported message: “Cash is easier for me — can you just Venmo me instead of booking through the app?”",
    evidence: ["Off-platform payment request", "Provider has 2 prior warnings", "Booking was completed and paid in-app"],
    stats: [["96", "Bookings"], ["4.8", "Rating"], ["2", "Warnings"]] },
  { id: "q4", type: "review", severity: "med", age: 18,
    subject: "Review names a neighbor's child", detail: "1★ on Grace Lin · tutoring",
    who: "Anon reporter", photo: PHOTO.grace,
    quote: "Review contains a minor's full name and school schedule. Reported by the provider for privacy.",
    evidence: ["Names a minor and their school", "Reviewer had one completed session", "Rating itself is not disputed"],
    stats: [["39", "Reviews"], ["5.0", "Rating"], ["1", "Reports"]] },
  { id: "q5", type: "listing", severity: "med", age: 5,
    subject: "Request asks for unlicensed electrical work", detail: "“Rewire two outlets” · Bay Ridge",
    who: "Tom Bexley", photo: PHOTO.marcus,
    quote: "Neighbors flagged this request as out of scope for the handyman category — it needs a licensed electrician.",
    evidence: ["Panel work is outside handyman scope", "3 neighbor flags in 4 hours", "No provider has accepted yet"],
    stats: [["6", "Requests"], ["4.6", "Rating"], ["3", "Flags"]] },
  { id: "q6", type: "application", severity: "low", age: 3,
    subject: "Background check came back clear", detail: "Applicant: Hana Kim · tutoring",
    who: "Hana Kim", photo: PHOTO.sofia,
    quote: "All checks passed. Needs a final human approval before the profile goes live in Bay Ridge.",
    evidence: ["Criminal check clear", "ID verified on first try", "Two references confirmed"],
    stats: [["0", "Bookings"], ["—", "Rating"], ["3h", "In review"]] },
  { id: "q7", type: "review", severity: "low", age: 2,
    subject: "Suspected duplicate review", detail: "5★ on Maya Rivera · dog walking",
    who: "Auto-detect", photo: PHOTO.maya,
    quote: "Near-identical text posted twice by the same household within an hour.",
    evidence: ["Same device fingerprint", "Text 94% similar to review #2211", "Both tied to real bookings"],
    stats: [["213", "Reviews"], ["4.9", "Rating"], ["0", "Reports"]] },
  { id: "q8", type: "dispute", severity: "med", age: 12,
    subject: "Refund request after late cancel", detail: "$24 · booking #4907 · Marcus Tran",
    who: "Jordan Reyes", photo: PHOTO.marcus,
    quote: "Cancelled 40 minutes before the walk. Requester asks for a full refund; policy allows 50%.",
    evidence: ["Cancelled inside the 1-hour window", "Provider had already travelled", "First late cancel on this account"],
    stats: [["22", "Bookings"], ["4.9", "Rating"], ["1", "Late cancels"]] },
];

const REJECT_REASONS = ["Policy violation", "Not enough evidence", "Duplicate report", "Out of scope", "Needs legal review"];

const ADMIN_NAV = [
  { id: "queue", label: "Queue", icon: "inbox" },
  { id: "neighbors", label: "Neighbors", icon: "users" },
  { id: "bookings", label: "Bookings", icon: "calendar" },
  { id: "payouts", label: "Payouts", icon: "credit-card" },
  { id: "settings", label: "Settings", icon: "settings" },
];

/* ---------------- Bookings ---------------- */
const BOOKINGS = {
  upcoming: [
    { id: "b1", who: "maya", service: "60-min neighborhood dog walk", date: "Mon, Jun 15", time: "3:00 PM",
      price: 24, repeat: true, days: ["Mon", "Tue", "Wed", "Thu", "Fri"], status: "confirmed", when: "Weekdays at 3:00 PM" },
    { id: "b2", who: "devon", service: "Mount a TV or floating shelves", date: "Thu, Jun 18", time: "10:00 AM",
      price: 65, repeat: false, status: "pending", when: "Thu, Jun 18 at 10:00 AM" },
  ],
  past: [
    { id: "b3", who: "priya", service: "Deep clean, 3 hours", date: "Tue, Jun 2", time: "1:00 PM",
      price: 90, status: "done", rated: 5 },
    { id: "b4", who: "marcus", service: "45-min dog walk", date: "Fri, May 29", time: "3:00 PM",
      price: 22, status: "done", rated: null },
    { id: "b5", who: "sofia", service: "Weekly apartment clean", date: "Wed, May 20", time: "11:00 AM",
      price: 90, status: "cancelled" },
  ],
};

const BK_STATUS = {
  confirmed: { label: "Confirmed", variant: "success" },
  pending: { label: "Waiting on reply", variant: "warning" },
  done: { label: "Completed", variant: "neutral" },
  cancelled: { label: "Cancelled", variant: "neutral" },
};

/* ---------------- Messages ---------------- */
const THREADS = [
  { id: "t1", who: "maya", unread: 2, at: "9:24 AM",
    messages: [
      { from: "them", text: "Hi Jordan! Just confirming 3 PM starting Monday — does Juniper have a favorite route?", at: "9:20 AM" },
      { from: "them", text: "Also happy to do a quick meet-and-greet Sunday if that helps.", at: "9:24 AM" },
    ] },
  { id: "t2", who: "devon", unread: 1, at: "Yesterday",
    messages: [
      { from: "me", text: "Hi Devon — two floating shelves in the hallway, about 4 ft each.", at: "Tue 4:02 PM" },
      { from: "them", text: "Got it. Plaster or drywall? Changes the anchors I bring.", at: "Yesterday" },
    ] },
  { id: "t3", who: "priya", unread: 0, at: "Jun 2",
    messages: [
      { from: "them", text: "All done! Left the eco spray under the sink for next time.", at: "Jun 2" },
      { from: "me", text: "Place looks amazing — thank you Priya!", at: "Jun 2" },
    ] },
  { id: "t4", who: "marcus", unread: 0, at: "May 29",
    messages: [
      { from: "them", text: "Juniper did great today. Photo attached to the walk summary.", at: "May 29" },
    ] },
];

/* ---------------- Profile ---------------- */
const PROFILE = {
  name: "Jordan Reyes",
  hood: "Bay Ridge, Brooklyn",
  since: "Neighbor since 2024",
  stats: [["22", "Bookings"], ["4.9", "Your rating"], ["6", "Neighbors"]],
};

const PROFILE_ROWS = [
  { id: "payment", label: "Payment methods", detail: "Visa ·· 4417", icon: "credit-card" },
  { id: "address", label: "Saved addresses", detail: "412 82nd St, Apt 3R", icon: "map-pin" },
  { id: "favorites", label: "Saved neighbors", detail: "3 saved", icon: "heart" },
  { id: "help", label: "Help & safety", icon: "shield-check" },
];

const DIST_ICON = { walk: "footprints", blocks: "milestone", mi: "map-pin" };
function distanceLabel(n, fmt) {
  if (fmt === "blocks") return `${n.blocks} blocks`;
  if (fmt === "mi") return `${n.mi} mi away`;
  return `${n.walk} min walk`;
}
const money = (v) => (Math.round(v * 100) / 100).toFixed(2);

window.VelloFlow = {
  I, VerifiedMark, AvatarVerified, Chev, ScrollRow, StatusBar, AppBar, EmptyState, Sheet, Toast, useIcons,
  CATEGORIES, NEIGHBORS, POPULAR, NAV, REQUEST, RESPONDERS, responderPerson, byId, DETAIL, detailFor,
  QTYPES, qtype, SEVERITY, QUEUE, REJECT_REASONS, ADMIN_NAV,
  BOOKINGS, BK_STATUS, THREADS, PROFILE, PROFILE_ROWS,
  DIST_ICON, distanceLabel, money, PHOTO,
};
