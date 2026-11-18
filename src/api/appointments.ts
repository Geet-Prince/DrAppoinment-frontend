import { apiClient } from './client';
import {
  Appointment,
  AppointmentRequest,
  AppointmentStatus,
  PageResponse,
  RescheduleRequest,
} from '@/types';

export const appointmentApi = {
  book: async (data: AppointmentRequest): Promise<Appointment> => {
    const res = await apiClient.post<Appointment>('/api/appointments', data);
    return res.data;
  },

  getById: async (id: number | string): Promise<Appointment> => {
    const res = await apiClient.get<Appointment>(`/api/appointments/${id}`);
    return res.data;
  },

  getByPatient: async (patientId: number | string, page = 0, size = 10): Promise<PageResponse<Appointment>> => {
    const res = await apiClient.get<PageResponse<Appointment>>(`/api/appointments/patient/${patientId}`, {
      params: { page, size },
    });
    return res.data;
  },

  getByDoctor: async (doctorId: number | string, page = 0, size = 10): Promise<PageResponse<Appointment>> => {
    const res = await apiClient.get<PageResponse<Appointment>>(`/api/appointments/doctor/${doctorId}`, {
      params: { page, size },
    });
    return res.data;
  },

  getByStatus: async (status: AppointmentStatus): Promise<Appointment[]> => {
    const res = await apiClient.get<Appointment[]>(`/api/appointments/status/${status}`);
    return res.data;
  },

  cancel: async (id: number | string, reason: string): Promise<Appointment> => {
    const res = await apiClient.patch<Appointment>(`/api/appointments/${id}/cancel`, null, {
      params: { reason },
    });
    return res.data;
  },

  reschedule: async (id: number | string, data: RescheduleRequest): Promise<Appointment> => {
    const res = await apiClient.patch<Appointment>(`/api/appointments/${id}/reschedule`, data);
    return res.data;
  },

  updateStatus: async (
    id: number | string,
    status: AppointmentStatus,
    notes?: string
  ): Promise<Appointment> => {
    const res = await apiClient.patch<Appointment>(`/api/appointments/${id}/status`, { status, notes });
    return res.data;
  },
};
