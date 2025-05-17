import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, ClipboardCheck, FileSpreadsheet, ShieldCheck, 
  CheckCircle2, AlertTriangle, Info, BarChart3 
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const ServicesPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Nuestros Servicios
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Conoce todos los servicios que ofrecemos para mantener tu vehículo en cumplimiento con las normativas vigentes
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Servicios Principales</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              En CDA Diagnóstico nos especializamos en servicios de revisión técnico-mecánica y de emisiones contaminantes para garantizar la seguridad y eficiencia de su vehículo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Card className="transform transition-all duration-300 hover:shadow-lg overflow-hidden">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/6870332/pexels-photo-6870332.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}></div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Car className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-medium text-gray-900 ml-2">Revisión Técnico-Mecánica</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Realizamos un diagnóstico completo de los sistemas mecánicos de su vehículo conforme a la normativa colombiana vigente. Evaluamos frenos, suspensión, dirección, luces, alineación y más.
                </p>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Sistema de frenos y suspensión</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Sistema de dirección y alineación</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Sistema eléctrico y luces</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Estado general de la carrocería</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="transform transition-all duration-300 hover:shadow-lg overflow-hidden">
              <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/4480505/pexels-photo-4480505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}></div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <ClipboardCheck className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-medium text-gray-900 ml-2">Control de Emisiones</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Verificamos que su vehículo cumpla con los niveles permitidos de emisiones contaminantes según las regulaciones ambientales, contribuyendo a la protección del medio ambiente.
                </p>
                <ul className="mb-4 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Análisis de gases para vehículos a gasolina</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Opacidad para vehículos diésel</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Verificación del sistema de control de emisiones</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Cumplimiento de normativas ambientales</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Servicios Adicionales</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Complementamos nuestro servicio principal con otras soluciones para su comodidad
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <FileSpreadsheet className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-medium text-gray-900 ml-2">Certificación</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Emisión inmediata de certificados de revisión técnico-mecánica y de emisiones contaminantes avalados por los entes reguladores.
                </p>
              </CardContent>
            </Card>
            
            <Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-medium text-gray-900 ml-2">Pre-revisión</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Servicio de diagnóstico preliminar para detectar posibles fallas que puedan impedir aprobar la revisión oficial.
                </p>
              </CardContent>
            </Card>
            
            <Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-medium text-gray-900 ml-2">Historial y Seguimiento</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Acceso al historial de inspecciones de su vehículo y recordatorios de próximas fechas de revisión.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Nuestro Proceso</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Conoce el proceso paso a paso para obtener tu certificado
            </p>
          </div>
          
          <div className="relative">
            {/* Process Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            <div className="space-y-12 md:space-y-0">
              {/* Step 1 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Agendamiento</h3>
                  <p className="text-gray-600">
                    Agende su cita a través de nuestra plataforma web o comunicándose directamente con nosotros.
                  </p>
                </div>
                
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full text-white">
                  1
                </div>
                
                <div className="flex-1 md:pl-8">
                  {/* Empty space on right side for first step in timeline */}
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 md:order-1 md:block hidden">
                  {/* Empty space on left side for second step in timeline */}
                </div>
                
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full text-white">
                  2
                </div>
                
                <div className="flex-1 md:pl-8 md:order-3 mb-4 md:mb-0">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Recepción</h3>
                  <p className="text-gray-600">
                    En la fecha programada, nuestro personal recibirá su vehículo y verificará su documentación.
                  </p>
                </div>
                
                <div className="flex-1 md:text-right md:pr-8 md:hidden block mb-4">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Recepción</h3>
                  <p className="text-gray-600">
                    En la fecha programada, nuestro personal recibirá su vehículo y verificará su documentación.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Inspección</h3>
                  <p className="text-gray-600">
                    Nuestros técnicos realizarán todas las pruebas necesarias para la revisión completa de su vehículo.
                  </p>
                </div>
                
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full text-white">
                  3
                </div>
                
                <div className="flex-1 md:pl-8">
                  {/* Empty space on right side for third step in timeline */}
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="flex-1 md:text-right md:pr-8 md:order-1 md:block hidden">
                  {/* Empty space on left side for fourth step in timeline */}
                </div>
                
                <div className="z-10 flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full text-white">
                  4
                </div>
                
                <div className="flex-1 md:pl-8 md:order-3 mb-4 md:mb-0">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Certificación</h3>
                  <p className="text-gray-600">
                    Una vez aprobada la revisión, se emitirá el certificado oficial que podrá descargar desde nuestra plataforma.
                  </p>
                </div>
                
                <div className="flex-1 md:text-right md:pr-8 md:hidden block mb-4">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Certificación</h3>
                  <p className="text-gray-600">
                    Una vez aprobada la revisión, se emitirá el certificado oficial que podrá descargar desde nuestra plataforma.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Preguntas Frecuentes</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Respuestas a las dudas más comunes sobre nuestros servicios
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start mb-2">
                  <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-medium text-gray-900">¿Cada cuánto debo realizar la revisión técnico-mecánica?</h3>
                </div>
                <p className="text-gray-600 ml-7">
                  Para vehículos particulares nuevos, la primera revisión debe realizarse a los 6 años. Para vehículos de servicio público, la primera revisión es al año de su matrícula. Posteriormente, las revisiones son anuales para todos los vehículos.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start mb-2">
                  <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-medium text-gray-900">¿Qué documentos debo presentar?</h3>
                </div>
                <p className="text-gray-600 ml-7">
                  Debe presentar la tarjeta de propiedad del vehículo, el SOAT vigente, y el comprobante de pago de la revisión. Si el vehículo es de servicio público, también debe presentar la tarjeta de operación.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start mb-2">
                  <Info className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-medium text-gray-900">¿Cuánto tiempo toma la revisión?</h3>
                </div>
                <p className="text-gray-600 ml-7">
                  El proceso completo toma aproximadamente entre 45 minutos y 1 hora, dependiendo del tipo de vehículo y la afluencia de público.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-medium text-gray-900">¿Qué pasa si mi vehículo no pasa la revisión?</h3>
                </div>
                <p className="text-gray-600 ml-7">
                  Si su vehículo no pasa la revisión, recibirá un informe detallado de las fallas. Tendrá 15 días para corregirlas y volver para una nueva inspección sin costo adicional.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Listo para obtener su certificado?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Agende su cita ahora y complete el proceso de manera rápida y eficiente.
            </p>
            <Link to="/login">
              <Button 
                size="lg" 
                variant="primary" 
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Agendar Cita
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;