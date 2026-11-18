import { apiClient } from './client';
import { PageResponse, Prescription, PrescriptionRequest } from '@/types';

export const prescriptionApi = {
  issue: async (data: PrescriptionRequest): Promise<Prescription> => {
    const res = await apiClient.post<Prescription>('/api/prescriptions', data);
    return res.data;
  },

  getById: async (id: number | string): Promise<Prescription> => {
    const res = await apiClient.get<Prescription>(`/api/prescriptions/${id}`);
    return res.data;
  },

  getByAppointment: async (appointmentId: number | string): Promise<Prescription> => {
    const res = await apiClient.get<Prescription>(`/api/prescriptions/appointment/${appointmentId}`);
    return res.data;
  },

  getByPatient: async (patientId: number | string, page = 0, size = 10): Promise<PageResponse<Prescription>> => {
    const res = await apiClient.get<PageResponse<Prescription>>(`/api/prescriptions/patient/${patientId}`, {
      params: { page, size },
    });
    return res.data;
  },

  getByDoctor: async (doctorId: number | string, page = 0, size = 10): Promise<PageResponse<Prescription>> => {
    const res = await apiClient.get<PageResponse<Prescription>>(`/api/prescriptions/doctor/${doctorId}`, {
      params: { page, size },
    });
    return res.data;
  },

  update: async (id: number | string, data: PrescriptionRequest): Promise<Prescription> => {
    const res = await apiClient.put<Prescription>(`/api/prescriptions/${id}`, data);
    return res.data;
  },
};
