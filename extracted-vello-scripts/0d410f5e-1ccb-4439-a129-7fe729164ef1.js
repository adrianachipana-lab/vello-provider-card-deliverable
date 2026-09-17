/* Vello flow — admin moderation queue. Desktop (1280) and mobile (375) share one state hook. */

function useQueue(onToast, items, setItems) {
  const { useState, useEffect } = React;
  const F = window.VelloFlow;
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState([]);
  const [activeId, setActiveId] = useState(F.QUEUE[0].id);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState(null);
  const [reasonErr, setReasonErr] = useState(false);

  const q = query.trim().toLowerCase();
  const visible = items.filter(it =>
    (filter === "all" || it.type === filter) &&
    (!q || it.subject.toLowerCase().includes(q) || it.who.toLowerCase().includes(q) ||
      it.detail.toLowerCase().includes(q) || F.qtype(it.type).label.toLowerCase().includes(q))
  );
  const active = visible.find(it => it.id === activeId) || null;

  // Keep the detail panel pointed at something real when filters change.
  useEffect(() => {
    if (visible.length && !visible.some(it => it.id === activeId)) setActiveId(visible[0].id);
  }, [filter, query, items]);

  const counts = { all: items.length };
  F.QTYPES.forEach(t => { counts[t.id] = items.filter(i => i.type === t.id).length; });

  const closeReject = () => { setRejecting(false); setReason(null); setReasonErr(false); };

  const resolve = (ids, verb) => {
    const list = Array.isArray(ids) ? ids : [ids];
    setItems(prev => {
      const next = prev.filter(i => !list.includes(i.id));
      setActiveId(cur => (list.includes(cur) ? (next[0] ? next[0].id : null) : cur));
      return next;
    });
    setPicked(prev => prev.filter(id => !list.includes(id)));
    closeReject();
    onToast(list.length > 1 ? `${list.length} items ${verb}` : `Item ${verb}`);
  };

  const submitReject = () => {
    if (!reason) { setReasonErr(true); return; }
    resolve(active.id, `rejected — ${reason.toLowerCase()}`);
  };

  const togglePick = (id) => setPicked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return { items, visible, active, activeId, setActiveId, filter, setFilter, query, setQuery,
    picked, setPicked, togglePick, counts, resolve, rejecting, setRejecting, closeReject,
    reason, setReason, reasonErr, submitReject };
}

function TypeBadge({ type, size = "md" }) {
  const { I, qtype } = window.VelloFlow;
  const { Badge } = window.VelloDesignSystem_182a1b;
  const t = qtype(type);
  return <Badge variant="neutral" size={size} icon={I(t.icon)}>{t.label}</Badge>;
}

function SevBadge({ severity, size = "md" }) {
  const { SEVERITY } = window.VelloFlow;
  const { Badge } = window.VelloDesignSystem_182a1b;
  const s = SEVERITY[severity];
  return <Badge variant={s.variant} size={size}>{s.label}</Badge>;
}

const ageLabel = (h) => (h >= 24 ? `${Math.floor(h / 24)}d ${h % 24}h` : `${h}h`);

/* ---------------- Detail panel body (shared) ---------------- */
function QueueDetail({ q, compact }) {
  const F = window.VelloFlow;
  const { I, REJECT_REASONS } = F;
  const { Button, Avatar } = window.VelloDesignSystem_182a1b;
  const it = q.active;
  return (
    <React.Fragment>
      <div className="adm__dbody">
        <p className="adm__dsec">Reported by</p>
        <div className="adm__who" style={{ fontSize: 13.5 }}>
          <Avatar src={it.photo} name={it.who} size="sm" />
          <span className="adm__whon">{it.who}</span>
          <span className={"adm__age" + (it.age >= 24 ? " adm__age--late" : "")} style={{ marginLeft: "auto" }}>
            {ageLabel(it.age)} old
          </span>
        </div>

        <p className="adm__dsec adm__dsec--sp">What was reported</p>
        <p className="adm__quote">{it.quote}</p>

        <p className="adm__dsec adm__dsec--sp">Evidence</p>
        <ul className="adm__ev">
          {it.evidence.map(e => <li key={e}>{I("check")}<span>{e}</span></li>)}
        </ul>

        <p className="adm__dsec adm__dsec--sp">Account history</p>
        <div className="adm__stats">
          {it.stats.map(([v, k]) => (
            <div key={k} className="adm__stat">
              <div className="adm__statv">{v}</div>
              <div className="adm__statk">{k}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="adm__dfoot">
        {q.rejecting ? (
          <div className="adm__reject">
            <div className="adm__rejt">Why are you rejecting this?</div>
            <div className="adm__rejchips">
              {REJECT_REASONS.map(r => (
                <button key={r} type="button" className="adm__rejchip" aria-pressed={q.reason === r} onClick={() => q.setReason(r)}>{r}</button>
              ))}
            </div>
            {q.reasonErr && <div className="bk__err">{I("alert-triangle")}Pick a reason before rejecting.</div>}
            <div style={{ display: "flex", gap: 9, marginTop: 13 }}>
              <button type="button" className="adm__danger" onClick={q.submitReject}>Confirm reject</button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
              <button className="quietlink" onClick={q.closeReject}>Never mind</button>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <Button variant="primary" size={compact ? "md" : "lg"} className="vl-btn--full" leadingIcon={I("check")}
              onClick={() => q.resolve(it.id, "approved")}>
              Approve
            </Button>
            <div className="adm__frow">
              <Button variant="secondary" onClick={() => q.resolve(it.id, "escalated to legal")}>Escalate</Button>
              <Button variant="ghost" onClick={() => q.setRejecting(true)}>Reject</Button>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

/* ---------------- Desktop ---------------- */
function AdminDesktop({ onToast, onExit, items, setItems }) {
  const F = window.VelloFlow;
  const { I, EmptyState, QTYPES, ADMIN_NAV } = F;
  const { Input, Tabs, Checkbox, Button, Avatar } = window.VelloDesignSystem_182a1b;
  const q = useQueue(onToast, items, setItems);
  F.useIcons();

  const tabs = [{ id: "all", label: "All", count: q.counts.all }]
    .concat(QTYPES.map(t => ({ id: t.id, label: t.short, count: q.counts[t.id] })));

  return (
    <div className="adm">
      <aside className="adm__side">
        <div className="adm__brand">
          {I("sprout")}
          <span className="adm__brandname">Vello</span>
          <span className="adm__tagchip">Trust</span>
        </div>
        {ADMIN_NAV.map(n => (
          <button key={n.id} className="adm__navitem" aria-current={n.id === "queue" ? "true" : undefined}
            onClick={() => n.id !== "queue" && onToast(`${n.label} isn't part of this prototype`)}>
            {I(n.icon)}<span>{n.label}</span>
            {n.id === "queue" && q.counts.all > 0 && <span className="adm__navcount">{q.counts.all}</span>}
          </button>
        ))}
        <div className="adm__me">
          <Avatar name="Iris Bell" size="sm" />
          <div>
            <div className="adm__mename">Iris Bell</div>
            <div className="adm__merole">Trust &amp; safety</div>
          </div>
        </div>
        <button className="adm__exit" type="button" onClick={onExit}>
          {I("smartphone")}<span>Back to the app</span>
        </button>
      </aside>

      <main className="adm__main">
        <div className="adm__top">
          <h1 className="adm__h1">
            Moderation queue
            <small>{q.counts.all} open · Bay Ridge, Brooklyn</small>
          </h1>
          <div className="adm__search">
            <Input aria-label="Search the queue" placeholder="Search subject or neighbor…" leadingIcon={I("search")}
              value={q.query} onChange={(e) => q.setQuery(e.target.value)} />
          </div>
        </div>

        <div className="adm__tabs">
          <Tabs items={tabs} value={q.filter} onChange={q.setFilter} />
        </div>

        {q.picked.length > 0 && (
          <div className="adm__bulk">
            <span className="adm__bulkt">{q.picked.length} selected</span>
            <Button variant="primary" size="sm" leadingIcon={I("check")} onClick={() => q.resolve(q.picked, "approved")}>Approve selected</Button>
            <Button variant="ghost" size="sm" onClick={() => q.setPicked([])}>Clear</Button>
          </div>
        )}

        <div className="adm__list">
          {q.visible.length ? q.visible.map(it => (
            <div key={it.id} className="adm__row" role="button" tabIndex={0} aria-selected={it.id === q.activeId}
              onClick={() => q.setActiveId(it.id)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); q.setActiveId(it.id); } }}>
              <span onClick={(e) => e.stopPropagation()}>
                <Checkbox checked={q.picked.includes(it.id)} onChange={() => q.togglePick(it.id)} aria-label={`Select ${it.subject}`} />
              </span>
              <TypeBadge type={it.type} size="sm" />
              <span className="adm__subj">
                <span className="adm__subjt">{it.subject}</span>
                <span className="adm__subjd">
                  <Avatar src={it.photo} name={it.who} size="sm" />
                  <span className="adm__subjdt">{it.who} · {it.detail}</span>
                </span>
              </span>
              <SevBadge severity={it.severity} size="sm" />
              <span className={"adm__age" + (it.age >= 24 ? " adm__age--late" : "")}>{ageLabel(it.age)}</span>
            </div>
          )) : (
            <EmptyState
              icon={q.query || q.filter !== "all" ? "search" : "inbox"}
              title={q.counts.all === 0 ? "Queue's clear" : "Nothing matches"}
              text={q.counts.all === 0
                ? "Every open report in Bay Ridge has been handled. Nice work."
                : "Try a different filter or clear the search."}
              action={q.counts.all > 0
                ? <Button variant="outline" size="sm" onClick={() => { q.setQuery(""); q.setFilter("all"); }}>Clear filters</Button>
                : null}
            />
          )}
        </div>
      </main>

      <aside className="adm__detail">
        {q.active ? (
          <React.Fragment>
            <div className="adm__dhead">
              <div className="adm__dbadges">
                <TypeBadge type={q.active.type} size="sm" />
                <SevBadge severity={q.active.severity} size="sm" />
              </div>
              <h2 className="adm__dtitle">{q.active.subject}</h2>
            </div>
            <QueueDetail q={q} />
          </React.Fragment>
        ) : (
          <div className="adm__dempty">
            <EmptyState icon="check" title="Nothing selected" text="Pick a report from the queue to review it." />
          </div>
        )}
      </aside>
    </div>
  );
}

/* ---------------- Mobile ---------------- */
function AdminMobile({ onToast, onBack, onDesktop, items, setItems }) {
  const F = window.VelloFlow;
  const { I, EmptyState, ScrollRow, AppBar, QTYPES } = F;
  const { Input, Tag, Button, Avatar, IconButton } = window.VelloDesignSystem_182a1b;
  const q = useQueue(onToast, items, setItems);
  const { useState } = React;
  const [open, setOpen] = useState(false);
  F.useIcons();

  const filters = [{ id: "all", label: "All", icon: "inbox" }]
    .concat(QTYPES.map(t => ({ id: t.id, label: t.short, icon: t.icon })));

  return (
    <React.Fragment>
      <AppBar
        title="Moderation"
        onBack={onBack}
        action={<IconButton variant="ghost" label="Open the desktop view" onClick={onDesktop}>{I("monitor")}</IconButton>}
      />

      <div className="scroll">
        <div style={{ padding: "0 16px" }}>
          <Input aria-label="Search the queue" placeholder="Search subject or neighbor…" leadingIcon={I("search")}
            value={q.query} onChange={(e) => q.setQuery(e.target.value)} />
        </div>

        <div className="section admm__filters" style={{ marginTop: 14 }}>
          <ScrollRow>
            {filters.map(f => (
              <Tag key={f.id} selected={q.filter === f.id} icon={I(f.icon)} onClick={() => q.setFilter(f.id)}>
                {f.label}{q.counts[f.id] ? ` ${q.counts[f.id]}` : ""}
              </Tag>
            ))}
          </ScrollRow>
        </div>

        {q.visible.length ? (
          <div className="admm__list">
            {q.visible.map(it => (
              <button key={it.id} className="admm__card" type="button" onClick={() => { q.setActiveId(it.id); setOpen(true); }}>
                <div className="admm__top">
                  <TypeBadge type={it.type} size="sm" />
                  <SevBadge severity={it.severity} size="sm" />
                </div>
                <div className="admm__t">{it.subject}</div>
                <div className="admm__d">{it.detail}</div>
                <div className="admm__foot">
                  <Avatar src={it.photo} name={it.who} size="sm" />
                  <span style={{ fontSize: 12.5, color: "var(--text-body)" }}>{it.who}</span>
                  <span className={"admm__age" + (it.age >= 24 ? " admm__age--late" : "")}>{ageLabel(it.age)}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={q.query || q.filter !== "all" ? "search" : "inbox"}
            title={q.counts.all === 0 ? "Queue's clear" : "Nothing matches"}
            text={q.counts.all === 0 ? "Every open report has been handled." : "Try another filter or clear the search."}
            action={q.counts.all > 0
              ? <Button variant="outline" size="sm" onClick={() => { q.setQuery(""); q.setFilter("all"); }}>Clear filters</Button>
              : null}
          />
        )}
      </div>

      {open && q.active && (
        <div className="admm__sheetwrap">
          <AppBar title="Review report" onBack={() => { setOpen(false); q.closeReject(); }} />
          <div className="adm__dhead" style={{ padding: "4px 20px 16px" }}>
            <div className="adm__dbadges">
              <TypeBadge type={q.active.type} size="sm" />
              <SevBadge severity={q.active.severity} size="sm" />
            </div>
            <h2 className="adm__dtitle" style={{ fontSize: 20 }}>{q.active.subject}</h2>
          </div>
          <QueueDetail q={q} compact />
        </div>
      )}
    </React.Fragment>
  );
}

Object.assign(window, { AdminDesktop, AdminMobile, QueueDetail, TypeBadge, SevBadge, useQueue });
