import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../utils/axiosInstance'

export default function VendorBookings() {
  const { user } = useContext(AuthContext)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosInstance.get('/booking')
        setBookings(res.data || [])
      } catch (err) {
        console.error('Error fetching bookings:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true
    return booking.status === filter
  })

  if (loading) return <div className="text-center py-12">Loading bookings...</div>

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-haat-deep mb-8">My Bookings</h1>

      {/* Filter */}
      <div className="mb-8 flex gap-2">
        {['all', 'pending', 'confirmed', 'completed'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === status
                ? 'bg-haat-rose text-white'
                : 'bg-haat-blush/20 text-haat-deep hover:bg-haat-blush/40'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map(booking => (
            <div
              key={booking._id}
              className="rounded-2xl border border-haat-deep/10 bg-white p-6 hover:shadow-lg transition"
            >
              <div className="grid gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-sm text-haat-deep/70">Customer</p>
                  <p className="font-semibold text-haat-deep">{booking.customerName || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-haat-deep/70">Date</p>
                  <p className="font-semibold text-haat-deep">
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-haat-deep/70">Package</p>
                  <p className="font-semibold text-haat-deep">{booking.package || 'Standard'}</p>
                </div>
                <div className="flex items-end">
                  <button className="w-full rounded-lg bg-haat-rose px-4 py-2 text-white font-semibold hover:bg-haat-rose/90 transition">
                    Accept
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-haat-deep/20 bg-haat-cream/20 p-12 text-center">
          <p className="text-lg text-haat-deep/70">No bookings yet</p>
        </div>
      )}
    </main>
  )
}
