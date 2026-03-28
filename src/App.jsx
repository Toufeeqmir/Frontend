import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Vendors from './pages/Vendors'
import VendorDetail from './pages/VendorDetail'
import SmartMatch from './pages/SmartMatch'
import BudgetPlanner from './pages/BudgetPlanner'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import VendorDashboard from './pages/VendorDashboard'
import AddService from './pages/AddService'
import VendorBookings from './pages/VendorBookings'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route index element={<Home />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="vendor/:id" element={<VendorDetail />} />
        <Route path="smart-match" element={<SmartMatch />} />
        <Route path="budget-planner" element={<BudgetPlanner />} />
        <Route path="vendor/dashboard" element={<VendorDashboard />} />
        <Route path="vendor/add-service" element={<AddService />} />
        <Route path="vendor/bookings" element={<VendorBookings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
