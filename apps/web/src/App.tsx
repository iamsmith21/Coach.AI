import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 text-center space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text-transparent">
          Coach.AI
        </h1>

        <p className="text-slate-400 text-sm leading-relaxed">Welcome to the Coach.AI frontend. </p>

        <div className="py-4">
          <button
            type="button"
            className="px-6 py-3 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 rounded-xl font-medium shadow-lg shadow-violet-900/20 active:scale-[0.97] hover:scale-[1.03]"
            onClick={() => setCount((c) => c + 1)}
          >
            Count is {count}
          </button>
        </div>

        <div className="text-xs text-slate-500 border-r border-t border-e border-slate-800/80 pt-4">
          Open <code>src/App.tsx</code> to begin building features
        </div>
      </div>
    </div>
  );
}

export default App;
