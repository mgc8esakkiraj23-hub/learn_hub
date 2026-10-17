import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #0a1628 0%, #0f1e3a 60%, #172554 100%)',
        }}
      >
        {/* subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* glow accents */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-sm font-medium mb-8">
            ✨ Learn. Build. Master.
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Learner&apos;s Hub
          </h1>

          <p className="text-lg md:text-xl text-blue-200 leading-relaxed max-w-2xl mb-10">
            Master any Tech Stack at your own pace. Structured courses, hands-on
            examples, and a clean learning experience.
          </p>

          <button
            onClick={() => navigate('/home')}
            className="px-8 py-4 rounded-full bg-white text-blue-700 font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-100"
          >
            Explore →
          </button>
        </div>

        {/* footer stats */}
        <div className="relative z-10 mt-20 pt-8 border-t border-white/15 w-full max-w-3xl mx-auto flex items-center justify-center gap-12 text-blue-100">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span className="text-2xl">&lt;/&gt;</span> 8 Tech Stacks
          </div>
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span className="text-2xl">🚀</span> 32+ Topics
          </div>
        </div>
      </main>
    </div>
  );
}
