/* Vello flow — home screen (entry point for the whole flow). */

function HomeScreen({ tweaks, cat, setCat, favorites, toggleFav, onOpenRequest, onBook, request, responders, onToast }) {
  const { useState } = React;
  const F = window.VelloFlow;
  const { I, ScrollRow, AvatarVerified, Chev, EmptyState, distanceLabel, DIST_ICON, CATEGORIES, NEIGHBORS, POPULAR, byId } = F;
  const { Input, Tag, Avatar, Rating, IconButton, Button } = window.VelloDesignSystem_182a1b;
  const REQUEST = request || F.REQUEST;
  const RESPONDERS = responders || F.RESPONDERS;

  const neighbors = cat === "all" ? NEIGHBORS : NEIGHBORS.filter(n => n.cat === cat);
  const popular = cat === "all" ? POPULAR : POPULAR.filter(p => p.cat === cat);
  const catLabel = (CATEGORIES.find(c => c.id === cat) || {}).label;

  return (
    <div className="scroll">
      <div className="head">
        <div className="head__row">
          <LocationPicker variant={tweaks.locationStyle} />
          <span className="bell">
            <IconButton variant="secondary" label="Notifications" onClick={() => onToast("No new notifications")}>{I("bell")}</IconButton>
            <span className="bell__dot"></span>
          </span>
        </div>
        {tweaks.showGreeting && <h1 className="head__greet">Trusted hands<br />on your block.</h1>}
        <Input
          aria-label="Search for help"
          placeholder="Search cleaning, dog walking, tutors…"
          leadingIcon={I("search")}
          trailingIcon={I("sliders-horizontal")}
          style={tweaks.showGreeting ? undefined : { marginTop: 16 }}
        />
      </div>

      <div className="section" style={{ marginTop: 18 }}>
        <ScrollRow className="cats">
          {CATEGORIES.map(c => (
            <Tag key={c.id} selected={cat === c.id} icon={I(c.icon)} onClick={() => setCat(c.id)}>{c.label}</Tag>
          ))}
        </ScrollRow>
      </div>

      <div className="section" style={{ marginTop: 20 }}>
        <button className="orq" type="button" onClick={onOpenRequest}>
          <span className="orq__eyebrow">{I("file-text")}Your open request</span>
          <span className="orq__chev"><Chev /></span>
          <div className="orq__title">{REQUEST.title}</div>
          <div className="orq__foot">
            {RESPONDERS.length ? (
              <React.Fragment>
                <span className="orq__stack">
                  {RESPONDERS.map(r => {
                    const p = F.responderPerson(r);
                    return <Avatar key={r.id} src={p.photo} name={p.name} size="sm" />;
                  })}
                </span>
                <span className="orq__count">{RESPONDERS.length} neighbors responded</span>
              </React.Fragment>
            ) : (
              <span className="orq__count orq__count--wait">{I("clock")}Waiting for replies</span>
            )}
          </div>
        </button>
      </div>

      <div className="section">
        <div className="section__head">
          <div className="section__title">
            Trusted on your block
            <small>Verified by your neighborhood, minutes away</small>
          </div>
          <button className="section__link" onClick={() => onToast("Showing everyone nearby")}>See all</button>
        </div>
        <div className="section__tools">
          <button className="maplink" type="button" onClick={() => onToast("Map view is next up")}>{I("map")}View on map</button>
        </div>
        {neighbors.length ? (
          <div className="neighbors">
            {neighbors.map(n => (
              <NeighborCard key={n.id} n={n} distFmt={tweaks.distanceFormat} featuredOn={tweaks.featuredGlow} onClick={() => onBook(n)} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="compass"
            title={`No ${(catLabel || "").toLowerCase()} nearby yet`}
            text="We're still signing up neighbors in Bay Ridge for this one. Post a request and we'll find you someone."
            action={<Button variant="outline" size="sm" onClick={onOpenRequest}>See your open request</Button>}
          />
        )}
      </div>

      {popular.length > 0 && (
        <div className="section">
          <div className="section__head">
            <div className="section__title">Popular this week</div>
            <button className="section__link" onClick={() => onToast("Showing all services")}>See all</button>
          </div>
          <div className="pop">
            {popular.map(s => (
              <ServiceCard key={s.id} s={s} faved={!!favorites[s.id]} onFav={() => toggleFav(s.id)} onClick={() => onBook(byId(s.by), s)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LocationPicker({ variant = "inline" }) {
  const { I } = window.VelloFlow;
  const pin = I("map-pin", { className: "loc__pin" });
  const chev = I("chevron-down", { className: "loc__chev" });
  if (variant === "pill") {
    return (
      <button className="loc loc--pill" type="button">
        {pin}<span className="loc__name">Bay Ridge, Brooklyn</span>{chev}
      </button>
    );
  }
  if (variant === "stacked") {
    return (
      <button className="loc loc--stacked" type="button">
        <span className="loc__disc">{I("map-pin")}</span>
        <span>
          <span className="loc__eyebrow">Your neighborhood</span>
          <span className="loc__name">Bay Ridge, Brooklyn {chev}</span>
        </span>
      </button>
    );
  }
  return (
    <button className="loc loc--inline" type="button">
      <span className="loc__eyebrow">Your neighborhood</span>
      <span className="loc__line">{pin}<span className="loc__name">Bay Ridge, Brooklyn</span>{chev}</span>
    </button>
  );
}

function NeighborCard({ n, distFmt = "walk", featuredOn = true, onClick }) {
  const { I, AvatarVerified, Chev, distanceLabel, DIST_ICON } = window.VelloFlow;
  const { Rating } = window.VelloDesignSystem_182a1b;
  const featured = featuredOn && n.featured;
  return (
    <button className={"nb" + (featured ? " nb--featured" : "")} type="button" onClick={onClick}>
      <AvatarVerified n={n} />
      <div className="nb__body">
        <div className="nb__top">
          <span className="nb__name">{n.name}</span>
          {n.available && <span className="nb__avail"><i></i>Available</span>}
        </div>
        <p className="nb__bio">{n.bio}</p>
        <div className="nb__price">from ${n.price} <span>/ {n.unit.replace("per ", "")}</span></div>
        <div className="nb__meta">
          <span className="nb__walk">{I(DIST_ICON[distFmt])}{distanceLabel(n, distFmt)}</span>
          <Rating value={n.rating} size="sm" />
        </div>
      </div>
      <span className="nb__tap" aria-hidden="true"><Chev /></span>
    </button>
  );
}

function ServiceCard({ s, faved, onFav, onClick }) {
  const { I, byId } = window.VelloFlow;
  const { Avatar } = window.VelloDesignSystem_182a1b;
  const person = byId(s.by) || {};
  return (
    <button className="svc" type="button" onClick={onClick}>
      <div className="svc__thumb">
        <img src={s.photo} alt={s.title} loading="lazy" />
        <span
          className="svc__fav" role="button" aria-pressed={faved}
          aria-label={faved ? "Remove from favorites" : "Save to favorites"}
          onClick={(e) => { e.stopPropagation(); onFav(); }}
        >{I("heart")}</span>
        <span className="svc__cat">{s.catLabel}</span>
      </div>
      <div className="svc__pad">
        <div className="svc__title">{s.title}</div>
        <div className="svc__by">
          <Avatar src={person.photo} name={person.name} size="sm" />
          <span className="svc__byname">{person.name}</span>
        </div>
        <div className="svc__foot">
          <span className="svc__price"><b>${s.price}</b> <span>{s.unit}</span></span>
          <span className="svc__rate">{I("star")}{s.rating.toFixed(1)}</span>
        </div>
      </div>
    </button>
  );
}

Object.assign(window, { HomeScreen, LocationPicker, NeighborCard, ServiceCard });
