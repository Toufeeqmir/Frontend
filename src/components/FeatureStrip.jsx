const items = [
  { title: 'Curated feel', body: 'Clean cards and calm typography so you focus on people, not noise.' },
  { title: 'Privacy-first demo', body: 'No accounts or uploads — static sample data for UI exploration.' },
  { title: 'Fast & modern', body: 'Built with Vite, React, and Tailwind for a snappy experience.' },
]

export default function FeatureStrip() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <ul className="grid gap-8 sm:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.title}
            className="rounded-2xl border border-haat-deep/10 bg-white p-6 shadow-soft"
          >
            <h3 className="font-display text-lg font-semibold text-haat-deep">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-haat-deep/70">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
