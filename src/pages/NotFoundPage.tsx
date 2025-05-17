import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-16 w-16 text-amber-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Página no encontrada</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que está buscando no existe o ha sido trasladada.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;