import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../lib/types';

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
};

// Mock users for demonstration
const mockUsers = [
  {
    id: '1',
    email: 'tecnico@cda.com',
    password: 'tecnico123',
    name: 'Carlos Técnico',
    role: UserRole.TECHNICIAN
  },
  {
    id: '2',
    email: 'recepcion@cda.com',
    password: 'recepcion123',
    name: 'Ana Recepcionista',
    role: UserRole.RECEPTIONIST
  },
  {
    id: '3',
    email: 'admin@cda.com',
    password: 'admin123',
    name: 'Juan Administrativo',
    role: UserRole.ADMINISTRATIVE
  },
  {
    id: '4',
    email: 'regulador@gov.co',
    password: 'regulador123',
    name: 'María Reguladora',
    role: UserRole.REGULATORY
  },
  {
    id: '5',
    email: 'propietario@mail.com',
    password: 'propietario123',
    name: 'Pedro Propietario',
    role: UserRole.OWNER
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('cda_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user');
      }
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = mockUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Credenciales inválidas');
      }
      
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store user in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('cda_user', JSON.stringify(userWithoutPassword));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('cda_user');
  };
  
  const value = {
    user,
    login,
    logout,
    isLoading,
    error
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}