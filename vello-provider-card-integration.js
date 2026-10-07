/*
 * Mounts ProviderCard inside the prototype's "Trusted on your block" list.
 *
 * CLAUDE.md v3 rules applied here:
 * - Data and copy come from src/providerModel.js, the same module the React component uses.
 * - The card is rendered with the prototype's own components (AvatarVerified, DS Rating,
 *   Chev, lucide icons via VelloFlow.I) and native classes (.nb, .nb__*), not imitations.
 * - It sits after the first native card, as one provider among others, and follows the
 *   active category filter and the distance format the native cards use.
 * - Injected CSS uses semantic tokens only.
 *
 * Loaded as a module (type="module") so it can import the shared model; serve the
 * project over http (npm run dev) rather than opening the file directly.
 */
import {
  PROVIDER_STATES,
  STATE_LABELS,
  DIST_ICON,
  NO_VOUCH_TEXT,
  distanceParts,
  hasRating,
  isVerified,
  priceParts,
  trustLineParts,
} from "./src/providerModel.js";

const STORAGE_KEY = "vello-provider-card-state";
const HOST_CLASS = "vlpc-host";
const TOAST_MS = 2200;

let activeState = readStoredState();
let mounted = null; // { host, root, key }
let syncQueued = false;

function readStoredState() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return PROVIDER_STATES[stored] ? stored : "vouched";
  } catch {
    return "vouched";
  }
}

function storeState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, state);
  } catch {
    // Preview still works without persistence.
  }
}

function prototypeDeps() {
  const { React, ReactDOM, VelloFlow, VelloDesignSystem_182a1b } = window;
  if (!React || !ReactDOM || !VelloFlow || !VelloDesignSystem_182a1b) return null;
  return { React, ReactDOM, F: VelloFlow, DS: VelloDesignSystem_182a1b };
}

/* ---------- Styles: semantic tokens only ---------- */

function ensureStyles() {
  if (document.getElementById("vlpc-style")) return;
  const style = document.createElement("style");
  style.id = "vlpc-style";
  style.textContent = `
.${HOST_CLASS}{display:contents}
.vlpc-card:focus-visible{outline:2px solid var(--border-focus);outline-offset:2px;box-shadow:var(--focus-ring)}
.vlpc-card .nb__bio{display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
.vlpc-trust{margin:var(--space-1) 0 0;font-size:var(--text-sm);line-height:var(--lh-snug);color:var(--text-body)}
.vlpc-trust strong{color:var(--text-brand);font-weight:var(--fw-semibold)}
.vlpc-trust--empty{color:var(--text-muted)}
.vlpc-card .nb__walk{font-family:var(--font-sans)}
.vlpc-num{font-family:var(--font-mono)}
.vlpc-price--text{font-family:var(--font-sans)}
.vlpc-rating-empty{font-size:var(--text-xs);color:var(--text-muted)}
.vlpc-preview{position:fixed;top:var(--space-4);left:var(--space-4);z-index:90;display:flex;flex-direction:column;align-items:stretch;gap:var(--space-1);padding:var(--space-1);border:1px solid var(--border-default);border-radius:var(--radius-lg);background:var(--surface-card);box-shadow:var(--shadow-md);font-family:var(--font-sans)}
.vlpc-preview__label{padding:var(--space-2) var(--space-3) var(--space-1);color:var(--text-muted);font-size:var(--text-xs);font-weight:var(--fw-semibold)}
.vlpc-preview__button{min-height:44px;padding:0 var(--space-4);text-align:left;border:0;border-radius:var(--radius-pill);background:transparent;color:var(--text-body);font:inherit;font-size:var(--text-sm);font-weight:var(--fw-semibold);cursor:pointer}
.vlpc-preview__button:hover{background:var(--surface-sunken);color:var(--text-strong)}
.vlpc-preview__button[aria-pressed="true"]{background:var(--brand-primary);color:var(--brand-on-primary)}
.vlpc-preview__button:focus-visible{outline:2px solid var(--border-focus);outline-offset:2px;box-shadow:var(--focus-ring)}
`;
  document.head.appendChild(style);

  // DS alignment, kept separate so it can be removed on its own. The prototype's
  // .nb__avail uses coral-700 on coral-100 (4.10:1, fails AA at 12px). The design
  // system's Badge "brand" variant, which DS ProviderCard uses for "Available", is
  // text-brand on brand-primary-tint (5.70:1). See CLAUDE.md §10 Q2.
  const alignment = document.createElement("style");
  alignment.id = "vlpc-ds-alignment";
  alignment.textContent =
    ".nb__avail{color:var(--text-brand);background:var(--brand-primary-tint)}" +
    ".nb__avail i{background:currentColor}";
  document.head.appendChild(alignment);
}

/* ---------- Reading the native list ---------- */

function findTrustedList() {
  return Array.from(document.querySelectorAll(".section")).reduce((found, section) => {
    if (found) return found;
    const title = section.querySelector(".section__title");
    if (!title || !/^Trusted on your block/.test(title.textContent.trim())) return null;
    return section.querySelector(".neighbors");
  }, null);
}

function activeCategory(F) {
  const selected = document.querySelector(".cats .vl-tag--selected");
  if (!selected) return "all";
  const label = selected.textContent.trim();
  const match = F.CATEGORIES.find((c) => c.label === label);
  return match ? match.id : "all";
}

// Use whatever distance format the native cards are showing (prototype tweak).
function nativeDistanceFormat(list) {
  const icon = list.querySelector(`.nb:not(.vlpc-card) .nb__walk svg, .nb:not(.vlpc-card) .nb__walk i`);
  if (!icon) return "walk";
  const format = Object.keys(DIST_ICON).find(
    (key) =>
      icon.getAttribute("data-lucide") === DIST_ICON[key] ||
      icon.classList.contains(`lucide-${DIST_ICON[key]}`),
  );
  return format || "walk";
}

/* ---------- Rendering with prototype components ---------- */

function cardElement({ React, F, DS }, provider, format) {
  const h = React.createElement;
  const price = priceParts(provider.pricing);
  const trust = trustLineParts(provider.vouches, provider.name);
  const distance = distanceParts(provider, format);

  return h(
    "button",
    { type: "button", className: "nb vlpc-card", onClick: () => showToast(provider) },
    h(F.AvatarVerified, {
      n: { photo: provider.photo, name: provider.name, verified: isVerified(provider) },
    }),
    h(
      "div",
      { className: "nb__body" },
      h(
        "div",
        { className: "nb__top" },
        h("span", { className: "nb__name" }, provider.name),
        provider.available ? h("span", { className: "nb__avail" }, h("i"), "Available") : null,
      ),
      h("p", { className: "nb__bio" }, provider.bio),
      trust
        ? h("p", { className: "vlpc-trust" }, h("strong", null, trust.name), trust.rest)
        : h("p", { className: "vlpc-trust vlpc-trust--empty" }, NO_VOUCH_TEXT),
      price.text
        ? h("div", { className: "nb__price vlpc-price--text" }, price.text)
        : h("div", { className: "nb__price" }, price.value, " ", h("span", null, price.unit)),
      h(
        "div",
        { className: "nb__meta" },
        h(
          "span",
          { className: "nb__walk" },
          F.I(DIST_ICON[format]),
          h("span", { className: "vlpc-num" }, distance.value),
          ` ${distance.words}`,
        ),
        hasRating(provider)
          ? h(DS.Rating, { value: provider.rating, size: "sm" })
          : h("span", { className: "vlpc-rating-empty" }, "No ratings yet"),
      ),
    ),
    h("span", { className: "nb__tap", "aria-hidden": "true" }, h(F.Chev)),
  );
}

function showToast(provider) {
  document.querySelectorAll(".vlpc-toast").forEach((node) => node.remove());
  const scroll = document.querySelector(".scroll");
  const frame = (scroll && scroll.parentElement) || document.body;
  const toast = document.createElement("div");
  toast.className = "toast vlpc-toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  toast.innerHTML = '<i data-lucide="check" aria-hidden="true"></i><span></span>';
  toast.querySelector("span").textContent = `Request started for ${provider.name}`;
  frame.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();
  window.setTimeout(() => toast.remove(), TOAST_MS);
}

function unmount() {
  if (!mounted) return;
  // Lucide swaps React's <i> nodes for <svg>, so React can't diff this tree safely.
  // Drop the whole host and render a fresh one instead of re-rendering in place.
  try {
    mounted.root.unmount();
  } catch {
    // Already detached by the prototype re-rendering the list.
  }
  mounted.host.remove();
  mounted = null;
}

function mount(deps, list, key, provider, format) {
  unmount();
  const host = document.createElement("div");
  host.className = HOST_CLASS;
  placeHost(list, host);
  const root = deps.ReactDOM.createRoot(host);
  deps.ReactDOM.flushSync(() => root.render(cardElement(deps, provider, format)));
  if (window.lucide) window.lucide.createIcons();
  mounted = { host, root, key };
}

// After the first native card, so the featured neighbor keeps the top slot.
function placeHost(list, host) {
  const firstNative = list.querySelector(":scope > .nb");
  if (firstNative) {
    if (firstNative.nextSibling !== host) firstNative.after(host);
  } else if (list.firstChild !== host) {
    list.prepend(host);
  }
}

function sync() {
  syncQueued = false;
  const deps = prototypeDeps();
  if (!deps) return;
  ensureStyles();
  ensurePreviewControl();

  const list = findTrustedList();
  if (!list) {
    if (mounted && !mounted.host.isConnected) unmount();
    return;
  }

  const provider = PROVIDER_STATES[activeState];
  const category = activeCategory(deps.F);
  if (category !== "all" && category !== provider.cat) {
    unmount();
    return;
  }

  const format = nativeDistanceFormat(list);
  const key = `${activeState}:${format}`;
  if (mounted && mounted.key === key && mounted.host.parentElement === list) {
    placeHost(list, mounted.host);
    return;
  }
  mount(deps, list, key, provider, format);
}

function queueSync() {
  if (syncQueued) return;
  syncQueued = true;
  window.requestAnimationFrame(sync);
}

/* ---------- Demo-only state preview (CLAUDE.md §6: defaults to baseline) ---------- */

function ensurePreviewControl() {
  if (document.getElementById("vlpc-preview")) return;
  const control = document.createElement("div");
  control.id = "vlpc-preview";
  control.className = "vlpc-preview";
  control.setAttribute("role", "group");
  control.setAttribute("aria-labelledby", "vlpc-preview-label");

  const label = document.createElement("span");
  label.id = "vlpc-preview-label";
  label.className = "vlpc-preview__label";
  label.textContent = "ProviderCard state";
  control.appendChild(label);

  Object.entries(STATE_LABELS).forEach(([state, text]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "vlpc-preview__button";
    button.dataset.state = state;
    button.textContent = text;
    button.setAttribute("aria-pressed", String(state === activeState));
    control.appendChild(button);
  });

  control.addEventListener("click", (event) => {
    const button = event.target.closest(".vlpc-preview__button");
    if (!button) return;
    activeState = button.dataset.state;
    storeState(activeState);
    control.querySelectorAll(".vlpc-preview__button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.dataset.state === activeState));
    });
    queueSync();
  });

  document.body.appendChild(control);
}

/* ---------- Start: re-sync whenever the prototype re-renders ---------- */

// Observe the Document itself: the prototype's bundler swaps in a new <html> element after
// load, which would orphan an observer attached to document.documentElement.
new MutationObserver(queueSync).observe(document, { childList: true, subtree: true });
queueSync();
