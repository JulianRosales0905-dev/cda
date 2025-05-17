import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

// Combine Tailwind classes and handle conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to display in Spanish locale
export function formatDate(date: Date | string): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'PPP', { locale: es });
}

// Format time from 24h to 12h format
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
}

// Validate Colombian vehicle plate
export function validateVehiclePlate(plate: string): boolean {
  // Colombian plates: 3 letters followed by 3 numbers (AAA123)
  const plateRegex = /^[A-Z]{3}\d{3}$/;
  return plateRegex.test(plate);
}

// Generate a fake certificate number
export function generateCertificateNumber(): string {
  const timestamp = new Date().getTime().toString().slice(-8);
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  return `CDA-${timestamp}-${random}`;
}

// Parse time string to get hour value (for calendar display)
export function getHourFromTimeString(time: string): number {
  const [hours] = time.split(':');
  return parseInt(hours);
}

// Check if a specific time slot is available for a technician
export function isTimeSlotAvailable(
  date: Date,
  timeSlot: string,
  technicianId: string,
  availabilities: any[],
  appointments: any[]
): boolean {
  // Check if the technician has this timeslot in their availabilities
  const dateStr = format(date, 'yyyy-MM-dd');
  const techAvailability = availabilities.find(
    (a) => 
      a.technicianId === technicianId && 
      format(new Date(a.date), 'yyyy-MM-dd') === dateStr
  );
  
  if (!techAvailability || !techAvailability.timeSlots.includes(timeSlot)) {
    return false;
  }
  
  // Check if there's already an appointment in this timeslot
  const hasAppointment = appointments.some(
    (a) => 
      a.technicianId === technicianId && 
      format(new Date(a.date), 'yyyy-MM-dd') === dateStr &&
      a.time === timeSlot &&
      a.status !== 'cancelled'
  );
  
  return !hasAppointment;
}