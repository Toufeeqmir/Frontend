import { useMemo, useState } from 'react'
import { vendors } from '../data/vendors'

const score = (vendor, budget, category, location) => {
  let s = 0
  if (vendor.price <= budget) s += 40
  if (!category || vendor.category === category) s += 30
  if (!location || vendor.location.toLowerCase().includes(location.toLowerCase())) s += 30
  return Math.min(100, s + Math.round((100 - vendor.price / (budget || 1)) * 0.2))
}

export default function SmartMatch() {
  const [budget, setBudget] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const numericBudget = Number(budget) || 0

  const recommendations = useMemo(() => {
    if (!submitted || !numericBudget) return []
    return vendors
      .map((vendor) => ({ vendor, score: score(vendor, numericBudget, category, location) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
  }, [submitted, numericBudget, category, location])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!numericBudget) return
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-haat-deep">AI Smart Matching</h1>
      <p className="mt-2 text-haat-deep/70">Get top vendor matches in seconds based on your needs.</p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-3">
        <input
          type="number"
          min="0"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Budget (₹)"
          className="rounded-xl border border-haat-deep/20 px-4 py-2"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (optional)"
          className="rounded-xl border border-haat-deep/20 px-4 py-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-haat-deep/20 px-4 py-2"
        >
          <option value="">All categories</option>
          <option value="Photographer">Photographer</option>
          <option value="Makeup Artist">Makeup Artist</option>
          <option value="Catering">Catering</option>
        </select>
        <button
          type="submit"
          className="col-span-full rounded-xl bg-haat-deep px-5 py-3 font-semibold text-white hover:bg-haat-deep/90"
        >
          Get recommendations
        </button>
      </form>

      {submitted && (
        <div className="mt-8 space-y-4">
          {recommendations.length === 0 ? (
            <p className="rounded-2xl border border-haat-deep/10 bg-haat-blush/30 p-4 text-haat-deep/70">No suitable matches found. Try loosening the filters.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommendations.map(({ vendor, score }, index) => (
                <article key={vendor.id} className="rounded-2xl border border-haat-deep/10 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-haat-deep">{vendor.name}</h2>
                    {index === 0 && <span className="rounded-lg bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">Recommended ⭐</span>}
                  </div>
                  <p className="mt-2 text-sm text-haat-deep/70">{vendor.category} · {vendor.location}</p>
                  <p className="mt-1 text-sm font-semibold text-haat-deep">₹{vendor.price.toLocaleString()}</p>
                  <p className="mt-1 text-sm text-haat-deep/70">Rating: ⭐ {vendor.rating}</p>
                  <p className="mt-1 text-sm font-bold text-haat-deep">Match Score: {score}%</p>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
