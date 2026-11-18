import { apiClient } from './client';
import { ChatRequest, ChatResponse } from '@/types';

export const chatApi = {
  sendMessage: async (data: ChatRequest): Promise<ChatResponse> => {
    const res = await apiClient.post<ChatResponse>('/api/chat', data);
    return res.data;
  },
};
