import { useMemo, useState } from 'react'

export default function BudgetPlanner() {
  const [budget, setBudget] = useState('')
  const [guests, setGuests] = useState('')
  const [location, setLocation] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const total = Number(budget) || 0

  const breakdown = useMemo(() => {
    if (!total) return null
    return [
      { label: 'Venue', value: Math.round(total * 0.4), percent: 40, color: 'bg-sky-100 text-sky-800' },
      { label: 'Catering', value: Math.round(total * 0.3), percent: 30, color: 'bg-rose-100 text-rose-800' },
      { label: 'Photography', value: Math.round(total * 0.15), percent: 15, color: 'bg-violet-100 text-violet-800' },
      { label: 'Makeup', value: Math.round(total * 0.1), percent: 10, color: 'bg-amber-100 text-amber-800' },
      { label: 'Misc', value: Math.round(total * 0.05), percent: 5, color: 'bg-lime-100 text-lime-800' },
    ]
  }, [total])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!total) return
    setSubmitted(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-haat-deep">AI Budget Planner</h1>
      <p className="mt-2 text-haat-deep/70">Calculate a smart wedding budget allocation with instant results.</p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-haat-deep">Total Budget</span>
          <input
            type="number"
            min="0"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-1 w-full rounded-xl border border-haat-deep/20 px-3 py-2"
            placeholder="₹ amount"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-haat-deep">Guests Count (optional)</span>
          <input
            type="number"
            min="0"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="mt-1 w-full rounded-xl border border-haat-deep/20 px-3 py-2"
            placeholder="Guests"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-haat-deep">Location (optional)</span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full rounded-xl border border-haat-deep/20 px-3 py-2"
            placeholder="City"
          />
        </label>

        <button
          type="submit"
          className="col-span-full rounded-xl bg-haat-deep px-5 py-3 font-semibold text-white hover:bg-haat-deep/80"
        >
          Show budget breakdown
        </button>
      </form>

      {submitted && breakdown && (
        <div className="mt-10 rounded-2xl border border-haat-deep/10 bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-haat-deep">Budget allocation</h2>
            <span className="text-sm font-medium text-haat-deep/70">Total: ₹{total.toLocaleString()}</span>
          </div>
          {location || guests ? (
            <p className="text-sm text-haat-deep/70">{guests ? `${guests} guests` : ''}{location ? ` · location: ${location}` : ''}</p>
          ) : null}

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {breakdown.map((item) => (
              <article key={item.label} className="rounded-xl border border-haat-deep/10 p-4">
                <div className={`${item.color} inline-flex rounded-full px-3 py-1 text-xs font-bold`}>{item.label}</div>
                <p className="mt-2 text-2xl font-semibold text-haat-deep">₹{item.value.toLocaleString()}</p>
                <p className="text-sm text-haat-deep/70">{item.percent}%</p>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
