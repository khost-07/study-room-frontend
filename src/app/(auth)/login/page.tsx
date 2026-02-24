'use client';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { PageTransition } from '@/components/ui/PageTransition';
import { FloatingInput } from '@/components/ui/FloatingInput';
import { TiltCard } from '@/components/ui/TiltCard';
import { MeshGradient } from '@/components/ui/MeshGradient';
import { MorphingButton, ButtonState } from '@/components/ui/MorphingButton';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [status, setStatus] = useState<ButtonState>('idle');
    const router = useRouter();
    const { setToken, setUser } = useAuthStore();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setStatus('loading');

        try {
            const res = await fetch('https://study-room-backend.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (!res.ok) {
                // Rate limit/Security UX: don't specify which field is incorrect
                throw new Error('Invalid email or password.');
            }

            setToken(data.token);
            setUser(data.user);
            setStatus('success');

            // Smooth morphing transition wait before pushing route
            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);

        } catch (err: any) {
            setError(err.message);
            setStatus('idle');
        }
    };

    return (
        <PageTransition>
            {/* Wrap the entire page in the new animated MeshGradient */}
            <MeshGradient>
                <div className="relative z-10 w-full max-w-[420px] px-4 py-8">
                    <TiltCard className="p-8 md:p-10">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] mb-6 ring-1 ring-white/60">
                                <BookOpen className="text-white w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 tracking-tight">
                                Study Room
                            </h2>
                            <p className="text-gray-500 text-sm mt-2 font-medium tracking-wide uppercase">
                                Focus. Learn. Achieve.
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm mb-6 text-center font-medium shadow-sm animate-shake">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="flex flex-col gap-5">
                            <FloatingInput
                                label="Email address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                            />

                            <div>
                                <FloatingInput
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="flex justify-between items-center mt-3 px-1">
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="remember" className="rounded-md border-gray-300 bg-white/50 accent-blue-500" />
                                        <label htmlFor="remember" className="text-xs text-gray-500 font-medium cursor-pointer">Remember me</label>
                                    </div>
                                    <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>

                            <MorphingButton
                                type="submit"
                                status={status}
                                className="mt-4"
                            >
                                Log in securely
                            </MorphingButton>
                        </form>

                        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
                            <span>Don't have an account?</span>
                            <Link href="/register" className="font-bold text-blue-600 relative group">
                                Create one
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </div>
                    </TiltCard>
                </div>

                {/* Shake animation for errors */}
                <style jsx global>{`
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
                        20%, 40%, 60%, 80% { transform: translateX(4px); }
                    }
                    .animate-shake {
                        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                    }
                `}</style>
            </MeshGradient>
        </PageTransition>
    );
}
