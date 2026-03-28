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
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
            <label className="block text-sm font-semibold text-haat-deep mb-2">Price (₹)</label>
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

        <div className="mb-8">
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
