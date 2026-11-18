import { apiClient } from './client';
import { Patient, PatientRequest } from '@/types';

export const patientApi = {
  create: async (data: PatientRequest): Promise<Patient> => {
    const res = await apiClient.post<Patient>('/api/patients', data);
    return res.data;
  },

  getAll: async (): Promise<Patient[]> => {
    const res = await apiClient.get<Patient[]>('/api/patients');
    return res.data;
  },

  getById: async (id: number | string): Promise<Patient> => {
    const res = await apiClient.get<Patient>(`/api/patients/${id}`);
    return res.data;
  },

  update: async (id: number | string, data: PatientRequest): Promise<Patient> => {
    const res = await apiClient.put<Patient>(`/api/patients/${id}`, data);
    return res.data;
  },

  delete: async (id: number | string): Promise<void> => {
    await apiClient.delete(`/api/patients/${id}`);
  },
};
