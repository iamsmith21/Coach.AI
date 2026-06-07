import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../utils/api.js';
import { useState } from 'react';

interface Problem {
  id: number;
  title: string;
  difficulty: string;
  pattern: string;
  createdAt: string;
}

export default function Problems() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedPattern, setSelectedPattern] = useState('All');

  const {
    data: problems = [],
    isLoading,
    error,
  } = useQuery<Problem[]>({
    queryKey: ['problems'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return apiRequest<Problem[]>('/problems');
    },
  });

  const patterns = ['All', ...Array.from(new Set(problems.map((p) => p.pattern)))];

  const filteredProblems = problems.filter((problem) => {
    const matchesSerach = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === 'All' ||
      problem.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesPattern = selectedPattern === 'All' || problem.pattern === selectedPattern;

    return matchesSerach && matchesDifficulty && matchesPattern;
  });

  return (
    <>
      <div className="space-y-8 py-4 ">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Problem Browser
          </h1>
          <p className="text-slate-400 text-sm">
            Select a problem to begin your AI-guided interview session and practice real-time
            coding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Search
            </label>
            <input
              type="text"
              placeholder="Search Problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:border-violet-500 focus: outline-none text-slate-100 transition-colors text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:border-violet-500 focus:outline-none text-slate-100 transition-colors text-sm appearance-none cursor-pointer"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Pattern
            </label>
            <select
              value={selectedPattern}
              onChange={(e) => setSelectedPattern(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:border-violet-500 focus:outline-none text-slate-100 transition-colors text-sm appearance-none cursor-pointer"
            >
              {patterns.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm font-medium animate-pulse">Loading problems...</p>
          </div>
        ) : error ? (
          <div className="p-6 bg-red-950/30 border border-red-900/50 rounded-2xl text-center text-red-400 text-sm">
            Failed to fetch problems. Please ensure the backend is running and try again.
          </div>
        ) : filteredProblems.length === 0 ? (
          <div className="p-12 border border-dashed border-slate-800 rounded-2xl text-center space-y-2">
            <p className="text-slate-300 font-semibold">No problems match your query</p>
            <p className="text-slate-500 text-xs">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProblems.map((p) => {
              const diffClass =
                p.difficulty.toLowerCase() === 'easy'
                  ? 'bg-emerald-950/50 text-emerald-400 border-emerald-900/50'
                  : p.difficulty.toLowerCase() === 'medium'
                    ? 'bg-amber-950/50 text-amber-400 border-amber-900/50'
                    : 'bg-rose-950/50 text-rose-400 border-rose-900/50';

              return (
                <div
                  key={p.id}
                  className="group relative flex flex-col justify-between p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-violet-500/50 transition-all duration-300 shadow-lg hover:shadow-violet-900/5 hover:-translate-y-0.5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${diffClass}`}
                      >
                        {p.difficulty}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border border-slate-800 bg-slate-950 text-slate-400">
                        {p.pattern}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-violet-400 transition-colors">
                      {p.title}
                    </h3>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">ID : {p.id}</span>
                    <button
                      type="button"
                      className="px-4 py-2 bg-slate-950 hover:bg-violet-600 border border-slate-800 hover:border-violet-500 rounded-xl font-semibold text-xs text-slate-300 hover:text-slate-100 transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
                    >
                      Start Session
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
