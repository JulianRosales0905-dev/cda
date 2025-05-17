import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../lib/types';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case UserRole.TECHNICIAN:
        return '/tecnico';
      case UserRole.RECEPTIONIST:
        return '/recepcionista';
      case UserRole.ADMINISTRATIVE:
        return '/administrativo';
      case UserRole.REGULATORY:
        return '/entidad-reguladora';
      case UserRole.OWNER:
        return '/propietario';
      default:
        return '/';
    }
  };

  const getDashboardText = () => {
    if (!user) return 'Iniciar Sesión';
    
    switch (user.role) {
      case UserRole.TECHNICIAN:
        return 'Panel Técnico';
      case UserRole.RECEPTIONIST:
        return 'Panel Recepción';
      case UserRole.ADMINISTRATIVE:
        return 'Panel Administrativo';
      case UserRole.REGULATORY:
        return 'Panel Regulador';
      case UserRole.OWNER:
        return 'Mi Panel';
      default:
        return 'Panel';
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">CDA Diagnóstico</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-700 hover:text-blue-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Inicio
              </Link>
              <Link
                to="/servicios"
                className="border-transparent text-gray-700 hover:text-blue-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Servicios
              </Link>
              <Link
                to="/contacto"
                className="border-transparent text-gray-700 hover:text-blue-600 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Contacto
              </Link>
            </div>
          </div>
          
          {/* Desktop Login/Dashboard Button */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link to={getDashboardLink()}>
              <Button
                variant="primary"
                size="sm"
                className="flex items-center"
              >
                <User className="h-4 w-4 mr-1" />
                {getDashboardText()}
              </Button>
            </Link>
            
            {user && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-2"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-white">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/servicios"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Servicios
            </Link>
            <Link
              to="/contacto"
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contacto
            </Link>
            <Link
              to={getDashboardLink()}
              className="block pl-3 pr-4 py-2 text-base font-medium text-blue-600 bg-blue-50 hover:bg-blue-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {getDashboardText()}
            </Link>
            {user && (
              <button
                className="w-full text-left block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;