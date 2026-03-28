import { Link, useSearchParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { vendors } from '../data/vendors'

const categories = ['All', 'Photographer', 'Makeup Artist', 'Catering']

export default function Vendors() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')

  const filtered = useMemo(() => {
    return vendors.filter((vendor) => {
      const categoryMatch = category === 'All' || vendor.category === category
      const priceMatch = !maxPrice || vendor.price <= Number(maxPrice)
      return categoryMatch && priceMatch
    })
  }, [category, maxPrice])

  const applyFilter = () => {
    const params = {}
    if (category && category !== 'All') params.category = category
    if (maxPrice) params.maxPrice = maxPrice
    setSearchParams(params)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-haat-deep">Vendor Listings</h1>
          <p className="mt-2 text-haat-deep/70">Browse suppliers and book the best in your budget.</p>
        </div>
        <Link
          to="/smart-match"
          className="rounded-lg bg-haat-gold px-4 py-2 font-semibold text-haat-deep transition hover:bg-haat-gold/90"
        >
          Try Smart Match
        </Link>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-haat-deep/20 px-4 py-2"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max price"
          className="rounded-xl border border-haat-deep/20 px-4 py-2"
        />
        <button
          onClick={applyFilter}
          className="rounded-xl bg-haat-deep px-5 py-2 text-white hover:bg-haat-deep/90"
        >
          Filter
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((vendor) => (
          <article key={vendor.id} className="rounded-2xl border border-haat-deep/10 bg-white shadow-soft">
            <img src={vendor.image} alt={vendor.name} className="h-44 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-xl font-semibold text-haat-deep">{vendor.name}</h2>
                <span className="rounded-full bg-haat-gold/20 px-3 py-1 text-sm font-semibold text-haat-deep">
                  {vendor.category}
                </span>
              </div>
              <p className="mt-2 text-sm text-haat-deep/70">{vendor.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold text-haat-deep">₹{vendor.price.toLocaleString()}</span>
                <span className="rounded-lg bg-haat-deep px-2 py-1 text-xs text-white">⭐ {vendor.rating}</span>
              </div>
              <Link
                to={`/vendors/${vendor.id}`}
                className="mt-4 inline-block w-full rounded-lg border border-haat-deep/30 px-4 py-2 text-center font-semibold text-haat-deep transition hover:bg-haat-deep/5"
              >
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 rounded-2xl border border-dashed border-haat-deep/20 bg-haat-blush/30 px-6 py-10 text-center text-haat-deep/70">
          No vendors found. Adjust your filters and try again.
        </p>
      )}
    </div>
  )
}
