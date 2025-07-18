import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
// import { Careers } from './pages/Careers';
import { AgentHub } from './pages/AgentHub';
import { Login } from './pages/auth/Login';
import { SignUp } from './pages/auth/SignUp';
import { AuthCallback } from './pages/auth/AuthCallback';
import { Dashboard } from './pages/dashboard';
import { Features } from './pages/Features';
import { HowItWorks } from './pages/HowItWorks';
import { UseCases } from './pages/UseCases';
import { useAuth } from './hooks/useAuth';
import { Pricing } from './pages/Pricing';
import { PrivacyPolicy } from './pages/Privacy';
import { TermsOfService } from './pages/Terms';
import { CookiePolicy } from './pages/Cookeis';
import { BlogPage } from './pages/Blog';
import { Documentation } from './pages/Docs';
import {APIReference} from './pages/Api';
import Playground from './pages/Playground';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/careers" element={<Careers />} /> */}
            <Route path="/agent-hub" element={<AgentHub />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/api" element={<APIReference />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              } 
            />
            <Route 
              path="/dashboard/*" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}