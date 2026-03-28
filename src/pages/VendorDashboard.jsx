import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../utils/axiosInstance'

export default function VendorDashboard() {
  const { user } = useContext(AuthContext)
  const [myVendors, setMyVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)

  useEffect(() => {
    const fetchMyVendors = async () => {
      try {
        const res = await axiosInstance.get('/vendors/me')
        setMyVendors(res.data)
      } catch (err) {
        console.error('Error fetching vendors:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMyVendors()
  }, [])

  const handleDelete = async (vendorId) => {
    try {
      setDeleteLoading(vendorId)
      await axiosInstance.delete(`/vendors/${vendorId}`)
      setMyVendors(myVendors.filter(v => v._id !== vendorId))
      setShowDeleteConfirm(null)
    } catch (err) {
      console.error('Error deleting vendor:', err)
      alert(err.response?.data?.message || 'Failed to delete service')
    } finally {
      setDeleteLoading(null)
    }
  }

  if (loading) return <div className="text-center py-12"><p className="text-haat-deep/70">Loading...</p></div>

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-haat-deep">Vendor Dashboard</h1>
        <p className="mt-2 text-haat-deep/70">Welcome back, {user?.name}</p>
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
                
                {vendor.packages && vendor.packages.length > 0 && (
                  <div className="mt-3 p-2 bg-white/50 rounded text-xs">
                    <p className="font-semibold text-haat-deep/70">{vendor.packages.length} package(s)</p>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setShowDeleteConfirm(vendor._id)}
                    className="flex-1 rounded px-3 py-2 bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition disabled:opacity-50"
                    disabled={deleteLoading === vendor._id}
                  >
                    {deleteLoading === vendor._id ? 'Deleting...' : 'Delete'}
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="rounded-2xl bg-white p-8 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-haat-deep mb-4">Delete Service?</h2>
            <p className="text-haat-deep/70 mb-6">
              Are you sure you want to delete this service? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 rounded-lg bg-haat-deep/10 px-4 py-2 font-semibold text-haat-deep hover:bg-haat-deep/20 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                disabled={deleteLoading === showDeleteConfirm}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 transition disabled:opacity-50"
              >
                {deleteLoading === showDeleteConfirm ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
