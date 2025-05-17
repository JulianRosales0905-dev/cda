import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Clipboard, ListChecks, Search, CheckCircle2, XCircle, AlertTriangle,
  Camera, Calendar, Clock, FileText, Car
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useToast } from '../../contexts/ToastContext';
import { formatDate } from '../../lib/utils';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { InspectionResult } from '../../lib/types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentList: React.FC = () => {
  const { appointments, user } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredAppointments = appointments
    .filter(appointment => 
      appointment.technicianId === user?.id && 
      appointment.status !== 'cancelled' &&
      appointment.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div>
      <div className="mb-6">
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
      
      {filteredAppointments.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay citas programadas</h3>
            <p className="text-gray-600">
              No tiene citas asignadas en este momento
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAppointments.map(appointment => (
            <Card key={appointment.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Placa: {appointment.vehiclePlate}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Fecha: {formatDate(appointment.date)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Hora: {appointment.time}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {appointment.status === 'scheduled' ? 'Pendiente' : 'Completada'}
                  </span>
                </div>
                
                <Link to={`/tecnico/inspeccion/${appointment.vehiclePlate}`}>
                  <Button 
                    variant="primary"
                    className="w-full"
                  >
                    {appointment.status === 'scheduled' ? 'Realizar Inspección' : 'Ver Detalles'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

interface InspectionFormProps {
  plate?: string;
}

interface Photo {
  id: string;
  url: string;
  description: string;
}

const InspectionForm: React.FC<InspectionFormProps> = ({ plate = '' }) => {
  const { addInspection } = useData();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  
  const [vehiclePlate, setVehiclePlate] = useState(plate.toUpperCase());
  const [plateError, setPlateError] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [result, setResult] = useState<InspectionResult>(InspectionResult.PENDING);
  const [observations, setObservations] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [accidentHistory, setAccidentHistory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFields = () => {
    if (!vehiclePlate) {
      setPlateError('La placa del vehículo es requerida');
      return false;
    }
    if (!customerName.trim()) {
      addToast('El nombre del cliente es requerido', 'error');
      return false;
    }
    if (!brand.trim() || !model.trim() || !color.trim() || !serviceType.trim()) {
      addToast('Todos los campos del vehículo son requeridos', 'error');
      return false;
    }
    return true;
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos: Photo[] = Array.from(files).map(file => ({
        id: Math.random().toString(),
        url: URL.createObjectURL(file),
        description: ''
      }));
      setPhotos([...photos, ...newPhotos]);
    }
  };

  const handlePhotoDescriptionChange = (id: string, description: string) => {
    setPhotos(photos.map(photo => 
      photo.id === id ? { ...photo, description } : photo
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateFields()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      addInspection({
        vehiclePlate: vehiclePlate.toUpperCase(),
        customerName,
        brand,
        model,
        color,
        serviceType,
        date: new Date(),
        result,
        observations,
        technicianId: user?.id || '1',
        photos,
        accidentHistory
      });
      
      addToast('Inspección registrada exitosamente', 'success');
      navigate('/tecnico/inspecciones-lista');
    } catch (error) {
      addToast('Error al registrar la inspección', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro de Inspección</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Cliente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nombre del Cliente"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nombre completo"
                required
              />
              <Input
                label="Placa del Vehículo"
                value={vehiclePlate}
                onChange={(e) => {
                  setVehiclePlate(e.target.value.toUpperCase());
                  setPlateError('');
                }}
                placeholder="ABC123"
                error={plateError}
                maxLength={6}
                className="uppercase"
                required
              />
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Información del Vehículo</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Marca"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Marca del vehículo"
                required
              />
              <Input
                label="Modelo"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Modelo del vehículo"
                required
              />
              <Input
                label="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Color del vehículo"
                required
              />
              <Select
                label="Tipo de Servicio"
                options={[
                  { value: 'particular', label: 'Particular' },
                  { value: 'publico', label: 'Público' },
                  { value: 'carga', label: 'Carga' }
                ]}
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Accident History */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Historial de Accidentes</h3>
            <textarea
              value={accidentHistory}
              onChange={(e) => setAccidentHistory(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
              placeholder="Describa el historial de accidentes del vehículo si existe"
            />
          </div>

          {/* Photo Upload */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Fotos del Vehículo</h3>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
              >
                <Camera className="h-5 w-5 mr-2" />
                Agregar Fotos
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative">
                    <img
                      src={photo.url}
                      alt="Vehicle inspection"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <textarea
                      value={photo.description}
                      onChange={(e) => handlePhotoDescriptionChange(photo.id, e.target.value)}
                      placeholder="Agregar descripción"
                      className="mt-2 w-full text-sm rounded-md border-gray-300"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Inspection Result */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Resultado de la Inspección</h3>
            <div className="space-y-4">
              <Select
                label="Resultado"
                options={[
                  { value: InspectionResult.APPROVED, label: 'Aprobado' },
                  { value: InspectionResult.REJECTED, label: 'Rechazado' },
                  { value: InspectionResult.PENDING, label: 'Pendiente' }
                ]}
                value={result}
                onChange={(e) => setResult(e.target.value as InspectionResult)}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observaciones
                </label>
                <textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={4}
                  placeholder="Ingrese las observaciones de la inspección"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/tecnico')}
            >
              Cancelar
            </Button>
            
            <Button
              type="submit"
              variant={result === InspectionResult.APPROVED ? 'success' : 
                      result === InspectionResult.REJECTED ? 'danger' : 'primary'}
              isLoading={isSubmitting}
            >
              {result === InspectionResult.APPROVED ? (
                <><CheckCircle2 className="w-4 h-4 mr-2" /> Aprobar Inspección</>
              ) : result === InspectionResult.REJECTED ? (
                <><XCircle className="w-4 h-4 mr-2" /> Rechazar Inspección</>
              ) : (
                'Guardar como Pendiente'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const CompletedInspections: React.FC = () => {
  const { inspections, user } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedInspection, setExpandedInspection] = useState<string | null>(null);
  
  const filteredInspections = inspections
    .filter(inspection => 
      inspection.technicianId === user?.id &&
      (inspection.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
       inspection.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const toggleExpand = (id: string) => {
    setExpandedInspection(expandedInspection === id ? null : id);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <Input
            placeholder="Buscar por placa o nombre del cliente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      {filteredInspections.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay inspecciones registradas</h3>
            <p className="text-gray-600">
              No ha realizado ninguna inspección hasta el momento
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredInspections.map(inspection => (
            <Card 
              key={inspection.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => toggleExpand(inspection.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Cliente: {inspection.customerName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Placa: {inspection.vehiclePlate}
                    </p>
                    <p className="text-sm text-gray-500">
                      Fecha: {formatDate(inspection.date)}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    inspection.result === InspectionResult.APPROVED ? 'bg-green-100 text-green-800' : 
                    inspection.result === InspectionResult.REJECTED ? 'bg-red-100 text-red-800' : 
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {inspection.result === InspectionResult.APPROVED ? 'Aprobado' : 
                     inspection.result === InspectionResult.REJECTED ? 'Rechazado' : 
                     'Pendiente'}
                  </span>
                </div>

                {expandedInspection === inspection.id && (
                  <div className="mt-4 space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Información del Vehículo</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Marca:</p>
                          <p className="font-medium">{inspection.brand}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Modelo:</p>
                          <p className="font-medium">{inspection.model}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Color:</p>
                          <p className="font-medium">{inspection.color}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Tipo de Servicio:</p>
                          <p className="font-medium">{inspection.serviceType}</p>
                        </div>
                      </div>
                    </div>

                    {inspection.accidentHistory && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Historial de Accidentes</h4>
                        <p className="text-sm text-gray-600">{inspection.accidentHistory}</p>
                      </div>
                    )}

                    {inspection.observations && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Observaciones</h4>
                        <p className="text-sm text-gray-600">{inspection.observations}</p>
                      </div>
                    )}

                    {inspection.photos.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Fotos</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {inspection.photos.map(photo => (
                            <div key={photo.id}>
                              <img
                                src={photo.url}
                                alt={photo.description}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                              {photo.description && (
                                <p className="mt-2 text-sm text-gray-600">{photo.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Información del Certificado</h4>
                      <p className="text-sm text-gray-600">
                        Número de Certificado: {inspection.certificateNumber}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

const TechnicianDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Panel de Técnico
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Bienvenido(a), {user?.name}
        </p>
      </div>
      
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:space-x-4">
        <Link to="/tecnico">
          <Button 
            variant={location.pathname === '/tecnico' ? 'primary' : 'outline'}
            className="mb-2 md:mb-0 w-full md:w-auto"
          >
            <Clipboard className="h-4 w-4 mr-2" />
            Citas Asignadas
          </Button>
        </Link>
        
        <Link to="/tecnico/inspeccion">
          <Button 
            variant={location.pathname.includes('/tecnico/inspeccion') && !location.pathname.includes('/lista') ? 'primary' : 'outline'}
            className="mb-2 md:mb-0 w-full md:w-auto"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Registrar Inspección
          </Button>
        </Link>
        
        <Link to="/tecnico/inspecciones-lista">
          <Button 
            variant={location.pathname.includes('/tecnico/inspecciones-lista') ? 'primary' : 'outline'}
            className="mb-2 md:mb-0 w-full md:w-auto"
          >
            <ListChecks className="h-4 w-4 mr-2" />
            Historial de Inspecciones
          </Button>
        </Link>
      </div>
      
      <Routes>
        <Route path="/" element={<AppointmentList />} />
        <Route path="/inspeccion" element={<InspectionForm />} />
        <Route path="/inspeccion/:plate" element={
          <InspectionForm plate={window.location.pathname.split('/').pop() || ''} />
        } />
        <Route path="/inspecciones-lista" element={<CompletedInspections />} />
      </Routes>
    </div>
  );
};

export default TechnicianDashboard;
