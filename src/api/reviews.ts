import { apiClient } from './client';
import { DoctorRatingSummary, PageResponse, Review, ReviewRequest } from '@/types';

export const reviewApi = {
  create: async (data: ReviewRequest): Promise<Review> => {
    const res = await apiClient.post<Review>('/api/reviews', data);
    return res.data;
  },

  getById: async (id: number | string): Promise<Review> => {
    const res = await apiClient.get<Review>(`/api/reviews/${id}`);
    return res.data;
  },

  getByAppointment: async (appointmentId: number | string): Promise<Review> => {
    const res = await apiClient.get<Review>(`/api/reviews/appointment/${appointmentId}`);
    return res.data;
  },

  getByDoctor: async (doctorId: number | string, page = 0, size = 10): Promise<PageResponse<Review>> => {
    const res = await apiClient.get<PageResponse<Review>>(`/api/reviews/doctor/${doctorId}`, {
      params: { page, size },
    });
    return res.data;
  },

  getDoctorSummary: async (doctorId: number | string): Promise<DoctorRatingSummary> => {
    const res = await apiClient.get<DoctorRatingSummary>(`/api/reviews/doctor/${doctorId}/summary`);
    return res.data;
  },

  getByPatient: async (patientId: number | string, page = 0, size = 10): Promise<PageResponse<Review>> => {
    const res = await apiClient.get<PageResponse<Review>>(`/api/reviews/patient/${patientId}`, {
      params: { page, size },
    });
    return res.data;
  },

  update: async (id: number | string, data: { rating: number; comment: string }): Promise<Review> => {
    const res = await apiClient.put<Review>(`/api/reviews/${id}`, data);
    return res.data;
  },

  delete: async (id: number | string): Promise<void> => {
    await apiClient.delete(`/api/reviews/${id}`);
  },
};
