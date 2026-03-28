import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getVendorById } from '../data/vendors'

export default function VendorDetail() {
  const { id } = useParams()
  const vendor = useMemo(() => getVendorById(id), [id])
  const [selectedPackage, setSelectedPackage] = useState(vendor?.packages?.[0]?.name || '')
  const [date, setDate] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)

  if (!vendor) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <p className="text-center text-xl font-semibold text-haat-deep">Vendor not found.</p>
        <Link to="/vendors" className="mt-4 inline-block text-haat-rose underline">
          Back to vendors
        </Link>
      </div>
    )
  }

  const onConfirm = () => {
    if (!date || !selectedPackage) return
    setBookingSuccess(true)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link to="/vendors" className="font-semibold text-haat-deep underline">
        ← Back to vendors
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {vendor.images.map((img) => (
              <img key={img} src={img} alt={`${vendor.name}`} className="h-40 w-full rounded-2xl object-cover" />
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-haat-deep/10 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-3xl font-bold text-haat-deep">{vendor.name}</h1>
              <span className="rounded-lg bg-haat-gold/20 px-3 py-1 font-semibold text-haat-deep">{vendor.category}</span>
            </div>
            <p className="mt-3 text-haat-deep/75">{vendor.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
              <span className="rounded-lg bg-haat-deep/10 px-3 py-1 text-haat-deep">Rating: ⭐ {vendor.rating}</span>
              <span className="rounded-lg bg-haat-deep/10 px-3 py-1 text-haat-deep">Base price: ₹{vendor.price.toLocaleString()}</span>
              <span className="rounded-lg bg-haat-deep/10 px-3 py-1 text-haat-deep">Location: {vendor.location}</span>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-haat-deep">Pricing Packages</h2>
              <ul className="mt-3 space-y-2">
                {vendor.packages.map((pkg) => (
                  <li key={pkg.name} className="rounded-xl border border-haat-deep/10 p-3">
                    <p className="font-semibold text-haat-deep">{pkg.name} - ₹{pkg.price.toLocaleString()}</p>
                    <p className="text-sm text-haat-deep/70">{pkg.details}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-haat-deep/10 bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-haat-deep">Book Now</h2>
          <p className="mt-1 text-sm text-haat-deep/70">Confirm your booking instantly.</p>

          <label className="mt-5 block text-sm font-medium text-haat-deep">Select Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-haat-deep/20 px-3 py-2"
          />

          <label className="mt-4 block text-sm font-medium text-haat-deep">Select Package</label>
          <select
            value={selectedPackage}
            onChange={(e) => setSelectedPackage(e.target.value)}
            className="mt-1 w-full rounded-xl border border-haat-deep/20 px-3 py-2"
          >
            {vendor.packages.map((pkg) => (
              <option key={pkg.name} value={pkg.name}>
                {pkg.name} - ₹{pkg.price.toLocaleString()}
              </option>
            ))}
          </select>

          <button
            onClick={onConfirm}
            className="mt-6 w-full rounded-xl bg-haat-deep px-4 py-2 font-semibold text-white hover:bg-haat-deep/90"
          >
            Confirm Booking
          </button>

          {bookingSuccess && (
            <div className="mt-5 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-800">
              Booking confirmed! We sent you a demo confirmation message.
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}
