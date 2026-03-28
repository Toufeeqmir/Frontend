import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../utils/axiosInstance'

export default function VendorDashboard() {
  const { user } = useContext(AuthContext)
  const [myVendors, setMyVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 })

  useEffect(() => {
    const fetchMyVendors = async () => {
      try {
        const res = await axiosInstance.get('/vendors/me')
        setMyVendors(res.data)
        setStats({
          total: res.data.length,
          pending: Math.floor(Math.random() * 5),
          completed: Math.floor(Math.random() * 10),
        })
      } catch (err) {
        console.error('Error fetching vendors:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMyVendors()
  }, [])

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-haat-deep">Vendor Dashboard</h1>
        <p className="mt-2 text-haat-deep/70">Welcome back, {user?.name}</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="rounded-2xl bg-gradient-to-br from-haat-rose/20 to-haat-gold/20 p-6">
          <p className="text-sm text-haat-deep/70">Total Listings</p>
          <p className="mt-2 text-4xl font-bold text-haat-rose">{stats.total}</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-haat-gold/20 to-haat-blush/20 p-6">
          <p className="text-sm text-haat-deep/70">Pending Bookings</p>
          <p className="mt-2 text-4xl font-bold text-haat-gold">{stats.pending}</p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-haat-blush/20 to-haat-rose/20 p-6">
          <p className="text-sm text-haat-deep/70">Completed</p>
          <p className="mt-2 text-4xl font-bold text-haat-deep">{stats.completed}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-8 flex flex-wrap gap-4">
        <Link
          to="/vendor/add-service"
          className="inline-flex items-center justify-center rounded-lg bg-haat-rose px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-haat-rose/90"
        >
          + Add New Service
        </Link>
        <Link
          to="/vendor/bookings"
          className="inline-flex items-center justify-center rounded-lg border-2 border-haat-deep bg-transparent px-6 py-3 text-lg font-semibold text-haat-deep transition hover:bg-haat-deep/5"
        >
          View Bookings
        </Link>
      </div>

      {/* My Listings */}
      <div className="rounded-2xl border border-haat-deep/10 bg-white p-6">
        <h2 className="text-2xl font-bold text-haat-deep mb-6">My Services</h2>
        {myVendors.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myVendors.map((vendor) => (
              <div
                key={vendor._id}
                className="rounded-2xl border border-haat-deep/10 bg-gradient-to-br from-haat-cream to-haat-blush/30 p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-haat-deep">{vendor.name}</h3>
                <p className="mt-2 text-sm text-haat-deep/70">{vendor.category}</p>
                <p className="mt-2 font-semibold text-haat-deep">₹{vendor.price.toLocaleString()}</p>
                <p className="mt-1 text-sm text-haat-deep/70">{vendor.location}</p>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded px-3 py-2 bg-haat-deep text-white text-sm font-medium hover:bg-haat-deep/90 transition">
                    Edit
                  </button>
                  <button className="flex-1 rounded px-3 py-2 bg-haat-rose/20 text-haat-rose text-sm font-medium hover:bg-haat-rose/30 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-haat-blush/20 p-8 text-center">
            <p className="text-haat-deep/70">No services listed yet</p>
            <Link
              to="/vendor/add-service"
              className="mt-4 inline-block text-haat-rose font-semibold hover:underline"
            >
              Add your first service
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
