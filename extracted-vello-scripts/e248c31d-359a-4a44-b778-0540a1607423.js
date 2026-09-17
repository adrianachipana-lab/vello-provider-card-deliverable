/* Vello flow — neighbor detail: the full profile you land on from a card tap. */

function NeighborScreen({ n, tweaks, onBack, onBook, onMessage, onToast, favorited, onFav }) {
  const F = window.VelloFlow;
  const { I, VerifiedMark, AppBar, Chev, detailFor, distanceLabel, DIST_ICON } = F;
  const { Avatar, Badge, Button, IconButton, Rating } = window.VelloDesignSystem_182a1b;
  const d = detailFor(n.id);
  F.useIcons();

  return (
    <React.Fragment>
      <AppBar
        title={n.name}
        onBack={onBack}
        action={
          <IconButton variant="ghost" label={favorited ? "Remove from favorites" : "Save to favorites"} onClick={onFav}>
            <svg className={"nbd__heart" + (favorited ? " nbd__heart--on" : "")} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
          </IconButton>
        }
      />

      <div className="scroll">
        <div className="nbd__hero">
          <span className="nbd__avatar">
            <Avatar src={n.photo} name={n.name} size="xl" />
            {n.verified && <span className="nbd__vmark"><VerifiedMark size={32} /></span>}
          </span>
          <div className="nbd__name">{n.name}</div>
          <div className="nbd__svc">{n.service}</div>
          <div className="nbd__badges">
            {n.available
              ? <span className="nb__avail"><i></i>Available</span>
              : <Badge variant="neutral" size="sm">Booked up this week</Badge>}
            <span className="nb__walk">{I(DIST_ICON[tweaks.distanceFormat])}{distanceLabel(n, tweaks.distanceFormat)}</span>
          </div>
          <div className="nbd__stats">
            <div className="nbd__stat">
              <div className="nbd__statv">{n.rating.toFixed(1)}</div>
              <div className="nbd__statk">{n.reviews} reviews</div>
            </div>
            <div className="nbd__stat">
              <div className="nbd__statv">${n.price}</div>
              <div className="nbd__statk">from / {n.unit.replace("per ", "")}</div>
            </div>
            <div className="nbd__stat">
              <div className="nbd__statv nbd__statv--sm">{d.responds.replace("Replies in ", "")}</div>
              <div className="nbd__statk">response</div>
            </div>
          </div>
        </div>

        <div className="nbd__sec">
          <div className="nbd__h"><span>About</span></div>
          <p className="nbd__about">{d.about}</p>
          <div className="nbd__since">{I("shield-check")}{d.since} · Background-checked by Vello</div>
        </div>

        <div className="nbd__sec">
          <div className="nbd__h"><span>What {n.name.split(" ")[0]} offers</span></div>
          <div className="nbd__svcs">
            {d.services.map(s => (
              <button key={s.label} className="nbd__svcrow" type="button" onClick={() => onBook(n, s)}>
                <span className="nbd__svcl">{s.label}</span>
                <span className="nbd__svcp">${s.price} <span>{s.unit}</span></span>
                <span className="nbd__svcchev"><Chev /></span>
              </button>
            ))}
          </div>
        </div>

        <div className="nbd__sec">
          <div className="nbd__h">
            <span>Reviews</span>
            <span className="nbd__hrate"><Rating value={n.rating} count={n.reviews} size="sm" /></span>
          </div>
          <div className="nbd__revs">
            {d.reviews.map(r => (
              <div key={r.who + r.at} className="nbd__rev">
                <div className="nbd__revtop">
                  <Avatar name={r.who} size="sm" />
                  <span className="nbd__revwho">{r.who}</span>
                  <span className="nbd__revat">{r.at}</span>
                </div>
                <Rating value={r.stars} size="sm" starsOnly />
                <p className="nbd__revtext">{r.text}</p>
              </div>
            ))}
          </div>
          <div className="nbd__more">
            <button className="quietlink" onClick={() => onToast(`All ${n.reviews} reviews aren't in this prototype`)}>
              Read all {n.reviews} reviews
            </button>
          </div>
        </div>
      </div>

      <div className="nbd__cta">
        <IconButton variant="secondary" label={`Message ${n.name}`} onClick={() => onMessage(n.id)}>{I("message-circle")}</IconButton>
        <Button variant="primary" size="lg" className="vl-btn--full" leadingIcon={I("calendar-check")} onClick={() => onBook(n)}>
          Book {n.name.split(" ")[0]}
        </Button>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { NeighborScreen });
