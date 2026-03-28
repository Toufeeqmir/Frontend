import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Home() {
  const { user } = useContext(AuthContext)
  
  return (
    <main>
      <section className="relative overflow-hidden bg-haat-cream">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80"
            alt="Wedding celebration"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-haat-cream/95 to-haat-blush/95" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32">
          <div className="text-center">
            <span className="inline-block rounded-full bg-haat-rose/20 px-4 py-2 text-sm font-semibold text-haat-rose">
              ✨ Your Perfect Wedding Awaits
            </span>

            <h1 className="mt-6 text-5xl font-bold text-haat-deep sm:text-6xl md:text-7xl">
              Shaadi<span className="text-haat-rose">Haat</span>
            </h1>

            <p className="mt-4 text-xl font-semibold text-haat-deep sm:text-2xl">
              Where Dreams Meet Reality
            </p>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-haat-deep/80 leading-relaxed">
              AI-powered platform to connect with the perfect wedding vendors. From photographers to event coordinators, find, compare,
              and book trusted professionals for your special day.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/vendors"
                className="inline-flex items-center justify-center rounded-lg bg-haat-rose px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-haat-rose/90"
              >
                Explore Vendors
              </Link>
              {user && user.token ? (
                <Link
                  to="/smart-match"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-haat-deep bg-transparent px-8 py-4 text-lg font-semibold text-haat-deep transition hover:bg-haat-deep/5"
                >
                  Get Smart Matches
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-haat-deep bg-transparent px-8 py-4 text-lg font-semibold text-haat-deep transition hover:bg-haat-deep/5"
                >
                  Login for Smart Matches
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="rounded-2xl bg-gradient-to-br from-haat-rose/10 to-haat-gold/10 p-8 text-center">
            <div className="text-4xl">💎</div>
            <h3 className="mt-4 text-xl font-bold text-haat-deep">Vetted Vendors</h3>
            <p className="mt-2 text-haat-deep/70">Curated selection of trusted wedding professionals</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-haat-blush/20 to-haat-cream/20 p-8 text-center">
            <div className="text-4xl">🤖</div>
            <h3 className="mt-4 text-xl font-bold text-haat-deep">Smart Matching</h3>
            <p className="mt-2 text-haat-deep/70">AI-powered recommendations based on your budget</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-haat-gold/10 to-haat-rose/10 p-8 text-center">
            <div className="text-4xl">📊</div>
            <h3 className="mt-4 text-xl font-bold text-haat-deep">Budget Planner</h3>
            <p className="mt-2 text-haat-deep/70">Smart allocation of your wedding budget</p>
          </div>
        </div>
      </section>
    </main>
  )
}
