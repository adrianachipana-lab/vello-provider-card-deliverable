/* Vello flow — bookings tab: upcoming and past, with manage / rebook entry points. */

function BookingsScreen({ tweaks, onManage, onRebook, onMessage, onToast, onHome }) {
  const { useState } = React;
  const F = window.VelloFlow;
  const { I, AvatarVerified, EmptyState, BOOKINGS, BK_STATUS, byId } = F;
  const { Tabs, Badge, Button, IconButton, Rating } = window.VelloDesignSystem_182a1b;
  const [tab, setTab] = useState("upcoming");
  F.useIcons();

  const list = BOOKINGS[tab];

  return (
    <React.Fragment>
      <div className="appbar" style={{ paddingTop: 2 }}>
        <span className="appbar__title appbar__title--lead">Your bookings</span>
      </div>
      <div className="scroll">
        <div className="tabsrow">
          <Tabs
            value={tab} onChange={setTab}
            items={[
              { id: "upcoming", label: "Upcoming", count: BOOKINGS.upcoming.length },
              { id: "past", label: "Past", count: BOOKINGS.past.length },
            ]}
          />
        </div>

        {list.length ? (
          <div className="bkl">
            {list.map(b => {
              const p = byId(b.who);
              const st = BK_STATUS[b.status];
              const dead = b.status === "cancelled";
              return (
                <div key={b.id} className={"bkl__card" + (dead ? " bkl__card--dead" : "")}>
                  <div className="bkl__row">
                    <AvatarVerified n={p} />
                    <div className="bkl__body">
                      <div className="bkl__who">{p.name}</div>
                      <div className="bkl__svc">{b.service}</div>
                    </div>
                    <Badge variant={st.variant} size="sm">{st.label}</Badge>
                  </div>

                  <div className="bkl__meta">
                    <span className="bkl__chip">{I("calendar")}{b.repeat ? b.when : `${b.date} · ${b.time}`}</span>
                    <span className="bkl__price">${b.price}{b.repeat ? " / walk" : ""}</span>
                  </div>

                  {tab === "upcoming" ? (
                    <div className="bkl__acts">
                      <Button variant="primary" size="sm" onClick={() => onManage(b)}>Manage</Button>
                      <Button variant="secondary" size="sm" onClick={() => onMessage(b.who)}>Message</Button>
                    </div>
                  ) : (
                    <div className="bkl__acts">
                      {!dead && (b.rated
                        ? <span className="bkl__rated">You rated <Rating value={b.rated} size="sm" starsOnly /></span>
                        : <Button variant="secondary" size="sm" leadingIcon={I("star")} onClick={() => onToast(`Thanks — we'll pass it to ${p.name.split(" ")[0]}`)}>Leave a rating</Button>
                      )}
                      <Button variant={dead ? "primary" : "ghost"} size="sm" onClick={() => onRebook(p, b)}>Book again</Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon="calendar"
            title={tab === "upcoming" ? "Nothing booked yet" : "No past bookings"}
            text={tab === "upcoming"
              ? "When you book someone on your block, it'll show up here."
              : "Once a visit wraps up, you'll find it here."}
            action={<Button variant="outline" size="sm" onClick={onHome}>Find help nearby</Button>}
          />
        )}
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { BookingsScreen });
