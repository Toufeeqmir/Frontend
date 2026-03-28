import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-haat-deep/10 bg-gradient-to-r from-haat-deep/95 to-haat-rose/95 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3 mb-8">
          <div>
            <h3 className="text-lg font-bold">ShadhiHaat</h3>
            <p className="mt-2 text-haat-cream/80 text-sm">
              Your trusted partner in creating perfect wedding memories
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-haat-cream/80">
              <li>
                <Link to="/vendors" className="hover:text-haat-cream transition">
                  Browse Vendors
                </Link>
              </li>
              <li>
                <Link to="/smart-match" className="hover:text-haat-cream transition">
                  Smart Match
                </Link>
              </li>
              <li>
                <Link to="/budget-planner" className="hover:text-haat-cream transition">
                  Budget Planner
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-sm text-haat-cream/80">📧 hello@shaadihaat.com</p>
            <p className="text-sm text-haat-cream/80">📱 +91-XXXX-XXXX-XX</p>
          </div>
        </div>
        <div className="border-t border-haat-cream/20 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-haat-cream/70">
            © {year} ShadhiHaat. Making weddings beautiful, simple & stress-free.
          </p>
          <div className="flex gap-4 text-sm text-haat-cream/80">
            <a href="#" className="hover:text-haat-cream transition">Privacy</a>
            <a href="#" className="hover:text-haat-cream transition">Terms</a>
            <a href="#" className="hover:text-haat-cream transition">Support</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
