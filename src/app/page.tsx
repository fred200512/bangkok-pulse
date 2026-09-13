const cityStats = [
  { value: "31°C", label: "Weather" },
  { value: "42", label: "Air quality" },
  { value: "18 min", label: "Next stop" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080b0c] text-[#f4f1e8]">
      {/* Background lighting */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(198,255,61,0.13), transparent 30%), radial-gradient(circle at 85% 15%, rgba(255,90,54,0.15), transparent 28%), radial-gradient(circle at 70% 85%, rgba(64,140,255,0.12), transparent 30%)",
        }}
      />

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 lg:px-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between border-b border-white/10 py-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#c6ff3d] text-sm font-black text-black">
              BP
            </div>

            <div>
              <p className="font-semibold tracking-tight">Bangkok Pulse</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
                City intelligence
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
            <a className="transition hover:text-white" href="#explore">
              Explore
            </a>
            <a className="transition hover:text-white" href="#planner">
              Smart Planner
            </a>
            <a className="transition hover:text-white" href="#saved">
              Saved
            </a>
          </div>

          <button className="rounded-full border border-white/15 px-5 py-2.5 text-sm transition hover:border-[#c6ff3d] hover:text-[#c6ff3d]">
            Sign in
          </button>
        </nav>

        {/* Hero */}
        <section className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#c6ff3d]/25 bg-[#c6ff3d]/8 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[#c6ff3d]">
              <span className="size-2 animate-pulse rounded-full bg-[#c6ff3d]" />
              Bangkok is live
            </div>

            <h1 className="max-w-4xl text-6xl font-semibold leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-[96px]">
              The city,
              <span className="block text-[#c6ff3d]">decoded.</span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-white/55">
              Discover where to go, how to get there, and what Bangkok feels
              like right now—all through one intelligent city dashboard.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button className="group flex items-center justify-center gap-3 rounded-full bg-[#f4f1e8] px-7 py-4 font-semibold text-black transition hover:bg-[#c6ff3d]">
                Explore Bangkok
                <span className="transition group-hover:translate-x-1">→</span>
              </button>

              <button className="rounded-full border border-white/15 px-7 py-4 font-semibold transition hover:border-white/40">
                Build my route
              </button>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rotate-3 rounded-[36px] border border-[#ff5a36]/25 bg-[#ff5a36]/5" />

            <div className="relative rounded-[32px] border border-white/15 bg-black/55 p-5 shadow-2xl backdrop-blur-2xl">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/35">
                    Smart route
                  </p>
                  <h2 className="mt-1 text-xl font-semibold">
                    Your Bangkok evening
                  </h2>
                </div>

                <div className="rounded-full bg-[#ff5a36] px-3 py-1.5 font-mono text-xs font-bold text-black">
                  LIVE
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111617] p-6">
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 70% 20%, rgba(198,255,61,0.24), transparent 28%)",
                  }}
                />

                <div className="relative space-y-7">
                  {[
                    ["01", "Punnawithi", "Start here"],
                    ["02", "BACC", "Art & culture"],
                    ["03", "Benjakitti Park", "Sunset at 18:24"],
                  ].map(([number, place, detail]) => (
                    <div className="flex items-center gap-4" key={number}>
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#c6ff3d]/40 bg-[#c6ff3d]/10 font-mono text-xs text-[#c6ff3d]">
                        {number}
                      </div>

                      <div className="flex-1 border-b border-white/10 pb-4">
                        <p className="font-medium">{place}</p>
                        <p className="mt-1 text-sm text-white/40">{detail}</p>
                      </div>

                      <span className="text-white/25">↗</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {cityStats.map((stat) => (
                  <div
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    key={stat.label}
                  >
                    <p className="font-mono text-lg text-[#c6ff3d]">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-white/35">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="flex items-center justify-between border-t border-white/10 py-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
          <span>Bangkok · Thailand</span>
          <span>Move smarter · Live better</span>
        </footer>
      </div>
    </main>
  );
}