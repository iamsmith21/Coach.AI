import { createRootRoute, createRoute, Outlet, Link, createRouter } from '@tanstack/react-router';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Problems from './pages/Problems.jsx';

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Global Navigation Header */}
      <header className="border-b border-slate-900 bg-slate-900/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Coach.AI
            </span>
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-400">
              <Link
                to="/"
                className="hover:text-slate-100 [&.active]:text-violet-400 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/problems"
                className="hover:text-slate-100 [&.active]:text-violet-400 transition-colors"
              >
                Problems
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
            <Link
              to="/login"
              className="hover:text-slate-100 [&.active]:text-violet-400 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-violet-600 text-slate-100 rounded-xl hover:bg-violet-500 transition-all font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>
      {/* Main Page Content */}
      <main className="flex-grow max-w-6xl w-full mx-auto p-6">
        <Outlet />
      </main>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: Signup,
});
const problemsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/problems',
  component: Problems,
});
// 3. Register route tree children
const routeTree = rootRoute.addChildren([indexRoute, loginRoute, signupRoute, problemsRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
