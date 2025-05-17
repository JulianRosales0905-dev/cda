import React from 'react';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useToast } from '../../contexts/ToastContext';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 max-w-xs">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'rounded-md shadow-lg transform transition-all duration-300 ease-in-out flex items-center p-4',
            toast.type === 'success' && 'bg-green-50 border border-green-200',
            toast.type === 'error' && 'bg-red-50 border border-red-200',
            toast.type === 'warning' && 'bg-amber-50 border border-amber-200',
            toast.type === 'info' && 'bg-blue-50 border border-blue-200'
          )}
          role="alert"
        >
          <div className="flex-shrink-0">
            {toast.type === 'success' && (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
            {toast.type === 'warning' && (
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            )}
            {toast.type === 'info' && (
              <Info className="h-5 w-5 text-blue-500" />
            )}
          </div>
          <div className="ml-3 flex-1">
            <p
              className={cn(
                'text-sm font-medium',
                toast.type === 'success' && 'text-green-800',
                toast.type === 'error' && 'text-red-800',
                toast.type === 'warning' && 'text-amber-800',
                toast.type === 'info' && 'text-blue-800'
              )}
            >
              {toast.message}
            </p>
          </div>
          <button
            type="button"
            className={cn(
              'inline-flex flex-shrink-0 ml-2 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
              toast.type === 'success' && 'text-green-500 focus:ring-green-500',
              toast.type === 'error' && 'text-red-500 focus:ring-red-500',
              toast.type === 'warning' && 'text-amber-500 focus:ring-amber-500',
              toast.type === 'info' && 'text-blue-500 focus:ring-blue-500'
            )}
            onClick={() => removeToast(toast.id)}
          >
            <span className="sr-only">Cerrar</span>
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;