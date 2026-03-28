import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

export default function App() {
  return (
<<<<<<< HEAD
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
   
=======
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="browse" element={<Browse />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
>>>>>>> 015316765ed778b9b9c2c0045fc177a1b46c9215
  )
}
