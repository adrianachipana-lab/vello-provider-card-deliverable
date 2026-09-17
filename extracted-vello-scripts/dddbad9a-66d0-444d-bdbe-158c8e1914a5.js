/* Vello flow — messages tab: thread list + conversation with a working composer. */

function MessagesScreen({ openId, setOpenId, threads, onSend, onToast, onHome }) {
  const { useEffect, useRef } = React;
  const F = window.VelloFlow;
  const { I, AvatarVerified, EmptyState, AppBar, byId } = F;
  const { Avatar, Button, IconButton, Input, Badge } = window.VelloDesignSystem_182a1b;
  F.useIcons();

  const thread = threads.find(t => t.id === openId) || null;

  if (thread) return <Conversation thread={thread} onBack={() => setOpenId(null)} onSend={onSend} />;

  return (
    <React.Fragment>
      <div className="appbar" style={{ paddingTop: 2 }}>
        <span className="appbar__title appbar__title--lead">Messages</span>
      </div>
      <div className="scroll">
        {threads.length ? (
          <div className="msg__list">
            {threads.map(t => {
              const p = byId(t.who);
              const last = t.messages[t.messages.length - 1];
              return (
                <button key={t.id} className="msg__row" type="button" onClick={() => setOpenId(t.id)}>
                  <AvatarVerified n={p} size="md" />
                  <span className="msg__body">
                    <span className="msg__top">
                      <span className="msg__who">{p.name}</span>
                      <span className="msg__at">{t.at}</span>
                    </span>
                    <span className={"msg__snip" + (t.unread ? " msg__snip--unread" : "")}>
                      {last.from === "me" ? "You: " : ""}{last.text}
                    </span>
                  </span>
                  {t.unread > 0 && <span className="msg__unread">{t.unread}</span>}
                </button>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon="message-circle"
            title="No messages yet"
            text="Reach out to a neighbor and your conversation will live here."
            action={<Button variant="outline" size="sm" onClick={onHome}>Find help nearby</Button>}
          />
        )}
      </div>
    </React.Fragment>
  );
}

function Conversation({ thread, onBack, onSend }) {
  const { useState, useRef, useEffect } = React;
  const F = window.VelloFlow;
  const { I, AppBar, byId } = F;
  const { IconButton, Badge } = window.VelloDesignSystem_182a1b;
  const [draft, setDraft] = useState("");
  const endRef = useRef(null);
  const p = byId(thread.who);
  F.useIcons();

  useEffect(() => {
    const el = endRef.current;
    // Keep the newest message in view without scrollIntoView.
    if (el && el.parentElement) el.parentElement.scrollTop = el.parentElement.scrollHeight;
  }, [thread.messages.length]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    onSend(thread.id, text);
    setDraft("");
  };

  return (
    <React.Fragment>
      <AppBar
        title={p.name}
        onBack={onBack}
        action={<IconButton variant="ghost" label={`Call ${p.name}`}>{I("phone")}</IconButton>}
      />
      <div className="conv">
        <div className="conv__scroll">
          <div className="conv__day">Today</div>
          {thread.messages.map((m, i) => (
            <div key={i} className={"bub bub--" + (m.from === "me" ? "me" : "them")}>
              <div className="bub__text">{m.text}</div>
              <div className="bub__at">{m.at}</div>
            </div>
          ))}
          <div ref={endRef}></div>
        </div>
        <div className="conv__composer">
          <input
            className="conv__input" aria-label={`Message ${p.name}`} placeholder="Write a message…"
            value={draft} onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          />
          <IconButton variant="primary" label="Send" onClick={send} disabled={!draft.trim()}>{I("send")}</IconButton>
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { MessagesScreen, Conversation });
