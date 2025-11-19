import { useState } from 'react'
import Navbar from './components/Navbar'
import ChapterList from './components/ChapterList'
import ChapterDetail from './components/ChapterDetail'

function App() {
  const [selectedChapter, setSelectedChapter] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        <section className="md:col-span-1">
          <h2 className="text-white text-xl font-semibold mb-4">Daftar Bab</h2>
          <ChapterList onSelect={setSelectedChapter} />
        </section>

        <section className="md:col-span-2">
          {selectedChapter ? (
            <ChapterDetail chapter={selectedChapter} />
          ) : (
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-10 text-center">
              <h3 className="text-white text-2xl font-bold mb-2">Mulai belajar Biologi</h3>
              <p className="text-blue-200">Pilih salah satu bab di sebelah kiri untuk melihat ringkasan materi dan kuis 20 soal setara OSN-N dengan pembahasan.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
