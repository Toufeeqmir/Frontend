import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Vendors from './pages/Vendors'
import VendorDetail from './pages/VendorDetail'
import BudgetPlanner from './pages/BudgetPlanner'
import SmartMatch from './pages/SmartMatch'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
   <Routes>
  {/* 🔓 Public Routes (No Layout) */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* 🌐 Layout Wrapper Routes */}
  <Route path="/" element={<Layout />}>

    {/* Home */}
    <Route index element={<Home />} />

    {/* Vendors */}
    <Route path="vendors" element={<Vendors />} />
    <Route path="vendors/:id" element={<VendorDetail />} />

    {/* Optional alias */}
    <Route path="browse" element={<Vendors />} />

    {/* Features */}
    <Route path="budget-planner" element={<BudgetPlanner />} />
    <Route path="smart-match" element={<SmartMatch />} />

    {/* Extra */}
    <Route path="about" element={<About />} />

    {/* 404 */}
    <Route path="*" element={<NotFound />} />

  </Route>
</Routes>
   
  )
}
