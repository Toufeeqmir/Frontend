export const vendors = [
  {
    id: '1',
    category: 'Photographer',
    name: 'Aura Clicks Studio',
    description: 'Cinematic wedding photography with candid storytelling and premium album design.',
    price: 36000,
    rating: 4.8,
    location: 'Mumbai',
    image: 'https://images.unsplash.com/photo-1519791883284-d7ed7b93db5f?auto=format&fit=crop&w=1200&q=80',
    packages: [
      { name: 'Silver', price: 28000, details: '6 hours coverage, 2 photographers' },
      { name: 'Gold', price: 36000, details: '8 hours coverage, 3 photographers, highlight video' },
      { name: 'Platinum', price: 50000, details: 'Full day coverage, drone, photobook' },
    ],
    images: [
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1519764626500-86f6adf12dd6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1498013200121-9195a595f136?auto=format&fit=crop&w=1600&q=80',
    ],
  },
  {
    id: '2',
    category: 'Makeup Artist',
    name: 'Luxe Glamor',
    description: 'Bridal makeup specialist with trial sessions and 50+ glow looks.',
    price: 22000,
    rating: 4.7,
    location: 'Bengaluru',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1200&q=80',
    packages: [
      { name: 'Basic', price: 12000, details: 'Bridal + 1 guests' },
      { name: 'Premium', price: 22000, details: 'Bridal + 3 guests + trial' },
      { name: 'Deluxe', price: 30000, details: 'Bridal + 5 guests + trial + sangeet look' },
    ],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1514277003298-4c4e5264e3f8?auto=format&fit=crop&w=1600&q=80',
    ],
  },
  {
    id: '3',
    category: 'Catering',
    name: 'FeastCraft Catering',
    description: 'Custom menus, live counters and plated dining for 100+ guests.',
    price: 48000,
    rating: 4.6,
    location: 'Delhi',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
    packages: [
      { name: 'Standard', price: 34000, details: 'Veg + Non-Veg buffet, 5 dishes' },
      { name: 'Premier', price: 48000, details: 'Premium buffet, live counters' },
      { name: 'Luxury', price: 65000, details: 'Themed dining, dessert bar' },
    ],
    images: [
      'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1559628233-25cec3306afe?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1453831210720-0f4ce7c5d988?auto=format&fit=crop&w=1600&q=80',
    ],
  },
  {
    id: '4',
    category: 'Photographer',
    name: 'Moment Masters',
    description: 'Fine art photography with same-day teaser delivery.',
    price: 42000,
    rating: 4.9,
    location: 'Pune',
    image: 'https://images.unsplash.com/photo-1524272332613-2c8e3b344a1c?auto=format&fit=crop&w=1200&q=80',
    packages: [
      { name: 'Essential', price: 30000, details: '8 hours, 2 photographers' },
      { name: 'Advanced', price: 42000, details: '10 hours, 3 photographers, pre-wedding shoot' },
      { name: 'Ultimate', price: 60000, details: 'Full event coverage, 4 photographers, drone' },
    ],
    images: [
      'https://images.unsplash.com/photo-1489980557514-7e2e4d8f7bc8?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1535709251021-5d7c45f9813e?auto=format&fit=crop&w=1600&q=80',
    ],
  },
]

export function getVendorById(id) {
  return vendors.find((vendor) => vendor.id === id)
}
