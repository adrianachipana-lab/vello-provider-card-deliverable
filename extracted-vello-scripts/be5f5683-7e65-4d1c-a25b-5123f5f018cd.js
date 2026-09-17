/* Vello flow — router, frame scaling, and prototype chrome. */

const APP_FRAME = { w: 375, h: 812 };
const DESK_FRAME = { w: 1280, h: 840 };

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "locationStyle": "pill",
  "showGreeting": true,
  "distanceFormat": "walk",
  "featuredGlow": true,
  "accent": "#557E26"
}/*EDITMODE-END*/;

const ACCENTS = ["#F0623B", "#557E26", "#16462F"];

// The create action belongs to the tab bar; sub-screens have their own primary CTA.
const TAB_SCREENS = ["home", "bookings", "messages", "profile"];

function useViewport() {
  const { useState, useEffect } = React;
  const [vp, setVp] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = document.getElementById("stage");
    const read = () => {
      const w = (el && el.clientWidth) || document.documentElement.clientWidth || window.innerWidth;
      const h = (el && el.clientHeight) || document.documentElement.clientHeight || window.innerHeight;
      // Never write zeros — a zero read is "not laid out yet", not a real size.
      if (w > 0 && h > 0) setVp({ w, h });
    };
    read();
    // ResizeObserver fires exactly when the element first gets a non-zero box.
    // rAF can't cover that case: it's throttled in a zero-area iframe.
    const ro = window.ResizeObserver ? new ResizeObserver(read) : null;
    if (ro && el) ro.observe(el);
    window.addEventListener("resize", read);
    return () => { if (ro) ro.disconnect(); window.removeEventListener("resize", read); };
  }, []);
  return vp;
}

function FlowApp() {
  const { useState, useEffect } = React;
  const F = window.VelloFlow;
  const { I, StatusBar, AppBar, Toast, Sheet, Chev, NAV, REQUEST } = F;
  const { BottomNav } = window.VelloDesignSystem_182a1b;

  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState("home");
  const [desk, setDesk] = useState(false);
  const [queue, setQueue] = useState(F.QUEUE);
  const [from, setFrom] = useState("home");
  const [booking, setBooking] = useState(null);
  const [requestClosed, setRequestClosed] = useState(false);
  const [cat, setCat] = useState("all");
  const [favorites, setFavorites] = useState({ p2: true });
  const [tab, setTab] = useState("home");
  const [toast, setToast] = useState(null);
  const [threads, setThreads] = useState(F.THREADS);
  const [openThread, setOpenThread] = useState(null);
  const [settings, setSettings] = useState({ nearby: true, reminders: true, replies: true });
  const [myRequest, setMyRequest] = useState(null);
  const [creating, setCreating] = useState(false);
  const [viewing, setViewing] = useState(null);
  const vp = useViewport();

  useEffect(() => { if (window.lucide) window.lucide.createIcons(); }, []);
  F.useIcons();

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(id);
  }, [toast]);

  const onToast = (text) => setToast({ text, at: Date.now() });

  const openBooking = (provider, opts = {}) => {
    if (!provider) return;
    setBooking({
      provider,
      serviceLabel: opts.serviceLabel || provider.service || "Help on your block",
      price: opts.price != null ? opts.price : provider.price,
      fromRequest: !!opts.fromRequest,
      stage: opts.stage,
      date: opts.date,
      time: opts.time,
      repeat: opts.repeat,
      days: opts.days,
    });
    setFrom(screen);
    setScreen("booking");
  };

  const openThreadFor = (who) => {
    const t = threads.find(x => x.who === who);
    if (!t) return;
    setThreads(prev => prev.map(x => x.id === t.id ? { ...x, unread: 0 } : x));
    setOpenThread(t.id);
    setTab("messages");
    setScreen("messages");
  };

  const selectThread = (id) => {
    if (id) setThreads(prev => prev.map(x => x.id === id ? { ...x, unread: 0 } : x));
    setOpenThread(id);
  };

  const sendMessage = (id, text) => {
    const at = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setThreads(prev => prev.map(t => t.id === id
      ? { ...t, at, messages: [...t.messages, { from: "me", text, at }] }
      : t));
  };

  const goHome = () => { setTab("home"); setScreen("home"); };

  const openNeighbor = (n) => {
    if (!n) return;
    setViewing(n);
    setFrom(screen);
    setScreen("neighbor");
  };

  const postRequest = (data) => {
    setMyRequest(data);
    setRequestClosed(false);
    setScreen("request");
    onToast("Request posted to your block");
  };

  const activeRequest = myRequest || F.REQUEST;
  const activeResponders = myRequest ? [] : F.RESPONDERS;

  const goTab = (id) => {
    setTab(id);
    setScreen(id === "home" ? "home" : id);
    if (id !== "messages") setOpenThread(null);
  };

  const frame = desk ? DESK_FRAME : APP_FRAME;
  const measured = vp.w > 0 && vp.h > 0;
  const pad = vp.w < 520 ? 16 : 40;
  // Unmeasured renders at scale(1), which clips — stay invisible for that one frame.
  const scale = measured
    ? Math.max(0.1, Math.min(1, (vp.w - pad) / frame.w, (vp.h - pad) / frame.h))
    : 1;

  let content = null;
  if (screen === "home") {
    content = (
      <HomeScreen
        tweaks={t} cat={cat} setCat={setCat}
        favorites={favorites}
        toggleFav={(id) => setFavorites(f => ({ ...f, [id]: !f[id] }))}
        onOpenRequest={() => { setFrom("home"); setScreen("request"); }}
        onBook={(n, s) => openNeighbor(n)}
        request={activeRequest}
        responders={activeResponders}
        onToast={onToast}
      />
    );
  } else if (screen === "request") {
    content = (
      <RequestScreen
        tweaks={t} closed={requestClosed}
        request={activeRequest} responders={activeResponders}
        onClose={() => setRequestClosed(true)}
        onBack={() => setScreen(from === "profile" ? "profile" : "home")}
        onHome={goHome}
        onBook={(p, r) => openBooking(p, { serviceLabel: activeRequest.title, price: r.quote, fromRequest: true })}
        onToast={onToast}
      />
    );
  } else if (screen === "neighbor" && viewing) {
    content = (
      <NeighborScreen
        n={viewing} tweaks={t}
        favorited={!!favorites[viewing.id]}
        onFav={() => setFavorites(f => ({ ...f, [viewing.id]: !f[viewing.id] }))}
        onBack={() => setScreen(from)}
        onBook={(n, s) => openBooking(n, s ? { serviceLabel: s.label, price: s.price } : {})}
        onMessage={openThreadFor}
        onToast={onToast}
      />
    );
  } else if (screen === "new-request") {
    content = (
      <NewRequestScreen
        onBack={() => setScreen(from === "new-request" ? "home" : from)}
        onPost={postRequest}
        onToast={onToast}
      />
    );
  } else if (screen === "booking" && booking) {
    content = (
      <BookingScreen
        booking={booking} tweaks={t}
        onBack={() => setScreen(from)}
        onHome={goHome}
        onToast={onToast}
      />
    );
  } else if (screen === "bookings") {
    content = (
      <BookingsScreen
        tweaks={t}
        onManage={(b) => openBooking(F.byId(b.who), {
          serviceLabel: b.service, price: b.price, stage: "confirmed",
          date: b.date, time: b.time, repeat: b.repeat, days: b.days,
        })}
        onRebook={(p, b) => openBooking(p, { serviceLabel: b.service, price: b.price })}        onMessage={openThreadFor}
        onHome={goHome}
        onToast={onToast}
      />
    );
  } else if (screen === "messages") {
    content = (
      <MessagesScreen
        threads={threads} openId={openThread} setOpenId={selectThread}
        onSend={sendMessage} onHome={goHome} onToast={onToast}
      />
    );
  } else if (screen === "profile") {
    content = (
      <ProfileScreen
        tweaks={t} settings={settings}
        setSetting={(k, v) => setSettings(s => ({ ...s, [k]: v }))}
        onOpenRequest={() => { setFrom("profile"); setScreen("request"); }}
        onOpenAdmin={() => setScreen("admin")}
        queueCount={queue.length}
        request={activeRequest}
        responderCount={activeResponders.length}
        onToast={onToast}
      />
    );
  } else if (screen === "admin") {
    content = (
      <AdminMobile
        items={queue} setItems={setQueue}
        onBack={() => setScreen("profile")}
        onDesktop={() => setDesk(true)}
        onToast={onToast}
      />
    );
  }

  const unread = threads.reduce((n, t) => n + t.unread, 0);
  const navItems = NAV.map(n => n.id === "messages" ? { ...n, badge: unread || undefined } : n);

  return (
    <React.Fragment>
      <div className="framewrap" style={{ transform: `translate(-50%, -50%) scale(${scale})`, visibility: measured ? "visible" : "hidden" }}>
        {desk ? (
          <AdminDesktop items={queue} setItems={setQueue} onExit={() => setDesk(false)} onToast={onToast} />
        ) : (
          <div className="phone" style={{ "--accent": t.accent }}>
            <StatusBar />
            <div className="screen">
              {content}
              <div className="navwrap">
                <BottomNav items={navItems} value={tab} onChange={goTab} />
                {TAB_SCREENS.includes(screen) && (
                  <button className="fab" type="button" aria-label="Create something new" onClick={() => setCreating(true)}>
                    {I("plus")}
                  </button>
                )}
                <div className="home-indicator"></div>
              </div>
            </div>
            {creating && (
              <Sheet title="What would you like to add?" onDismiss={() => setCreating(false)}>
                <div className="sheet__actions" style={{ gap: 9 }}>
                  <button className="createopt" type="button" onClick={() => { setCreating(false); setFrom(screen); setScreen("new-request"); }}>
                    <span className="createopt__icon">{I("file-text")}</span>
                    <span className="createopt__b">
                      <span className="createopt__t">Post a request</span>
                      <span className="createopt__d">Describe what you need and let neighbors reply</span>
                    </span>
                    <span className="createopt__chev"><Chev /></span>
                  </button>
                  <button className="createopt" type="button" onClick={() => { setCreating(false); goHome(); }}>
                    <span className="createopt__icon">{I("compass")}</span>
                    <span className="createopt__b">
                      <span className="createopt__t">Book a neighbor</span>
                      <span className="createopt__d">Browse verified neighbors on your block</span>
                    </span>
                    <span className="createopt__chev"><Chev /></span>
                  </button>
                  <div className="sheet__quiet">
                    <button className="quietlink" onClick={() => setCreating(false)}>Never mind</button>
                  </div>
                </div>
              </Sheet>
            )}
            {toast && <Toast key={toast.at} text={toast.text} />}
          </div>
        )}
      </div>

      {desk && toast && <Toast key={toast.at} text={toast.text} desk />}

      {!desk && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="Header" />
          <TweakRadio
            label="Location picker" value={t.locationStyle}
            options={[{ value: "inline", label: "Inline" }, { value: "pill", label: "Pill" }, { value: "stacked", label: "Stacked" }]}
            onChange={(v) => setTweak("locationStyle", v)}
          />
          <TweakToggle label="Show greeting" value={t.showGreeting} onChange={(v) => setTweak("showGreeting", v)} />
          <TweakSection label="Listings" />
          <TweakRadio
            label="Distance shown as" value={t.distanceFormat}
            options={[{ value: "walk", label: "Min walk" }, { value: "blocks", label: "Blocks" }, { value: "mi", label: "Miles" }]}
            onChange={(v) => setTweak("distanceFormat", v)}
          />
          <TweakToggle label="Featured glow" value={t.featuredGlow} onChange={(v) => setTweak("featuredGlow", v)} />
          <TweakSection label="Theme" />
          <TweakColor label="Accent" value={t.accent} options={ACCENTS} onChange={(v) => setTweak("accent", v)} />
        </TweaksPanel>
      )}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<FlowApp />);
setTimeout(() => { if (window.lucide) window.lucide.createIcons(); }, 60);
