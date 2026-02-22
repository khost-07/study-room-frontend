'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { token, isHydrated, initializeAuth } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    useEffect(() => {
        if (isHydrated && !token) {
            router.push('/login');
        }
    }, [token, isHydrated, router]);

    // Prevent any rendering until the client hydrated the token from localStorage
    if (!isHydrated) return null;

    // Extra safeguard while pushing to login
    if (!token) return null;

    return (
        <div className="flex min-h-screen bg-gray-50 relative overflow-hidden text-gray-800">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-400/20 blur-[150px] pointer-events-none" />
            <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-emerald-400/10 blur-[100px] pointer-events-none" />

            <div className="flex w-full h-screen p-4 md:p-6 gap-6 relative z-10">
                <Sidebar />
                <main className="flex-1 flex flex-col bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.05)] overflow-hidden relative">
                    {children}
                </main>
            </div>
        </div>
    );
}
