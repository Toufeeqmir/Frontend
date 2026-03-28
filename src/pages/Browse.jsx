import { useMemo, useState } from 'react'
import ProfileCard from '../components/ProfileCard'
import { profiles } from '../data/profiles'

export default function Browse() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return profiles
    return profiles.filter((p) => {
      const blob = [p.name, p.city, p.profession, p.community, p.education].join(' ').toLowerCase()
      return blob.includes(q)
    })
  }, [query])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-haat-deep sm:text-4xl">Browse profiles</h1>
        <p className="mt-2 text-haat-deep/70">
          Search by name, city, profession, community, or education. All data is static for this demo.
        </p>
      </div>
      <div className="mt-8">
        <label htmlFor="browse-search" className="sr-only">
          Search profiles
        </label>
        <input
          id="browse-search"
          type="search"
          placeholder="Search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md rounded-xl border border-haat-deep/15 bg-white px-4 py-3 text-haat-deep shadow-soft placeholder:text-haat-deep/40 focus:border-haat-gold/60 focus:outline-none focus:ring-2 focus:ring-haat-gold/30"
        />
      </div>
      <p className="mt-4 text-sm text-haat-deep/55" aria-live="polite">
        Showing {filtered.length} of {profiles.length} profiles
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProfileCard key={p.id} profile={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-12 rounded-2xl border border-dashed border-haat-deep/20 bg-haat-blush/30 px-6 py-10 text-center text-haat-deep/70">
          No matches. Try a different keyword.
        </p>
      )}
    </div>
  )
}
