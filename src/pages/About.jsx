import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl font-bold text-haat-deep sm:text-4xl">About ShaadiHaat Lite</h1>
      <p className="mt-4 text-lg text-haat-deep/75">
        ShaadiHaat Lite is a front-end showcase: a calm, readable interface for exploring sample matrimonial-style
        profiles. It is not a production service — there is no backend, authentication, or messaging.
      </p>
      <h2 className="mt-10 font-display text-xl font-semibold text-haat-deep">Stack</h2>
      <ul className="mt-3 list-inside list-disc space-y-2 text-haat-deep/80">
        <li>React 18 with Vite</li>
        <li>Tailwind CSS for styling</li>
        <li>React Router for navigation</li>
        <li>JavaScript (no TypeScript)</li>
      </ul>
      <h2 className="mt-10 font-display text-xl font-semibold text-haat-deep">Data</h2>
      <p className="mt-3 text-haat-deep/75">
        Profiles live in <code className="rounded bg-haat-blush/80 px-1.5 py-0.5 text-sm">src/data/profiles.js</code>.
        Replace or extend that module to adapt the UI to your own content.
      </p>
      <div className="mt-12">
        <Link
          to="/browse"
          className="inline-flex rounded-xl bg-haat-deep px-8 py-3.5 font-semibold text-haat-cream shadow-soft transition hover:bg-haat-deep/90"
        >
          Go to browse
        </Link>
      </div>
    </div>
  )
}
