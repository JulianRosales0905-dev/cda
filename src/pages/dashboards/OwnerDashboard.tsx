import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { 
  Calendar, FileText, Search, Download, CheckCircle2, XCircle, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useToast } from '../../contexts/ToastContext';
import { formatDate, validateVehiclePlate } from '../../lib/utils';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../components/ui/Card';
import { InspectionResult } from '../../lib/types';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const MyVehicles: React.FC = () => {
  const { vehicles, user, appointments } = useData();
  
  // Filter vehicles owned by the current user
  const myVehicles = vehicles.filter(vehicle => vehicle.ownerId === user?.id);
  
  // Get upcoming appointments for each vehicle
  const getUpcomingAppointment = (plate: string) => {
    const now = new Date();
    return appointments
      .filter(a => 
        a.vehiclePlate === plate && 
        a.status === 'scheduled' &&
        new Date(a.date) >= now
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  };

  return (
    <div>
      {myVehicles.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tiene vehículos registrados</h3>
            <p className="text-gray-600">
              No se encontraron vehículos asociados a su cuenta
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myVehicles.map(vehicle => {
            const upcomingAppointment = getUpcomingAppointment(vehicle.plate);
            
            return (
              <Card key={vehicle.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium text-gray-900">
                      {vehicle.plate}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {vehicle.brand}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-700">
                      <span className="font-medium">Modelo:</span> {vehicle.model}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Año:</span> {vehicle.year}
                    </p>
                  </div>
                  
                  {upcomingAppointment ? (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
                      <p className="text-sm font-medium text-blue-800">Próxima cita:</p>
                      <p className="text-sm text-blue-700">
                        {formatDate(upcomingAppointment.date)} a las {upcomingAppointment.time}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                      <p className="text-sm text-gray-600">No tiene citas programadas</p>
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-between">
                    <Link to={`/propietario/certificado/${vehicle.plate}`}>
                      <Button variant="outline" className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Ver Certificado
                      </Button>
                    </Link>
                    
                    <Link to="/recepcionista/agendar">
                      <Button variant="primary" className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar Cita
                      </Button>
                    </Link>
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

const CertificateView: React.FC = () => {
  const { getInspectionByPlate, getVehicleByPlate } = useData();
  const { addToast } = useToast();
  const [searchPlate, setSearchPlate] = useState(
    window.location.pathname.split('/').pop() || ''
  );
  const [plateError, setPlateError] = useState('');
  
  const validatePlate = () => {
    if (!searchPlate) {
      setPlateError('La placa del vehículo es requerida');
      return false;
    }
    
    if (!validateVehiclePlate(searchPlate)) {
      setPlateError('Información no válida. Intente nuevamente con un dato no mayor a seis caracteres');
      return false;
    }
    
    setPlateError('');
    return true;
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePlate()) {
      // Redirect to the certificate page with the new plate
      window.history.pushState(
        {}, 
        '', 
        `/propietario/certificado/${searchPlate.toUpperCase()}`
      );
      // Force re-render
      setSearchPlate(searchPlate.toUpperCase());
    }
  };
  
  const plate = window.location.pathname.split('/').pop() || '';
  const inspection = getInspectionByPlate(plate);
  const vehicle = getVehicleByPlate(plate);
  
  const generatePDF = () => {
    if (!inspection || !vehicle) return;
    
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.setTextColor(0, 51, 102);
    doc.text('Certificado de Revisión Técnico-Mecánica', 105, 20, { align: 'center' });
    
    // Add CDA info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('CDA Diagnóstico', 105, 30, { align: 'center' });
    doc.setFontSize(10);
    doc.text('NIT: 900.123.456-7', 105, 35, { align: 'center' });
    doc.text('Carrera 45 #50-12, Bogotá, Colombia', 105, 40, { align: 'center' });
    
    // Add line
    doc.setDrawColor(0, 51, 102);
    doc.line(20, 45, 190, 45);
    
    // Add certificate number
    doc.setFontSize(12);
    doc.setTextColor(0, 51, 102);
    doc.text(`Certificado No: ${inspection.certificateNumber}`, 20, 55);
    
    // Add vehicle info
    doc.setFontSize(12);
    doc.text('Información del Vehículo', 20, 65);
    
    const vehicleData = [
      ['Placa', vehicle.plate],
      ['Marca', vehicle.brand],
      ['Modelo', vehicle.model],
      ['Año', vehicle.year.toString()]
    ];
    
    (doc as any).autoTable({
      startY: 70,
      head: [['Característica', 'Valor']],
      body: vehicleData,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 51, 102],
        textColor: [255, 255, 255]
      }
    });
    
    // Add inspection results
    doc.text('Resultado de la Inspección', 20, (doc as any).lastAutoTable.finalY + 15);
    
    const resultText = 
      inspection.result === InspectionResult.APPROVED ? 'APROBADO' : 
      inspection.result === InspectionResult.REJECTED ? 'RECHAZADO' : 
      'PENDIENTE';
    
    const resultColor = 
      inspection.result === InspectionResult.APPROVED ? [0, 128, 0] : 
      inspection.result === InspectionResult.REJECTED ? [255, 0, 0] : 
      [255, 153, 0];
    
    doc.setTextColor(resultColor[0], resultColor[1], resultColor[2]);
    doc.setFontSize(16);
    doc.text(resultText, 105, (doc as any).lastAutoTable.finalY + 25, { align: 'center' });
    
    // Add inspection details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text('Detalles de la Inspección', 20, (doc as any).lastAutoTable.finalY + 35);
    
    const inspectionData = [
      ['Fecha de Inspección', formatDate(inspection.date)],
      ['Observaciones', inspection.observations || 'Sin observaciones']
    ];
    
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 40,
      body: inspectionData,
      theme: 'grid',
      styles: {
        overflow: 'linebreak'
      }
    });
    
    // Add footer
    doc.setFontSize(10);
    doc.text(
      'Este certificado es válido hasta el ' + 
      formatDate(new Date(new Date(inspection.date).setFullYear(new Date(inspection.date).getFullYear() + 1))),
      105, 
      (doc as any).lastAutoTable.finalY + 15, 
      { align: 'center' }
    );
    
    // Save the PDF
    doc.save(`certificado_${vehicle.plate}.pdf`);
    addToast('Certificado de inspección generado exitosamente', 'success');
  };

  return (
    <div>
      <Card className="mb-6">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex items-end gap-2">
            <div className="flex-1">
              <label htmlFor="plate" className="block text-sm font-medium text-gray-700 mb-1">
                Placa del Vehículo
              </label>
              <Input
                id="plate"
                type="text"
                value={searchPlate}
                onChange={(e) => {
                  setSearchPlate(e.target.value.toUpperCase());
                  if (plateError) validatePlate();
                }}
                placeholder="Ingrese la placa (AAA123)"
                error={plateError}
                maxLength={6}
                className="uppercase"
              />
            </div>
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {plate && !inspection && (
        <Card>
          <CardContent className="p-10 text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontró el certificado
            </h3>
            <p className="text-gray-600 mb-4">
              Error al generar el Certificado de inspección. Intente nuevamente
            </p>
          </CardContent>
        </Card>
      )}
      
      {inspection && vehicle && (
        <Card>
          <CardHeader className="border-b border-gray-200">
            <div className="flex justify-between items-center">
              <CardTitle>Certificado de Revisión Técnico-Mecánica</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center"
                onClick={generatePDF}
              >
                <Download className="h-4 w-4 mr-2" />
                Descargar PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Certificado No: {inspection.certificateNumber}
                </h3>
                <p className="text-sm text-gray-500">
                  Fecha de emisión: {formatDate(inspection.date)}
                </p>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                inspection.result === InspectionResult.APPROVED ? 'bg-green-100 text-green-800' : 
                inspection.result === InspectionResult.REJECTED ? 'bg-red-100 text-red-800' : 
                'bg-amber-100 text-amber-800'
              }`}>
                {inspection.result === InspectionResult.APPROVED ? 'APROBADO' : 
                 inspection.result === InspectionResult.REJECTED ? 'RECHAZADO' : 
                 'PENDIENTE'}
              </span>
            </div>
            
            <div className="mb-6">
              <h4 className="text-md font-medium text-gray-700 mb-2">Información del Vehículo</h4>
              <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Placa:</p>
                    <p className="font-medium">{vehicle.plate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Marca:</p>
                    <p className="font-medium">{vehicle.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Modelo:</p>
                    <p className="font-medium">{vehicle.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Año:</p>
                    <p className="font-medium">{vehicle.year}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-2">Observaciones</h4>
              <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                <p className="text-gray-700">
                  {inspection.observations || 'Sin observaciones registradas'}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t border-gray-200 p-4 text-center text-sm text-gray-500">
            Este certificado es válido hasta el {formatDate(new Date(new Date(inspection.date).setFullYear(new Date(inspection.date).getFullYear() + 1)))}
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

const OwnerDashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Panel del Propietario
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Bienvenido(a), {user?.name}
        </p>
      </div>
      
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:space-x-4">
        <Link to="/propietario">
          <Button 
            variant={location.pathname === '/propietario' ? 'primary' : 'outline'}
            className="mb-2 md:mb-0 w-full md:w-auto"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Mis Vehículos
          </Button>
        </Link>
        
        <Link to="/propietario/certificado">
          <Button 
            variant={location.pathname.includes('/propietario/certificado') ? 'primary' : 'outline'}
            className="mb-2 md:mb-0 w-full md:w-auto"
          >
            <FileText className="h-4 w-4 mr-2" />
            Certificados
          </Button>
        </Link>
      </div>
      
      <Routes>
        <Route path="/" element={<MyVehicles />} />
        <Route path="/certificado" element={<CertificateView />} />
        <Route path="/certificado/:plate" element={<CertificateView />} />
      </Routes>
    </div>
  );
};

export default OwnerDashboard;