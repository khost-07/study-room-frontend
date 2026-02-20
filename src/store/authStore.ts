import { create } from 'zustand';

interface AuthState {
    user: { id: string; name: string; email: string } | null;
    token: string | null;
    setUser: (user: any) => void;
    setToken: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    setUser: (user) => set({ user }),
    setToken: (token) => {
        localStorage.setItem('token', token);
        set({ token });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },
}));
