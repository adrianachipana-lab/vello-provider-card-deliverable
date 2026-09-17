/* Vello flow — request detail: a help request Jordan posted, with the neighbors who replied. */

function RequestScreen({ tweaks, closed, request, responders, onClose, onBack, onBook, onHome, onToast }) {
  const { useState } = React;
  const F = window.VelloFlow;
  const { I, AvatarVerified, Sheet, AppBar, EmptyState, responderPerson, distanceLabel, DIST_ICON } = F;
  const { Badge, Button, IconButton, Rating } = window.VelloDesignSystem_182a1b;
  const [confirmClose, setConfirmClose] = useState(false);
  F.useIcons();
  const REQUEST = request || F.REQUEST;
  const RESPONDERS = responders || F.RESPONDERS;

  return (
    <React.Fragment>
      <AppBar title="Your request" onBack={onBack} />
      <div className="scroll">
        <div className={"rq" + (closed ? " rq--closed" : "")}>
          <div className="rq__head">
            {closed
              ? <Badge variant="neutral" icon={I("check")}>Closed</Badge>
              : <Badge variant="success" dot>Open</Badge>}
            <Badge variant="brand" icon={I(REQUEST.catId ? (F.CATEGORIES.find(c => c.id === REQUEST.catId) || {}).icon : "dog")}>{REQUEST.catLabel}</Badge>
          </div>
          <h1 className="rq__title">{REQUEST.title}</h1>
          <div className="rq__posted">{REQUEST.posted}</div>

          <div className="rq__grid">
            <div className="rq__cell">
              <span className="rq__label">{I("clock")}When</span>
              <div className="rq__val">{REQUEST.when}</div>
            </div>
            <div className="rq__cell">
              <span className="rq__label">{I("calendar")}Starts</span>
              <div className="rq__val">{REQUEST.starts}</div>
            </div>
            <div className="rq__cell">
              <span className="rq__label">{I("map-pin")}Where</span>
              <div className="rq__val">{REQUEST.where}</div>
            </div>
            <div className="rq__cell">
              <span className="rq__label">{I("banknote")}Budget</span>
              <div className="rq__val rq__val--mono">{REQUEST.budget} <span style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 12, color: "var(--text-muted)" }}>{REQUEST.budgetUnit}</span></div>
            </div>
          </div>

          <p className="rq__notes">{REQUEST.notes}</p>
        </div>

        <div className="section">
          <div className="section__head">
            <div className="section__title">
              {RESPONDERS.length ? `${RESPONDERS.length} neighbors responded` : "Replies"}
              <small>{closed
                ? "This request is closed to new replies"
                : RESPONDERS.length ? "Verified by your neighborhood, minutes away" : "We've shown it to verified neighbors nearby"}</small>
            </div>
          </div>
          {RESPONDERS.length ? (
          <div className="neighbors">
            {RESPONDERS.map(r => {
              const p = responderPerson(r);
              return (
                <div key={r.id} className={"resp" + (r.top && !closed ? " resp--top" : "")}>
                  <div className="resp__row">
                    <AvatarVerified n={p} />
                    <div className="resp__body">
                      <div className="resp__top">
                        <span className="resp__name">{p.name}</span>
                        {r.top && !closed && <Badge variant="accent" size="sm">Best match</Badge>}
                      </div>
                      <div className="resp__meta">
                        <span className="nb__walk">{I(DIST_ICON[tweaks.distanceFormat])}{distanceLabel(p, tweaks.distanceFormat)}</span>
                        <Rating value={p.rating} count={p.reviews} size="sm" />
                      </div>
                    </div>
                  </div>
                  <p className="resp__quote">{r.reply}</p>
                  <div className="resp__foot">
                    <span className="resp__price">${r.quote} <span>per walk</span></span>
                    <IconButton variant="secondary" label={`Message ${p.name}`} onClick={() => onToast(`Message sent to ${p.name.split(" ")[0]}`)}>{I("message-circle")}</IconButton>
                    <Button variant="primary" size="sm" disabled={closed} onClick={() => onBook(p, r)}>
                      Book {p.name.split(" ")[0]}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          ) : (
            <EmptyState
              icon="clock"
              title="No replies yet"
              text="Neighbors usually answer within a couple of hours. We'll let you know the moment someone does."
              action={<Button variant="outline" size="sm" onClick={onHome}>Browse neighbors instead</Button>}
            />
          )}
        </div>

        {!closed && (
          <div className="rq__quiet">
            <button className="quietlink" onClick={() => onToast("Editing isn't wired up in this prototype")}>Edit request</button>
            <button className="quietlink quietlink--danger" onClick={() => setConfirmClose(true)}>Close request</button>
          </div>
        )}
      </div>

      {confirmClose && (
        <Sheet
          title="Close this request?"
          text="Your three neighbors will stop seeing it, and nobody new can reply. You can always post it again."
          onDismiss={() => setConfirmClose(false)}
        >
          <div className="sheet__actions">
            <Button variant="primary" size="lg" className="vl-btn--full" onClick={() => setConfirmClose(false)}>Keep it open</Button>
            <div className="sheet__quiet">
              <button className="quietlink quietlink--danger" onClick={() => { setConfirmClose(false); onClose(); onToast("Request closed"); }}>Close request</button>
            </div>
          </div>
        </Sheet>
      )}
    </React.Fragment>
  );
}

Object.assign(window, { RequestScreen });
