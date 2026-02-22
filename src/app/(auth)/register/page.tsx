'use client';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { setToken, setUser } = useAuthStore();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('https://study-room-backend.onrender.com/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Registration failed');

            setToken(data.token);
            setUser(data.user);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden text-gray-800">
            {/* Ambient Animated Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-300/40 blur-[120px] mix-blend-multiply animate-blob pointer-events-none" />
            <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-teal-300/40 blur-[120px] mix-blend-multiply animate-blob animation-delay-2000 pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-blue-300/30 blur-[150px] mix-blend-multiply animate-blob animation-delay-4000 pointer-events-none" />

            <div className="relative z-10 w-full max-w-md px-6">
                <div className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/60">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-4">
                            <BookOpen className="text-white w-7 h-7" />
                        </div>
                        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Create Account
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">Join to start your collaborative learning journey</p>
                    </div>

                    {error && (
                        <div className="bg-rose-50/50 backdrop-blur-md border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-sm mb-6 text-center font-medium shadow-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="flex flex-col gap-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 pl-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full p-3.5 rounded-xl bg-white/50 border border-gray-200/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 focus:bg-white text-gray-800 placeholder-gray-400 transition-all shadow-sm backdrop-blur-sm"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 pl-1">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full p-3.5 rounded-xl bg-white/50 border border-gray-200/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 focus:bg-white text-gray-800 placeholder-gray-400 transition-all shadow-sm backdrop-blur-sm"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 pl-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full p-3.5 rounded-xl bg-white/50 border border-gray-200/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 focus:bg-white text-gray-800 placeholder-gray-400 transition-all shadow-sm backdrop-blur-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-2 w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white p-4 rounded-xl font-bold shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:shadow-emerald-500/40 active:scale-[0.98]"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-500 text-sm font-medium">
                        Already have an account?{' '}
                        <Link href="/login" className="text-emerald-600 hover:text-emerald-700 hover:underline transition-colors font-bold">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>

            {/* Tailwind Blob Animation */}
            <style jsx global>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 10s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
}
