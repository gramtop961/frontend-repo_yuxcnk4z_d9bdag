import { useEffect, useState } from 'react'

export default function ChapterList({ onSelect }) {
  const [chapters, setChapters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/chapters`)
        if (!res.ok) throw new Error('Gagal memuat daftar bab')
        const data = await res.json()
        setChapters(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <p className="text-blue-200">Memuat...</p>
  if (error) return <p className="text-red-300">{error}</p>

  return (
    <ul className="space-y-3">
      {chapters.map((c) => (
        <li key={c.id}>
          <button
            onClick={() => onSelect(c)}
            className="w-full text-left p-4 rounded-lg bg-slate-800/60 border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition"
          >
            <div className="text-blue-200 text-sm">Bab {c.number}</div>
            <div className="text-white font-semibold">{c.title}</div>
            <p className="text-blue-200/80 text-sm line-clamp-2">{c.summary}</p>
          </button>
        </li>
      ))}
    </ul>
  )
}
