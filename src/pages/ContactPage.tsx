import React from 'react';
import { 
  MapPin, Phone, Mail, Clock, Car, 
  Facebook, Instagram, Twitter 
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent } from '../components/ui/Card';

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Mensaje enviado. ¡Gracias por contactarnos!');
  };

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Contacto y Ubicación
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Estamos disponibles para resolver todas sus dudas y atender sus requerimientos
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Dirección</h3>
                    <p className="text-gray-600 mt-1">
                      Carrera 45 #50-12, Edificio Central<br />
                      Bogotá, Colombia
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Teléfono</h3>
                    <p className="text-gray-600 mt-1">
                      +57 (1) 234-5678<br />
                      +57 300 123-4567
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Correo Electrónico</h3>
                    <p className="text-gray-600 mt-1">
                      info@cdadiagnostico.com<br />
                      servicio@cdadiagnostico.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Horario de Atención</h3>
                    <p className="text-gray-600 mt-1">
                      Lunes a Viernes: 7:00 AM - 5:00 PM<br />
                      Sábados: 8:00 AM - 1:00 PM<br />
                      Domingos y Festivos: Cerrado
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Síguenos en redes sociales</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-blue-600">
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-600">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-600">
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <Car className="h-6 w-6 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-900 ml-2">Envíenos un mensaje</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <Input
                        label="Nombre"
                        type="text"
                        placeholder="Su nombre"
                        required
                      />
                      <Input
                        label="Apellido"
                        type="text"
                        placeholder="Su apellido"
                        required
                      />
                    </div>
                    
                    <Input
                      label="Correo Electrónico"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      required
                    />
                    
                    <Input
                      label="Teléfono"
                      type="tel"
                      placeholder="(123) 456-7890"
                    />
                    
                    <div className="mb-4">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="¿En qué podemos ayudarle?"
                        required
                      ></textarea>
                    </div>
                    
                    <Button type="submit" variant="primary" className="w-full">
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestra Ubicación</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Estamos ubicados en una zona central de fácil acceso
            </p>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg">
            {/* Map placeholder - in a real app, this would be an actual map integration */}
            <div className="h-96 bg-gray-300 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <p className="text-lg font-medium">Mapa de ubicación del CDA</p>
                <p className="text-gray-600 mt-2">Carrera 45 #50-12, Bogotá</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Transporte Público</h3>
                <p className="text-gray-600">
                  A 5 minutos de la estación de Transmilenio "Central" y rutas de buses urbanos 253, 301 y 507.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Estacionamiento</h3>
                <p className="text-gray-600">
                  Contamos con estacionamiento gratuito para nuestros clientes durante su visita al CDA.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Puntos de Referencia</h3>
                <p className="text-gray-600">
                  A dos cuadras del Centro Comercial Plaza Central y frente al Parque Metropolitano.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;