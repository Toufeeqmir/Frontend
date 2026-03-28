/**
 * Demo profiles for ShaadiHaat Lite (static data).
 */
export const profiles = [
  {
    id: '1',
    name: 'Aanya Sharma',
    age: 27,
    city: 'Mumbai',
    profession: 'Product Designer',
    education: 'M.Des, NID',
    community: 'Hindi',
    height: "5'4\"",
    summary:
      'Design-led, curious about art and slow travel. Values honesty, family warmth, and shared goals.',
    interests: ['Typography', 'Hiking', 'Cooking'],
    imageColor: 'from-rose-200 to-amber-100',
  },
  {
    id: '2',
    name: 'Rohan Mehta',
    age: 29,
    city: 'Bengaluru',
    profession: 'Software Engineer',
    education: 'B.Tech, IIT',
    community: 'Gujarati',
    height: "5'10\"",
    summary:
      'Calm, dependable, and big on clear communication. Enjoys cricket weekends and indie films.',
    interests: ['Chess', 'Running', 'Photography'],
    imageColor: 'from-slate-200 to-haat-blush',
  },
  {
    id: '3',
    name: 'Priya Nair',
    age: 26,
    city: 'Chennai',
    profession: 'Doctor (Resident)',
    education: 'MBBS, MD',
    community: 'Malayali',
    height: "5'3\"",
    summary:
      'Empathetic and driven. Looking for a partner who respects work-life balance and roots.',
    interests: ['Classical music', 'Yoga', 'Fiction'],
    imageColor: 'from-emerald-100 to-teal-50',
  },
  {
    id: '4',
    name: 'Kabir Khan',
    age: 30,
    city: 'Delhi NCR',
    profession: 'Chartered Accountant',
    education: 'CA, B.Com',
    community: 'Muslim',
    height: "6'0\"",
    summary:
      'Family-oriented with a love for Urdu poetry and home-cooked feasts on weekends.',
    interests: ['Badminton', 'History podcasts', 'Travel'],
    imageColor: 'from-amber-100 to-orange-50',
  },
  {
    id: '5',
    name: 'Meera Iyer',
    age: 28,
    city: 'Hyderabad',
    profession: 'Architect',
    education: 'B.Arch',
    community: 'Tamil',
    height: "5'5\"",
    summary:
      'Minimalist at heart, maximalist about ideas. Enjoys terrace gardens and documentary nights.',
    interests: ['Sketching', 'Cycling', 'Coffee'],
    imageColor: 'from-violet-100 to-haat-blush',
  },
  {
    id: '6',
    name: 'Arjun Singh',
    age: 31,
    city: 'Pune',
    profession: 'Marketing Lead',
    education: 'MBA, IIM',
    community: 'Punjabi',
    height: "5'11\"",
    summary:
      'Outgoing but grounded. Believes in partnership built on laughter and mutual respect.',
    interests: ['Stand-up', 'Trekking', 'Dogs'],
    imageColor: 'from-sky-100 to-indigo-50',
  },
]

export function getProfileById(id) {
  return profiles.find((p) => p.id === id)
}
