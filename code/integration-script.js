(function () {
  const provider = {
    id: "integrated-provider-card",
    name: "Tomas Rivera",
    initials: "TR",
    service: "Dog walking",
    rating: 4.9,
    ratingCount: 26,
    walkMinutes: 6,
    price: 18,
    unit: "walk",
    vouches: [
      { neighborName: "Priya", completedBookings: 11 },
      { neighborName: "Denise", completedBookings: 2 },
    ],
  };

  function icon(name) {
    return '<i data-lucide="' + name + '" aria-hidden="true"></i>';
  }

  function ensureStyle() {
    if (document.getElementById("vlpc-integrated-style")) return;

    const style = document.createElement("style");
    style.id = "vlpc-integrated-style";
    style.textContent = [
      ".vlpc-section{margin-top:18px}",
      ".vlpc-section .section__head{margin-bottom:10px}",
      ".vlpc-list{padding:0 20px}",
      ".vlpc-card{width:100%}",
      ".vlpc-card .nb__bio{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}",
      ".vlpc-card__avatar{display:grid;place-items:center;background:var(--forest-800);color:var(--paper);font-family:var(--font-display);font-size:17px;font-weight:800}",
      ".vlpc-card__badge{display:inline-flex;align-items:center;gap:4px;padding:2px 7px;border-radius:var(--radius-pill);background:var(--surface-brand-tint);color:var(--text-brand);font-size:11px;font-weight:700;white-space:nowrap}",
      ".vlpc-card__badge svg{width:12px;height:12px}",
      ".vlpc-card__trust strong{color:var(--text-brand)}",
      ".vlpc-card__price{font-family:var(--font-mono)}",
      ".vlpc-card .nb__walk svg,.vlpc-card .svc__rate svg{width:14px;height:14px}",
      ".vlpc-card--improved{display:grid;grid-template-columns:auto minmax(0,1fr);gap:13px 12px;align-items:start;border-color:var(--green-200);box-shadow:var(--shadow-brand);background:linear-gradient(180deg,var(--surface-card),var(--paper));padding:16px}",
      ".vlpc-card--improved .nb__avatar{grid-row:1 / span 2}",
      ".vlpc-card--improved .nb__body{display:block}",
      ".vlpc-card--improved .nb__top{align-items:center}",
      ".vlpc-card--improved .nb__bio{margin-top:7px;color:var(--text-body)}",
      ".vlpc-card--improved .nb__price{margin-top:8px}",
      ".vlpc-card__vouch{display:inline-flex;align-items:center;gap:5px;margin-top:10px;padding:6px 9px;border-radius:var(--radius-pill);background:var(--surface-brand-tint);color:var(--text-brand);font-size:12px;font-weight:800}",
      ".vlpc-card__vouch svg{width:13px;height:13px}",
      ".vlpc-card__cta{grid-column:1 / -1;display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:1px;padding-top:12px;border-top:1px solid var(--border-subtle);color:var(--text-brand);font-size:13px;font-weight:800}",
      ".vlpc-card__cta span{display:inline-flex;align-items:center;gap:6px}",
      ".vlpc-card__cta svg{width:15px;height:15px}",
      ".vlpc-compare{position:fixed;right:14px;bottom:14px;z-index:90;display:flex;align-items:center;gap:3px;padding:4px;border:1px solid var(--border-default);border-radius:var(--radius-pill);background:rgba(246,242,231,.92);backdrop-filter:blur(12px);box-shadow:var(--shadow-md);font-family:var(--font-sans)}",
      ".vlpc-compare__label{padding:0 8px;color:var(--text-muted);font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}",
      ".vlpc-compare__button{height:32px;border:0;border-radius:var(--radius-pill);padding:0 11px;background:transparent;color:var(--text-muted);font:inherit;font-size:12px;font-weight:800;cursor:pointer}",
      ".vlpc-compare__button:hover{color:var(--text-strong)}",
      ".vlpc-compare__button[aria-pressed='true']{background:var(--brand-primary);color:var(--brand-on-primary)}",
      ".vlpc-compare__button:focus-visible{outline:none;box-shadow:var(--focus-ring)}",
    ].join("");
    document.head.appendChild(style);
  }

  function trustLine() {
    const first = provider.vouches[0];
    const otherCount = provider.vouches.length - 1;
    const bookingText = first.completedBookings === 1 ? "once" : first.completedBookings + " times";
    return (
      "<strong>" + first.neighborName + "</strong> booked this provider " + bookingText +
      (otherCount > 0 ? " · " + otherCount + " other neighbor vouched" : "")
    );
  }

  function createCard(improved) {
    const card = document.createElement("button");
    card.id = "vlpc-integrated-provider-card";
    card.type = "button";
    card.className = "nb vlpc-card" + (improved ? " vlpc-card--improved" : "");
    card.setAttribute("aria-label", "Open provider Tomas Rivera");
    const baseMarkup =
      '<span class="nb__avatar">' +
        '<span class="vl-avatar vl-avatar--lg vlpc-card__avatar" aria-hidden="true">' + provider.initials + "</span>" +
        '<span class="nb__vmark">' + icon("shield-check") + "</span>" +
      "</span>" +
      '<span class="nb__body">' +
        '<span class="nb__top">' +
          '<span class="nb__name">' + provider.name + "</span>" +
          '<span class="vlpc-card__badge">' + icon("shield-check") + "Identity verified</span>" +
        "</span>" +
        '<span class="nb__bio vlpc-card__trust">' + trustLine() + "</span>" +
        '<span class="nb__price vlpc-card__price">from $' + provider.price + ' <span>/ ' + provider.unit + "</span></span>" +
        '<span class="nb__meta">' +
          '<span class="nb__walk">' + icon("map-pin") + provider.walkMinutes + " min walk</span>" +
          '<span class="svc__rate">' + icon("star") + provider.rating.toFixed(1) + "</span>" +
        "</span>" +
        (improved ? '<span class="vlpc-card__vouch">' + icon("users") + "Vouched by neighbors</span>" : "") +
      "</span>" +
      (improved
        ? '<span class="vlpc-card__cta"><span>' + icon("calendar-plus") + "Request dog walking</span>" + icon("chevron-right") + "</span>"
        : '<span class="nb__tap" aria-hidden="true">' + icon("chevron-right") + "</span>");
    card.innerHTML = baseMarkup;

    card.addEventListener("click", function () {
      const toast = document.querySelector(".toast");
      if (toast) toast.remove();
      const nextToast = document.createElement("div");
      nextToast.className = "toast";
      nextToast.innerHTML = icon("check") + "<span>Request started for " + provider.name + "</span>";
      const frame = document.querySelector(".phone, .app, #root") || document.body;
      frame.appendChild(nextToast);
      if (window.lucide) window.lucide.createIcons();
      window.setTimeout(function () {
        nextToast.remove();
      }, 2200);
    });

    return card;
  }

  function createSection() {
    const section = document.createElement("div");
    section.id = "vlpc-integrated-provider-section";
    section.className = "section vlpc-section";
    section.innerHTML =
      '<div class="section__head">' +
        '<div class="section__title">Trusted provider<small>Verified by your neighborhood, minutes away</small></div>' +
      "</div>" +
      '<div class="neighbors vlpc-list"></div>';
    section.querySelector(".vlpc-list").appendChild(createCard(true));
    return section;
  }

  function removeInjectedCard() {
    const card = document.getElementById("vlpc-integrated-provider-card");
    if (card) card.remove();

    const section = document.getElementById("vlpc-integrated-provider-section");
    if (section) section.remove();
  }

  function findTrustedList() {
    const lists = Array.from(document.querySelectorAll(".neighbors"));
    return lists.find((list) => {
      const section = list.closest(".section");
      return section && /Trusted on your block/.test(section.textContent || "");
    });
  }

  function mountImproved() {
    const scroll = document.querySelector(".scroll");
    const head = scroll && scroll.querySelector(".head");
    if (!scroll || !head) return false;

    head.insertAdjacentElement("afterend", createSection());
    return true;
  }

  function mountActual() {
    const homeList = findTrustedList();
    if (!homeList) return false;
    homeList.insertBefore(createCard(false), homeList.firstChild);
    return true;
  }

  function setCompareButtonState(mode) {
    document.querySelectorAll(".vlpc-compare__button").forEach((button) => {
      button.setAttribute("aria-pressed", button.dataset.mode === mode ? "true" : "false");
    });
  }

  function applyMode(mode) {
    ensureStyle();
    removeInjectedCard();

    const mounted = mode === "actual" ? mountActual() : mountImproved();
    if (!mounted) return false;

    setCompareButtonState(mode);
    window.localStorage.setItem("vello-provider-card-mode", mode);
    if (window.lucide) window.lucide.createIcons();
    return true;
  }

  function ensureCompareControl() {
    ensureStyle();
    if (document.getElementById("vlpc-compare-control")) return;

    const control = document.createElement("div");
    control.id = "vlpc-compare-control";
    control.className = "vlpc-compare";
    control.setAttribute("aria-label", "Switch ProviderCard design version");
    control.innerHTML =
      '<span class="vlpc-compare__label">Card</span>' +
      '<button class="vlpc-compare__button" type="button" data-mode="actual" aria-pressed="false">Actual</button>' +
      '<button class="vlpc-compare__button" type="button" data-mode="recommended" aria-pressed="false">Mejorada</button>';
    control.addEventListener("click", function (event) {
      const button = event.target.closest(".vlpc-compare__button");
      if (!button) return;
      applyMode(button.dataset.mode);
    });
    document.body.appendChild(control);
  }

  function start() {
    const initialMode = window.localStorage.getItem("vello-provider-card-mode") || "recommended";
    let attempts = 0;
    const timer = window.setInterval(function () {
      attempts += 1;
      ensureCompareControl();
      if (applyMode(initialMode) || attempts > 80) window.clearInterval(timer);
    }, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
