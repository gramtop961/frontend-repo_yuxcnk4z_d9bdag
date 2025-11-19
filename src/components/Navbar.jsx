import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-semibold">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
          BioLearn
        </Link>
        <nav className="flex items-center gap-4 text-blue-200">
          <Link to="/" className="hover:text-white transition">Bab</Link>
          <a href="/test" className="hover:text-white transition">Tes Koneksi</a>
        </nav>
      </div>
    </header>
  )
}
