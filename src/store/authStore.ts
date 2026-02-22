import { create } from 'zustand';

interface AuthState {
    user: { id: string; name: string; email: string } | null;
    token: string | null;
    isHydrated: boolean;
    setHydrated: () => void;
    setUser: (user: any) => void;
    setToken: (token: string) => void;
    logout: () => void;
    initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null, // Initial server state MUST match client default
    isHydrated: false,
    setHydrated: () => set({ isHydrated: true }),
    setUser: (user) => set({ user }),
    setToken: (token) => {
        if (typeof window !== 'undefined') localStorage.setItem('token', token);
        set({ token });
    },
    logout: () => {
        if (typeof window !== 'undefined') localStorage.removeItem('token');
        set({ user: null, token: null });
    },
    initializeAuth: () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            // Mocking user for now if token exists, since actual decode/fetchMe happens elsewhere
            if (token) set({ token });
            set({ isHydrated: true });
        }
    }
}));
