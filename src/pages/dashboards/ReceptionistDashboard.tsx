import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, List, PlusCircle, Edit, Trash2, Search,
  ChevronLeft, ChevronRight, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useToast } from '../../contexts/ToastContext';
import { formatDate, formatTime, validateVehiclePlate } from '../../lib/utils';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { AppointmentStatus } from '../../lib/types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentList: React.FC = () => {
  const { appointments, deleteAppointment, updateAppointment } = useData();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredAppointments = appointments
    .filter(appointment => 
      appointment.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(appointment => 
      statusFilter === 'all' ? true : appointment.status === statusFilter
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const handleEdit = (id: string) => {
    navigate(`/recepcionista/editar/${id}`);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('¿Está seguro que desea eliminar esta cita?')) {
      deleteAppointment(id);
      addToast('Cita eliminada correctamente', 'success');
    }
  };
  
  const handleStatusChange = (id: string, status: AppointmentStatus) => {
    updateAppointment(id, { status });
    addToast('Estado de la cita actualizado', 'success');
  };
  
  const statusColors = {
    [AppointmentStatus.SCHEDULED]: 'bg-blue-100 text-blue-800',
    [AppointmentStatus.COMPLETED]: 'bg-green-100 text-green-800',
    [AppointmentStatus.CANCELLED]: 'bg-red-100 text-red-800',
  };
  
  const statusLabels = {
    [AppointmentStatus.SCHEDULED]: 'Agendada',
    [AppointmentStatus.COMPLETED]: 'Completada',
    [AppointmentStatus.CANCELLED]: 'Cancelada',
  };

  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="relative">
            <Input
              placeholder="Buscar por placa"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Select
            options={[
              { value: 'all', label: 'Todos los estados' },
              { value: AppointmentStatus.SCHEDULED, label: 'Agendadas' },
              { value: AppointmentStatus.COMPLETED, label: 'Completadas' },
              { value: AppointmentStatus.CANCELLED, label: 'Canceladas' },
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-48"
          />
          
          <Link to="/recepcionista/agendar">
            <Button variant="primary" className="whitespace-nowrap flex items-center">
              <PlusCircle className="h-4 w-4 mr-2" />
              Nueva Cita
            </Button>
          </Link>
        </div>
      </div>
      
      {filteredAppointments.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay citas disponibles</h3>
            <p className="text-gray-600 mb-4">
              No se encontraron citas con los filtros seleccionados
            </p>
            <Link to="/recepcionista/agendar">
              <Button variant="primary">
                Agendar nueva cita
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredAppointments.map(appointment => (
            <Card key={appointment.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Placa: {appointment.vehiclePlate}
                      </h3>
                      <div className="mt-2 flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 gap-2 sm:gap-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(appointment.date)}
                        </div>
                        <div>
                          <span className="font-medium">Hora:</span> {formatTime(appointment.time)}
                        </div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[appointment.status]}`}>
                      {statusLabels[appointment.status]}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    {appointment.status === AppointmentStatus.SCHEDULED && (
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStatusChange(appointment.id, AppointmentStatus.COMPLETED)}
                        >
                          Marcar como completada
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStatusChange(appointment.id, AppointmentStatus.CANCELLED)}
                        >
                          Cancelar cita
                        </Button>
                      </div>
                    )}
                    
                    {appointment.status === AppointmentStatus.CANCELLED && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange(appointment.id, AppointmentStatus.SCHEDULED)}
                      >
                        Reactivar cita
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex md:flex-col border-t md:border-t-0 md:border-l border-gray-200 bg-gray-50">
                  <button
                    onClick={() => handleEdit(appointment.id)}
                    className="flex-1 flex items-center justify-center p-4 text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors"
                  >
                    <Edit className="h-5 w-5" />
                    <span className="ml-2 sr-only md:not-sr-only">Editar</span>
                  </button>
                  
                  <button
                    onClick={() => handleDelete(appointment.id)}
                    className="flex-1 flex items-center justify-center p-4 text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                    <span className="ml-2 sr-only md:not-sr-only">Eliminar</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

interface AppointmentFormProps {
  editMode?: boolean;
  appointmentId?: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ editMode = false, appointmentId }) => {
  const { appointments, addAppointment, updateAppointment, technicianAvailabilities, getVehicleByPlate } = useData();
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  const appointment = editMode && appointmentId 
    ? appointments.find(a => a.id === appointmentId) 
    : null;
  
  const [vehiclePlate, setVehiclePlate] = useState(appointment?.vehiclePlate || '');
  const [vehiclePlateError, setVehiclePlateError] = useState('');
  const [date, setDate] = useState<Date>(appointment?.date || new Date());
  const [time, setTime] = useState(appointment?.time || '09:00');
  const [technicianId, setTechnicianId] = useState(appointment?.technicianId || '1');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Simulated available time slots
  const availableTimeSlots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
  
  // Validate the vehicle plate
  const validatePlate = () => {
    if (!vehiclePlate) {
      setVehiclePlateError('La placa del vehículo es requerida');
      return false;
    }
    
    if (!validateVehiclePlate(vehiclePlate)) {
      setVehiclePlateError('Formato de placa inválido (Debe ser AAA123)');
      return false;
    }

    // For vehicle existence check in a real app we would check against a database
    // Here we're just checking our mock data
    const vehicle = getVehicleByPlate(vehiclePlate);
    if (!vehicle && !editMode) {
      // In a real app, you might want to show a form to add the vehicle first
      // For simplicity, we'll just show a warning
      setVehiclePlateError('Este vehículo no está registrado. Se registrará automáticamente.');
      // But we still allow it to continue
      return true;
    }
    
    setVehiclePlateError('');
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePlate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (editMode && appointment) {
        updateAppointment(appointment.id, {
          vehiclePlate: vehiclePlate.toUpperCase(),
          date,
          time,
          technicianId
        });
        addToast('Cita modificada correctamente', 'success');
      } else {
        await addAppointment({
          vehiclePlate: vehiclePlate.toUpperCase(),
          date,
          time,
          status: AppointmentStatus.SCHEDULED,
          technicianId,
          ownerId: '5' // In a real app, this would be the logged-in user's ID or selected from a list
        });
        addToast('Cita agendada correctamente', 'success');
      }
      
      navigate('/recepcionista');
    } catch (error) {
      addToast('Error al guardar la cita', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{editMode ? 'Editar' : 'Agendar'} Cita</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Placa del Vehículo
              </label>
              <Input
                type="text"
                value={vehiclePlate}
                onChange={(e) => {
                  setVehiclePlate(e.target.value.toUpperCase());
                  if (vehiclePlateError) validatePlate();
                }}
                placeholder="AAA123"
                error={vehiclePlateError}
                onBlur={validatePlate}
                maxLength={6}
                disabled={editMode}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <div className="relative">
                <DatePicker
                  selected={date}
                  onChange={(date: Date) => setDate(date)}
                  minDate={new Date()}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hora
              </label>
              <Select
                options={availableTimeSlots.map(slot => ({ value: slot, label: formatTime(slot) }))}
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Técnico
              </label>
              <Select
                options={[
                  { value: '1', label: 'Carlos Técnico' },
                  { value: '2', label: 'Laura Técnico' }
                ]}
                value={technicianId}
                onChange={(e) => setTechnicianId(e.target.value)}
              />
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/recepcionista')}
              >
                Cancelar
              </Button>
              
              <Button
                type="submit"
                isLoading={isSubmitting}
              >
                {editMode ? 'Actualizar' : 'Agendar'} Cita
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const ReceptionistDashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Panel de Recepcionista
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Bienvenido(a), {user?.name}
        </p>
      </div>
      
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:space-x-4">
        <Link to="/recepcionista">
          <Button 
            variant={location.pathname === '/recepcionista' ? 'primary' : 'outline'}
            className="mb-2 md:mb-0 w-full md:w-auto"
          >
            <List className="h-4 w-4 mr-2" />
            Lista de Citas
          </Button>
        </Link>
        
        <Link to="/recepcionista/agendar">
          <Button 
            variant={location.pathname.includes('/recepcionista/agendar') ? 'primary' : 'outline'}
            className="mb-2 md:mb-0 w-full md:w-auto"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Agendar Cita
          </Button>
        </Link>
      </div>
      
      <Routes>
        <Route path="/" element={<AppointmentList />} />
        <Route path="/agendar" element={<AppointmentForm />} />
        <Route path="/editar/:id" element={<AppointmentForm editMode appointmentId={window.location.pathname.split('/').pop()} />} />
      </Routes>
    </div>
  );
};

export default ReceptionistDashboard;