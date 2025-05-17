import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { 
  Calendar, User, Clock, AlertTriangle, Plus, Save
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useToast } from '../../contexts/ToastContext';
import { formatDate } from '../../lib/utils';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

const TechnicianCalendar: React.FC = () => {
  const { technicianAvailabilities, updateTechnicianAvailability } = useData();
  const { addToast } = useToast();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTechnician, setSelectedTechnician] = useState('1');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  
  // Simulated technician data
  const technicians = [
    { id: '1', name: 'Carlos Técnico' },
    { id: '2', name: 'Laura Técnico' }
  ];
  
  // Get current availability for the selected date and technician
  React.useEffect(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const availability = technicianAvailabilities.find(
      a => a.technicianId === selectedTechnician && 
      new Date(a.date).toISOString().split('T')[0] === dateStr
    );
    
    setSelectedTimeSlots(availability ? [...availability.timeSlots] : []);
  }, [selectedDate, selectedTechnician, technicianAvailabilities]);
  
  const toggleTimeSlot = (timeSlot: string) => {
    setSelectedTimeSlots(prevSlots => {
      if (prevSlots.includes(timeSlot)) {
        return prevSlots.filter(slot => slot !== timeSlot);
      } else {
        return [...prevSlots, timeSlot].sort();
      }
    });
  };
  
  const handleSave = () => {
    updateTechnicianAvailability(selectedTechnician, selectedDate, selectedTimeSlots);
    addToast('Disponibilidad actualizada correctamente', 'success');
  };
  
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Gestión de Disponibilidad de Técnicos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seleccione un Técnico
              </label>
              <Select
                options={technicians.map(tech => ({ value: tech.id, label: tech.name }))}
                value={selectedTechnician}
                onChange={(e) => setSelectedTechnician(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seleccione una Fecha
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date) => setSelectedDate(date)}
                minDate={new Date()}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="border-b border-gray-200">
          <div className="flex justify-between items-center">
            <CardTitle>Horarios Disponibles: {formatDate(selectedDate)}</CardTitle>
            <Button 
              variant="primary" 
              size="sm"
              onClick={handleSave}
              className="flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {timeSlots.map(timeSlot => (
              <div 
                key={timeSlot}
                className={`border rounded-md p-3 text-center cursor-pointer transition-colors ${
                  selectedTimeSlots.includes(timeSlot) 
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => toggleTimeSlot(timeSlot)}
              >
                {timeSlot}
              </div>
            ))}
          </div>
          
          {selectedTimeSlots.length === 0 && (
            <div className="mt-6 text-center text-gray-500">
              No hay horarios seleccionados. Haga clic en los horarios para marcarlos como disponibles.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const CalendarView: React.FC = () => {
  const { technicianAvailabilities, appointments } = useData();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTechnician, setSelectedTechnician] = useState('all');
  
  // Simulated technician data
  const technicians = [
    { id: '1', name: 'Carlos Técnico' },
    { id: '2', name: 'Laura Técnico' }
  ];
  
  // Filter availabilities for the selected date
  const dateStr = selectedDate.toISOString().split('T')[0];
  
  const filteredAvailabilities = technicianAvailabilities.filter(
    a => new Date(a.date).toISOString().split('T')[0] === dateStr &&
    (selectedTechnician === 'all' || a.technicianId === selectedTechnician)
  );
  
  // Get appointments for the selected date
  const appointmentsForDate = appointments.filter(
    a => new Date(a.date).toISOString().split('T')[0] === dateStr &&
    a.status !== 'cancelled' &&
    (selectedTechnician === 'all' || a.technicianId === selectedTechnician)
  );
  
  const getAppointmentForTimeSlot = (technicianId: string, timeSlot: string) => {
    return appointmentsForDate.find(
      a => a.technicianId === technicianId && a.time === timeSlot
    );
  };
  
  return (
    <div>
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por Técnico
              </label>
              <Select
                options={[
                  { value: 'all', label: 'Todos los técnicos' },
                  ...technicians.map(tech => ({ value: tech.id, label: tech.name }))
                ]}
                value={selectedTechnician}
                onChange={(e) => setSelectedTechnician(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seleccione una Fecha
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date) => setSelectedDate(date)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {filteredAvailabilities.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay disponibilidad configurada</h3>
            <p className="text-gray-600 mb-4">
              No se ha configurado disponibilidad para la fecha y técnico seleccionados
            </p>
            <Link to="/administrativo">
              <Button variant="primary">
                Configurar Disponibilidad
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredAvailabilities.map(availability => {
            const technician = technicians.find(t => t.id === availability.technicianId);
            
            return (
              <Card key={availability.id}>
                <CardHeader className="border-b border-gray-200">
                  <CardTitle>
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-blue-600" />
                      {technician ? technician.name : 'Técnico'}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {availability.timeSlots.map(timeSlot => {
                      const appointment = getAppointmentForTimeSlot(availability.technicianId, timeSlot);
                      
                      return (
                        <div 
                          key={timeSlot}
                          className={`border rounded-md p-3 text-center ${
                            appointment 
                              ? 'bg-green-100 border-green-500 text-green-800'
                              : 'bg-blue-50 border-blue-200 text-blue-700'
                          }`}
                        >
                          <div className="font-medium">{timeSlot}</div>
                          {appointment && (
                            <div className="mt-1 text-xs">
                              {appointment.vehiclePlate}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

const AdministrativeDashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Panel Administrativo
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Bienvenido(a), {user?.name}
        </p>
      </div>
      
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:space-x-4">
        <Link to="/administrativo">
          <Button 
            variant={location.pathname === '/administrativo' ? 'primary' : 'outline'}
            className="mb-2 md:mb-0 w-full md:w-auto"
          >
            <Clock className="h-4 w-4 mr-2" />
            Gestionar Disponibilidad
          </Button>
        </Link>
        
        <Link to="/administrativo/calendario">
          <Button 
            variant={location.pathname.includes('/administrativo/calendario') ? 'primary' : 'outline'}
            className="mb-2 md:mb-0 w-full md:w-auto"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Ver Calendario
          </Button>
        </Link>
      </div>
      
      <Routes>
        <Route path="/" element={<TechnicianCalendar />} />
        <Route path="/calendario" element={<CalendarView />} />
      </Routes>
    </div>
  );
};

export default AdministrativeDashboard;