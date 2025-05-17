import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { 
  FileText, Search, Download, FileBarChart, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { useToast } from '../../contexts/ToastContext';
import { formatDate } from '../../lib/utils';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { InspectionResult } from '../../lib/types';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InspectionHistory: React.FC = () => {
  const { inspections, vehicles } = useData();
  const { addToast } = useToast();
  
  const [startDate, setStartDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  
  // Get inspections in date range
  const filteredInspections = inspections.filter(inspection => {
    const inspectionDate = new Date(inspection.date);
    return inspectionDate >= startDate && inspectionDate <= endDate;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Get vehicle details
  const getVehicleDetails = (plate: string) => {
    const vehicle = vehicles.find(v => v.plate === plate);
    return vehicle ? `${vehicle.brand} ${vehicle.model} (${vehicle.year})` : 'N/A';
  };
  
  const exportHistoryPDF = () => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(16);
    doc.setTextColor(0, 51, 102);
    doc.text('Historial de Certificaciones', 105, 20, { align: 'center' });
    
    // Add date range
    doc.setFontSize(12);
    doc.text(`Periodo: ${formatDate(startDate)} - ${formatDate(endDate)}`, 105, 30, { align: 'center' });
    
    // Add table with inspections
    const tableData = filteredInspections.map(inspection => [
      inspection.certificateNumber,
      inspection.vehiclePlate,
      getVehicleDetails(inspection.vehiclePlate),
      formatDate(inspection.date),
      inspection.result === InspectionResult.APPROVED ? 'Aprobado' :
      inspection.result === InspectionResult.REJECTED ? 'Rechazado' : 'Pendiente'
    ]);
    
    (doc as any).autoTable({
      startY: 40,
      head: [['No. Certificado', 'Placa', 'Vehículo', 'Fecha', 'Resultado']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 51, 102],
        textColor: [255, 255, 255]
      },
      styles: {
        overflow: 'linebreak',
        cellWidth: 'wrap'
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 25 },
        2: { cellWidth: 50 },
        3: { cellWidth: 35 },
        4: { cellWidth: 30 }
      }
    });
    
    // Add summary
    const approvedCount = filteredInspections.filter(i => i.result === InspectionResult.APPROVED).length;
    const rejectedCount = filteredInspections.filter(i => i.result === InspectionResult.REJECTED).length;
    const pendingCount = filteredInspections.filter(i => i.result === InspectionResult.PENDING).length;
    
    doc.text('Resumen:', 20, (doc as any).lastAutoTable.finalY + 15);
    
    const summaryData = [
      ['Total certificados', filteredInspections.length.toString()],
      ['Aprobados', approvedCount.toString()],
      ['Rechazados', rejectedCount.toString()],
      ['Pendientes', pendingCount.toString()]
    ];
    
    (doc as any).autoTable({
      startY: (doc as any).lastAutoTable.finalY + 20,
      body: summaryData,
      theme: 'grid',
      styles: {
        overflow: 'linebreak'
      }
    });
    
    // Add footer with date
    const today = new Date();
    doc.setFontSize(10);
    doc.text(
      `Reporte generado el ${formatDate(today)}`,
      105, 
      (doc as any).lastAutoTable.finalY + 15, 
      { align: 'center' }
    );
    
    // Save the PDF
    doc.save(`historial_certificaciones_${startDate.toISOString().split('T')[0]}_${endDate.toISOString().split('T')[0]}.pdf`);
    addToast('Historial exportado correctamente', 'success');
  };

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Historial de Certificaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Inicial
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                maxDate={endDate}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha Final
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date()}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          
          {filteredInspections.length > 0 && (
            <div className="flex justify-end">
              <Button 
                variant="primary" 
                className="flex items-center"
                onClick={exportHistoryPDF}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar Historial
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {filteredInspections.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">El historial de certificaciones está vacío</h3>
            <p className="text-gray-600">
              No se encontraron certificaciones en el rango de fechas seleccionado
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No. Certificado
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Placa
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehículo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resultado
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInspections.map(inspection => (
                    <tr key={inspection.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {inspection.certificateNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {inspection.vehiclePlate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getVehicleDetails(inspection.vehiclePlate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(inspection.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          inspection.result === InspectionResult.APPROVED ? 'bg-green-100 text-green-800' : 
                          inspection.result === InspectionResult.REJECTED ? 'bg-red-100 text-red-800' : 
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {inspection.result === InspectionResult.APPROVED ? 'Aprobado' : 
                           inspection.result === InspectionResult.REJECTED ? 'Rechazado' : 
                           'Pendiente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const RegulatoryDashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Panel de Entidad Reguladora
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Bienvenido(a), {user?.name}
        </p>
      </div>
      
      <Routes>
        <Route path="/*" element={<InspectionHistory />} />
      </Routes>
    </div>
  );
};

export default RegulatoryDashboard;