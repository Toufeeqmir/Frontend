import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-haat-deep/10 bg-haat-blush/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-haat-deep/70">
          © {year} ShaadiHaat Lite. Demo UI — not a live matrimonial service.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link to="/browse" className="font-medium text-haat-rose hover:underline">
            Browse profiles
          </Link>
        </div>
      </div>
    </footer>
  )
}
