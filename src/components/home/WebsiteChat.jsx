import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";

const MAX_NAME_LENGTH = 30;
const MAX_MESSAGE_LENGTH = 500;
const MESSAGE_LIMIT = 100;

export default function WebsiteChat() {
  const [name, setName] = useState(
    () => localStorage.getItem("siro-chat-name") || ""
  );
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
  loadMessages();
  checkAdmin();

  const channel = supabase
      .channel("website-chat")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
        },
        (payload) => {
          setMessages((current) => {
            if (current.some((item) => item.id === payload.new.id)) {
              return current;
            }

            return [...current, payload.new].slice(-MESSAGE_LIMIT);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);


  async function checkAdmin() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  setIsAdmin(
    session?.user?.app_metadata?.role === "admin"
  );
}
  async function loadMessages() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("chat_messages")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: true })
      .limit(MESSAGE_LIMIT);

    if (error) {
      setError("Unable to load chat messages.");
      console.error(error);
    } else {
      setMessages(data || []);
    }

    setLoading(false);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function saveName() {
    const cleanName = name.trim();

    if (!cleanName) {
      setError("Please enter a name.");
      return;
    }

    if (cleanName.length > MAX_NAME_LENGTH) {
      setError(`Name must be ${MAX_NAME_LENGTH} characters or less.`);
      return;
    }

    localStorage.setItem("siro-chat-name", cleanName);
    setName(cleanName);
    setError("");
  }
  async function deleteMessage(id) {
  if (!isAdmin) {
    return;
  }

  const { error } = await supabase
    .from("chat_messages")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    setError("Unable to delete message.");
    return;
  }

  setMessages((current) =>
    current.filter((item) => item.id !== id)
  );
}
  async function sendMessage(event) {
    event.preventDefault();

    const cleanName = isAdmin ? "ADMIN - S I R O ツ" : name.trim();
    const cleanMessage = message.trim();

    setError("");

    if (!cleanName) {
      setError("Please enter a name first.");
      return;
    }

    if (!cleanMessage) {
      return;
    }

    if (cleanName.length > MAX_NAME_LENGTH) {
      setError(`Name must be ${MAX_NAME_LENGTH} characters or less.`);
      return;
    }

    if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
      setError(
        `Message must be ${MAX_MESSAGE_LENGTH} characters or less.`
      );
      return;
    }

    setSending(true);

    const { error } = await supabase.from("chat_messages").insert({
      name: cleanName,
      message: cleanMessage,
    });

    if (error) {
      console.error(error);
      setError(
        error.message.includes("reserved")
          ? "This name is reserved."
          : "Unable to send message."
      );
    } else {
      localStorage.setItem("siro-chat-name", cleanName);
      setMessage("");
    }

    setSending(false);
  }

  return (
    <section className="min-h-0 w-full">
  <div className="flex min-h-0 h-full w-full flex-col rounded-3xl border border-sky-400/30 bg-slate-900/60 p-6 shadow-[0_0_25px_rgba(56,189,248,0.15)] sm:p-8 lg:h-full">

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            Website Chat
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            Live connect
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Chat with other visitors and the SIRO STATS community.
          </p>
        </div>

        <div className="mt-6 min-h-0 flex-1 grid min-w-0 grid-rows-[minmax(0,1fr)_auto] overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-950/40">

          <div className="h-[13cm] shrink-0 overflow-y-auto p-4">
            {loading ? (
              <p className="text-center text-sm text-slate-500">
                Loading chat...
              </p>
            ) : messages.length === 0 ? (
              <p className="text-center text-sm text-slate-500">
                No messages yet. Be the first to say hello!
              </p>
            ) : (
              <div className="space-y-3">
                {messages.map((item) => (
                  <div key={item.id}>
  <div className="flex items-start justify-between gap-3">

    <div className="flex min-w-0 items-baseline gap-2">
      <span
  className={
    item.name === "ADMIN - S I R O ツ"
      ? "font-semibold text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]"
      : "font-semibold text-sky-400"
  }
>
  {item.name}
</span>

      <span className="text-[11px] text-slate-600">
        {new Date(item.created_at).toLocaleString()}
      </span>
    </div>

    {isAdmin && (
      <button
        type="button"
        onClick={() => deleteMessage(item.id)}
        className="shrink-0 text-xs text-red-400 transition hover:text-red-300"
      >
        Delete
      </button>
    )}

  </div>

  <p className="mt-1 break-words text-sm text-slate-300">
    {item.message}
  </p>
</div>
                ))}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <form
            onSubmit={sendMessage}
            className="border-t border-slate-700/70 p-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

              {isAdmin ? (
  <div className="flex items-center rounded-xl border border-red-500/40 bg-slate-900/80 px-4 py-3 text-sm font-bold text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.35)]">
    ADMIN - S I R O ツ
  </div>
) : (
  <input
    value={name}
    onChange={handleNameChange}
    onBlur={saveName}
    maxLength={MAX_NAME_LENGTH}
    placeholder="Your name"
    className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400"
  />
)}

              <textarea
  value={message}
  onChange={(event) => setMessage(event.target.value)}
  maxLength={MAX_MESSAGE_LENGTH}
  placeholder="Write a message..."
  rows={1}
  className="min-w-0 flex-1 resize-none rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400 lg:min-h-24"
/>

              <button
                type="submit"
                disabled={sending}
                className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50 lg:w-full"
              >
                {sending ? "Sending..." : "Send"}
              </button>

            </div>

            {error && (
              <p className="mt-3 text-sm text-red-400">
                {error}
              </p>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}