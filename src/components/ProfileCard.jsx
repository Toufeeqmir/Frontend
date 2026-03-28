import { Link } from 'react-router-dom'

export default function ProfileCard({ profile }) {
  const { id, name, age, city, profession, education, imageColor } = profile
  return (
    <article className="group overflow-hidden rounded-2xl border border-haat-deep/10 bg-white shadow-soft transition hover:shadow-card">
      <Link to={`/profile/${id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-haat-gold focus-visible:ring-offset-2">
        <div
          className={`relative h-40 bg-gradient-to-br ${imageColor} sm:h-44`}
          aria-hidden
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-5xl font-semibold text-haat-deep/25">
              {name.charAt(0)}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h2 className="font-display text-xl font-semibold text-haat-deep group-hover:text-haat-rose">
            {name}
          </h2>
          <p className="mt-1 text-sm text-haat-deep/70">
            {age} · {city}
          </p>
          <p className="mt-3 line-clamp-2 text-sm text-haat-deep/85">{profession}</p>
          <p className="mt-1 text-xs text-haat-deep/55">{education}</p>
          <span className="mt-4 inline-flex items-center text-sm font-semibold text-haat-gold">
            View profile
            <span className="ml-1 transition group-hover:translate-x-0.5" aria-hidden>
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  )
}
