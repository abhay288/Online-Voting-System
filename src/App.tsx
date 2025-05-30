import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ElectionsPage from './pages/ElectionsPage';
import ElectionDetailsPage from './pages/ElectionDetailsPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import CreateElectionPage from './pages/CreateElectionPage';
import ElectionManagement from './components/admin/ElectionManagement';

// Protected Route Component
const ProtectedRoute: React.FC<{ 
  element: React.ReactNode;
  adminOnly?: boolean;
}> = ({ element, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return <>{element}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow bg-gray-50">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/elections" element={<ElectionsPage />} />
              <Route path="/elections/:id" element={<ElectionDetailsPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={<ProtectedRoute element={<DashboardPage />} />} 
              />
              <Route 
                path="/profile" 
                element={<ProtectedRoute element={<div>Profile Page</div>} />} 
              />
              
              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={<ProtectedRoute element={<AdminPage />} adminOnly />}
              >
                <Route index element={<ElectionManagement />} />
                <Route path="elections" element={<ElectionManagement />} />
                <Route path="users" element={<div>User Management (Coming Soon)</div>} />
                <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
              </Route>
              
              <Route 
                path="/admin/create-election" 
                element={<ProtectedRoute element={<CreateElectionPage />} adminOnly />} 
              />
              
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;