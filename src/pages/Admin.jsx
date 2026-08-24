import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user?.app_metadata?.role === "admin") {
  setIsAdmin(true);
  setChecking(false);
  return;
}

  setChecking(false);
}
async function logout() {
  await supabase.auth.signOut();
  navigate("/");
}
  async function handleLogin(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    if (data.user?.app_metadata?.role !== "admin") {
      await supabase.auth.signOut();
      setError("This account does not have administrator access.");
      setLoading(false);
      return;
    }

    navigate("/");
  }

  if (checking) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center text-slate-400">
        Checking access...
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-3xl border border-sky-400/30 bg-slate-900/60 p-6 shadow-[0_0_25px_rgba(56,189,248,0.15)] sm:p-8">

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
            SIRO STATS
          </p>

          <h1 className="mt-2 text-2xl font-bold text-white">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Restricted access
          </p>
          {isAdmin && (
  <button
    type="button"
    onClick={logout}
    className="mt-6 w-full rounded-xl border border-red-500/40 bg-red-500/10 px-5 py-3 font-semibold text-red-400 transition hover:border-red-400 hover:bg-red-500/20 hover:text-red-300"
  >
    Log out
  </button>
)}
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400"
              placeholder="Admin email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400"
              placeholder="Password"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-400/20 bg-red-950/20 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

      </div>
    </div>
  );
}