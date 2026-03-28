#Backend repository link
https://github.com/CodeWithMomin/shadihaat-backend

# Shaadihaat Frontend

Modern, responsive  web application for discovering and booking wedding vendors with AI-powered smart matching and budget control.

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

- **Framework**: React 
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 
- **Routing**: React Router
- **HTTP Client**: Axios 
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

## Authentication

### How It Works

1. **Register** - User creates account with email and password
2. **Login** - Receive JWT token valid for 7 days
3. **Storage** - Token stored in localStorage
4. **Auto-Injection** - Axios interceptor adds token to all requests
5. **Protected Routes** - Wrapped with `ProtectedRoute` component

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

## Development Workflow

1. Start backend: `npm start` (from backend folder)
2. Start frontend: `npm run dev` (from this folder)
3. Open `http://localhost:5173` in browser
4. Make changes - Vite will hot-reload automatically
5. Check browser console for errors


## License

ISC
