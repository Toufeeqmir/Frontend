import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-haat-deep/10 bg-gradient-to-b from-haat-blush/50 to-haat-cream px-4 py-16 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-haat-gold/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-haat-rose/10 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-haat-gold">
          Welcome
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-haat-deep sm:text-5xl md:text-6xl">
          Connections rooted in respect
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-haat-deep/75">
          ShaadiHaat Lite helps you explore thoughtfully curated demo profiles — a gentle starting point
          for conversations that matter.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            to="/browse"
            className="inline-flex min-w-[200px] items-center justify-center rounded-xl bg-haat-deep px-8 py-3.5 text-base font-semibold text-haat-cream shadow-soft transition hover:bg-haat-deep/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-haat-gold focus-visible:ring-offset-2"
          >
            Browse profiles
          </Link>
          <Link
            to="/about"
            className="inline-flex min-w-[200px] items-center justify-center rounded-xl border-2 border-haat-deep/20 bg-white/80 px-8 py-3.5 text-base font-semibold text-haat-deep transition hover:border-haat-gold/50 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-haat-gold focus-visible:ring-offset-2"
          >
            How it works
          </Link>
        </div>
      </div>
    </section>
  )
}
