import { useState } from 'react'
import axiosInstance from '../utils/axiosInstance'

const colorMap = {
  'Venue': 'bg-sky-100 text-sky-800',
  'Catering': 'bg-rose-100 text-rose-800',
  'Photography': 'bg-violet-100 text-violet-800',
  'Makeup': 'bg-amber-100 text-amber-800',
  'Misc': 'bg-lime-100 text-lime-800',
}

export default function BudgetPlanner() {
  const [budget, setBudget] = useState('')
  const [guests, setGuests] = useState('')
  const [location, setLocation] = useState('')
  const [breakdown, setBreakdown] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    const total = Number(budget)
    if (!total || total <= 0) {
      setError('Please enter a valid budget')
      return
    }

    try {
      setLoading(true)
      setError('')
      const response = await axiosInstance.post('/ai/budget-plan', {
        budget: total,
      })
      setBreakdown(response.data)
      setSubmitted(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to calculate budget')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-haat-deep">AI Budget Planner</h1>
      <p className="mt-2 text-haat-deep/70">Calculate a smart wedding budget allocation with instant results.</p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-haat-deep">Total Budget *</span>
          <input
            type="number"
            min="0"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-1 w-full rounded-xl border border-haat-deep/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-haat-gold"
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
            className="mt-1 w-full rounded-xl border border-haat-deep/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-haat-gold"
            placeholder="Guests"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-haat-deep">Location (optional)</span>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full rounded-xl border border-haat-deep/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-haat-gold"
            placeholder="City"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="col-span-full rounded-xl bg-haat-deep px-5 py-3 font-semibold text-white hover:bg-haat-deep/80 transition disabled:opacity-50"
        >
          {loading ? 'Calculating...' : 'Show budget breakdown'}
        </button>
      </form>

      {error && (
        <div className="mt-8 rounded-xl border border-red-300 bg-red-50 p-4 text-red-800">
          {error}
        </div>
      )}

      {submitted && breakdown && (
        <div className="mt-10 rounded-2xl border border-haat-deep/10 bg-white p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-haat-deep">Budget allocation</h2>
            <span className="text-sm font-medium text-haat-deep/70">Total: ₹{breakdown.budget?.toLocaleString()}</span>
          </div>
          {location || guests ? (
            <p className="text-sm text-haat-deep/70">{guests ? `${guests} guests` : ''}{location ? ` · location: ${location}` : ''}</p>
          ) : null}

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {breakdown.breakdown && breakdown.breakdown.map((item) => (
              <article key={item.label} className="rounded-xl border border-haat-deep/10 p-4">
                <div className={`${colorMap[item.label] || 'bg-gray-100 text-gray-800'} inline-flex rounded-full px-3 py-1 text-xs font-bold`}>
                  {item.label}
                </div>
                <p className="mt-2 text-2xl font-semibold text-haat-deep">₹{item.value?.toLocaleString()}</p>
                <p className="text-sm text-haat-deep/70">{item.percent}%</p>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
