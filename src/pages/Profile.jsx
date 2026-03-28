import { Link, useParams } from 'react-router-dom'
import { getProfileById } from '../data/profiles'

export default function Profile() {
  const { id } = useParams()
  const profile = getProfileById(id)

  if (!profile) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-2xl font-bold text-haat-deep">Profile not found</h1>
        <p className="mt-2 text-haat-deep/70">This ID does not exist in our demo set.</p>
        <Link
          to="/browse"
          className="mt-8 inline-flex rounded-xl bg-haat-deep px-6 py-3 font-semibold text-haat-cream hover:bg-haat-deep/90"
        >
          Back to browse
        </Link>
      </div>
    )
  }

  const {
    name,
    age,
    city,
    profession,
    education,
    community,
    height,
    summary,
    interests,
    imageColor,
  } = profile

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        to="/browse"
        className="inline-flex items-center text-sm font-semibold text-haat-rose hover:underline"
      >
        ← Browse
      </Link>
      <article className="mt-6 overflow-hidden rounded-3xl border border-haat-deep/10 bg-white shadow-card">
        <div
          className={`relative h-52 bg-gradient-to-br sm:h-64 ${imageColor}`}
          aria-hidden
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-7xl font-semibold text-haat-deep/20 sm:text-8xl">
              {name.charAt(0)}
            </span>
          </div>
        </div>
        <div className="p-6 sm:p-10">
          <h1 className="font-display text-3xl font-bold text-haat-deep sm:text-4xl">{name}</h1>
          <p className="mt-1 text-haat-deep/70">
            {age} years · {city} · {community}
          </p>
          <dl className="mt-8 grid gap-4 border-t border-haat-deep/10 pt-8 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-haat-deep/50">Profession</dt>
              <dd className="mt-1 text-haat-deep">{profession}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-haat-deep/50">Education</dt>
              <dd className="mt-1 text-haat-deep">{education}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-haat-deep/50">Height</dt>
              <dd className="mt-1 text-haat-deep">{height}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-haat-deep/50">Location</dt>
              <dd className="mt-1 text-haat-deep">{city}</dd>
            </div>
          </dl>
          <div className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-haat-deep/50">About</h2>
            <p className="mt-2 leading-relaxed text-haat-deep/85">{summary}</p>
          </div>
          <div className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-haat-deep/50">Interests</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {interests.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-haat-blush/80 px-3 py-1 text-sm text-haat-deep"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 rounded-2xl bg-haat-cream p-5 text-center text-sm text-haat-deep/70">
            This is a static demo. Connect and messaging are not implemented in ShaadiHaat.
          </div>
        </div>
      </article>
    </div>
  )
}
