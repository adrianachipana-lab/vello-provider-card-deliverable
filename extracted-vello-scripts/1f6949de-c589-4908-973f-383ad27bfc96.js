/* Vello flow — profile tab: Jordan's own account. */

function ProfileScreen({ tweaks, settings, setSetting, onOpenRequest, onOpenAdmin, queueCount, request, responderCount, onToast }) {
  const F = window.VelloFlow;
  const { I, PROFILE, PROFILE_ROWS, Chev } = F;
  const { Avatar, Button, Badge, Switch } = window.VelloDesignSystem_182a1b;
  F.useIcons();
  const REQUEST = request || F.REQUEST;
  const replies = responderCount != null ? responderCount : F.RESPONDERS.length;

  return (
    <React.Fragment>
      <div className="appbar" style={{ paddingTop: 2 }}>
        <span className="appbar__title appbar__title--lead">Profile</span>
        <span style={{ marginRight: 6 }}>
          <Button variant="ghost" size="sm" leadingIcon={I("pencil")} onClick={() => onToast("Editing isn't wired up in this prototype")}>Edit</Button>
        </span>
      </div>

      <div className="scroll">
        <div className="pro__hero">
          <Avatar name={PROFILE.name} size="xl" />
          <div className="pro__name">{PROFILE.name}</div>
          <div className="pro__hood">{I("map-pin")}{PROFILE.hood}</div>
          <div className="pro__since">{PROFILE.since}</div>
          <div className="pro__stats">
            {PROFILE.stats.map(([v, k]) => (
              <div key={k} className="pro__stat">
                <div className="pro__statv">{v}</div>
                <div className="pro__statk">{k}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section" style={{ marginTop: 22 }}>
          <div className="section__head">
            <div className="section__title">Your open request</div>
          </div>
          <div style={{ padding: "0 20px" }}>
            <button className="pro__req" type="button" onClick={onOpenRequest}>
              <span className="pro__reqt">{REQUEST.title}</span>
              <span className="pro__reqm">
                <Badge variant="success" size="sm" dot>Open</Badge>
                <span className="pro__reqc">{replies} {replies === 1 ? "reply" : "replies"}</span>
              </span>
              <span className="pro__reqchev"><Chev /></span>
            </button>
          </div>
        </div>

        <div className="section">
          <div className="section__head">
            <div className="section__title">Account</div>
          </div>
          <div className="pro__rows">
            {PROFILE_ROWS.map(r => (
              <button key={r.id} className="pro__row" type="button" onClick={() => onToast(`${r.label} isn't part of this prototype`)}>
                <span className="pro__rowicon">{I(r.icon)}</span>
                <span className="pro__rowl">{r.label}</span>
                {r.detail && <span className="pro__rowd">{r.detail}</span>}
                <span className="pro__rowchev"><Chev /></span>
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section__head">
            <div className="section__title">Notifications</div>
          </div>
          <div className="pro__rows">
            <div className="pro__switch">
              <span className="bk__switchlabel">
                New neighbors nearby
                <small>When someone verified joins your block</small>
              </span>
              <Switch checked={settings.nearby} onChange={(e) => setSetting("nearby", e.target.checked)} />
            </div>
            <div className="pro__switch">
              <span className="bk__switchlabel">
                Booking reminders
                <small>An hour before each visit</small>
              </span>
              <Switch checked={settings.reminders} onChange={(e) => setSetting("reminders", e.target.checked)} />
            </div>
            <div className="pro__switch">
              <span className="bk__switchlabel">
                Request replies
                <small>When a neighbor answers your request</small>
              </span>
              <Switch checked={settings.replies} onChange={(e) => setSetting("replies", e.target.checked)} />
            </div>
          </div>
        </div>

        <div className="section">
          <div className="section__head">
            <div className="section__title">
              Staff tools
              <small>You're on the Bay Ridge trust &amp; safety team</small>
            </div>
          </div>
          <div className="pro__rows">
            <button className="pro__row" type="button" onClick={onOpenAdmin}>
              <span className="pro__rowicon pro__rowicon--staff">{I("shield-check")}</span>
              <span className="pro__rowl">Moderation queue</span>
              {queueCount > 0 && <span className="pro__rowbadge">{queueCount}</span>}
              <span className="pro__rowchev"><Chev /></span>
            </button>
          </div>
        </div>

        <div className="pro__out">
          <button className="quietlink" onClick={() => onToast("Signed out — not really")}>Sign out</button>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { ProfileScreen });
