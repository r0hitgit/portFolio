import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';

const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'));
const AdminPosts = lazy(() => import('./pages/admin/AdminPosts'));
const AdminAchievements = lazy(() => import('./pages/admin/AdminAchievements'));
const AdminEducation = lazy(() => import('./pages/admin/AdminEducation'));
const AdminSkills = lazy(() => import('./pages/admin/AdminSkills'));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages'));

function FallbackLoader() {
  return (
    <div className="p-8 font-mono-body text-xs text-muted">
      <span>[ loading... ]</span>
    </div>
  );
}

function NotFound() {
  return (
    <div className="max-w-3xl px-6 sm:px-12 py-20 font-mono-body">
      <div className="text-xs text-faint mb-1">~/rohit-verma/</div>
      <h1 className="font-mono-display font-bold text-3xl mb-4 text-amber">[ 404 ] file not found</h1>
      <p className="text-muted text-sm mb-8 leading-relaxed font-light">
        The requested path does not exist in this directory.
      </p>
      <Link
        to="/"
        className="focus-ring inline-block font-mono-body text-[13px] text-accent border border-accent-dim px-4 py-2 hover:bg-accent hover:text-bg transition-colors"
      >
        cd ~/
      </Link>
    </div>
  );
}

function PublicLayout({ children }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<FallbackLoader />}>
          <Routes>
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
            <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="skills" element={<AdminSkills />} />
              <Route path="posts" element={<AdminPosts />} />
              <Route path="achievements" element={<AdminAchievements />} />
              <Route path="education" element={<AdminEducation />} />
              <Route path="messages" element={<AdminMessages />} />
            </Route>

            <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
