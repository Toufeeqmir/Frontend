import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const linkClass = ({ isActive }) =>
  [
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-haat-deep text-white'
      : 'text-haat-deep/80 hover:bg-haat-blush/60 hover:text-haat-deep',
  ].join(' ')

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 border-b border-haat-deep/10 bg-haat-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink to="/" className="group flex items-center gap-2">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-haat-deep text-lg font-semibold text-haat-cream shadow-soft"
            aria-hidden
          >
            SH
          </span>
        </NavLink>
        <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2" aria-label="Main">
          {user && user.token && user.role === 'customer' && (
            <>
              <NavLink to="/" end className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/vendors" className={linkClass}>
                Vendors
              </NavLink>
              <NavLink to="/budget-planner" className={linkClass}>
                Budget
              </NavLink>
              <NavLink to="/smart-match" className={linkClass}>
                Smart Match
              </NavLink>
            </>
          )}
          
          {user && user.token && user.role === 'vendor' && (
            <>
              <NavLink to="/" end className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/vendor/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/vendor/add-service" className={linkClass}>
                Add Service
              </NavLink>
              <NavLink to="/vendor/bookings" className={linkClass}>
                Bookings
              </NavLink>
            </>
          )}

          {user && user.token ? (
            <>
              <span className="text-sm text-haat-deep/70 px-3">
                {user.email}
                <span className="ml-2 text-xs bg-haat-rose/20 text-haat-rose px-2 py-1 rounded">
                  {user.role === 'vendor' ? '🏪 Vendor' : '👤 Customer'}
                </span>
              </span>
              <button
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white bg-haat-rose hover:bg-haat-rose/90 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
