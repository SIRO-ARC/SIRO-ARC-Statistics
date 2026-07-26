export default function PoweredBy() {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-8 pb-10 md:pt-6 md:pb-8">
      <div className="flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400/70" />

        <div className="flex items-center gap-2 whitespace-nowrap text-xs font-medium tracking-wide text-amber-400 sm:text-sm">
          <span className="text-xl">⚡</span>
          <span>Powered by SIRO • Server 1023</span>
        </div>

        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400/70" />
      </div>
    </section>
  );
}