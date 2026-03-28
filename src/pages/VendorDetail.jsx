import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'

export default function VendorDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [vendor, setVendor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedPackage, setSelectedPackage] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)

  useEffect(() => {
    fetchVendor()
  }, [id])

  const fetchVendor = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`/vendors/${id}`)
      setVendor(response.data)
      if (response.data.packages && response.data.packages.length > 0) {
        setSelectedPackage(response.data.packages[0].name)
      }
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load vendor')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = async () => {
    if (!date || !selectedPackage || !location) {
      alert('Please fill in all fields including location')
      return
    }

    try {
      setBookingLoading(true)
      await axiosInstance.post('/booking', {
        vendorId: id,
        date,
        package: selectedPackage,
        location,
      })
      setBookingSuccess(true)
      setTimeout(() => {
        navigate('/vendors')
      }, 2000)
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed')
      console.error(err)
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 text-center">
        <p className="text-haat-deep/70">Loading vendor details...</p>
      </div>
    )
  }

  if (!vendor || error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <p className="text-center text-xl font-semibold text-haat-deep">{error || 'Vendor not found.'}</p>
        <Link to="/vendors" className="mt-4 inline-block text-haat-rose underline">
          Back to vendors
        </Link>
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link to="/vendors" className="font-semibold text-haat-deep underline">
        ← Back to vendors
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {vendor.images && vendor.images.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {vendor.images.map((img, idx) => (
                <div key={idx} className="h-40 w-full bg-gradient-to-br from-haat-gold/20 to-haat-rose/20 rounded-2xl overflow-hidden">
                  <img 
                    src={img} 
                    alt={`${vendor.name} ${idx + 1}`} 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80'
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 rounded-2xl border border-haat-deep/10 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-3xl font-bold text-haat-deep">{vendor.name}</h1>
              <span className="rounded-lg bg-haat-gold/20 px-3 py-1 font-semibold text-haat-deep">{vendor.category}</span>
            </div>
            <p className="mt-3 text-haat-deep/75">{vendor.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
              <span className="rounded-lg bg-haat-deep/10 px-3 py-1 text-haat-deep">Rating: ⭐ {vendor.rating || 4.5}</span>
              <span className="rounded-lg bg-haat-deep/10 px-3 py-1 text-haat-deep">Base price: ₹{vendor.price?.toLocaleString() || 'N/A'}</span>
              <span className="rounded-lg bg-haat-deep/10 px-3 py-1 text-haat-deep">Location: {vendor.location}</span>
            </div>

            {vendor.packages && vendor.packages.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-haat-deep">Pricing Packages</h2>
                <ul className="mt-3 space-y-2">
                  {vendor.packages.map((pkg) => (
                    <li key={pkg.name} className="rounded-xl border border-haat-deep/10 p-3">
                      <p className="font-semibold text-haat-deep">{pkg.name} - ₹{pkg.price?.toLocaleString() || 'N/A'}</p>
                      <p className="text-sm text-haat-deep/70">{pkg.details}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <aside className="rounded-2xl border border-haat-deep/10 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-haat-deep">Book Now</h2>
          <p className="mt-1 text-sm text-haat-deep/70">Confirm your booking instantly.</p>

          <label className="mt-5 block text-sm font-medium text-haat-deep">Service Location *</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Srinagar, Kashmir"
            className="mt-1 w-full rounded-xl border border-haat-deep/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-haat-gold"
          />

          <label className="mt-4 block text-sm font-medium text-haat-deep">Select Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-haat-deep/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-haat-gold"
          />

          <label className="mt-4 block text-sm font-medium text-haat-deep">Select Package *</label>
          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            className="mt-1 w-full rounded-xl border border-haat-deep/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-haat-gold"
          >
            {vendor.packages && vendor.packages.map((pkg) => (
              <option key={pkg.name} value={pkg.name}>
                {pkg.name} - ₹{pkg.price?.toLocaleString()}
              </option>
            ))}
          </select>

          <button
            onClick={handleBooking}
            disabled={bookingLoading}
            className="mt-6 w-full rounded-xl bg-haat-deep px-4 py-2 font-semibold text-white hover:bg-haat-deep/90 transition disabled:opacity-50"
          >
            {bookingLoading ? 'Booking...' : 'Confirm Booking'}
          </button>

          {bookingSuccess && (
            <div className="mt-5 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800">
              ✓ Booking confirmed! Redirecting...
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}
