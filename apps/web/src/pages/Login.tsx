import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext.tsx';
import { apiRequest } from '../utils/api.js';
import { Link, useRouter } from '@tanstack/react-router';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name?: string;
    createdAt: string;
  };
}

export default function Login() {
  const { login: setAuth } = useAuth();
  const router = useRouter();

  // 1. Inputs state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // 2. Login mutation
  const loginMutation = useMutation({
    mutationFn: (credentials: any) =>
      apiRequest<LoginResponse>('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      router.navigate({ to: '/' });
    },
    onError: (err: any) => {
      if (err.errors) {
        const errorMsg = Object.values(err.errors).flat().join(', ');
        setFormError(errorMsg);
      } else {
        setFormError(err.error || 'Something went wrong. Please try again.');
      }
    },
  });

  // 3. Submit Handler (using React.FormEvent to satisfy React 19)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-400">Log in to continue your interview prep</p>
        </div>

        {formError && (
          <div className="p-4 bg-red-950/50 border border-red-900/50 rounded-2xl text-sm text-red-400 text-center">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-violet-500 focus:outline-none text-slate-100 transition-colors text-sm"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-violet-500 focus:outline-none text-slate-100 transition-colors text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all duration-200 rounded-xl font-semibold text-sm text-slate-100 shadow-lg shadow-violet-900/20 active:scale-[0.98] hover:scale-[1.01] disabled:opacity-50 disabled:pointer-events-none"
          >
            {loginMutation.isPending ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-violet-400 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
