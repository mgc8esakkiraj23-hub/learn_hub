import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { domains, type Domain } from '../data/domains';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-14">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Choose your domain
          </h1>
          <p className="text-gray-500 text-lg">
            7 domains • 10 questions each • 100 marks
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain) => (
            <DomainCard
              key={domain.id}
              domain={domain}
              onClick={() => navigate(`/course/${domain.id}`)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

function DomainCard({ domain, onClick }: { domain: Domain; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group text-left bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
    >
      <div
        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${domain.iconBg} flex items-center justify-center text-2xl font-bold text-white shadow-md mb-4`}
      >
        {domain.emoji}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-1">{domain.name}</h3>
      <p className="text-gray-500 text-sm mb-4">
        10 Questions • 100 Marks • MCQ + Coding
      </p>
      <span className="text-blue-600 font-bold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
        Start Learning →
      </span>
    </button>
  );
}
