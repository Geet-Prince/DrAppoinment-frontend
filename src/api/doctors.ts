import { apiClient } from './client';
import {
  Doctor,
  DoctorRequest,
  DoctorSearchParams,
  DoctorAvailability,
  DoctorAvailabilityRequest,
  Slot,
  PageResponse,
} from '@/types';

export const doctorApi = {
  getAll: async (page = 0, size = 10, sort = 'experienceYears,desc'): Promise<PageResponse<Doctor>> => {
    const res = await apiClient.get<PageResponse<Doctor>>('/api/doctors', {
      params: { page, size, sort },
    });
    return res.data;
  },

  getById: async (id: number | string): Promise<Doctor> => {
    const res = await apiClient.get<Doctor>(`/api/doctors/${id}`);
    return res.data;
  },

  getByDepartment: async (deptId: number | string): Promise<Doctor[]> => {
    const res = await apiClient.get<Doctor[]>(`/api/doctors/department/${deptId}`);
    return res.data;
  },

  search: async (params: DoctorSearchParams): Promise<PageResponse<Doctor>> => {
    const res = await apiClient.get<PageResponse<Doctor>>('/api/doctors/search', {
      params,
    });
    return res.data;
  },

  create: async (data: DoctorRequest): Promise<Doctor> => {
    const res = await apiClient.post<Doctor>('/api/doctors', data);
    return res.data;
  },

  update: async (id: number | string, data: DoctorRequest): Promise<Doctor> => {
    const res = await apiClient.put<Doctor>(`/api/doctors/${id}`, data);
    return res.data;
  },

  delete: async (id: number | string): Promise<void> => {
    await apiClient.delete(`/api/doctors/${id}`);
  },

  // Availability & Slots
  getAvailability: async (doctorId: number | string): Promise<DoctorAvailability[]> => {
    const res = await apiClient.get<DoctorAvailability[]>(`/api/doctors/${doctorId}/availability`);
    return res.data;
  },

  addAvailability: async (
    doctorId: number | string,
    data: DoctorAvailabilityRequest
  ): Promise<DoctorAvailability> => {
    const res = await apiClient.post<DoctorAvailability>(`/api/doctors/${doctorId}/availability`, data);
    return res.data;
  },

  updateAvailability: async (
    doctorId: number | string,
    availabilityId: number | string,
    data: DoctorAvailabilityRequest
  ): Promise<DoctorAvailability> => {
    const res = await apiClient.put<DoctorAvailability>(
      `/api/doctors/${doctorId}/availability/${availabilityId}`,
      data
    );
    return res.data;
  },

  deleteAvailability: async (doctorId: number | string, availabilityId: number | string): Promise<void> => {
    await apiClient.delete(`/api/doctors/${doctorId}/availability/${availabilityId}`);
  },

  getSlots: async (doctorId: number | string, date: string): Promise<Slot[]> => {
    const res = await apiClient.get<Slot[]>(`/api/doctors/${doctorId}/slots`, {
      params: { date },
    });
    return res.data;
  },
};
