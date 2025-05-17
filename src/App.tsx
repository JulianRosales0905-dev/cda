import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { ToastProvider } from './contexts/ToastContext';

// Layout components
import Layout from './components/layout/Layout';
import RequireAuth from './components/auth/RequireAuth';

// Public pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

// Role-specific dashboards
import ReceptionistDashboard from './pages/dashboards/ReceptionistDashboard';
import TechnicianDashboard from './pages/dashboards/TechnicianDashboard';
import AdministrativeDashboard from './pages/dashboards/AdministrativeDashboard';
import RegulatoryDashboard from './pages/dashboards/RegulatoryDashboard';
import OwnerDashboard from './pages/dashboards/OwnerDashboard';

// Import user roles
import { UserRole } from './lib/types';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Public routes */}
                <Route index element={<HomePage />} />
                <Route path="servicios" element={<ServicesPage />} />
                <Route path="contacto" element={<ContactPage />} />
                <Route path="login" element={<LoginPage />} />
                
                {/* Protected routes for different roles */}
                <Route 
                  path="recepcionista/*" 
                  element={
                    <RequireAuth allowedRoles={[UserRole.RECEPTIONIST]}>
                      <ReceptionistDashboard />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="tecnico/*" 
                  element={
                    <RequireAuth allowedRoles={[UserRole.TECHNICIAN]}>
                      <TechnicianDashboard />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="administrativo/*" 
                  element={
                    <RequireAuth allowedRoles={[UserRole.ADMINISTRATIVE]}>
                      <AdministrativeDashboard />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="entidad-reguladora/*" 
                  element={
                    <RequireAuth allowedRoles={[UserRole.REGULATORY]}>
                      <RegulatoryDashboard />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="propietario/*" 
                  element={
                    <RequireAuth allowedRoles={[UserRole.OWNER]}>
                      <OwnerDashboard />
                    </RequireAuth>
                  } 
                />
                
                {/* Fallback for unknown routes */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </ToastProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;