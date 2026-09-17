/* @ds-bundle: {"format":3,"namespace":"VelloDesignSystem_182a1b","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"ProviderCard","sourcePath":"components/cards/ProviderCard.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Rating","sourcePath":"components/display/Rating.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"BottomNav","sourcePath":"components/navigation/BottomNav.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"c3c04dbe9d99","components/buttons/IconButton.jsx":"c798a0976afa","components/cards/Card.jsx":"8dfeefcaee6f","components/cards/ProviderCard.jsx":"f13acb42f166","components/display/Avatar.jsx":"9278a822724c","components/display/Badge.jsx":"659015bab17e","components/display/Rating.jsx":"fb7a9fa0cce6","components/display/Tag.jsx":"9a7bf14fd9d9","components/forms/Checkbox.jsx":"f5484f3b2333","components/forms/Input.jsx":"10f53cec5012","components/forms/Switch.jsx":"553f3342f678","components/navigation/BottomNav.jsx":"155faf47faae","components/navigation/Tabs.jsx":"a12f063f1d7a","ui_kits/vello-app/app.jsx":"56a1d6b3519a","ui_kits/vello-app/data.jsx":"a85925e36fb0","ui_kits/vello-app/screens-bookings.jsx":"e39f0ad42314","ui_kits/vello-app/screens-explore.jsx":"cacd1c52e43c","ui_kits/vello-app/screens-profile.jsx":"b6be4117b0f9","ui_kits/vello-app/screens-results.jsx":"c6260950cd5a","ui_kits/vello-app/shell.jsx":"a333f7fc12e8","ui_kits/vello-site/sections-content.jsx":"9c54062fde6b","ui_kits/vello-site/sections-hero.jsx":"cdd1e7840777"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VelloDesignSystem_182a1b = window.VelloDesignSystem_182a1b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Inject component CSS once. */
function useVelloStyle(id, css) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const BTN_CSS = `
.vl-btn {
  --_bg: var(--brand-primary);
  --_fg: var(--brand-on-primary);
  --_bgh: var(--brand-primary-hover);
  --_bga: var(--brand-primary-press);
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  font-family: var(--font-sans); font-weight: var(--fw-semibold);
  border: 1.5px solid transparent; cursor: pointer; white-space: nowrap;
  background: var(--_bg); color: var(--_fg);
  border-radius: var(--radius-pill);
  transition: background var(--dur-fast) var(--ease-standard),
              transform var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard),
              border-color var(--dur-fast) var(--ease-standard);
}
.vl-btn:hover { background: var(--_bgh); }
.vl-btn:active { background: var(--_bga); transform: translateY(1px) scale(0.99); }
.vl-btn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.vl-btn[disabled] { opacity: 0.45; cursor: not-allowed; pointer-events: none; }
.vl-btn--full { width: 100%; }

/* sizes */
.vl-btn--sm { height: 36px; padding: 0 16px; font-size: var(--text-sm); }
.vl-btn--md { height: 46px; padding: 0 22px; font-size: var(--text-base); }
.vl-btn--lg { height: 54px; padding: 0 28px; font-size: var(--text-md); }

/* variants */
.vl-btn--accent { --_bg: var(--accent); --_fg: var(--accent-on); --_bgh: var(--accent-hover); --_bga: var(--accent-press); }
.vl-btn--secondary {
  --_bg: var(--surface-card); --_fg: var(--text-strong);
  --_bgh: var(--surface-sunken); --_bga: var(--ink-100);
  border-color: var(--border-strong);
}
.vl-btn--outline {
  --_bg: transparent; --_fg: var(--text-brand);
  --_bgh: var(--brand-primary-tint); --_bga: var(--green-200);
  border-color: var(--green-300);
}
.vl-btn--ghost {
  --_bg: transparent; --_fg: var(--text-strong);
  --_bgh: var(--surface-sunken); --_bga: var(--ink-100);
}
.vl-btn svg, .vl-btn .vl-btn__icon { width: 1.15em; height: 1.15em; flex: none; }
`;

/**
 * Vello Button — primary action control.
 */
function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leadingIcon = null,
  trailingIcon = null,
  as = 'button',
  className = '',
  children,
  ...rest
}) {
  useVelloStyle('vl-btn-css', BTN_CSS);
  const Tag = as;
  const cls = ['vl-btn', `vl-btn--${variant}`, `vl-btn--${size}`, fullWidth ? 'vl-btn--full' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), leadingIcon ? /*#__PURE__*/React.createElement("span", {
    className: "vl-btn__icon"
  }, leadingIcon) : null, children, trailingIcon ? /*#__PURE__*/React.createElement("span", {
    className: "vl-btn__icon"
  }, trailingIcon) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ICONBTN_CSS = `
.vl-iconbtn {
  display: inline-grid; place-items: center; cursor: pointer;
  background: var(--surface-card); color: var(--text-body);
  border: 1.5px solid var(--border-strong); border-radius: var(--radius-pill);
  transition: background var(--dur-fast) var(--ease-standard),
              color var(--dur-fast) var(--ease-standard),
              transform var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard);
}
.vl-iconbtn:hover { background: var(--surface-sunken); }
.vl-iconbtn:active { transform: scale(0.93); }
.vl-iconbtn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.vl-iconbtn[disabled] { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
.vl-iconbtn--sm { width: 34px; height: 34px; }
.vl-iconbtn--md { width: 44px; height: 44px; }
.vl-iconbtn--lg { width: 52px; height: 52px; }
.vl-iconbtn--sm svg, .vl-iconbtn--sm .vl-iconbtn__i { width: 16px; height: 16px; }
.vl-iconbtn--md svg, .vl-iconbtn--md .vl-iconbtn__i { width: 20px; height: 20px; }
.vl-iconbtn--lg svg, .vl-iconbtn--lg .vl-iconbtn__i { width: 24px; height: 24px; }
.vl-iconbtn--solid { background: var(--brand-primary); color: var(--brand-on-primary); border-color: transparent; }
.vl-iconbtn--solid:hover { background: var(--brand-primary-hover); }
.vl-iconbtn--ghost { background: transparent; border-color: transparent; }
.vl-iconbtn--ghost:hover { background: var(--surface-sunken); }
`;
function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

/** Vello IconButton — square-tap circular control for a single icon action. */
function IconButton({
  variant = 'default',
  size = 'md',
  label,
  className = '',
  children,
  ...rest
}) {
  inject('vl-iconbtn-css', ICONBTN_CSS);
  const cls = ['vl-iconbtn', `vl-iconbtn--${size}`, variant !== 'default' ? `vl-iconbtn--${variant}` : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    "aria-label": label
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "vl-iconbtn__i"
  }, children));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/cards/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CARD_CSS = `
.vl-card {
  background: var(--surface-card);
  border: 1.5px solid var(--border-default);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.vl-card--pad-sm { padding: 14px; }
.vl-card--pad-md { padding: 20px; }
.vl-card--pad-lg { padding: 28px; }
.vl-card--pad-none { padding: 0; }
.vl-card--flat { box-shadow: none; }
.vl-card--raised { box-shadow: var(--shadow-md); border-color: transparent; }
.vl-card--floating { box-shadow: var(--shadow-lg); border-color: transparent; }
.vl-card--interactive { cursor: pointer; transition: transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard); }
.vl-card--interactive:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.vl-card--interactive:active { transform: translateY(0); }
`;
function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Card — base surface container. */
function Card({
  elevation = 'flat',
  padding = 'md',
  interactive = false,
  as = 'div',
  className = '',
  children,
  ...rest
}) {
  inject('vl-card-css', CARD_CSS);
  const Tag = as;
  const cls = ['vl-card', `vl-card--${elevation}`, `vl-card--pad-${padding}`, interactive ? 'vl-card--interactive' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
const AVATAR_CSS = `
.vl-avatar { position: relative; display: inline-flex; flex: none; }
.vl-avatar__img, .vl-avatar__fallback {
  border-radius: 999px; object-fit: cover; display: grid; place-items: center;
  background: var(--green-200); color: var(--green-800);
  font-family: var(--font-display); font-weight: var(--fw-bold);
  box-shadow: inset 0 0 0 2px rgba(255,255,255,0.9);
}
.vl-avatar--xs .vl-avatar__img, .vl-avatar--xs .vl-avatar__fallback { width: 28px; height: 28px; font-size: 11px; }
.vl-avatar--sm .vl-avatar__img, .vl-avatar--sm .vl-avatar__fallback { width: 36px; height: 36px; font-size: 14px; }
.vl-avatar--md .vl-avatar__img, .vl-avatar--md .vl-avatar__fallback { width: 48px; height: 48px; font-size: 18px; }
.vl-avatar--lg .vl-avatar__img, .vl-avatar--lg .vl-avatar__fallback { width: 64px; height: 64px; font-size: 24px; }
.vl-avatar--xl .vl-avatar__img, .vl-avatar--xl .vl-avatar__fallback { width: 88px; height: 88px; font-size: 32px; }
.vl-avatar__badge {
  position: absolute; right: -2px; bottom: -2px;
  background: var(--brand-primary); color: #fff; border-radius: 999px;
  display: grid; place-items: center; box-shadow: 0 0 0 2.5px var(--surface-card);
}
.vl-avatar__badge svg { width: 60%; height: 60%; stroke-width: 3; }
.vl-avatar--xs .vl-avatar__badge { width: 12px; height: 12px; }
.vl-avatar--sm .vl-avatar__badge { width: 15px; height: 15px; }
.vl-avatar--md .vl-avatar__badge { width: 18px; height: 18px; }
.vl-avatar--lg .vl-avatar__badge { width: 22px; height: 22px; }
.vl-avatar--xl .vl-avatar__badge { width: 28px; height: 28px; }
.vl-avatar__status {
  position: absolute; right: 0; bottom: 0; border-radius: 999px;
  background: var(--green-500); box-shadow: 0 0 0 2.5px var(--surface-card);
  width: 30%; height: 30%; min-width: 9px; min-height: 9px;
}
`;
function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
}

/** Vello Avatar — provider / neighbor photo with optional verified badge or status dot. */
function Avatar({
  src,
  name = '',
  size = 'md',
  verified = false,
  online = false,
  className = ''
}) {
  inject('vl-avatar-css', AVATAR_CSS);
  const cls = ['vl-avatar', `vl-avatar--${size}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", {
    className: cls
  }, src ? /*#__PURE__*/React.createElement("img", {
    className: "vl-avatar__img",
    src: src,
    alt: name
  }) : /*#__PURE__*/React.createElement("span", {
    className: "vl-avatar__fallback",
    "aria-label": name
  }, initials(name)), verified ? /*#__PURE__*/React.createElement("span", {
    className: "vl-avatar__badge",
    title: "Verified provider"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))) : online ? /*#__PURE__*/React.createElement("span", {
    className: "vl-avatar__status"
  }) : null);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
const BADGE_CSS = `
.vl-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: var(--font-sans); font-weight: var(--fw-semibold);
  border-radius: var(--radius-pill); white-space: nowrap; line-height: 1;
}
.vl-badge--sm { font-size: 11px; padding: 4px 9px; }
.vl-badge--md { font-size: 13px; padding: 6px 12px; }
.vl-badge__dot { width: 7px; height: 7px; border-radius: 999px; background: currentColor; }
.vl-badge svg { width: 1em; height: 1em; }
.vl-badge--neutral { background: var(--surface-sunken); color: var(--text-muted); }
.vl-badge--brand   { background: var(--brand-primary-tint); color: var(--text-brand); }
.vl-badge--success { background: var(--success-tint); color: var(--green-700); }
.vl-badge--info    { background: var(--info-tint); color: var(--sky-700); }
.vl-badge--warning { background: var(--warning-tint); color: var(--amber-700); }
.vl-badge--danger  { background: var(--danger-tint); color: var(--red-700); }
.vl-badge--accent  { background: var(--accent-tint); color: var(--coral-700); }
.vl-badge--solid   { background: var(--brand-primary); color: #fff; }
`;
function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Badge — compact status / metadata pill. */
function Badge({
  variant = 'neutral',
  size = 'md',
  dot = false,
  icon = null,
  className = '',
  children
}) {
  inject('vl-badge-css', BADGE_CSS);
  const cls = ['vl-badge', `vl-badge--${variant}`, `vl-badge--${size}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", {
    className: cls
  }, dot ? /*#__PURE__*/React.createElement("span", {
    className: "vl-badge__dot"
  }) : null, icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Rating.jsx
try { (() => {
const RATING_CSS = `
.vl-rating { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-sans); }
.vl-rating__stars { display: inline-flex; gap: 1px; color: var(--rating); }
.vl-rating__stars svg { width: 1em; height: 1em; }
.vl-rating--sm { font-size: 14px; }
.vl-rating--md { font-size: 18px; }
.vl-rating--lg { font-size: 22px; }
.vl-rating__star-bg { color: var(--ink-200); }
.vl-rating__value { font-family: var(--font-mono); font-weight: var(--fw-semibold); color: var(--text-strong); font-variant-numeric: tabular-nums; }
.vl-rating__count { color: var(--text-muted); font-size: 0.82em; }
`;
function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const Star = ({
  fill
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: fill,
  stroke: "none"
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 18.9 6.1 21.3l1.3-6.6L2.5 9.5l6.6-.8L12 2.5z"
}));

/** Vello star Rating — amber stars with optional numeric value and review count. */
function Rating({
  value = 0,
  max = 5,
  size = 'md',
  showValue = true,
  count,
  starsOnly = false,
  className = ''
}) {
  inject('vl-rating-css', RATING_CSS);
  const rounded = Math.round(value);
  return /*#__PURE__*/React.createElement("span", {
    className: ['vl-rating', `vl-rating--${size}`, className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("span", {
    className: "vl-rating__stars",
    "aria-label": `${value} out of ${max} stars`
  }, Array.from({
    length: max
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: i < rounded ? '' : 'vl-rating__star-bg'
  }, /*#__PURE__*/React.createElement(Star, {
    fill: "currentColor"
  })))), !starsOnly && showValue ? /*#__PURE__*/React.createElement("span", {
    className: "vl-rating__value"
  }, value.toFixed(1)) : null, !starsOnly && count != null ? /*#__PURE__*/React.createElement("span", {
    className: "vl-rating__count"
  }, "(", count, ")") : null);
}
Object.assign(__ds_scope, { Rating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Rating.jsx", error: String((e && e.message) || e) }); }

// components/cards/ProviderCard.jsx
try { (() => {
const PROVIDER_CSS = `
.vl-provider {
  display: flex; gap: 14px; align-items: flex-start;
  background: var(--surface-card);
  border: 1.5px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: 16px;
  transition: transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard);
}
.vl-provider--interactive { cursor: pointer; }
.vl-provider--interactive:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: transparent; }
.vl-provider--featured { box-shadow: var(--shadow-brand); border-color: transparent; }
.vl-provider__body { flex: 1; min-width: 0; }
.vl-provider__top { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.vl-provider__name { font-family: var(--font-display); font-weight: var(--fw-bold); font-size: var(--text-lg); color: var(--text-strong); letter-spacing: -0.01em; }
.vl-provider__service { font-size: var(--text-sm); color: var(--text-muted); }
.vl-provider__meta { display: flex; align-items: center; gap: 12px; margin-top: 6px; flex-wrap: wrap; }
.vl-provider__dist { display: inline-flex; align-items: center; gap: 4px; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); }
.vl-provider__dist svg { width: 13px; height: 13px; }
.vl-provider__badges { display: flex; gap: 6px; margin-top: 10px; flex-wrap: wrap; }
.vl-provider__aside { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; flex: none; }
.vl-provider__price { text-align: right; line-height: 1; }
.vl-provider__price b { font-family: var(--font-mono); font-weight: var(--fw-semibold); font-size: var(--text-xl); color: var(--text-strong); white-space: nowrap; }
.vl-provider__price span { font-size: var(--text-xs); color: var(--text-muted); display: block; margin-top: 3px; }
`;
function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

/** Vello ProviderCard — the signature listing for a local service provider. */
function ProviderCard({
  name,
  photo,
  service,
  rating,
  reviews,
  distance,
  price,
  priceUnit = 'hr',
  verified = false,
  available = false,
  featured = false,
  interactive = true,
  badges = [],
  ctaLabel = 'Book',
  onBook,
  onMessage,
  className = ''
}) {
  inject('vl-provider-css', PROVIDER_CSS);
  const cls = ['vl-provider', interactive ? 'vl-provider--interactive' : '', featured ? 'vl-provider--featured' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    src: photo,
    name: name,
    size: "lg",
    verified: verified
  }), /*#__PURE__*/React.createElement("div", {
    className: "vl-provider__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vl-provider__top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vl-provider__name"
  }, name), available ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    variant: "brand",
    size: "sm",
    dot: true
  }, "Available") : null), /*#__PURE__*/React.createElement("div", {
    className: "vl-provider__service"
  }, service), /*#__PURE__*/React.createElement("div", {
    className: "vl-provider__meta"
  }, /*#__PURE__*/React.createElement(__ds_scope.Rating, {
    value: rating,
    count: reviews,
    size: "sm"
  }), distance != null ? /*#__PURE__*/React.createElement("span", {
    className: "vl-provider__dist"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "map-pin"
  }), distance, " mi") : null), badges.length ? /*#__PURE__*/React.createElement("div", {
    className: "vl-provider__badges"
  }, badges.map((b, i) => /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    key: i,
    variant: "neutral",
    size: "sm"
  }, b))) : null), /*#__PURE__*/React.createElement("div", {
    className: "vl-provider__aside"
  }, price != null ? /*#__PURE__*/React.createElement("div", {
    className: "vl-provider__price"
  }, /*#__PURE__*/React.createElement("b", null, "$", price), /*#__PURE__*/React.createElement("span", null, "per ", priceUnit)) : null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "sm",
    variant: "primary",
    onClick: onBook
  }, ctaLabel)));
}
Object.assign(__ds_scope, { ProviderCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/ProviderCard.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TAG_CSS = `
.vl-tag {
  display: inline-flex; align-items: center; gap: 7px;
  font-family: var(--font-sans); font-weight: var(--fw-medium); font-size: var(--text-sm);
  padding: 8px 14px; border-radius: var(--radius-pill); cursor: pointer;
  background: var(--surface-card); color: var(--text-body);
  border: 1.5px solid var(--border-strong);
  transition: all var(--dur-fast) var(--ease-standard);
}
.vl-tag:hover { border-color: var(--green-300); background: var(--green-50); }
.vl-tag svg { width: 16px; height: 16px; }
.vl-tag--selected {
  background: var(--brand-primary-tint); color: var(--text-brand);
  border-color: var(--brand-primary); font-weight: var(--fw-semibold);
}
.vl-tag--selected:hover { background: var(--green-200); }
.vl-tag__remove { display: inline-grid; place-items: center; opacity: 0.6; }
.vl-tag__remove:hover { opacity: 1; }
.vl-tag--static { cursor: default; }
.vl-tag--static:hover { border-color: var(--border-strong); background: var(--surface-card); }
`;
function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Tag — selectable category / filter chip. */
function Tag({
  selected = false,
  icon = null,
  onRemove,
  interactive = true,
  className = '',
  children,
  ...rest
}) {
  inject('vl-tag-css', TAG_CSS);
  const cls = ['vl-tag', selected ? 'vl-tag--selected' : '', !interactive ? 'vl-tag--static' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    "aria-pressed": interactive ? selected : undefined
  }, rest), icon, children, onRemove ? /*#__PURE__*/React.createElement("span", {
    className: "vl-tag__remove",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    },
    "aria-label": "Remove"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x"
  })) : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CHECK_CSS = `
.vl-check { display: inline-flex; align-items: flex-start; gap: 10px; cursor: pointer; font-family: var(--font-sans); }
.vl-check__box {
  width: 22px; height: 22px; flex: none; border-radius: 7px; margin-top: 1px;
  border: 1.5px solid var(--border-strong); background: var(--surface-card);
  display: grid; place-items: center; color: #fff;
  transition: background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
}
.vl-check__box svg { width: 14px; height: 14px; stroke-width: 3; opacity: 0; transform: scale(0.6); transition: all var(--dur-fast) var(--ease-spring); }
.vl-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.vl-check input:checked + .vl-check__box { background: var(--brand-primary); border-color: var(--brand-primary); }
.vl-check input:checked + .vl-check__box svg { opacity: 1; transform: scale(1); }
.vl-check input:focus-visible + .vl-check__box { box-shadow: var(--focus-ring); }
.vl-check input:disabled + .vl-check__box { opacity: 0.45; }
.vl-check__label { font-size: var(--text-base); color: var(--text-body); line-height: 1.4; }
.vl-check__label b { font-weight: var(--fw-semibold); color: var(--text-strong); display: block; }
`;
function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Checkbox with optional rich label. */
function Checkbox({
  label,
  description,
  className = '',
  ...rest
}) {
  inject('vl-check-css', CHECK_CSS);
  return /*#__PURE__*/React.createElement("label", {
    className: ['vl-check', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "vl-check__box",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), label || description ? /*#__PURE__*/React.createElement("span", {
    className: "vl-check__label"
  }, description ? /*#__PURE__*/React.createElement("b", null, label) : label, description) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const INPUT_CSS = `
.vl-field { display: flex; flex-direction: column; gap: 6px; font-family: var(--font-sans); }
.vl-field__label { font-size: var(--text-sm); font-weight: var(--fw-semibold); color: var(--text-strong); }
.vl-field__req { color: var(--accent); margin-left: 2px; }
.vl-inputwrap {
  display: flex; align-items: center; gap: 8px;
  background: var(--surface-card);
  border: 1.5px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: 0 14px; height: 48px;
  transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
}
.vl-inputwrap:focus-within { border-color: var(--border-focus); box-shadow: var(--focus-ring); }
.vl-inputwrap--error { border-color: var(--danger); }
.vl-inputwrap--error:focus-within { box-shadow: var(--focus-ring-accent); }
.vl-inputwrap__icon { color: var(--text-subtle); display: grid; place-items: center; }
.vl-inputwrap__icon svg { width: 18px; height: 18px; }
.vl-input {
  flex: 1; border: none; outline: none; background: transparent;
  font-family: inherit; font-size: var(--text-base); color: var(--text-strong);
  min-width: 0;
}
.vl-input::placeholder { color: var(--text-subtle); }
.vl-inputwrap[aria-disabled="true"] { background: var(--surface-sunken); opacity: 0.7; }
.vl-field__hint { font-size: var(--text-xs); color: var(--text-muted); }
.vl-field__hint--error { color: var(--danger); }
`;
function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

/** Vello text Input with label, hint, error and optional leading/trailing icon. */
function Input({
  label,
  hint,
  error,
  required = false,
  leadingIcon = null,
  trailingIcon = null,
  id,
  className = '',
  disabled = false,
  ...rest
}) {
  inject('vl-input-css', INPUT_CSS);
  const fieldId = id || (label ? 'vl-' + label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return /*#__PURE__*/React.createElement("div", {
    className: ['vl-field', className].filter(Boolean).join(' ')
  }, label ? /*#__PURE__*/React.createElement("label", {
    className: "vl-field__label",
    htmlFor: fieldId
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "vl-field__req"
  }, "*") : null) : null, /*#__PURE__*/React.createElement("div", {
    className: ['vl-inputwrap', error ? 'vl-inputwrap--error' : ''].filter(Boolean).join(' '),
    "aria-disabled": disabled || undefined
  }, leadingIcon ? /*#__PURE__*/React.createElement("span", {
    className: "vl-inputwrap__icon"
  }, leadingIcon) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: "vl-input",
    disabled: disabled
  }, rest)), trailingIcon ? /*#__PURE__*/React.createElement("span", {
    className: "vl-inputwrap__icon"
  }, trailingIcon) : null), error || hint ? /*#__PURE__*/React.createElement("span", {
    className: ['vl-field__hint', error ? 'vl-field__hint--error' : ''].filter(Boolean).join(' ')
  }, error || hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SWITCH_CSS = `
.vl-switch { display: inline-flex; align-items: center; gap: 12px; cursor: pointer; font-family: var(--font-sans); }
.vl-switch__track {
  width: 46px; height: 28px; border-radius: 999px; flex: none;
  background: var(--ink-200); position: relative;
  transition: background var(--dur-base) var(--ease-standard);
}
.vl-switch__thumb {
  position: absolute; top: 3px; left: 3px; width: 22px; height: 22px;
  border-radius: 999px; background: #fff; box-shadow: var(--shadow-sm);
  transition: transform var(--dur-base) var(--ease-spring);
}
.vl-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.vl-switch input:checked + .vl-switch__track { background: var(--brand-primary); }
.vl-switch input:checked + .vl-switch__track .vl-switch__thumb { transform: translateX(18px); }
.vl-switch input:focus-visible + .vl-switch__track { box-shadow: var(--focus-ring); }
.vl-switch input:disabled + .vl-switch__track { opacity: 0.45; }
.vl-switch__label { font-size: var(--text-base); color: var(--text-strong); font-weight: var(--fw-medium); }
`;
function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Switch — instant on/off toggle for settings. */
function Switch({
  label,
  className = '',
  ...rest
}) {
  inject('vl-switch-css', SWITCH_CSS);
  return /*#__PURE__*/React.createElement("label", {
    className: ['vl-switch', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "vl-switch__track",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "vl-switch__thumb"
  })), label ? /*#__PURE__*/React.createElement("span", {
    className: "vl-switch__label"
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNav.jsx
try { (() => {
const BOTTOMNAV_CSS = `
.vl-bottomnav {
  display: flex; align-items: stretch; justify-content: space-around;
  background: var(--surface-card);
  border-top: 1.5px solid var(--border-default);
  padding: 8px 8px calc(8px + env(safe-area-inset-bottom, 0px));
}
.vl-navitem {
  appearance: none; background: none; border: none; cursor: pointer;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  flex: 1; padding: 4px 0; color: var(--text-muted);
  font-family: var(--font-sans); font-size: 11px; font-weight: var(--fw-semibold);
  transition: color var(--dur-fast) var(--ease-standard);
  position: relative;
}
.vl-navitem svg { width: 24px; height: 24px; stroke-width: 2; }
.vl-navitem:hover { color: var(--text-body); }
.vl-navitem--active { color: var(--text-brand); }
.vl-navitem--active svg { stroke-width: 2.4; }
.vl-navitem__badge {
  position: absolute; top: 0; left: 50%; margin-left: 6px;
  min-width: 16px; height: 16px; padding: 0 4px; border-radius: 999px;
  background: var(--accent); color: #fff; font-size: 10px; font-weight: var(--fw-bold);
  display: grid; place-items: center; line-height: 1;
}
`;
function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

/** Vello BottomNav — mobile tab bar with icons. */
function BottomNav({
  items = [],
  value,
  onChange,
  className = ''
}) {
  inject('vl-bottomnav-css', BOTTOMNAV_CSS);
  return /*#__PURE__*/React.createElement("nav", {
    className: ['vl-bottomnav', className].filter(Boolean).join(' ')
  }, items.map(it => {
    const id = it.id ?? it.label;
    const active = id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      className: ['vl-navitem', active ? 'vl-navitem--active' : ''].join(' '),
      "aria-current": active ? 'page' : undefined,
      onClick: () => onChange && onChange(id)
    }, it.badge != null ? /*#__PURE__*/React.createElement("span", {
      className: "vl-navitem__badge"
    }, it.badge) : null, it.icon, /*#__PURE__*/React.createElement("span", null, it.label));
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
const TABS_CSS = `
.vl-tabs { display: inline-flex; gap: 4px; border-bottom: 1.5px solid var(--border-default); }
.vl-tabs--fill { display: flex; }
.vl-tab {
  appearance: none; background: none; border: none; cursor: pointer;
  font-family: var(--font-sans); font-weight: var(--fw-semibold); font-size: var(--text-base);
  color: var(--text-muted); padding: 12px 14px; position: relative;
  display: inline-flex; align-items: center; gap: 7px; flex: 1; justify-content: center;
  transition: color var(--dur-fast) var(--ease-standard);
}
.vl-tab svg { width: 17px; height: 17px; }
.vl-tab:hover { color: var(--text-body); }
.vl-tab--active { color: var(--text-brand); }
.vl-tab--active::after {
  content: ''; position: absolute; left: 10px; right: 10px; bottom: -1.5px; height: 3px;
  background: var(--brand-primary); border-radius: 3px 3px 0 0;
}
.vl-tab__count { font-family: var(--font-mono); font-size: 11px; background: var(--surface-sunken); color: var(--text-muted); border-radius: 999px; padding: 1px 7px; }
.vl-tab--active .vl-tab__count { background: var(--brand-primary-tint); color: var(--text-brand); }
`;
function inject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

/** Vello Tabs — underline tab bar for switching views. */
function Tabs({
  items = [],
  value,
  onChange,
  fill = false,
  className = ''
}) {
  inject('vl-tabs-css', TABS_CSS);
  return /*#__PURE__*/React.createElement("div", {
    className: ['vl-tabs', fill ? 'vl-tabs--fill' : '', className].filter(Boolean).join(' '),
    role: "tablist"
  }, items.map(it => {
    const id = it.id ?? it.label;
    const active = id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      role: "tab",
      "aria-selected": active,
      className: ['vl-tab', active ? 'vl-tab--active' : ''].join(' '),
      onClick: () => onChange && onChange(id)
    }, it.icon, it.label, it.count != null ? /*#__PURE__*/React.createElement("span", {
      className: "vl-tab__count"
    }, it.count) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/vello-app/app.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Vello app kit — orchestrator. State machine over the screens. */
(function () {
  const {
    useState
  } = React;
  const {
    PhoneFrame
  } = window.VelloShell;
  const {
    BottomNav
  } = window.VelloDesignSystem_182a1b;
  const S = window.VelloScreens;
  function App() {
    const [tab, setTab] = useState('home');
    const [stack, setStack] = useState([]); // overlay screens on top of the active tab
    const [sheet, setSheet] = useState(null); // booking sheet
    const [confirm, setConfirm] = useState(null);
    const push = v => setStack(s => [...s, v]);
    const pop = () => setStack(s => s.slice(0, -1));
    const top = stack[stack.length - 1];
    const goTab = id => {
      setStack([]);
      setConfirm(null);
      setTab(id);
    };
    const openProvider = p => push({
      type: 'profile',
      provider: p
    });
    const openCategory = c => push({
      type: 'results',
      category: c
    });
    let body;
    if (confirm) {
      body = /*#__PURE__*/React.createElement(S.ConfirmScreen, _extends({}, confirm, {
        onDone: () => {
          setConfirm(null);
          setStack([]);
          setTab('bookings');
        }
      }));
    } else if (top && top.type === 'profile') {
      body = /*#__PURE__*/React.createElement(S.ProfileScreen, {
        provider: top.provider,
        onBack: pop,
        onBook: (provider, service) => setSheet({
          provider,
          service
        })
      });
    } else if (top && top.type === 'results') {
      body = /*#__PURE__*/React.createElement(S.ResultsScreen, {
        category: top.category,
        onBack: pop,
        onOpenProvider: openProvider
      });
    } else if (tab === 'home') {
      body = /*#__PURE__*/React.createElement(S.ExploreScreen, {
        onOpenProvider: openProvider,
        onOpenCategory: openCategory
      });
    } else if (tab === 'bookings') {
      body = /*#__PURE__*/React.createElement(S.BookingsScreen, {
        onOpenProvider: openProvider
      });
    } else if (tab === 'messages') {
      body = /*#__PURE__*/React.createElement(S.MessagesScreen, {
        onOpenProvider: openProvider
      });
    } else {
      body = /*#__PURE__*/React.createElement(S.AccountScreen, null);
    }
    const hideNav = top || confirm;
    const onGreen = top && top.type === 'profile' && !confirm;
    return /*#__PURE__*/React.createElement(PhoneFrame, {
      statusDark: !!onGreen
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0
      }
    }, body), !hideNav ? /*#__PURE__*/React.createElement(BottomNav, {
      value: tab,
      onChange: goTab,
      items: [{
        id: 'home',
        label: 'Explore',
        icon: /*#__PURE__*/React.createElement("i", {
          "data-lucide": "compass"
        })
      }, {
        id: 'bookings',
        label: 'Bookings',
        icon: /*#__PURE__*/React.createElement("i", {
          "data-lucide": "calendar"
        }),
        badge: 2
      }, {
        id: 'messages',
        label: 'Messages',
        icon: /*#__PURE__*/React.createElement("i", {
          "data-lucide": "message-circle"
        }),
        badge: 1
      }, {
        id: 'account',
        label: 'You',
        icon: /*#__PURE__*/React.createElement("i", {
          "data-lucide": "user"
        })
      }]
    }) : null, sheet ? /*#__PURE__*/React.createElement(S.BookingSheet, {
      provider: sheet.provider,
      service: sheet.service,
      onClose: () => setSheet(null),
      onConfirm: slot => {
        setConfirm({
          provider: sheet.provider,
          service: sheet.service,
          slot
        });
        setSheet(null);
      }
    }) : null);
  }
  window.VelloApp = App;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/vello-app/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/vello-app/data.jsx
try { (() => {
/* Vello app — mock data. Shared via window for the babel-loaded kit. */
const VELLO_CATEGORIES = [{
  id: 'dog',
  label: 'Dog walking',
  icon: 'dog',
  tint: 'var(--green-100)',
  fg: 'var(--green-700)'
}, {
  id: 'clean',
  label: 'Cleaning',
  icon: 'sparkles',
  tint: 'var(--coral-100)',
  fg: 'var(--coral-700)'
}, {
  id: 'handy',
  label: 'Handyperson',
  icon: 'wrench',
  tint: 'var(--amber-100)',
  fg: 'var(--amber-700)'
}, {
  id: 'tutor',
  label: 'Tutoring',
  icon: 'graduation-cap',
  tint: 'var(--sky-100)',
  fg: 'var(--sky-700)'
}, {
  id: 'garden',
  label: 'Gardening',
  icon: 'flower-2',
  tint: 'var(--green-100)',
  fg: 'var(--green-700)'
}, {
  id: 'sitter',
  label: 'Babysitting',
  icon: 'baby',
  tint: 'var(--coral-100)',
  fg: 'var(--coral-700)'
}, {
  id: 'mover',
  label: 'Moving help',
  icon: 'package',
  tint: 'var(--amber-100)',
  fg: 'var(--amber-700)'
}, {
  id: 'more',
  label: 'More',
  icon: 'grip',
  tint: 'var(--ink-100)',
  fg: 'var(--ink-600)'
}];
const VELLO_PROVIDERS = [{
  id: 'maya',
  name: 'Maya Rivera',
  service: 'Dog walker · 3 yrs on Vello',
  cat: 'dog',
  rating: 4.9,
  reviews: 213,
  distance: 0.4,
  price: 28,
  verified: true,
  available: true,
  badges: ['Brings supplies', 'Pet first-aid'],
  featured: true,
  bio: "Hi! I'm Maya — I've walked dogs all over Bed-Stuy for three years. Your pup gets a 30-minute loop through Herbert Von King Park and a photo update every time.",
  services: [{
    name: '30-min neighborhood walk',
    price: 28
  }, {
    name: '60-min park adventure',
    price: 48
  }, {
    name: 'Drop-in feed & play',
    price: 20
  }]
}, {
  id: 'devon',
  name: 'Devon King',
  service: 'Home cleaner',
  cat: 'clean',
  rating: 4.8,
  reviews: 88,
  distance: 1.2,
  price: 35,
  verified: true,
  available: false,
  badges: ['Eco products', 'Same-day'],
  bio: 'Deep cleans, move-outs, and weekly tidies. I bring my own eco-friendly supplies and treat your place like my own.',
  services: [{
    name: 'Standard clean (2 br)',
    price: 90
  }, {
    name: 'Deep clean',
    price: 150
  }, {
    name: 'Hourly',
    price: 35
  }]
}, {
  id: 'sara',
  name: 'Sara Lin',
  service: 'Math & SAT tutor',
  cat: 'tutor',
  rating: 5.0,
  reviews: 41,
  distance: 0.9,
  price: 45,
  verified: true,
  available: true,
  badges: ['Ivy grad', 'In-home or online'],
  bio: 'Patient, structured tutoring for grades 6–12. I build a custom plan after the first session — most students jump a full letter grade in a semester.',
  services: [{
    name: '1-hour session',
    price: 45
  }, {
    name: 'SAT prep package (4)',
    price: 160
  }]
}, {
  id: 'tom',
  name: 'Tom Baptiste',
  service: 'Handyperson · licensed',
  cat: 'handy',
  rating: 4.7,
  reviews: 156,
  distance: 1.6,
  price: 60,
  verified: true,
  available: true,
  badges: ['Licensed', 'Free quotes'],
  bio: 'Furniture assembly, mounting, leaks, and the odd jobs that pile up. No job too small — most visits done in under an hour.',
  services: [{
    name: 'First hour',
    price: 60
  }, {
    name: 'TV mounting',
    price: 95
  }, {
    name: 'Furniture assembly',
    price: 70
  }]
}, {
  id: 'priya',
  name: 'Priya N.',
  service: 'Babysitter · CPR certified',
  cat: 'sitter',
  rating: 4.9,
  reviews: 64,
  distance: 0.6,
  price: 25,
  verified: true,
  available: false,
  badges: ['CPR certified', 'Ages 0–10'],
  bio: 'Evenings and weekends, games and bedtime routines. Parents say their kids ask when I am coming back.',
  services: [{
    name: 'Hourly sitting',
    price: 25
  }, {
    name: 'Date-night package',
    price: 110
  }]
}];
const VELLO_BOOKINGS = [{
  id: 'b1',
  providerId: 'maya',
  service: '30-min neighborhood walk',
  when: 'Today · 3:00 PM',
  status: 'confirmed'
}, {
  id: 'b2',
  providerId: 'tom',
  service: 'TV mounting',
  when: 'Thu, Jun 12 · 10:00 AM',
  status: 'pending'
}];
window.VELLO_DATA = {
  VELLO_CATEGORIES,
  VELLO_PROVIDERS,
  VELLO_BOOKINGS
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/vello-app/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/vello-app/screens-bookings.jsx
try { (() => {
/* Vello app kit — Bookings, Messages, Account tab screens. */
(function () {
  const {
    useState
  } = React;
  const {
    I,
    Scroll
  } = window.VelloShell;
  const {
    Tabs,
    Card,
    Avatar,
    Badge,
    Button,
    Rating
  } = window.VelloDesignSystem_182a1b;
  const {
    VELLO_BOOKINGS,
    VELLO_PROVIDERS
  } = window.VELLO_DATA;
  const byId = id => VELLO_PROVIDERS.find(p => p.id === id);
  function TabHeader({
    title
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '2px 20px 6px'
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 28,
        fontWeight: 800,
        letterSpacing: '-0.02em',
        color: 'var(--text-strong)',
        margin: 0
      }
    }, title));
  }
  function BookingCard({
    b,
    onOpen
  }) {
    const p = byId(b.providerId);
    return /*#__PURE__*/React.createElement(Card, {
      elevation: "raised",
      padding: "md",
      interactive: true,
      onClick: () => onOpen(p)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: p.name,
      size: "md",
      verified: p.verified
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 15,
        color: 'var(--text-strong)'
      }
    }, b.service), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        color: 'var(--text-muted)'
      }
    }, "with ", p.name)), b.status === 'confirmed' ? /*#__PURE__*/React.createElement(Badge, {
      variant: "success",
      dot: true
    }, "Confirmed") : /*#__PURE__*/React.createElement(Badge, {
      variant: "warning",
      dot: true
    }, "Pending")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 12,
        paddingTop: 12,
        borderTop: '1px solid var(--border-subtle)',
        color: 'var(--text-body)',
        fontFamily: 'var(--font-sans)',
        fontSize: 13.5,
        fontWeight: 600
      }
    }, I('calendar', {
      width: 16,
      height: 16
    }), /*#__PURE__*/React.createElement("span", null, b.when)));
  }
  function BookingsScreen({
    onOpenProvider
  }) {
    const [tab, setTab] = useState('upcoming');
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement(TabHeader, {
      title: "Your bookings"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 20px'
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      fill: true,
      items: [{
        id: 'upcoming',
        label: 'Upcoming',
        count: VELLO_BOOKINGS.length
      }, {
        id: 'past',
        label: 'Past'
      }]
    })), /*#__PURE__*/React.createElement(Scroll, {
      style: {
        padding: '16px 20px 24px'
      }
    }, tab === 'upcoming' ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, VELLO_BOOKINGS.map(b => /*#__PURE__*/React.createElement(BookingCard, {
      key: b.id,
      b: b,
      onOpen: onOpenProvider
    }))) : /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        color: 'var(--text-muted)',
        padding: '48px 20px',
        fontFamily: 'var(--font-sans)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: 999,
        background: 'var(--surface-sunken)',
        display: 'grid',
        placeItems: 'center',
        margin: '0 auto 14px',
        color: 'var(--text-subtle)'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "history",
      style: {
        width: 26,
        height: 26
      }
    })), "Your completed bookings will show up here.")));
  }
  function MessagesScreen({
    onOpenProvider
  }) {
    const threads = VELLO_PROVIDERS.slice(0, 4);
    const snippets = ['On my way — see you in 10!', "Sounds good, I'll bring supplies.", 'Thanks for booking! Quick question…', 'Great session today — Sam did great.'];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement(TabHeader, {
      title: "Messages"
    }), /*#__PURE__*/React.createElement(Scroll, {
      style: {
        padding: '10px 12px 24px'
      }
    }, threads.map((p, i) => /*#__PURE__*/React.createElement("button", {
      key: p.id,
      onClick: () => onOpenProvider(p),
      style: {
        appearance: 'none',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        padding: '12px 8px',
        textAlign: 'left',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: p.name,
      size: "md",
      verified: p.verified,
      online: i === 0
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 15,
        color: 'var(--text-strong)'
      }
    }, p.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        color: 'var(--text-subtle)'
      }
    }, i === 0 ? 'now' : i + 'h')), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 13.5,
        color: i === 0 ? 'var(--text-strong)' : 'var(--text-muted)',
        fontWeight: i === 0 ? 600 : 400,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, snippets[i])), i === 0 ? /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: 999,
        background: 'var(--accent)',
        flex: 'none'
      }
    }) : null))));
  }
  function AccountScreen() {
    const rows = [{
      icon: 'map-pin',
      label: 'Saved addresses'
    }, {
      icon: 'credit-card',
      label: 'Payment methods'
    }, {
      icon: 'shield-check',
      label: 'Trust & safety'
    }, {
      icon: 'bell',
      label: 'Notifications'
    }, {
      icon: 'help-circle',
      label: 'Help center'
    }];
    return /*#__PURE__*/React.createElement(Scroll, {
      style: {
        padding: '6px 20px 24px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '8px 0 20px'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Alex Morgan",
      size: "xl"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 22,
        fontWeight: 800,
        color: 'var(--text-strong)'
      }
    }, "Alex Morgan"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        color: 'var(--text-muted)'
      }
    }, "Member since 2024 \xB7 Bed-Stuy"))), /*#__PURE__*/React.createElement(Card, {
      elevation: "flat",
      padding: "none"
    }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: r.label,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '16px 18px',
        borderBottom: i < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none',
        color: 'var(--text-body)'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": r.icon,
      style: {
        width: 20,
        height: 20,
        color: 'var(--text-brand)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 15,
        color: 'var(--text-strong)'
      }
    }, r.label), /*#__PURE__*/React.createElement("i", {
      "data-lucide": "chevron-right",
      style: {
        width: 18,
        height: 18,
        color: 'var(--text-subtle)'
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "md",
      fullWidth: true,
      leadingIcon: I('log-out', {
        width: 17,
        height: 17
      })
    }, "Sign out")));
  }
  window.VelloScreens = Object.assign(window.VelloScreens || {}, {
    BookingsScreen,
    MessagesScreen,
    AccountScreen
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/vello-app/screens-bookings.jsx", error: String((e && e.message) || e) }); }

// ui_kits/vello-app/screens-explore.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Vello app kit — Explore (home) screen. */
(function () {
  const {
    I,
    Scroll
  } = window.VelloShell;
  const {
    Input,
    Tag,
    ProviderCard,
    Badge
  } = window.VelloDesignSystem_182a1b;
  const {
    VELLO_CATEGORIES,
    VELLO_PROVIDERS
  } = window.VELLO_DATA;
  function CategoryTile({
    cat,
    onClick
  }) {
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      style: {
        appearance: 'none',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 64,
        height: 64,
        borderRadius: 'var(--radius-lg)',
        background: cat.tint,
        color: cat.fg,
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": cat.icon,
      style: {
        width: 28,
        height: 28
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 12.5,
        fontWeight: 600,
        color: 'var(--text-body)',
        textAlign: 'center',
        lineHeight: 1.2
      }
    }, cat.label));
  }
  function ExploreScreen({
    onOpenProvider,
    onOpenCategory
  }) {
    const featured = VELLO_PROVIDERS.filter(p => p.available).slice(0, 3);
    return /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '4px 20px 8px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        fontWeight: 600
      }
    }, I('map-pin', {
      width: 15,
      height: 15
    }), /*#__PURE__*/React.createElement("span", null, "Bedford-Stuyvesant, Brooklyn"), I('chevron-down', {
      width: 15,
      height: 15
    })), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 30,
        fontWeight: 800,
        letterSpacing: '-0.02em',
        color: 'var(--text-strong)',
        margin: '10px 0 14px',
        lineHeight: 1.1
      }
    }, "Good afternoon, Alex.", /*#__PURE__*/React.createElement("br", null), "Who can we find you?"), /*#__PURE__*/React.createElement(Input, {
      placeholder: "Try \u2018dog walker\u2019 or \u2018leaky faucet\u2019",
      leadingIcon: I('search', {
        width: 18,
        height: 18
      })
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '14px 20px 6px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 18
      }
    }, VELLO_CATEGORIES.map(c => /*#__PURE__*/React.createElement(CategoryTile, {
      key: c.id,
      cat: c,
      onClick: () => onOpenCategory(c)
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '18px 20px 4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 20,
        fontWeight: 700,
        color: 'var(--text-strong)',
        margin: 0
      }
    }, "Available near you"), /*#__PURE__*/React.createElement(Badge, {
      variant: "brand",
      size: "sm",
      dot: true
    }, "5 online")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '6px 20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, featured.map(p => /*#__PURE__*/React.createElement(ProviderCard, _extends({
      key: p.id
    }, p, {
      onBook: () => onOpenProvider(p)
    })))));
  }
  window.VelloScreens = Object.assign(window.VelloScreens || {}, {
    ExploreScreen
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/vello-app/screens-explore.jsx", error: String((e && e.message) || e) }); }

// ui_kits/vello-app/screens-profile.jsx
try { (() => {
/* Vello app kit — Provider profile + booking sheet + confirmation. */
(function () {
  const {
    useState
  } = React;
  const {
    I,
    Scroll
  } = window.VelloShell;
  const {
    Avatar,
    Rating,
    Badge,
    Button,
    IconButton,
    Tag,
    Card
  } = window.VelloDesignSystem_182a1b;
  function ProfileScreen({
    provider: p,
    onBack,
    onBook
  }) {
    const [sel, setSel] = useState(0);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--forest-800)',
        padding: '6px 16px 22px',
        flex: 'none',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(120% 100% at 80% -10%, rgba(255,255,255,0.16), transparent 60%)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Back",
      variant: "ghost",
      onClick: onBack,
      style: {
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-left"
    })), /*#__PURE__*/React.createElement(IconButton, {
      label: "Save",
      variant: "ghost",
      style: {
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "heart"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 14,
        alignItems: 'center',
        marginTop: 4,
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: p.name,
      size: "xl",
      verified: p.verified
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 24,
        fontWeight: 800,
        color: '#fff',
        letterSpacing: '-0.01em'
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'rgba(255,255,255,0.85)',
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        marginTop: 2
      }
    }, p.service), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        display: 'inline-flex',
        background: 'rgba(255,255,255,0.16)',
        padding: '5px 10px',
        borderRadius: 999
      }
    }, /*#__PURE__*/React.createElement(Rating, {
      value: p.rating,
      count: p.reviews,
      size: "sm",
      className: "vl-on-green"
    }))))), /*#__PURE__*/React.createElement(Scroll, {
      style: {
        padding: '18px 20px 120px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap'
      }
    }, p.verified ? /*#__PURE__*/React.createElement(Badge, {
      variant: "success",
      icon: I('shield-check', {
        width: 14,
        height: 14
      })
    }, "Background-checked") : null, p.available ? /*#__PURE__*/React.createElement(Badge, {
      variant: "brand",
      dot: true
    }, "Available today") : null, p.badges.map(b => /*#__PURE__*/React.createElement(Badge, {
      key: b,
      variant: "neutral"
    }, b)), /*#__PURE__*/React.createElement(Badge, {
      variant: "neutral",
      icon: I('map-pin', {
        width: 13,
        height: 13
      })
    }, p.distance, " mi away")), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 18,
        fontWeight: 700,
        color: 'var(--text-strong)',
        margin: '22px 0 8px'
      }
    }, "About"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 15,
        lineHeight: 1.6,
        color: 'var(--text-body)',
        margin: 0
      }
    }, p.bio), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 18,
        fontWeight: 700,
        color: 'var(--text-strong)',
        margin: '22px 0 10px'
      }
    }, "Services"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, p.services.map((s, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => setSel(i),
      style: {
        appearance: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 16px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-card)',
        border: '1.5px solid ' + (sel === i ? 'var(--brand-primary)' : 'var(--border-default)'),
        boxShadow: sel === i ? 'var(--focus-ring)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 22,
        height: 22,
        borderRadius: 999,
        flex: 'none',
        display: 'grid',
        placeItems: 'center',
        border: '2px solid ' + (sel === i ? 'var(--brand-primary)' : 'var(--border-strong)'),
        background: sel === i ? 'var(--brand-primary)' : 'transparent',
        color: '#fff'
      }
    }, sel === i ? /*#__PURE__*/React.createElement("i", {
      "data-lucide": "check",
      style: {
        width: 13,
        height: 13,
        strokeWidth: 3
      }
    }) : null), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 15,
        color: 'var(--text-strong)'
      }
    }, s.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        fontSize: 16,
        color: 'var(--text-strong)'
      }
    }, "$", s.price)))), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 18,
        fontWeight: 700,
        color: 'var(--text-strong)',
        margin: '22px 0 10px'
      }
    }, "Recent reviews"), /*#__PURE__*/React.createElement(Card, {
      elevation: "flat",
      padding: "md",
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Jordan P",
      size: "sm"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: 14,
        color: 'var(--text-strong)'
      }
    }, "Jordan P."), /*#__PURE__*/React.createElement(Rating, {
      value: 5,
      size: "sm",
      starsOnly: true
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        color: 'var(--text-subtle)'
      }
    }, "2 days ago")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        lineHeight: 1.55,
        color: 'var(--text-body)'
      }
    }, "\u201CReliable, kind, and my dog adores them. The photo updates make my whole day.\u201D"))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: '14px 20px 22px',
        background: 'linear-gradient(to top, var(--color-bg) 72%, transparent)',
        display: 'flex',
        alignItems: 'center',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        lineHeight: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        fontSize: 22,
        color: 'var(--text-strong)'
      }
    }, "$", p.services[sel].price), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, p.services[sel].name)), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      fullWidth: true,
      style: {
        flex: 1
      },
      trailingIcon: I('arrow-right', {
        width: 18,
        height: 18
      }),
      onClick: () => onBook(p, p.services[sel])
    }, "Book ", p.name.split(' ')[0])));
  }
  function BookingSheet({
    provider,
    service,
    onClose,
    onConfirm
  }) {
    const [day, setDay] = useState('Today');
    const [time, setTime] = useState('3:00 PM');
    const days = ['Today', 'Tomorrow', 'Sat 7', 'Sun 8'];
    const times = ['9:00 AM', '11:30 AM', '1:00 PM', '3:00 PM', '5:30 PM'];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: 'absolute',
        inset: 0,
        background: 'rgba(25,28,25,0.45)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        background: 'var(--surface-card)',
        borderRadius: '28px 28px 0 0',
        padding: '12px 20px 26px',
        boxShadow: 'var(--shadow-xl)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 5,
        borderRadius: 999,
        background: 'var(--ink-200)',
        margin: '0 auto 14px'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: provider.name,
      size: "md",
      verified: provider.verified
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 17,
        color: 'var(--text-strong)'
      }
    }, service.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        color: 'var(--text-muted)'
      }
    }, "with ", provider.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        fontSize: 18,
        color: 'var(--text-strong)'
      }
    }, "$", service.price)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 13,
        color: 'var(--text-strong)',
        marginBottom: 8
      }
    }, "Pick a day"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginBottom: 16,
        overflowX: 'auto'
      }
    }, days.map(d => /*#__PURE__*/React.createElement(Tag, {
      key: d,
      selected: day === d,
      onClick: () => setDay(d),
      style: {
        flex: 'none'
      }
    }, d))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 13,
        color: 'var(--text-strong)',
        marginBottom: 8
      }
    }, "Pick a time"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginBottom: 22,
        flexWrap: 'wrap'
      }
    }, times.map(t => /*#__PURE__*/React.createElement(Tag, {
      key: t,
      selected: time === t,
      onClick: () => setTime(t)
    }, t))), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      fullWidth: true,
      onClick: () => onConfirm({
        day,
        time
      })
    }, "Confirm booking \xB7 $", service.price)));
  }
  function ConfirmScreen({
    provider,
    service,
    slot,
    onDone
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 28px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 96,
        height: 96,
        borderRadius: 999,
        background: 'var(--green-100)',
        display: 'grid',
        placeItems: 'center',
        marginBottom: 22
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 64,
        height: 64,
        borderRadius: 999,
        background: 'var(--brand-primary)',
        display: 'grid',
        placeItems: 'center',
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "check",
      style: {
        width: 34,
        height: 34,
        strokeWidth: 3
      }
    }))), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 28,
        fontWeight: 800,
        color: 'var(--text-strong)',
        margin: '0 0 10px',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        textWrap: 'nowrap',
        whiteSpace: 'nowrap'
      }
    }, "You're all set!"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 16,
        color: 'var(--text-body)',
        margin: '0 0 24px',
        lineHeight: 1.5
      }
    }, provider.name.split(' ')[0], " will see you ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: 'var(--text-strong)'
      }
    }, slot.day, " at ", slot.time), ". We sent the details to your messages."), /*#__PURE__*/React.createElement(Card, {
      elevation: "raised",
      padding: "md",
      style: {
        width: '100%',
        marginBottom: 26
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: provider.name,
      size: "md",
      verified: provider.verified
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 15,
        color: 'var(--text-strong)'
      }
    }, service.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        color: 'var(--text-muted)'
      }
    }, slot.day, " \xB7 ", slot.time)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        fontSize: 18,
        color: 'var(--text-strong)'
      }
    }, "$", service.price))), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      fullWidth: true,
      onClick: onDone
    }, "Done"));
  }
  window.VelloScreens = Object.assign(window.VelloScreens || {}, {
    ProfileScreen,
    BookingSheet,
    ConfirmScreen
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/vello-app/screens-profile.jsx", error: String((e && e.message) || e) }); }

// ui_kits/vello-app/screens-results.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Vello app kit — Results / category listing screen. */
(function () {
  const {
    useState
  } = React;
  const {
    I,
    Scroll
  } = window.VelloShell;
  const {
    Tag,
    ProviderCard,
    IconButton
  } = window.VelloDesignSystem_182a1b;
  const {
    VELLO_PROVIDERS
  } = window.VELLO_DATA;
  const FILTERS = ['Available now', 'Top rated', 'Under $30', 'Background-checked'];
  function ResultsScreen({
    category,
    onBack,
    onOpenProvider
  }) {
    const [active, setActive] = useState({
      'Available now': false,
      'Top rated': true
    });
    const list = category && category.id !== 'more' ? VELLO_PROVIDERS.filter(p => p.cat === category.id) : VELLO_PROVIDERS;
    const results = list.length ? list : VELLO_PROVIDERS;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 14px 12px',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Back",
      variant: "ghost",
      onClick: onBack
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-left"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 19,
        fontWeight: 700,
        color: 'var(--text-strong)'
      }
    }, category ? category.label : 'All services'), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 12.5,
        color: 'var(--text-muted)'
      }
    }, results.length, " near Bedford-Stuyvesant")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto'
      }
    }, /*#__PURE__*/React.createElement(IconButton, {
      label: "Map view",
      variant: "default"
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "map"
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        paddingTop: 12,
        paddingBottom: 2
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      icon: I('sliders-horizontal', {
        width: 15,
        height: 15
      })
    }, "Filters"), FILTERS.map(f => /*#__PURE__*/React.createElement(Tag, {
      key: f,
      selected: !!active[f],
      onClick: () => setActive(a => ({
        ...a,
        [f]: !a[f]
      })),
      style: {
        whiteSpace: 'nowrap',
        flex: 'none'
      }
    }, f)))), /*#__PURE__*/React.createElement(Scroll, {
      style: {
        padding: '4px 16px 24px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, results.map(p => /*#__PURE__*/React.createElement(ProviderCard, _extends({
      key: p.id
    }, p, {
      ctaLabel: "View",
      onBook: () => onOpenProvider(p)
    }))))));
  }
  window.VelloScreens = Object.assign(window.VelloScreens || {}, {
    ResultsScreen
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/vello-app/screens-results.jsx", error: String((e && e.message) || e) }); }

// ui_kits/vello-app/shell.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Vello app kit — device shell + shared helpers. */
(function () {
  const {
    useState
  } = React;
  const I = (n, props = {}) => /*#__PURE__*/React.createElement("i", _extends({
    "data-lucide": n
  }, props));
  function StatusBar({
    dark
  }) {
    const color = dark ? '#fff' : 'var(--ink-900)';
    return /*#__PURE__*/React.createElement("div", {
      style: {
        height: 54,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '0 28px 8px',
        color,
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 15,
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontVariantNumeric: 'tabular-nums'
      }
    }, "9:41"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 7,
        alignItems: 'center'
      }
    }, I('signal', {
      width: 17,
      height: 17
    }), I('wifi', {
      width: 17,
      height: 17
    }), I('battery-full', {
      width: 22,
      height: 22
    })));
  }

  /* Realistic phone bezel; children fill the screen. */
  function PhoneFrame({
    children,
    statusDark = false,
    screenBg = 'var(--color-bg)'
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 390,
        height: 844,
        borderRadius: 54,
        background: '#0c0f0c',
        padding: 11,
        boxShadow: '0 40px 90px rgba(25,28,25,0.34), 0 0 0 1px rgba(0,0,0,0.4)',
        position: 'relative',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 22,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 116,
        height: 33,
        background: '#0c0f0c',
        borderRadius: 999,
        zIndex: 30
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: '100%',
        borderRadius: 44,
        overflow: 'hidden',
        background: screenBg,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement(StatusBar, {
      dark: statusDark
    }), children));
  }

  /* Scroll region between header and bottom nav. */
  function Scroll({
    children,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        ...style
      }
    }, children);
  }
  window.VelloShell = {
    I,
    PhoneFrame,
    StatusBar,
    Scroll
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/vello-app/shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/vello-site/sections-content.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Vello marketing site — hero visual + content sections + footer. */
(function () {
  const {
    ProviderCard,
    Card,
    Badge,
    Button,
    Avatar,
    Rating
  } = window.VelloDesignSystem_182a1b;
  const {
    VELLO_PROVIDERS,
    VELLO_CATEGORIES
  } = window.VELLO_DATA;
  const I = (n, p = {}) => /*#__PURE__*/React.createElement("i", _extends({
    "data-lucide": n
  }, p));
  function HeroCardStack() {
    const p = VELLO_PROVIDERS[0];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: 380,
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: -14,
        right: -6,
        transform: 'rotate(3deg)',
        width: 230
      }
    }, /*#__PURE__*/React.createElement(Card, {
      elevation: "floating",
      padding: "md"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 12,
        background: 'var(--coral-100)',
        color: 'var(--coral-700)',
        display: 'grid',
        placeItems: 'center'
      }
    }, I('sparkles', {
      width: 20,
      height: 20
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 14,
        color: 'var(--text-strong)'
      }
    }, "Cleaning booked"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, "Sat 10:00 AM \xB7 Devon"))))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 64
      }
    }, /*#__PURE__*/React.createElement(ProviderCard, _extends({}, p, {
      featured: true,
      interactive: false,
      onBook: () => {}
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: -22,
        left: -10,
        transform: 'rotate(-3deg)',
        width: 210
      }
    }, /*#__PURE__*/React.createElement(Card, {
      elevation: "floating",
      padding: "md"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Sara Lin",
      size: "sm",
      verified: true
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Rating, {
      value: 5,
      size: "sm",
      starsOnly: true
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 12,
        color: 'var(--text-muted)',
        marginTop: 2
      }
    }, "\u201CBooked in 2 minutes.\u201D"))))));
  }
  function Section({
    id,
    eyebrow,
    title,
    sub,
    children,
    bg
  }) {
    return /*#__PURE__*/React.createElement("section", {
      id: id,
      style: {
        background: bg || 'transparent'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '76px 28px'
      }
    }, eyebrow ? /*#__PURE__*/React.createElement("div", {
      className: "v-eyebrow",
      style: {
        textAlign: 'center'
      }
    }, eyebrow) : null, title ? /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 42,
        letterSpacing: '-0.02em',
        color: 'var(--text-strong)',
        textAlign: 'center',
        margin: '10px 0 0'
      }
    }, title) : null, sub ? /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 18,
        color: 'var(--text-muted)',
        textAlign: 'center',
        maxWidth: 560,
        margin: '14px auto 0'
      }
    }, sub) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 44
      }
    }, children)));
  }
  function HowItWorks() {
    const steps = [{
      icon: 'map-pin',
      t: 'Tell us where',
      d: 'Drop your address and pick what you need done — from a dog walk to a leaky tap.'
    }, {
      icon: 'badge-check',
      t: 'Pick a neighbor',
      d: 'Browse background-checked providers, real reviews, and prices up front.'
    }, {
      icon: 'calendar-check',
      t: 'Book in seconds',
      d: 'Choose a time, confirm, and message them directly. No phone tag.'
    }];
    return /*#__PURE__*/React.createElement(Section, {
      id: "how",
      eyebrow: "How it works",
      title: "Help in three taps",
      sub: "No quotes to chase, no strangers to vet. Vello does the trust part for you."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gap: 22
      }
    }, steps.map((s, i) => /*#__PURE__*/React.createElement(Card, {
      key: s.t,
      elevation: "flat",
      padding: "lg"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 52,
        height: 52,
        borderRadius: 16,
        background: 'var(--green-100)',
        color: 'var(--green-700)',
        display: 'grid',
        placeItems: 'center',
        marginBottom: 16
      }
    }, I(s.icon, {
      width: 26,
      height: 26
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        color: 'var(--text-brand)',
        marginBottom: 6
      }
    }, "0", i + 1), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 22,
        color: 'var(--text-strong)',
        margin: '0 0 8px'
      }
    }, s.t), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 15.5,
        lineHeight: 1.55,
        color: 'var(--text-body)',
        margin: 0
      }
    }, s.d)))));
  }
  function Categories() {
    return /*#__PURE__*/React.createElement(Section, {
      id: "services",
      eyebrow: "Services",
      title: "Whatever your week needs",
      bg: "var(--color-bg-subtle)"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 16
      }
    }, VELLO_CATEGORIES.filter(c => c.id !== 'more').map(c => /*#__PURE__*/React.createElement(Card, {
      key: c.id,
      elevation: "flat",
      padding: "lg",
      interactive: true
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: 16,
        background: c.tint,
        color: c.fg,
        display: 'grid',
        placeItems: 'center',
        marginBottom: 14
      }
    }, I(c.icon, {
      width: 28,
      height: 28
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 18,
        color: 'var(--text-strong)'
      }
    }, c.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 13.5,
        color: 'var(--text-muted)',
        marginTop: 3
      }
    }, "From $20/visit")))));
  }
  function Featured() {
    return /*#__PURE__*/React.createElement(Section, {
      eyebrow: "Near you",
      title: "Top-rated this week"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2,1fr)',
        gap: 14
      }
    }, VELLO_PROVIDERS.slice(0, 4).map(p => /*#__PURE__*/React.createElement(ProviderCard, _extends({
      key: p.id
    }, p, {
      onBook: () => {}
    })))));
  }
  function Safety() {
    const items = [{
      icon: 'shield-check',
      t: 'Background-checked',
      d: 'Every provider passes identity and background screening before they appear.'
    }, {
      icon: 'message-circle',
      t: 'Reviewed by neighbors',
      d: 'Ratings come from people on your block — not anonymous strangers.'
    }, {
      icon: 'lock',
      t: 'Secure payments',
      d: 'Pay in-app. Your card details never touch the provider.'
    }];
    return /*#__PURE__*/React.createElement("section", {
      id: "trust",
      style: {
        background: 'var(--forest-800)',
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '72px 28px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1.4fr',
        gap: 56,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "v-eyebrow",
      style: {
        color: 'var(--forest-300)'
      }
    }, "Trust & safety"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 40,
        letterSpacing: '-0.02em',
        margin: '12px 0 14px',
        lineHeight: 1.08
      }
    }, "Safe enough to give a key to."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 17,
        lineHeight: 1.6,
        color: 'rgba(255,255,255,0.82)',
        margin: 0
      }
    }, "We do the vetting so letting someone into your home feels as easy as asking a friend.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 14
      }
    }, items.map(it => /*#__PURE__*/React.createElement("div", {
      key: it.t,
      style: {
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 'var(--radius-lg)',
        padding: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 44,
        height: 44,
        flex: 'none',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.12)',
        color: 'var(--forest-300)',
        display: 'grid',
        placeItems: 'center'
      }
    }, I(it.icon, {
      width: 22,
      height: 22
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 18
      }
    }, it.t), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 14.5,
        color: 'rgba(255,255,255,0.78)',
        marginTop: 4,
        lineHeight: 1.5
      }
    }, it.d))))))));
  }
  function CTA() {
    return /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Card, {
      elevation: "raised",
      padding: "lg",
      style: {
        textAlign: 'center',
        padding: '56px 28px',
        background: 'var(--surface-brand-tint)',
        border: 'none'
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 40,
        letterSpacing: '-0.02em',
        color: 'var(--text-strong)',
        margin: '0 0 12px'
      }
    }, "Your neighborhood, on call."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 18,
        color: 'var(--text-body)',
        margin: '0 auto 26px',
        maxWidth: 480
      }
    }, "Get the Vello app and book trusted local help in minutes."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      leadingIcon: I('smartphone', {
        width: 18,
        height: 18
      })
    }, "App Store"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "lg",
      leadingIcon: I('download', {
        width: 18,
        height: 18
      })
    }, "Google Play"))));
  }
  function Footer() {
    const cols = [{
      h: 'Vello',
      links: ['How it works', 'Services', 'Pricing', 'Cities']
    }, {
      h: 'Providers',
      links: ['Become a provider', 'Provider app', 'Resources']
    }, {
      h: 'Company',
      links: ['About', 'Careers', 'Press', 'Contact']
    }, {
      h: 'Legal',
      links: ['Privacy', 'Terms', 'Trust & safety']
    }];
    const link = {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-muted)',
      textDecoration: 'none',
      display: 'block',
      padding: '5px 0'
    };
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        borderTop: '1px solid var(--border-default)',
        background: 'var(--color-bg-subtle)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '52px 28px 36px',
        display: 'grid',
        gridTemplateColumns: '1.4fr repeat(4, 1fr)',
        gap: 28
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/vello-sprout.svg",
      width: "28",
      height: "28",
      alt: ""
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 22,
        color: 'var(--text-strong)'
      }
    }, "Vello")), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        color: 'var(--text-muted)',
        maxWidth: 230,
        margin: 0,
        lineHeight: 1.55
      }
    }, "Hyperlocal services from people your neighbors trust.")), cols.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.h
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        fontSize: 14,
        color: 'var(--text-strong)',
        marginBottom: 6
      }
    }, c.h), c.links.map(l => /*#__PURE__*/React.createElement("a", {
      key: l,
      href: "#",
      style: link
    }, l))))), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '18px 28px',
        borderTop: '1px solid var(--border-default)',
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        color: 'var(--text-subtle)'
      }
    }, "\xA9 2026 Vello, Inc. \xB7 Made on your block."));
  }
  window.VelloMkt = Object.assign(window.VelloMkt || {}, {
    HeroCardStack,
    HowItWorks,
    Categories,
    Featured,
    Safety,
    CTA,
    Footer
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/vello-site/sections-content.jsx", error: String((e && e.message) || e) }); }

// ui_kits/vello-site/sections-hero.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Vello marketing site — header + hero. */
(function () {
  const {
    Button,
    Input,
    Badge,
    Avatar,
    Rating
  } = window.VelloDesignSystem_182a1b;
  const I = (n, p = {}) => /*#__PURE__*/React.createElement("i", _extends({
    "data-lucide": n
  }, p));
  function Header() {
    const link = {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 15,
      color: 'var(--text-body)',
      textDecoration: 'none'
    };
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(251,248,241,0.82)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-default)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: 28
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        textDecoration: 'none'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/vello-sprout.svg",
      width: "30",
      height: "30",
      alt: ""
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 24,
        letterSpacing: '-0.02em',
        color: 'var(--text-strong)'
      }
    }, "Vello")), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        gap: 24,
        marginLeft: 12
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#how",
      style: link
    }, "How it works"), /*#__PURE__*/React.createElement("a", {
      href: "#services",
      style: link
    }, "Services"), /*#__PURE__*/React.createElement("a", {
      href: "#trust",
      style: link
    }, "Trust & safety"), /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: link
    }, "Become a provider")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        display: 'flex',
        gap: 10,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "Log in"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm"
    }, "Get the app"))));
  }
  function Hero() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: 'relative',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(80% 70% at 88% 0%, var(--green-100), transparent 60%)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '76px 28px 72px',
        display: 'grid',
        gridTemplateColumns: '1.05fr 0.95fr',
        gap: 48,
        alignItems: 'center',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Badge, {
      variant: "brand",
      icon: I('map-pin', {
        width: 14,
        height: 14
      })
    }, "Now in Brooklyn & Queens"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 62,
        lineHeight: 1.02,
        letterSpacing: '-0.03em',
        color: 'var(--text-strong)',
        margin: '18px 0 18px'
      }
    }, "Trusted help,", /*#__PURE__*/React.createElement("br", null), "right on your block."), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 20,
        lineHeight: 1.5,
        color: 'var(--text-body)',
        maxWidth: 480,
        margin: '0 0 28px'
      }
    }, "Dog walkers, cleaners, tutors and handypeople your neighbors already love \u2014 background-checked and a few doors down."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        maxWidth: 460
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(Input, {
      placeholder: "Enter your address",
      leadingIcon: I('map-pin', {
        width: 18,
        height: 18
      })
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      trailingIcon: I('arrow-right', {
        width: 18,
        height: 18
      })
    }, "Find help")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginTop: 22
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex'
      }
    }, ['Maya R', 'Devon K', 'Sara L', 'Tom B'].map((n, i) => /*#__PURE__*/React.createElement("span", {
      key: n,
      style: {
        marginLeft: i ? -10 : 0
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: n,
      size: "sm"
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        color: 'var(--text-muted)'
      }
    }, /*#__PURE__*/React.createElement(Rating, {
      value: 4.9,
      size: "sm",
      starsOnly: true
    }), " \xA0Loved by ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: 'var(--text-strong)'
      }
    }, "12,000+"), " neighbors"))), /*#__PURE__*/React.createElement("div", {
      style: {
        justifySelf: 'center'
      }
    }, window.VelloMkt.HeroCardStack())));
  }
  window.VelloMkt = Object.assign(window.VelloMkt || {}, {
    Header,
    Hero
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/vello-site/sections-hero.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ProviderCard = __ds_scope.ProviderCard;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Rating = __ds_scope.Rating;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.BottomNav = __ds_scope.BottomNav;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
