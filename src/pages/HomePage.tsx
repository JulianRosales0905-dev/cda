import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, Calendar, ClipboardCheck, BadgeCheck, 
  Clock, CheckCircle2, ShieldCheck
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-center bg-cover"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Revisión Técnico-Mecánica <br className="hidden md:block" /> de Excelencia
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              En CDA Diagnóstico garantizamos un servicio de alta calidad, eficiente y confiable para la revisión de su vehículo.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/servicios">
                <Button size="lg" variant="primary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Nuestros Servicios
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                  Agendar Cita
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">¿Por qué elegirnos?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Ofrecemos un servicio completo y eficiente para que su vehículo cumpla con todas las normativas vigentes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Servicio Rápido</h3>
                <p className="text-gray-600">
                  Realizamos su revisión en el menor tiempo posible sin sacrificar la calidad.
                </p>
              </CardContent>
            </Card>
            
            <Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Equipos Modernos</h3>
                <p className="text-gray-600">
                  Contamos con tecnología de punta para garantizar diagnósticos precisos.
                </p>
              </CardContent>
            </Card>
            
            <Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Total Confianza</h3>
                <p className="text-gray-600">
                  Nuestro personal certificado garantiza evaluaciones transparentes y confiables.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Services Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Nuestros Servicios</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              En CDA Diagnóstico ofrecemos soluciones completas para la revisión de su vehículo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Car className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Revisión Técnico-Mecánica</h3>
              <p className="text-gray-600 mb-4">
                Evaluación completa del funcionamiento mecánico de su vehículo.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <ClipboardCheck className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Control de Emisiones</h3>
              <p className="text-gray-600 mb-4">
                Verificación de las emisiones de gases contaminantes.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <BadgeCheck className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Certificación</h3>
              <p className="text-gray-600 mb-4">
                Emisión de certificados oficiales para su vehículo.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <Calendar className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Agendamiento</h3>
              <p className="text-gray-600 mb-4">
                Sistema de citas para su comodidad y ahorro de tiempo.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/servicios">
              <Button variant="primary">
                Ver todos los servicios
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Listo para revisar su vehículo?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Agende su cita ahora mismo para asegurar la certificación de su vehículo.
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

export default HomePage;