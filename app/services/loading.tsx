export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg, #000)" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "rgba(0,255,245,0.3)", borderTopColor: "transparent" }} />
        <span className="text-sm text-gray-400 animate-pulse">Loading Services…</span>
      </div>
    </div>
  );
}
