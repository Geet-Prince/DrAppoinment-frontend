import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  updateUser: (user: User) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  setAuth: (token, user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dr_app_token', token);
      localStorage.setItem('dr_app_user', JSON.stringify(user));
    }
    set({ token, user, isAuthenticated: true });
  },

  updateUser: (user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dr_app_user', JSON.stringify(user));
    }
    set({ user });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dr_app_token');
      localStorage.removeItem('dr_app_user');
    }
    set({ token: null, user: null, isAuthenticated: false });
  },

  initialize: () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('dr_app_token');
      const userStr = localStorage.getItem('dr_app_user');
      let user: User | null = null;
      if (userStr) {
        try {
          user = JSON.parse(userStr);
        } catch {
          user = null;
        }
      }
      if (token && user) {
        set({ token, user, isAuthenticated: true });
      }
    }
  },
}));
