
export default function RankingsUpdating() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          padding: "40px 24px",
          border: "1px solid var(--border-color, #303030)",
          borderRadius: "20px",
          background: "var(--card-background, #171717)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            margin: "0 auto 24px",
            width: "64px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "rgba(220, 38, 38, 0.12)",
            color: "#ef4444",
          }}
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 7v5h-5" />
            <path d="M4 17v-5h5" />
            <path d="M5.64 9A7 7 0 0 1 17.5 6.5L20 12" />
            <path d="M18.36 15A7 7 0 0 1 6.5 17.5L4 12" />
          </svg>
        </div>

        <h2
          style={{
            margin: "0 0 14px",
            fontSize: "26px",
            fontWeight: 800,
            letterSpacing: "0.02em",
            color: "var(--text-primary, #ffffff)",
          }}
        >
          Rankings Updating
        </h2>

        <p
          style={{
            margin: "0 0 24px",
            fontSize: "15px",
            lineHeight: 1.7,
            color: "var(--text-secondary, #a3a3a3)",
          }}
        >
          We're currently updating the rankings. Please check back soon!
        </p>

        <span
          style={{
            display: "inline-block",
            padding: "7px 13px",
            borderRadius: "999px",
            background: "rgba(234, 179, 8, 0.12)",
            border: "1px solid rgba(234, 179, 8, 0.3)",
            color: "#eab308",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          Temporarily unavailable
        </span>
      </div>
    </div>
  );
}
