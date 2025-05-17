import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">CDA Diagnóstico</span>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Centro de Diagnóstico Automotor especializado en la revisión técnico-mecánica y de emisiones contaminantes para todo tipo de vehículos.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Enlaces Rápidos</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-gray-400 hover:text-blue-400">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-gray-400 hover:text-blue-400">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-blue-400">
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Contacto</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <span className="ml-3 text-gray-400">
                  Carrera 45 #50-12, Edificio Central, Bogotá, Colombia
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="ml-3 text-gray-400">+57 (1) 234-5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="ml-3 text-gray-400">info@cdadiagnostico.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} CDA Diagnóstico. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;