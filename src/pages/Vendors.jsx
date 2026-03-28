import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import axiosInstance from '../utils/axiosInstance'

export default function Vendors() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [vendors, setVendors] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [loading, setLoading] = useState(true)
  const [showLoading, setShowLoading] = useState(true)
  const [error, setError] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const loadingTimeoutRef = useRef(null)

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    fetchVendors()
  }, [category])

  const loadCategories = async () => {
    try {
      const response = await axiosInstance.get('/vendors')
      const uniqueCategories = ['All', ...new Set(response.data.map(v => v.category))]
      setCategories(uniqueCategories)
    } catch (err) {
      console.error('Error loading categories:', err)
      setCategories(['All', 'Photographer', 'Makeup Artist', 'Catering', 'Tent & Decor', 'Salon', "Bride's Gifts", 'Invitations', 'Event Coordinator'])
    }
  }

  const fetchVendors = async () => {
    try {
      setLoading(true)
      
      const params = {}
      if (category !== 'All') {
        params.category = category
      }
      const response = await axiosInstance.get('/vendors', { params })
      setVendors(response.data)
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load vendors')
      console.error(err)
    } finally {
      clearTimeout(loadingTimeoutRef.current)
      setLoading(false)
      setShowLoading(false)
    }
  }

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory)
    const params = {}
    if (newCategory !== 'All') params.category = newCategory
    setSearchParams(params)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-haat-deep">Vendor Listings</h1>
          <p className="mt-2 text-haat-deep/70">Browse suppliers and book the best for your wedding.</p>
        </div>
      </div>

      <div className="mb-8 flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            disabled={loading}
            className={`rounded-xl px-4 py-2 transition ${
              category === cat
                ? 'bg-haat-deep text-white'
                : 'bg-haat-deep/10 text-haat-deep hover:bg-haat-deep/20'
            } ${loading ? 'opacity-60 cursor-wait' : 'cursor-pointer'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-800 mb-8">
          {error}
        </div>
      )}

      <div className="min-h-96 transition-opacity duration-300" style={{opacity: loading ? 0.5 : 1}}>
        {showLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-haat-deep/10">
              <svg className="h-6 w-6 animate-spin text-haat-deep" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p className="text-haat-deep/70 font-medium">Loading vendors...</p>
          </div>
        ) : vendors.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-haat-deep/20 bg-haat-blush/30 px-6 py-10 text-center text-haat-deep/70">
            No vendors found matching your criteria.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vendors.map((vendor) => (
            <article key={vendor._id} className="rounded-2xl border border-haat-deep/10 bg-white shadow-soft overflow-hidden hover:shadow-lg transition">
              <div className="h-44 w-full bg-gradient-to-br from-haat-gold/20 to-haat-rose/20 overflow-hidden">
                {vendor.images && vendor.images[0] ? (
                  <img 
                    src={vendor.images[0]} 
                    alt={vendor.name} 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80'
                    }}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-4xl">📸</div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-xl font-semibold text-haat-deep">{vendor.name}</h2>
                  <span className="rounded-full bg-haat-gold/20 px-3 py-1 text-sm font-semibold text-haat-deep">
                    {vendor.category}
                  </span>
                </div>
                <p className="mt-2 text-sm text-haat-deep/70 line-clamp-2">{vendor.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-haat-deep/10 px-2 py-1 text-xs text-haat-deep">
                    ⭐ {vendor.rating || 4.5}
                  </span>
                  <span className="rounded-lg bg-haat-deep/10 px-2 py-1 text-xs text-haat-deep">
                    ₹{vendor.price?.toLocaleString() || 'N/A'}
                  </span>
                  <span className="rounded-lg bg-haat-deep/10 px-2 py-1 text-xs text-haat-deep">
                    📍 {vendor.location}
                  </span>
                </div>
                <Link
                  to={`/vendor/${vendor._id}`}
                  className="mt-4 inline-block w-full text-center rounded-lg bg-haat-deep px-4 py-2 font-semibold text-white transition hover:bg-haat-deep/90"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
          </div>
        )}
      </div>
    </div>
  )
}
