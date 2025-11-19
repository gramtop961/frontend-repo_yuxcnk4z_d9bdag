import { useEffect, useState } from 'react'

export default function ChapterDetail({ chapter }) {
  const [quiz, setQuiz] = useState([])
  const [selected, setSelected] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const loadQuiz = async () => {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/chapters/${chapter.id}/quizzes?limit=20`)
      if (res.ok) {
        const data = await res.json()
        setQuiz(data)
      }
    }
    if (chapter?.id) loadQuiz()
    setSelected({})
    setSubmitted(false)
  }, [chapter?.id])

  const score = quiz.reduce((acc, q, idx) => {
    const ans = selected[q.id]
    return acc + (ans === q.correct_index ? 1 : 0)
  }, 0)

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-6">
        <div className="text-blue-200 text-sm mb-1">Bab {chapter.number}</div>
        <h2 className="text-2xl font-bold text-white mb-2">{chapter.title}</h2>
        <p className="text-blue-200/90 mb-4 whitespace-pre-line">{chapter.summary}</p>
        {chapter.objectives?.length > 0 && (
          <div className="text-blue-200/90">
            <div className="font-semibold text-white mb-2">Tujuan Pembelajaran</div>
            <ul className="list-disc pl-5 space-y-1">
              {chapter.objectives.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Kuis (20 soal)</h3>
          {submitted && (
            <div className="text-blue-200">Nilai: {score} / {quiz.length}</div>
          )}
        </div>
        <div className="space-y-6">
          {quiz.map((q, idx) => (
            <div key={q.id} className="p-4 rounded border border-slate-700">
              <div className="text-white font-medium mb-2">{idx + 1}. {q.question}</div>
              <div className="grid gap-2">
                {q.options.map((opt, i) => {
                  const isSelected = selected[q.id] === i
                  const isCorrect = submitted && i === q.correct_index
                  const isWrong = submitted && isSelected && !isCorrect
                  return (
                    <button
                      key={i}
                      onClick={() => !submitted && setSelected(s => ({ ...s, [q.id]: i }))}
                      className={
                        `text-left p-3 rounded border transition ` +
                        (isCorrect ? 'bg-emerald-900/40 border-emerald-600 text-emerald-200' :
                         isWrong ? 'bg-rose-900/40 border-rose-600 text-rose-200' :
                         isSelected ? 'bg-blue-900/30 border-blue-600 text-blue-100' :
                         'bg-slate-900/40 border-slate-600 text-blue-100')
                      }
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                    </button>
                  )
                })}
              </div>
              {submitted && (
                <div className="mt-3 text-blue-200/90">
                  <div className="font-semibold text-white">Pembahasan:</div>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {quiz.length > 0 && (
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setSubmitted(true)}
              disabled={submitted}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded"
            >
              Selesai
            </button>
            {submitted && (
              <button
                onClick={() => { setSubmitted(false); setSelected({}) }}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded"
              >
                Ulangi
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
