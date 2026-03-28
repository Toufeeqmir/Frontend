import { Link } from 'react-router-dom'
import { vendors } from '../data/vendors'

const categories = [
  { name: 'Photographer', icon: '📷' },
  { name: 'Makeup Artist', icon: '💄' },
  { name: 'Catering', icon: '🍽️' },
]

export default function Home() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-haat-deep/10 bg-gradient-to-b from-haat-blush/60 to-haat-cream px-4 py-14 sm:px-6 sm:py-24">
        <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-haat-gold/20 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-display text-sm uppercase tracking-widest text-haat-gold">ShaadiHaat Lite</p>
          <h1 className="mt-2 text-4xl font-bold text-haat-deep sm:text-5xl lg:text-6xl">
            AI-Powered Wedding Planner
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-haat-deep/80">
            Discover trusted vendors, compare packages, and book instantly with smart matching and budget planning.
          </p>
          <Link
            to="/vendors"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-haat-deep px-8 py-4 text-lg font-semibold text-haat-cream shadow-lg transition hover:bg-haat-deep/90"
          >
            Explore Vendors
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-haat-deep">Top Categories</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-haat-deep/70">
          Start with what you need most for your wedding day.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {categories.map((cat) => (
            <article
              key={cat.name}
              className="rounded-2xl border border-haat-deep/10 bg-white p-6 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl">{cat.icon}</div>
              <h3 className="mt-3 text-xl font-semibold text-haat-deep">{cat.name}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex items-center justify-between border-b border-haat-deep/10 pb-4">
          <h2 className="font-display text-3xl font-bold text-haat-deep">Featured Vendors</h2>
          <Link to="/vendors" className="text-haat-rose font-semibold hover:underline">
            View all vendors
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.slice(0, 3).map((vendor) => (
            <Link
              key={vendor.id}
              to={`/vendors/${vendor.id}`}
              className="group overflow-hidden rounded-2xl border border-haat-deep/10 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img src={vendor.image} alt={vendor.name} className="h-48 w-full object-cover transition duration-300 group-hover:scale-105" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-haat-deep">{vendor.name}</h3>
                <p className="mt-1 text-sm text-haat-deep/70">{vendor.category}</p>
                <p className="mt-1 font-semibold text-haat-deep">₹{vendor.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
