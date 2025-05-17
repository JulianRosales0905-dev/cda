import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Car, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';

type LocationState = {
  from?: {
    pathname: string;
  };
};

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  
  const { login, isLoading } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const locationState = location.state as LocationState;
  const from = locationState?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      addToast('Inicio de sesión exitoso', 'success');
      navigate(from, { replace: true });
    } catch (error) {
      addToast('Credenciales inválidas', 'error');
    }
  };

  const demoAccounts = [
    { role: 'Técnico', email: 'tecnico@cda.com', password: 'tecnico123' },
    { role: 'Recepcionista', email: 'recepcion@cda.com', password: 'recepcion123' },
    { role: 'Administrativo', email: 'admin@cda.com', password: 'admin123' },
    { role: 'Entidad Reguladora', email: 'regulador@gov.co', password: 'regulador123' },
    { role: 'Propietario de Vehículo', email: 'propietario@mail.com', password: 'propietario123' }
  ];

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardContent className="p-8">
            <div className="flex justify-center mb-8">
              <div className="p-3 rounded-full bg-blue-100">
                <Car className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Iniciar Sesión
            </h2>
            
            <form onSubmit={handleSubmit}>
              <Input
                label="Correo Electrónico"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="correo@ejemplo.com"
              />
              
              <div className="mb-6">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                className="w-full mb-4"
                isLoading={isLoading}
              >
                Iniciar Sesión
              </Button>
              
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-800"
                  onClick={() => setShowDemo(!showDemo)}
                >
                  {showDemo ? 'Ocultar cuentas demo' : 'Mostrar cuentas demo'}
                </button>
              </div>
            </form>
            
            {showDemo && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Cuentas de demostración:</h3>
                <div className="space-y-3">
                  {demoAccounts.map((account) => (
                    <div key={account.email} className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                      <p className="text-sm font-medium text-gray-900">{account.role}</p>
                      <p className="text-xs text-gray-500">Email: {account.email}</p>
                      <p className="text-xs text-gray-500">Contraseña: {account.password}</p>
                      <button
                        type="button"
                        className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                        onClick={() => handleDemoLogin(account.email, account.password)}
                      >
                        Usar esta cuenta
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;