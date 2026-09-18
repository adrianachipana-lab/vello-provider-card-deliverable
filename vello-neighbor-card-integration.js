(function () {
  var PHOTO = {
    maya: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&facepad=3&w=240&h=240&q=70",
  };

  var neighbor = {
    id: "integrated-neighbor-card",
    name: "Maya Rivera",
    photo: PHOTO.maya,
    bio: "Dog walker & pet sitter, just up on 4th Ave.",
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
  };

  function icon(name) {
    return '<i data-lucide="' + name + '" aria-hidden="true"></i>';
  }

  function verifiedMark() {
    return (
      '<svg width="25" height="25" viewBox="0 0 24 24" role="img" aria-label="Background-checked">' +
      '<path d="M12 2.2 4.6 5v6.1c0 4.6 3.1 7.9 7.4 9.6 4.3-1.7 7.4-5 7.4-9.6V5L12 2.2Z" ' +
      'fill="var(--green-600)" stroke="var(--surface-card)" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<path d="m8.4 12 2.5 2.5 4.7-5" fill="none" stroke="var(--paper)" stroke-width="2.1" ' +
      'stroke-linecap="round" stroke-linejoin="round"/></svg>'
    );
  }

  function stars(value) {
    var count = Math.round(value);
    var html = "";
    for (var i = 0; i < 5; i++) {
      html +=
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="' +
        (i < count ? "var(--amber-500)" : "none") +
        '" stroke="var(--amber-500)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' +
        "</svg>";
    }
    html += '<span style="font-family:var(--font-mono);font-weight:600;font-size:13px;margin-left:3px">' + value.toFixed(1) + "</span>";
    return html;
  }

  function ensureStyle() {
    if (document.getElementById("vlnc-style")) return;
    var style = document.createElement("style");
    style.id = "vlnc-style";
    style.textContent = [
      ".vlnc-section{margin-top:18px}",
      ".vlnc-section .section__head{margin-bottom:10px}",
      ".vlnc-list{padding:0 20px}",
      ".vlnc-card.nb{display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:14px;align-items:start}",
      ".vlnc-card .nb__avatar{position:relative;width:56px;height:56px}",
      ".vlnc-card .nb__photo{width:56px;height:56px;border-radius:var(--radius-pill);object-fit:cover}",
      ".vlnc-card .nb__vmark{position:absolute;bottom:-2px;right:-2px;display:flex;filter:drop-shadow(0 1px 2px rgba(0,0,0,.12))}",
      ".vlnc-card .nb__avail{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:var(--radius-pill);background:rgba(240,98,59,.1);color:var(--coral-500);font-size:12px;font-weight:600}",
      ".vlnc-card .nb__avail i{display:inline-block;width:6px;height:6px;border-radius:var(--radius-pill);background:var(--coral-500)}",
      ".vlnc-card .nb__bio{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-top:6px;font-size:14px;color:var(--ink-700);line-height:1.4}",
      ".vlnc-card .nb__price{margin-top:8px;font-size:14px;color:var(--ink-500)}",
      ".vlnc-card .nb__price strong{font-family:var(--font-mono);font-weight:600;color:var(--ink-900)}",
      ".vlnc-card .nb__meta{display:flex;align-items:center;gap:10px;margin-top:8px}",
      ".vlnc-card .nb__walk{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border:1px solid var(--ink-150);border-radius:var(--radius-pill);font-size:12px;font-weight:500;color:var(--ink-700)}",
      ".vlnc-card .nb__walk svg,.vlnc-card .nb__walk i{width:13px;height:13px}",
      ".vlnc-card .nb__rating{display:inline-flex;align-items:center;gap:1px}",
      ".vlnc-card .nb__rating svg{width:13px;height:13px}",
      ".vlnc-card .nb__tap{display:grid;place-items:center;align-self:center;color:var(--ink-500)}",
      ".vlnc-card .nb__tap svg{width:20px;height:20px}",
      ".vlnc-card--featured{border-color:var(--green-200)!important;box-shadow:var(--shadow-brand)!important}",
      ".vlnc-compare{position:fixed;right:14px;bottom:14px;z-index:90;display:flex;align-items:center;gap:3px;padding:4px;border:1px solid var(--ink-150);border-radius:var(--radius-pill);background:rgba(246,242,231,.92);backdrop-filter:blur(12px);box-shadow:var(--shadow-md);font-family:var(--font-sans)}",
      ".vlnc-compare__label{padding:0 8px;color:var(--ink-500);font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}",
      ".vlnc-compare__button{height:32px;border:0;border-radius:var(--radius-pill);padding:0 11px;background:transparent;color:var(--ink-500);font:inherit;font-size:12px;font-weight:800;cursor:pointer}",
      ".vlnc-compare__button:hover{color:var(--ink-900)}",
      ".vlnc-compare__button[aria-pressed='true']{background:var(--green-600);color:#fff}",
      ".vlnc-compare__button:focus-visible{outline:none;box-shadow:0 0 0 3px rgba(85,126,38,.32)}",
    ].join("");
    document.head.appendChild(style);
  }

  function createCard(improved) {
    var card = document.createElement("button");
    card.id = "vlnc-card";
    card.type = "button";
    card.className = "nb vlnc-card" + (improved ? " vlnc-card--featured" : "");
    card.setAttribute("aria-label", "Open neighbor Maya Rivera");

    card.innerHTML =
      '<span class="nb__avatar">' +
        '<img class="nb__photo" src="' + neighbor.photo + '" alt="' + neighbor.name + '">' +
        (neighbor.verified ? '<span class="nb__vmark">' + verifiedMark() + "</span>" : "") +
      "</span>" +
      '<span class="nb__body">' +
        '<span class="nb__top">' +
          '<span class="nb__name">' + neighbor.name + "</span>" +
          (neighbor.available ? '<span class="nb__avail"><i></i>Available</span>' : "") +
        "</span>" +
        '<p class="nb__bio">' + neighbor.bio + "</p>" +
        '<span class="nb__price">from <strong>$' + neighbor.price + "</strong> / " + neighbor.unit.replace("per ", "") + "</span>" +
        '<span class="nb__meta">' +
          '<span class="nb__walk">' + icon("footprints") + neighbor.walk + " min walk</span>" +
          '<span class="nb__rating">' + stars(neighbor.rating) + "</span>" +
        "</span>" +
      "</span>" +
      '<span class="nb__tap" aria-hidden="true">' + icon("chevron-right") + "</span>";

    card.addEventListener("click", function () {
      // Find the native Maya Rivera card in the prototype and click it
      // to open the real profile screen
      var nativeCards = document.querySelectorAll(".nb");
      for (var i = 0; i < nativeCards.length; i++) {
        var nameEl = nativeCards[i].querySelector(".nb__name");
        if (nameEl && nameEl.textContent.trim() === "Maya Rivera" && nativeCards[i] !== card) {
          nativeCards[i].click();
          return;
        }
      }
    });

    return card;
  }

  function createSection() {
    var section = document.createElement("div");
    section.id = "vlnc-section";
    section.className = "section vlnc-section";
    section.innerHTML =
      '<div class="section__head">' +
        '<div class="section__title">Trusted neighbor<small>Verified, minutes away</small></div>' +
      "</div>" +
      '<div class="neighbors vlnc-list"></div>';
    section.querySelector(".vlnc-list").appendChild(createCard(true));
    return section;
  }

  function removeCard() {
    var card = document.getElementById("vlnc-card");
    if (card) card.remove();
    var section = document.getElementById("vlnc-section");
    if (section) section.remove();
  }

  function findTrustedList() {
    var lists = Array.from(document.querySelectorAll(".neighbors"));
    return lists.find(function (list) {
      var section = list.closest(".section");
      return section && /Trusted on your block/.test(section.textContent || "");
    });
  }

  function mountImproved() {
    var scroll = document.querySelector(".scroll");
    var head = scroll && scroll.querySelector(".head");
    if (!scroll || !head) return false;
    head.insertAdjacentElement("afterend", createSection());
    return true;
  }

  function mountActual() {
    var list = findTrustedList();
    if (!list) return false;
    list.insertBefore(createCard(false), list.firstChild);
    return true;
  }

  function setButtons(mode) {
    document.querySelectorAll(".vlnc-compare__button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.dataset.mode === mode ? "true" : "false");
    });
  }

  function applyMode(mode) {
    ensureStyle();
    removeCard();
    var ok = mode === "actual" ? mountActual() : mountImproved();
    if (!ok) return false;
    setButtons(mode);
    localStorage.setItem("vello-nc-mode", mode);
    if (window.lucide) window.lucide.createIcons();
    return true;
  }

  function ensureCompare() {
    ensureStyle();
    if (document.getElementById("vlnc-compare")) return;
    var el = document.createElement("div");
    el.id = "vlnc-compare";
    el.className = "vlnc-compare";
    el.setAttribute("aria-label", "Switch NeighborCard version");
    el.innerHTML =
      '<span class="vlnc-compare__label">Card</span>' +
      '<button class="vlnc-compare__button" type="button" data-mode="actual" aria-pressed="false">Actual</button>' +
      '<button class="vlnc-compare__button" type="button" data-mode="improved" aria-pressed="false">Improved</button>';
    el.addEventListener("click", function (e) {
      var btn = e.target.closest(".vlnc-compare__button");
      if (!btn) return;
      applyMode(btn.dataset.mode);
    });
    document.body.appendChild(el);
  }

  function start() {
    var mode = localStorage.getItem("vello-nc-mode") || "improved";
    var attempts = 0;
    var timer = setInterval(function () {
      attempts++;
      ensureCompare();
      if (applyMode(mode) || attempts > 80) clearInterval(timer);
    }, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
