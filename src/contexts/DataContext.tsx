import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Appointment, 
  Vehicle, 
  Inspection, 
  TechnicianAvailability,
  AppointmentStatus,
  InspectionResult
} from '../lib/types';
import { generateCertificateNumber } from '../lib/utils';
import { useAuth } from './AuthContext';

// Define the context type
type DataContextType = {
  vehicles: Vehicle[];
  appointments: Appointment[];
  inspections: Inspection[];
  technicianAvailabilities: TechnicianAvailability[];
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => Promise<Appointment>;
  updateAppointment: (id: string, data: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  addInspection: (inspection: Omit<Inspection, 'id' | 'createdAt' | 'certificateNumber'>) => Inspection;
  getInspectionByPlate: (plate: string) => Inspection | undefined;
  getInspectionsByDateRange: (startDate: Date, endDate: Date) => Inspection[];
  updateTechnicianAvailability: (technicianId: string, date: Date, timeSlots: string[]) => void;
  getTechnicianAvailability: (technicianId: string, date: Date) => string[];
  getVehicleByPlate: (plate: string) => Vehicle | undefined;
};

// Mock data
const initialVehicles: Vehicle[] = [
  { id: '1', plate: 'ABC123', brand: 'Toyota', model: 'Corolla', year: 2020, ownerId: '5' },
  { id: '2', plate: 'XYZ789', brand: 'Honda', model: 'Civic', year: 2019, ownerId: '5' },
  { id: '3', plate: 'DEF456', brand: 'Mazda', model: 'CX-5', year: 2021, ownerId: '6' },
];

// Create context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Date helper to create dates
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

// Initial mock appointments
const initialAppointments: Appointment[] = [
  {
    id: '1',
    vehiclePlate: 'ABC123',
    date: tomorrow,
    time: '09:00',
    status: AppointmentStatus.SCHEDULED,
    technicianId: '1',
    ownerId: '5',
    createdAt: today
  },
  {
    id: '2',
    vehiclePlate: 'XYZ789',
    date: nextWeek,
    time: '14:30',
    status: AppointmentStatus.SCHEDULED,
    technicianId: '1',
    ownerId: '5',
    createdAt: today
  }
];

// Initial mock inspections with photos
const initialInspections: Inspection[] = [
  {
    id: '1',
    vehiclePlate: 'DEF456',
    date: new Date(today.setDate(today.getDate() - 15)),
    result: InspectionResult.APPROVED,
    observations: 'Vehículo en buenas condiciones',
    technicianId: '1',
    certificateNumber: 'CDA-20230701-12345',
    createdAt: new Date(today.setDate(today.getDate() - 15)),
    photos: [
      {
        id: '1',
        url: 'https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg',
        description: 'Vista frontal'
      },
      {
        id: '2',
        url: 'https://images.pexels.com/photos/3807330/pexels-photo-3807330.jpeg',
        description: 'Vista lateral'
      }
    ],
    accidentHistory: 'Sin historial de accidentes reportados'
  },
  {
    id: '2',
    vehiclePlate: 'ABC123',
    date: new Date(today.setDate(today.getDate() - 30)),
    result: InspectionResult.REJECTED,
    observations: 'Sistema de frenos requiere mantenimiento',
    technicianId: '1',
    certificateNumber: 'CDA-20230601-54321',
    createdAt: new Date(today.setDate(today.getDate() - 30)),
    photos: [
      {
        id: '3',
        url: 'https://images.pexels.com/photos/3807331/pexels-photo-3807331.jpeg',
        description: 'Sistema de frenos'
      }
    ],
    accidentHistory: 'Colisión menor reportada en 2022, reparada'
  }
];

// Initial technician availabilities
const initialTechnicianAvailabilities: TechnicianAvailability[] = [
  {
    id: '1',
    technicianId: '1',
    date: tomorrow,
    timeSlots: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  },
  {
    id: '2',
    technicianId: '1',
    date: nextWeek,
    timeSlots: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  }
];

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [inspections, setInspections] = useState<Inspection[]>(initialInspections);
  const [technicianAvailabilities, setTechnicianAvailabilities] = useState<TechnicianAvailability[]>(initialTechnicianAvailabilities);

  // Load data from localStorage on initial load
  useEffect(() => {
    const storedVehicles = localStorage.getItem('cda_vehicles');
    const storedAppointments = localStorage.getItem('cda_appointments');
    const storedInspections = localStorage.getItem('cda_inspections');
    const storedAvailabilities = localStorage.getItem('cda_availabilities');
    
    if (storedVehicles) setVehicles(JSON.parse(storedVehicles));
    if (storedAppointments) {
      const parsedAppointments = JSON.parse(storedAppointments);
      // Convert date strings to Date objects
      setAppointments(parsedAppointments.map((appt: any) => ({
        ...appt,
        date: new Date(appt.date),
        createdAt: new Date(appt.createdAt)
      })));
    }
    if (storedInspections) {
      const parsedInspections = JSON.parse(storedInspections);
      setInspections(parsedInspections.map((insp: any) => ({
        ...insp,
        date: new Date(insp.date),
        createdAt: new Date(insp.createdAt)
      })));
    }
    if (storedAvailabilities) {
      const parsedAvailabilities = JSON.parse(storedAvailabilities);
      setTechnicianAvailabilities(parsedAvailabilities.map((avail: any) => ({
        ...avail,
        date: new Date(avail.date)
      })));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cda_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('cda_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('cda_inspections', JSON.stringify(inspections));
  }, [inspections]);

  useEffect(() => {
    localStorage.setItem('cda_availabilities', JSON.stringify(technicianAvailabilities));
  }, [technicianAvailabilities]);

  // Add a new vehicle
  const addVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
    const newVehicle = {
      ...vehicle,
      id: Date.now().toString()
    };
    setVehicles([...vehicles, newVehicle]);
  };

  // Get vehicle by plate
  const getVehicleByPlate = (plate: string) => {
    return vehicles.find(v => v.plate === plate);
  };

  // Add a new appointment
  const addAppointment = async (appointmentData: Omit<Appointment, 'id' | 'createdAt'>): Promise<Appointment> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newAppointment = {
      ...appointmentData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    
    setAppointments([...appointments, newAppointment]);
    return newAppointment;
  };

  // Update an appointment
  const updateAppointment = (id: string, data: Partial<Appointment>) => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id ? { ...appointment, ...data } : appointment
    ));
  };

  // Delete an appointment
  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  // Add a new inspection
  const addInspection = (inspectionData: Omit<Inspection, 'id' | 'createdAt' | 'certificateNumber'>) => {
    const certificateNumber = generateCertificateNumber();
    
    const newInspection = {
      ...inspectionData,
      id: Date.now().toString(),
      certificateNumber,
      createdAt: new Date()
    };
    
    setInspections([...inspections, newInspection]);
    return newInspection;
  };

  // Get inspection by vehicle plate
  const getInspectionByPlate = (plate: string) => {
    return inspections.find(inspection => inspection.vehiclePlate === plate);
  };

  // Get inspections within a date range
  const getInspectionsByDateRange = (startDate: Date, endDate: Date) => {
    return inspections.filter(inspection => {
      const inspectionDate = new Date(inspection.date);
      return inspectionDate >= startDate && inspectionDate <= endDate;
    });
  };

  // Update technician availability
  const updateTechnicianAvailability = (technicianId: string, date: Date, timeSlots: string[]) => {
    const dateStr = date.toISOString().split('T')[0];
    const existingIndex = technicianAvailabilities.findIndex(
      a => a.technicianId === technicianId && new Date(a.date).toISOString().split('T')[0] === dateStr
    );
    
    if (existingIndex >= 0) {
      // Update existing availability
      const updatedAvailabilities = [...technicianAvailabilities];
      updatedAvailabilities[existingIndex] = {
        ...updatedAvailabilities[existingIndex],
        timeSlots
      };
      setTechnicianAvailabilities(updatedAvailabilities);
    } else {
      // Create new availability
      const newAvailability: TechnicianAvailability = {
        id: Date.now().toString(),
        technicianId,
        date,
        timeSlots
      };
      setTechnicianAvailabilities([...technicianAvailabilities, newAvailability]);
    }
  };

  // Get technician availability for a specific date
  const getTechnicianAvailability = (technicianId: string, date: Date): string[] => {
    const dateStr = date.toISOString().split('T')[0];
    const availability = technicianAvailabilities.find(
      a => a.technicianId === technicianId && new Date(a.date).toISOString().split('T')[0] === dateStr
    );
    
    return availability ? availability.timeSlots : [];
  };

  const value = {
    vehicles,
    appointments,
    inspections,
    technicianAvailabilities,
    addVehicle,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    addInspection,
    getInspectionByPlate,
    getInspectionsByDateRange,
    updateTechnicianAvailability,
    getTechnicianAvailability,
    getVehicleByPlate
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}