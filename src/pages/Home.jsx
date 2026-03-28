import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import FeatureStrip from '../components/FeatureStrip'
import ProfileCard from '../components/ProfileCard'
import { profiles } from '../data/profiles'

const preview = profiles.slice(0, 3)

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-haat-deep/10 pb-8 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold text-haat-deep sm:text-4xl">
              Featured profiles
            </h2>
            <p className="mt-2 max-w-xl text-haat-deep/70">
              A small sample from our demo directory. Open any card to see a full profile view.
            </p>
          </div>
          <Link
            to="/browse"
            className="shrink-0 font-semibold text-haat-rose underline-offset-4 hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((p) => (
            <ProfileCard key={p.id} profile={p} />
          ))}
        </div>
      </section>
    </>
  )
}
