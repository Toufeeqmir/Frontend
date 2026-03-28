import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="font-display text-7xl font-bold text-haat-gold/40">404</p>
      <h1 className="mt-2 font-display text-2xl font-semibold text-haat-deep">Page not found</h1>
      <p className="mt-2 text-haat-deep/70">The page you requested does not exist.</p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-xl bg-haat-deep px-8 py-3 font-semibold text-haat-cream hover:bg-haat-deep/90"
      >
        Back home
      </Link>
    </div>
  )
}
