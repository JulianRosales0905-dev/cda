export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type Vehicle = {
  id: string;
  plate: string;
  brand: string;
  model: string;
  year: number;
  color?: string;
  serviceType?: string;
  ownerId: string;
};

export type Appointment = {
  id: string;
  vehiclePlate: string;
  date: Date;
  time: string;
  status: AppointmentStatus;
  technicianId: string;
  ownerId: string;
  createdAt: Date;
};

export type Photo = {
  id: string;
  url: string;
  description: string;
};

export type Inspection = {
  id: string;
  vehiclePlate: string;
  customerName: string;
  brand: string;
  model: string;
  serviceType: string;
  color: string;
  date: Date;
  result: InspectionResult;
  observations: string;
  technicianId: string;
  certificateNumber: string;
  createdAt: Date;
  photos: Photo[];
  accidentHistory: string;
};

export type TechnicianAvailability = {
  id: string;
  technicianId: string;
  date: Date;
  timeSlots: string[];
};

export enum UserRole {
  TECHNICIAN = "technician",
  RECEPTIONIST = "receptionist",
  ADMINISTRATIVE = "administrative",
  REGULATORY = "regulatory",
  OWNER = "owner"
}

export enum AppointmentStatus {
  SCHEDULED = "scheduled",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

export enum InspectionResult {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending',
}