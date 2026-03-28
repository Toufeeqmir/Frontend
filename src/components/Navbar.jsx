import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  [
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-haat-deep text-white'
      : 'text-haat-deep/80 hover:bg-haat-blush/60 hover:text-haat-deep',
  ].join(' ')

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-haat-deep/10 bg-haat-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="group flex items-center gap-2">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-haat-deep text-lg font-semibold text-haat-cream shadow-soft"
            aria-hidden
          >
            श
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-haat-deep sm:text-2xl">
            ShaadiHaat <span className="text-haat-gold">Lite</span>
          </span>
        </NavLink>
        <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2" aria-label="Main">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/browse" className={linkClass}>
            Browse
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
