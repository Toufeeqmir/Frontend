import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axiosInstance from '../utils/axiosInstance'

const categories = [
  'Photographer', 'Makeup Artist', 'Catering', 'Tent & Decor', 'Salon',
  'Bride\'s Gifts', 'Invitations', 'Event Coordinator', 'Jewelry', 'Florist'
]

export default function AddService() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    location: '',
    images: '',
    packages: [],
  })
  const [newPackage, setNewPackage] = useState({ name: '', price: '', details: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePackageChange = (e) => {
    const { name, value } = e.target
    setNewPackage(prev => ({ ...prev, [name]: value }))
  }

  const addPackage = () => {
    if (newPackage.name && newPackage.price) {
      setFormData(prev => ({
        ...prev,
        packages: [...prev.packages, { ...newPackage, price: parseInt(newPackage.price) }]
      }))
      setNewPackage({ name: '', price: '', details: '' })
    } else {
      alert('Please fill in package name and price')
    }
  }

  const removePackage = (index) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...formData,
        price: parseInt(formData.price),
        images: formData.images.split(',').map(img => img.trim()),
      }
      await axiosInstance.post('/vendors', payload)
      navigate('/vendor/dashboard')
    } catch (err) {
      console.error('Error adding service:', err)
      alert('Failed to add service')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold text-haat-deep mb-8">Add New Service</h1>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-haat-deep/10 bg-white p-8">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-haat-deep mb-2">Service Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-haat-deep/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-haat-rose"
            placeholder="e.g., Professional Wedding Photography"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-haat-deep mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-haat-deep/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-haat-rose"
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-haat-deep mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full rounded-lg border border-haat-deep/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-haat-rose"
            placeholder="Describe your service..."
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 mb-6">
          <div>
            <label className="block text-sm font-semibold text-haat-deep mb-2">Base Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-haat-deep/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-haat-rose"
              placeholder="e.g., 25000"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-haat-deep mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-haat-deep/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-haat-rose"
              placeholder="e.g., Srinagar"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-haat-deep mb-2">Image URLs (comma separated)</label>
          <textarea
            name="images"
            value={formData.images}
            onChange={handleChange}
            rows="2"
            className="w-full rounded-lg border border-haat-deep/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-haat-rose"
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          />
        </div>

        {/* Pricing Packages */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-haat-deep mb-4">Pricing Packages</h3>
          
          <div className="rounded-lg border border-haat-deep/10 p-4 mb-4">
            <div className="grid gap-3 sm:grid-cols-3 mb-3">
              <input
                type="text"
                name="name"
                value={newPackage.name}
                onChange={handlePackageChange}
                placeholder="Package name (e.g., Silver)"
                className="rounded-lg border border-haat-deep/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-haat-rose text-sm"
              />
              <input
                type="number"
                name="price"
                value={newPackage.price}
                onChange={handlePackageChange}
                placeholder="Price"
                className="rounded-lg border border-haat-deep/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-haat-rose text-sm"
              />
              <input
                type="text"
                name="details"
                value={newPackage.details}
                onChange={handlePackageChange}
                placeholder="Details (e.g., 4 hours coverage)"
                className="rounded-lg border border-haat-deep/20 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-haat-rose text-sm"
              />
            </div>
            <button
              type="button"
              onClick={addPackage}
              className="w-full rounded-lg bg-haat-gold/20 px-3 py-2 text-sm font-semibold text-haat-deep hover:bg-haat-gold/30 transition"
            >
              + Add Package
            </button>
          </div>

          {formData.packages.length > 0 && (
            <div className="space-y-2 mb-4">
              {formData.packages.map((pkg, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-haat-blush/20">
                  <div>
                    <p className="font-semibold text-haat-deep">{pkg.name} - ₹{pkg.price?.toLocaleString()}</p>
                    <p className="text-xs text-haat-deep/70">{pkg.details}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePackage(idx)}
                    className="px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 rounded transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-lg bg-haat-rose px-6 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-haat-rose/90 disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Service'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/vendor/dashboard')}
            className="flex-1 rounded-lg border-2 border-haat-deep px-6 py-3 text-lg font-semibold text-haat-deep transition hover:bg-haat-deep/5"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  )
}
