// User & Authentication Types
export type UserRole = 'PATIENT' | 'DOCTOR' | 'RECEPTIONIST' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  role: UserRole;
  enabled: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest {
  email: string;
  password?: string;
  role: UserRole;
}

// Patient Types
export interface Patient {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  createdAt?: string;
}

export interface PatientRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  age: number;
  gender: string;
}

// Department Types
export interface Department {
  id: number;
  name: string;
  description: string;
  doctorCount?: number;
}

export interface DepartmentRequest {
  name: string;
  description: string;
}

// Doctor Types
export interface Doctor {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  licenseNumber: string;
  consultationFee: number;
  about: string;
  profileImageUrl?: string;
  departmentId: number;
  departmentName?: string;
  averageRating?: number;
  totalReviews?: number;
}

export interface DoctorRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  specialization: string;
  qualification: string;
  experienceYears: number;
  licenseNumber: string;
  consultationFee: number;
  about: string;
  profileImageUrl?: string;
  departmentId: number;
}

export interface DoctorSearchParams {
  query?: string;
  specialization?: string;
  departmentId?: number;
  minExperience?: number;
  maxFee?: number;
  page?: number;
  size?: number;
}

// Availability & Slots
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface DoctorAvailability {
  id: number;
  doctorId: number;
  dayOfWeek: DayOfWeek;
  startTime: string; // HH:mm:ss
  endTime: string;   // HH:mm:ss
  slotDurationMinutes: number;
  isAvailable: boolean;
}

export interface DoctorAvailabilityRequest {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
  isAvailable: boolean;
}

export interface Slot {
  startTime: string; // e.g. "09:00" or "09:00:00"
  endTime: string;   // e.g. "09:30" or "09:30:00"
  isAvailable: boolean;
  date: string;
}

// Appointment Types
export type AppointmentStatus = 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'REJECTED' | 'NO_SHOW' | 'PENDING';

export interface Appointment {
  id: number;
  patientId: number;
  patientName?: string;
  doctorId: number;
  doctorName?: string;
  doctorSpecialization?: string;
  departmentName?: string;
  appointmentDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime?: string;
  status: AppointmentStatus;
  consultationFee: number;
  reason: string;
  notes?: string;
  createdAt?: string;
}

export interface AppointmentRequest {
  patientId: number;
  doctorId: number;
  appointmentDate: string;
  startTime: string;
  reason: string;
  notes?: string;
}

export interface RescheduleRequest {
  appointmentDate: string;
  startTime: string;
  reason: string;
}

// Prescription Types
export interface Prescription {
  id: number;
  appointmentId: number;
  diagnosis: string;
  medicines: string;
  instructions: string;
  issuedAt?: string;
  doctorName?: string;
  patientName?: string;
}

export interface PrescriptionRequest {
  appointmentId: number;
  diagnosis: string;
  medicines: string;
  instructions: string;
}

// Review Types
export interface Review {
  id: number;
  appointmentId: number;
  patientId?: number;
  patientName?: string;
  doctorId?: number;
  rating: number; // 1 to 5
  comment: string;
  createdAt?: string;
}

export interface ReviewRequest {
  appointmentId: number;
  rating: number;
  comment: string;
}

export interface DoctorRatingSummary {
  doctorId: number;
  averageRating: number;
  totalReviews: number;
}

// AI Chatbot Types
export interface ChatRequest {
  message: string;
  conversationId: string;
}

export interface ChatResponse {
  response: string;
  conversationId: string;
  actions?: Array<{
    type: string;
    payload?: any;
  }>;
}

// Pagination generic
export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
