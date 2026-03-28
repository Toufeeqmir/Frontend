import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../utils/axiosInstance'

export default function VendorBookings() {
  const { user } = useContext(AuthContext)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('pending')
  const [actionLoading, setActionLoading] = useState({})
  const [showRejectModal, setShowRejectModal] = useState(null)
  const [rejectionMessage, setRejectionMessage] = useState('')

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get('/booking/vendor/list')
      setBookings(res.data || [])
    } catch (err) {
      console.error('Error fetching bookings:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = async (bookingId) => {
    try {
      setActionLoading((prev) => ({ ...prev, [bookingId]: true }))
      await axiosInstance.put(`/booking/${bookingId}/accept`)
      fetchBookings()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept booking')
    } finally {
      setActionLoading((prev) => ({ ...prev, [bookingId]: false }))
    }
  }

  const handleReject = async (bookingId) => {
    if (!rejectionMessage.trim()) {
      alert('Please enter a rejection message')
      return
    }

    try {
      setActionLoading((prev) => ({ ...prev, [bookingId]: true }))
      await axiosInstance.put(`/booking/${bookingId}/reject`, {
        rejectionMessage,
      })
      setShowRejectModal(null)
      setRejectionMessage('')
      fetchBookings()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject booking')
    } finally {
      setActionLoading((prev) => ({ ...prev, [bookingId]: false }))
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true
    return booking.status === filter
  })

  if (loading)
    return (
      <div className="text-center py-12">
        <p className="text-haat-deep/70">Loading bookings...</p>
      </div>
    )

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-haat-deep mb-8">Booking Requests</h1>

      {/* Filter */}
      <div className="mb-8 flex gap-2 flex-wrap">
        {['all', 'pending', 'accepted', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === status
                ? 'bg-haat-deep text-white'
                : 'bg-haat-deep/10 text-haat-deep hover:bg-haat-deep/20'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-2xl border border-haat-deep/10 bg-white p-6 hover:shadow-lg transition"
            >
              <div className="grid gap-4 md:grid-cols-5 items-start">
                <div>
                  <p className="text-sm text-haat-deep/70">Customer</p>
                  <p className="font-semibold text-haat-deep">
                    {booking.customerId?.name || 'N/A'}
                  </p>
                  <p className="text-xs text-haat-deep/60">{booking.customerId?.email}</p>
                  {booking.customerId?.phone && (
                    <p className="text-xs text-haat-deep/60">{booking.customerId.phone}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-haat-deep/70">Service</p>
                  <p className="font-semibold text-haat-deep">
                    {booking.vendorId?.name || 'N/A'}
                  </p>
                  <p className="text-xs text-haat-deep/60">{booking.vendorId?.category}</p>
                </div>
                <div>
                  <p className="text-sm text-haat-deep/70">Date & Location</p>
                  <p className="font-semibold text-haat-deep">
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-haat-deep/60">📍 {booking.location}</p>
                </div>
                <div>
                  <p className="text-sm text-haat-deep/70">Details</p>
                  <p className="font-semibold text-haat-deep">{booking.package}</p>
                  <p className="text-xs text-haat-deep/60">₹{booking.amount?.toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span
                    className={`inline-block text-center rounded-full px-3 py-1 text-sm font-semibold ${
                      booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : booking.status === 'accepted'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>

                  {booking.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(booking._id)}
                        disabled={actionLoading[booking._id]}
                        className="flex-1 rounded-lg bg-green-600 px-3 py-2 text-white font-semibold text-sm hover:bg-green-700 transition disabled:opacity-50"
                      >
                        {actionLoading[booking._id] ? '...' : 'Accept'}
                      </button>
                      <button
                        onClick={() => setShowRejectModal(booking._id)}
                        disabled={actionLoading[booking._id]}
                        className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-white font-semibold text-sm hover:bg-red-700 transition disabled:opacity-50"
                      >
                        {actionLoading[booking._id] ? '...' : 'Reject'}
                      </button>
                    </div>
                  )}

                  {booking.status === 'rejected' && booking.rejectionMessage && (
                    <div className="text-xs text-red-600 font-semibold">
                      Reason: {booking.rejectionMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-haat-deep/20 bg-haat-cream/20 p-12 text-center">
          <p className="text-lg text-haat-deep/70">
            {filter === 'all'
              ? 'No bookings yet'
              : `No ${filter} bookings`}
          </p>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="rounded-2xl bg-white p-8 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold text-haat-deep mb-4">Reject Booking</h2>
            <p className="text-haat-deep/70 mb-4">
              Please provide a reason for rejecting this booking request.
            </p>
            <textarea
              value={rejectionMessage}
              onChange={(e) => setRejectionMessage(e.target.value)}
              placeholder="e.g., Date not available, capacity full, etc."
              className="w-full rounded-xl border border-haat-deep/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-haat-gold"
              rows="4"
            />
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setShowRejectModal(null)
                  setRejectionMessage('')
                }}
                className="flex-1 rounded-lg bg-haat-deep/10 px-4 py-2 font-semibold text-haat-deep hover:bg-haat-deep/20 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(showRejectModal)}
                disabled={actionLoading[showRejectModal]}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 transition disabled:opacity-50"
              >
                {actionLoading[showRejectModal] ? 'Rejecting...' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
