import { apiClient } from './client';
import { Department, DepartmentRequest } from '@/types';

export const departmentApi = {
  getAll: async (): Promise<Department[]> => {
    const res = await apiClient.get<Department[]>('/api/departments');
    return res.data;
  },

  getById: async (id: number | string): Promise<Department> => {
    const res = await apiClient.get<Department>(`/api/departments/${id}`);
    return res.data;
  },

  search: async (name: string): Promise<Department[]> => {
    const res = await apiClient.get<Department[]>('/api/departments/search', {
      params: { name },
    });
    return res.data;
  },

  create: async (data: DepartmentRequest): Promise<Department> => {
    const res = await apiClient.post<Department>('/api/departments', data);
    return res.data;
  },

  update: async (id: number | string, data: DepartmentRequest): Promise<Department> => {
    const res = await apiClient.put<Department>(`/api/departments/${id}`, data);
    return res.data;
  },

  delete: async (id: number | string): Promise<void> => {
    await apiClient.delete(`/api/departments/${id}`);
  },
};
