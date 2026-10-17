import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import { domains, getDomain, normalizeDomainId } from '../data/domains';
import quizData from '../data/quizData.json';

interface Question {
  q: string;
  options: string[];
  answer: number;
  marks: number;
  explanation: string;
}

type QuizMap = Record<string, Question[]>;

export default function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const domainId = useMemo(() => normalizeDomainId(id), [id]);
  const domain = domainId ? getDomain(domainId) : undefined;
  const questions = domainId ? (quizData as QuizMap)[domainId] : undefined;

  // Debug logging
  console.log('[CoursePage] raw id:', id, '| normalized:', domainId);
  if (questions && questions.length > 0) {
    console.log('[CoursePage] first question:', questions[0].q);
  }

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Error state: domain not found or no questions
  if (!domainId || !domain || !questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-lg w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
            <div className="text-5xl mb-4">🤔</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Domain not found
            </h1>
            <p className="text-gray-500 mb-6">
              We couldn&apos;t find a quiz for{' '}
              <span className="font-mono font-semibold text-gray-700">
                {id || 'this page'}
              </span>
              .
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Available domains: {domains.map((d) => d.name).join(', ')}
            </p>
            <button
              onClick={() => navigate('/home')}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Back to Domains
            </button>
          </div>
        </main>
      </div>
    );
  }

  const question = questions[current];
  const total = questions.length;
  const isLast = current === total - 1;
  const progressPct = ((current + 1) / total) * 100;

  function handleSelect(idx: number) {
    if (selected !== null) return; // lock after first selection
    setSelected(idx);
    if (idx === question.answer) {
      setScore((s) => s + question.marks);
    }
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
  }

  function handleRetake() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-10 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              Completed!
            </h1>
            <p className="text-gray-500 mb-6">{domain.name} Quiz</p>
            <div className="inline-block px-8 py-4 rounded-2xl bg-blue-50 border border-blue-100 mb-8">
              <div className="text-4xl font-extrabold text-blue-600">
                {score}
                <span className="text-2xl text-blue-400">/100</span>
              </div>
              <div className="text-sm text-blue-500 font-medium mt-1">
                Your Score
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleRetake}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Retake
              </button>
              <button
                onClick={() => navigate('/home')}
                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Back to Domains
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10">
        {/* Quiz header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">
            {domain.name}{' '}
            <span className="text-gray-400 font-medium">• Q{current + 1}/{total}</span>
          </h1>
          <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
            Score: {score}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900 leading-snug">
              {question.q}
            </h2>
            <span className="shrink-0 px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-bold">
              {question.marks} marks
            </span>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options.map((opt, idx) => {
              const isCorrect = idx === question.answer;
              const isSelected = idx === selected;
              const locked = selected !== null;

              let cls =
                'w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all flex items-center gap-3 ';
              if (!locked) {
                cls += 'border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300';
              } else if (isCorrect) {
                cls += 'border-green-500 bg-green-50 font-bold text-green-900';
              } else if (isSelected) {
                cls += 'border-red-500 bg-red-50 text-red-900';
              } else {
                cls += 'border-gray-200 bg-white opacity-60';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={locked}
                  className={cls}
                >
                  <span className="w-6 h-6 shrink-0 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {locked && isCorrect && <span className="text-green-600 text-lg">✓</span>}
                  {locked && isSelected && !isCorrect && (
                    <span className="text-red-600 text-lg">✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Before selection hint */}
          {selected === null && (
            <p className="text-center text-gray-400 text-sm mb-2">
              👆 Select to reveal answer
            </p>
          )}

          {/* After selection: explanation */}
          {selected !== null && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                  <span>💡</span> Explanation
                </div>
                <p className="text-gray-700 leading-relaxed mb-3">
                  {question.explanation}
                </p>
                <div className="text-sm">
                  <span className="text-gray-500">Correct answer: </span>
                  <span className="font-semibold text-green-700">
                    {String.fromCharCode(65 + question.answer)}.{' '}
                    {question.options[question.answer]}
                  </span>
                </div>
                <div className="text-sm mt-1">
                  <span className="text-gray-500">Your answer: </span>
                  {selected === question.answer ? (
                    <span className="font-semibold text-green-700">
                      ✅ Correct (+{question.marks} marks)
                    </span>
                  ) : (
                    <span className="font-semibold text-red-700">
                      ❌ Wrong
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-sm"
                >
                  {isLast ? 'Finish →' : 'Next →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
