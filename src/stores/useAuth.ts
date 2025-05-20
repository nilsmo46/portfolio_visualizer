import { create } from 'zustand';
import axios from '@/lib/axios';
import { baseURL } from '@/constants';
;


interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  verifyLogin: () => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  isLoggedIn: false,
  loading: false,
  verifyLogin: async () => {
    const token = localStorage.getItem("token");
    if (!token) return set({ isLoggedIn: false });

    set({ loading: true });
    try {
      const res = await axios.get(`${baseURL}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) set({ isLoggedIn: true });
    } catch (e) {
      console.log(e);
      localStorage.removeItem("token");
      set({ isLoggedIn: false });
    } finally {
      set({ loading: false });
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ isLoggedIn: false });
  },
}));
