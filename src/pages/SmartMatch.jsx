import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../utils/axiosInstance'

export default function SmartMatch() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [budget, setBudget] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!user || !user.token) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 text-center">
        <h1 className="text-3xl font-bold text-haat-deep mb-4">AI Smart Matching</h1>
        <p className="text-lg text-haat-deep/70 mb-8">Please login to use our smart matching feature</p>
        <Link
          to="/login"
          className="inline-flex items-center justify-center rounded-lg bg-haat-rose px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-haat-rose/90"
        >
          Login to Continue
        </Link>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const numericBudget = Number(budget)
    if (!numericBudget || numericBudget <= 0) {
      setError('Please enter a valid budget')
      return
    }

    try {
      setLoading(true)
      setError('')
      const response = await axiosInstance.post('/ai/smart-match', {
        budget: numericBudget,
        location: location || '',
        category: category || '',
      })
      setRecommendations(response.data.matches || [])
      setSubmitted(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get recommendations')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-haat-deep">AI Smart Matching</h1>
      <p className="mt-2 text-haat-deep/70">Get top vendor matches in seconds based on your needs.</p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-4">
        <input
          type="number"
          min="0"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Budget (₹)"
          className="rounded-xl border border-haat-deep/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-haat-gold"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (optional)"
          className="rounded-xl border border-haat-deep/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-haat-gold"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-haat-deep/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-haat-gold"
        >
          <option value="">All categories</option>
          <option value="Photographer">Photographer</option>
          <option value="Makeup Artist">Makeup Artist</option>
          <option value="Catering">Catering</option>
          <option value="Tent & Decor">Tent & Decor</option>
          <option value="Salon">Salon</option>
          <option value="Bride's Gifts">Bride's Gifts</option>
          <option value="Invitations">Invitations</option>
          <option value="Event Coordinator">Event Coordinator</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="col-span-full sm:col-span-1 rounded-xl bg-haat-deep px-5 py-2 font-semibold text-white hover:bg-haat-deep/90 transition disabled:opacity-50"
        >
          {loading ? 'Finding...' : 'Get recommendations'}
        </button>
      </form>

      {error && (
        <div className="mt-8 rounded-xl border border-red-300 bg-red-50 p-4 text-red-800">
          {error}
        </div>
      )}

      {submitted && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-haat-deep">Top Matches</h2>
            <p className="text-sm text-haat-deep/70">{recommendations.length} vendors found</p>
          </div>
          {recommendations.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-haat-deep/20 bg-haat-blush/30 px-6 py-10 text-center text-haat-deep/70">
              No matching vendors found. Try adjusting your criteria.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((vendor) => (
                <article key={vendor._id} className="rounded-2xl border border-haat-deep/10 bg-white p-6 shadow-soft hover:shadow-lg transition">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-haat-deep">{vendor.name}</h3>
                      <p className="text-sm text-haat-deep/70">{vendor.category}</p>
                    </div>
                    <span className="inline-block rounded-full bg-haat-gold/20 px-3 py-1 text-sm font-bold text-haat-deep">
                      {vendor.score}%
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-haat-deep/70 line-clamp-2">{vendor.description}</p>
                  <div className="mt-4 flex gap-2 text-xs text-haat-deep/60">
                    <span>📍 {vendor.location}</span>
                    <span>⭐ {vendor.rating || 4.5}</span>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-haat-deep">₹{vendor.price?.toLocaleString()}</p>
                  <Link
                    to={`/vendor/${vendor._id}`}
                    className="mt-4 inline-block w-full text-center rounded-lg bg-haat-deep px-4 py-2 font-semibold text-white transition hover:bg-haat-deep/90"
                  >
                    View Details
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
