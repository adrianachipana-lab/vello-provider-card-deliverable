/* Vello flow — booking screen.
   One screen, three states: review (unconfirmed) → confirmed → cancelled.
   Action hierarchy: confirm is the only filled button; cancel is a quiet link below it. */

const BK_DATES = ["Mon, Jun 15", "Tue, Jun 16", "Wed, Jun 17"];
const BK_TIMES = ["2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
const BK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const NOTE_MAX = 240;

function BookingScreen({ booking, tweaks, onBack, onHome, onToast }) {
  const { useState } = React;
  const F = window.VelloFlow;
  const { I, AvatarVerified, Sheet, AppBar, money, distanceLabel, DIST_ICON } = F;
  const { Button, Input, Switch, Rating, Badge } = window.VelloDesignSystem_182a1b;

  const provider = booking.provider;
  const [stage, setStage] = useState(booking.stage || "review");
  const [date, setDate] = useState(booking.date || BK_DATES[0]);
  const [time, setTime] = useState(booking.time || null);
  const [repeat, setRepeat] = useState(booking.repeat != null ? booking.repeat : !!booking.fromRequest);
  const [days, setDays] = useState(booking.days || (booking.fromRequest ? [...BK_DAYS] : []));
  const [address, setAddress] = useState("412 82nd St, Apt 3R");
  const [access, setAccess] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});
  const [askCancel, setAskCancel] = useState(false);
  F.useIcons();

  const unitPrice = booking.price != null ? booking.price : provider.price;
  const visits = repeat ? Math.max(days.length, 1) : 1;
  const subtotal = unitPrice * visits;
  const fee = subtotal * 0.1;
  const total = subtotal + fee;

  const toggleDay = (d) => {
    setDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
    setErrors(e => ({ ...e, days: null }));
  };

  const confirm = () => {
    const next = {};
    if (!time) next.time = "Pick a time so " + provider.name.split(" ")[0] + " knows when to come by.";
    if (!address.trim()) next.address = "We need an address to send her to.";
    if (repeat && days.length === 0) next.days = "Choose at least one weekday to repeat.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setStage("confirmed");
    onToast("Booking confirmed");
  };

  const summaryRows = [
    ["Service", booking.serviceLabel],
    ["When", repeat ? `${days.join(", ")} at ${time}` : `${date} at ${time}`],
    ["Starts", date],
    ["Where", address],
    ["Total", `$${money(total)}`, true],
  ];

  return (
    <React.Fragment>
      <AppBar title={stage === "review" ? "Confirm booking" : "Your booking"} onBack={stage === "review" ? onBack : onHome} />
      <div className="scroll">
        {stage !== "review" && (
          <div className={"bk__banner" + (stage === "cancelled" ? " bk__banner--dead" : "")} style={{ marginBottom: 22 }}>
            <span className="bk__bicon">{I(stage === "cancelled" ? "x" : "check")}</span>
            <div>
              <div className="bk__btitle">
                {stage === "cancelled" ? "Booking cancelled" : `You're all set — see you ${repeat ? days[0] : date.split(",")[0]}!`}
              </div>
              <p className="bk__btext">
                {stage === "cancelled"
                  ? `We let ${provider.name.split(" ")[0]} know. Nothing was charged.`
                  : `${provider.name.split(" ")[0]} has the details and will message you if anything changes.`}
              </p>
            </div>
          </div>
        )}

        <div className="bk">
          <div className="bk__prov">
            <AvatarVerified n={provider} />
            <div className="bk__provbody">
              <div className="bk__provname">{provider.name}</div>
              <div className="bk__provsvc">{booking.serviceLabel}</div>
              <div className="nb__meta" style={{ marginTop: 8 }}>
                <span className="nb__walk">{I(DIST_ICON[tweaks.distanceFormat])}{distanceLabel(provider, tweaks.distanceFormat)}</span>
                <Rating value={provider.rating} size="sm" />
              </div>
            </div>
          </div>

          {stage === "review" ? (
            <React.Fragment>
              <div className="bk__group">
                <div className="bk__legend">Date</div>
                <div className="bk__chips">
                  {BK_DATES.map(d => (
                    <button key={d} type="button" className="vl-tag" aria-pressed={date === d}
                      data-selected={date === d ? "true" : undefined}
                      style={date === d ? { background: "var(--brand-primary)", color: "var(--brand-on-primary)", borderColor: "transparent" } : undefined}
                      onClick={() => setDate(d)}>{d}</button>
                  ))}
                </div>
              </div>

              <div className="bk__group">
                <div className="bk__legend">Time</div>
                <div className="bk__chips">
                  {BK_TIMES.map(t => (
                    <button key={t} type="button" className="vl-tag" aria-pressed={time === t}
                      style={time === t ? { background: "var(--brand-primary)", color: "var(--brand-on-primary)", borderColor: "transparent" } : undefined}
                      onClick={() => { setTime(t); setErrors(e => ({ ...e, time: null })); }}>{t}</button>
                  ))}
                </div>
                {errors.time && <div className="bk__err">{I("alert-triangle")}{errors.time}</div>}
              </div>

              <div className="bk__group">
                <div className="bk__switchrow">
                  <span className="bk__switchlabel">
                    Repeat every week
                    <small>Same neighbor, same time</small>
                  </span>
                  <Switch checked={repeat} onChange={(e) => { setRepeat(e.target.checked); setErrors(er => ({ ...er, days: null })); }} />
                </div>
                {repeat && (
                  <React.Fragment>
                    <div className="bk__days">
                      {BK_DAYS.map(d => (
                        <button key={d} type="button" className="bk__day" aria-pressed={days.includes(d)} onClick={() => toggleDay(d)}>{d}</button>
                      ))}
                    </div>
                    {errors.days && <div className="bk__err">{I("alert-triangle")}{errors.days}</div>}
                  </React.Fragment>
                )}
              </div>

              <div className="bk__group">
                <div className="bk__legend">Where</div>
                <Input
                  aria-label="Address"
                  placeholder="Street address"
                  leadingIcon={I("map-pin")}
                  value={address}
                  aria-invalid={errors.address ? "true" : undefined}
                  onChange={(e) => { setAddress(e.target.value); setErrors(er => ({ ...er, address: null })); }}
                />
                {errors.address && <div className="bk__err">{I("alert-triangle")}{errors.address}</div>}
                <div style={{ marginTop: 10 }}>
                  <Input
                    aria-label="Access notes"
                    placeholder="Lockbox code, buzzer, side gate…"
                    leadingIcon={I("key")}
                    value={access}
                    onChange={(e) => setAccess(e.target.value)}
                  />
                </div>
              </div>

              <div className="bk__group">
                <div className="bk__legend">
                  <span>Anything else?</span>
                  <span style={{ fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>Optional</span>
                </div>
                <textarea
                  className="bk__note" aria-label="Notes for the neighbor" maxLength={NOTE_MAX}
                  placeholder={`Juniper pulls a little on the leash — ${provider.name.split(" ")[0]} should know.`}
                  value={note} onChange={(e) => setNote(e.target.value)}
                />
                <div className="bk__counter">{note.length} / {NOTE_MAX}</div>
              </div>

              <div className="bk__sum">
                <div className="bk__line"><span>${unitPrice} × {visits} {visits === 1 ? "visit" : "visits"}</span><b>${money(subtotal)}</b></div>
                <div className="bk__line"><span>Vello service fee</span><b>${money(fee)}</b></div>
                <div className="bk__total">
                  <span className="bk__totall">{repeat ? "Per week" : "Total"}</span>
                  <span className="bk__totalv">${money(total)}</span>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div className="bk__sum" style={{ marginTop: 18 }}>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 4 }}>
                {stage === "cancelled"
                  ? <Badge variant="neutral">Cancelled</Badge>
                  : <Badge variant="success" icon={I("check")}>Confirmed</Badge>}
              </div>
              {summaryRows.map(([k, v, strong]) => (
                <div key={k} className="bk__ro">
                  <span className="bk__rok">{k}</span>
                  <span className={"bk__rov" + (strong ? " bk__rov--mono" : "")}>{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confirm is the only filled button on this screen. */}
        {stage === "review" && (
          <React.Fragment>
            <div className="bk__cta">
              <Button variant="primary" size="lg" className="vl-btn--full" leadingIcon={I("calendar-check")} onClick={confirm}>
                Confirm booking
              </Button>
            </div>
            <div className="bk__cancelwrap">
              <button className="quietlink" onClick={onBack}>Cancel</button>
            </div>
          </React.Fragment>
        )}

        {stage === "confirmed" && (
          <React.Fragment>
            <div className="bk__cta">
              <Button variant="primary" size="lg" className="vl-btn--full" leadingIcon={I("message-circle")}
                onClick={() => onToast(`Message sent to ${provider.name.split(" ")[0]}`)}>
                Message {provider.name.split(" ")[0]}
              </Button>
            </div>
            <div className="bk__cancelwrap">
              <button className="quietlink quietlink--danger" onClick={() => setAskCancel(true)}>Cancel booking</button>
            </div>
          </React.Fragment>
        )}

        {stage === "cancelled" && (
          <div className="bk__cta">
            <Button variant="primary" size="lg" className="vl-btn--full" onClick={onHome}>Find another neighbor</Button>
          </div>
        )}
      </div>

      {askCancel && (
        <Sheet
          title={`Cancel ${provider.name.split(" ")[0]}'s visit?`}
          text={`She's expecting you ${repeat ? days[0] : date.split(",")[0]} at ${time}. Cancelling under 24 hours out can affect your neighbor rating.`}
          onDismiss={() => setAskCancel(false)}
        >
          <div className="sheet__actions">
            <Button variant="primary" size="lg" className="vl-btn--full" onClick={() => setAskCancel(false)}>Keep booking</Button>
            <div className="sheet__quiet">
              <button className="quietlink quietlink--danger" onClick={() => { setAskCancel(false); setStage("cancelled"); onToast("Booking cancelled"); }}>
                Cancel booking
              </button>
            </div>
          </div>
        </Sheet>
      )}
    </React.Fragment>
  );
}

Object.assign(window, { BookingScreen });
