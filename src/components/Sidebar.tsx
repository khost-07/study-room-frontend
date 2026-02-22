'use client';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, Home, MessageSquare, Edit3, BookOpen, Calendar, Shield } from 'lucide-react';

export default function Sidebar() {
    const { logout, user } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Group Chat', href: '/dashboard/room', icon: MessageSquare },
        { name: 'Study Groups', href: '/dashboard/schedule', icon: Calendar },
        { name: 'Whiteboard', href: '/dashboard/whiteboard', icon: Edit3 },
        { name: 'Flashcards', href: '/dashboard/flashcards', icon: BookOpen },
        { name: 'Admin', href: '/dashboard/admin', icon: Shield },
    ];

    return (
        <aside className="w-64 bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col overflow-hidden relative">
            {/* Soft inner glow */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />

            <div className="p-8 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <BookOpen className="text-white w-4 h-4" />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        StudyRoom
                    </h1>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-1 relative z-10 custom-scrollbar overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3.5 p-3 rounded-2xl transition-all duration-300 font-medium ${isActive
                                ? 'bg-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-blue-600 border border-white'
                                : 'text-gray-500 hover:bg-white/40 hover:text-gray-900 border border-transparent'
                                }`}
                        >
                            <Icon size={18} className={isActive ? 'text-blue-500' : 'text-gray-400'} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mx-4 mb-4 mt-auto relative z-10">
                <div className="bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-100 to-blue-50 flex items-center justify-center border border-white text-blue-600 font-bold text-sm shadow-inner">
                            {user?.name?.charAt(0).toUpperCase() || 'G'}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold text-gray-800 truncate">{user?.name || 'Guest User'}</span>
                            <span className="text-xs text-gray-400 truncate">Student</span>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 text-rose-500 hover:text-white hover:bg-rose-500 transition-all duration-300 w-full p-2.5 rounded-xl text-sm font-semibold bg-white/60 border border-white hover:border-rose-400 shadow-sm"
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
