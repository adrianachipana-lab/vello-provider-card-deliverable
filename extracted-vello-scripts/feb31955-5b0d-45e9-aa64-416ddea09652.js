/* Vello flow — post a help request. One screen, validated on submit. */

const REQ_WHEN = ["Weekday afternoons", "Weekday mornings", "Evenings", "Weekends", "One-off"];
const REQ_BUDGET = ["$15–25", "$25–40", "$40–60", "$60+"];
const REQ_STARTS = ["Mon, Jun 15", "Tue, Jun 16", "Wed, Jun 17", "Flexible"];
const REQ_UNIT = { dog: "per walk", cleaning: "per visit", handyman: "flat", tutoring: "per hr" };
const REQ_NOTE_MAX = 400;

function NewRequestScreen({ onBack, onPost, onToast }) {
  const { useState } = React;
  const F = window.VelloFlow;
  const { I, AppBar, CATEGORIES } = F;
  const { Button, Input, Tag } = window.VelloDesignSystem_182a1b;
  const [cat, setCat] = useState(null);
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState(null);
  const [starts, setStarts] = useState(REQ_STARTS[0]);
  const [where, setWhere] = useState("412 82nd St, Apt 3R");
  const [budget, setBudget] = useState(null);
  const [notes, setNotes] = useState("");
  const [err, setErr] = useState({});
  F.useIcons();

  const cats = CATEGORIES.filter(c => c.id !== "all");
  const clear = (k) => setErr(e => ({ ...e, [k]: null }));

  const post = () => {
    const next = {};
    if (!cat) next.cat = "Pick what kind of help you need.";
    if (!title.trim()) next.title = "Give your request a short title.";
    if (!when) next.when = "Let neighbors know when you need them.";
    if (!where.trim()) next.where = "We need an address to show nearby neighbors.";
    if (!budget) next.budget = "A rough budget helps neighbors reply.";
    setErr(next);
    if (Object.keys(next).length) return;
    onPost({
      title: title.trim(),
      catLabel: (cats.find(c => c.id === cat) || {}).label,
      catId: cat,
      posted: "Posted just now",
      when,
      starts,
      where: where.trim(),
      budget,
      budgetUnit: REQ_UNIT[cat] || "per visit",
      notes: notes.trim(),
    });
  };

  const Err = ({ k }) => err[k] ? <div className="bk__err">{I("alert-triangle")}{err[k]}</div> : null;

  return (
    <React.Fragment>
      <AppBar title="Post a request" onBack={onBack} />
      <div className="scroll">
        <div className="nr">
          <p className="nr__lede">Tell your block what you need. Verified neighbors nearby can reply with a quote.</p>

          <div className="bk__group">
            <div className="bk__legend">What do you need?</div>
            <div className="bk__chips">
              {cats.map(c => (
                <Tag key={c.id} icon={I(c.icon)} selected={cat === c.id} onClick={() => { setCat(c.id); clear("cat"); }}>{c.label}</Tag>
              ))}
            </div>
            <Err k="cat" />
          </div>

          <div className="bk__group">
            <div className="bk__legend">Title</div>
            <Input
              aria-label="Request title" placeholder="e.g. Weekday walks for Juniper"
              value={title} maxLength={70}
              onChange={(e) => { setTitle(e.target.value); clear("title"); }}
            />
            <Err k="title" />
          </div>

          <div className="bk__group">
            <div className="bk__legend">When?</div>
            <div className="bk__chips">
              {REQ_WHEN.map(w => (
                <Tag key={w} selected={when === w} onClick={() => { setWhen(w); clear("when"); }}>{w}</Tag>
              ))}
            </div>
            <Err k="when" />
          </div>

          <div className="bk__group">
            <div className="bk__legend">Starting</div>
            <div className="bk__chips">
              {REQ_STARTS.map(s => (
                <Tag key={s} selected={starts === s} onClick={() => setStarts(s)}>{s}</Tag>
              ))}
            </div>
          </div>

          <div className="bk__group">
            <div className="bk__legend">Where?</div>
            <Input
              aria-label="Address" placeholder="Street address" leadingIcon={I("map-pin")}
              value={where} onChange={(e) => { setWhere(e.target.value); clear("where"); }}
            />
            <Err k="where" />
          </div>

          <div className="bk__group">
            <div className="bk__legend">
              <span>Budget</span>
              <span style={{ fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>{REQ_UNIT[cat] || "per visit"}</span>
            </div>
            <div className="bk__chips">
              {REQ_BUDGET.map(b => (
                <Tag key={b} selected={budget === b} onClick={() => { setBudget(b); clear("budget"); }}>{b}</Tag>
              ))}
            </div>
            <Err k="budget" />
          </div>

          <div className="bk__group">
            <div className="bk__legend">
              <span>Anything else?</span>
              <span style={{ fontWeight: 500, textTransform: "none", letterSpacing: 0 }}>Optional</span>
            </div>
            <textarea
              className="bk__note" aria-label="Request details" maxLength={REQ_NOTE_MAX}
              placeholder="Pets, access, supplies — whatever a neighbor should know before replying."
              value={notes} onChange={(e) => setNotes(e.target.value)}
            />
            <div className="bk__counter">{notes.length} / {REQ_NOTE_MAX}</div>
          </div>
        </div>

        <div className="bk__cta">
          <Button variant="primary" size="lg" className="vl-btn--full" leadingIcon={I("send")} onClick={post}>
            Post to your block
          </Button>
        </div>
        <div className="bk__cancelwrap">
          <button className="quietlink" onClick={onBack}>Cancel</button>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { NewRequestScreen });
