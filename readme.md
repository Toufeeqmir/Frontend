# Shaadihaat Frontend

Modern, responsive React + Vite web application for discovering and booking wedding vendors with AI-powered smart matching.

## Overview

Shaadihaat is a wedding planner's best friend - browse vetted wedding vendors, get AI recommendations based on your budget, plan your wedding budget, and book services all in one place.

### Features

- 🔐 **User Authentication** - Secure login/registration with role-based access
- 👥 **Vendor Browsing** - Filter wedding vendors by category (Photographer, Catering, Makeup, etc.)
- 🤖 **Smart Matching** - AI-powered vendor recommendations based on budget
- 💰 **Budget Planner** - Plan and track your wedding expenses
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 👨‍💼 **Vendor Dashboard** - Vendors can manage their services and bookings

## Tech Stack

- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.11
- **Styling**: Tailwind CSS 3.4.15
- **Routing**: React Router 6.30.3
- **HTTP Client**: Axios 1.14.0
- **Package Manager**: npm

## Project Structure

```
shadihaat-frontend/
├── public/               # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── Hero.jsx
│   │   ├── FeatureStrip.jsx
│   │   ├── ProfileCard.jsx
│   ├── context/        # Global state management
│   │   └── AuthContext.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Browse.jsx
│   │   ├── Vendors.jsx
│   │   ├── VendorDetail.jsx
│   │   ├── SmartMatch.jsx
│   │   ├── BudgetPlanner.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── VendorDashboard.jsx
│   │   ├── AddService.jsx
│   │   ├── VendorBookings.jsx
│   │   └── NotFound.jsx
│   ├── routes/         # Route protection
│   │   └── ProtectedRoute.jsx
│   ├── data/           # Static data
│   │   ├── profiles.js
│   │   └── vendors.js
│   ├── utils/          # Helper functions
│   │   └── axiosInstance.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

### Steps

1. **Navigate to frontend directory**
   ```bash
   cd shadihaat-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint** (if needed)
   - Edit `src/utils/axiosInstance.js`
   - Ensure baseURL points to your backend: `http://localhost:5000`

## Running the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173`

Open your browser and navigate to the URL shown in the terminal.

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Preview Production Build

```bash
npm run preview
```

## Project Features

### 1. **Home Page** (`/`)
- Hero section with wedding imagery
- Feature highlights
- CTA buttons for browsing vendors and smart matching
- Responsive design with gradient accents

### 2. **Vendor Browsing** (`/vendors`)
- Filter vendors by 8 categories:
  - Photographer
  - Makeup Artist
  - Catering
  - Tent & Decor
  - Salon
  - Bride's Gifts
  - Invitations
  - Event Coordinator
- Smooth loading states with animated spinner
- Vendor cards with rating, price, and location
- Image fallback system for broken images

### 3. **Vendor Details** (`/vendor/:id`)
- Full vendor profile with multiple images
- Package options and pricing
- Customer bookings interface
- Location picker at checkout

### 4. **AI Smart Match** (`/smart-match`)
- Personalized vendor recommendations
- Filter by budget, location, and category
- Requires login for security
- Shows match score for each vendor

### 5. **Budget Planner** (`/budget-planner`)
- Plan wedding expenses by category
- Track spending vs. budget
- Visual budget breakdown

### 6. **Authentication**
- User registration with role selection (Customer/Vendor)
- Secure login with JWT tokens
- Protected routes based on auth status

### 7. **Vendor Dashboard** (`/vendor/dashboard`)
- View bookings
- Manage services
- Add new services

## Color System (Tailwind)

Custom Shaadihaat color palette:

```css
--haat-deep: #8B3A52     /* Deep burgundy */
--haat-rose: #D63384     /* Vibrant rose */
--haat-gold: #FFC107     /* Warm gold */
--haat-blush: #FFE4E1    /* Soft blush */
--haat-cream: #FFF8F0    /* Warm cream */
```

## Authentication

### How It Works

1. **Register** - User creates account with email and password
2. **Login** - Receive JWT token valid for 7 days
3. **Storage** - Token stored in localStorage
4. **Auto-Injection** - Axios interceptor adds token to all requests
5. **Protected Routes** - Wrapped with `ProtectedRoute` component

### AuthContext

Global state management for user data:

```javascript
const { user, setUser } = useContext(AuthContext)
// user = { email, name, token, role, id }
```

## API Integration

All API calls use Axios instance with automatic token injection:

```javascript
import axiosInstance from '../utils/axiosInstance'

// Token automatically added to headers
axiosInstance.get('/api/vendors')
```

### Key Endpoints Used

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/vendors` - Fetch vendors
- `GET /api/vendors/:id` - Vendor details
- `POST /api/booking` - Create booking
- `POST /api/ai/smart-match` - Get recommendations

## Responsive Design

Built with Tailwind CSS responsive utilities:

- **Mobile**: Single column layouts, touch-friendly buttons
- **Tablet**: 2-column grids for vendor cards
- **Desktop**: 3-column grids, full navigation

Breakpoints:
- `sm` - 640px
- `md` - 768px
- `lg` - 1024px
- `xl` - 1280px

## Performance Features

- ✅ Image fallback system prevents broken images
- ✅ Smooth loading transitions (300ms fade)
- ✅ Delayed spinner to avoid flashing on fast networks
- ✅ Disabled buttons during loading to prevent multiple submissions
- ✅ Optimized components with React hooks

## Environment Setup

Backend URL is configured in `src/utils/axiosInstance.js`:

```javascript
const baseURL = 'http://localhost:5000'
```

Ensure backend is running before starting frontend development.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Blank page | Check browser console for errors, ensure backend is running |
| API errors | Verify backend is on `http://localhost:5000` |
| Images not loading | Check network tab, images have fallback to default wedding photo |
| Login failing | Ensure backend database is seeded and backend server is running |
| CORS errors | Backend should have CORS enabled for `http://localhost:5173` |

## Development Workflow

1. Start backend: `npm start` (from backend folder)
2. Start frontend: `npm run dev` (from this folder)
3. Open `http://localhost:5173` in browser
4. Make changes - Vite will hot-reload automatically
5. Check browser console for errors

## Building for Production

```bash
npm run build
```

Deploy the `dist/` folder to your hosting service (Vercel, Netlify, GitHub Pages, etc.)

## License

ISC
