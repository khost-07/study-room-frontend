'use client';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { LogOut, Home, MessageSquare, Edit3, BookOpen, Calendar, Shield } from 'lucide-react';

export default function Sidebar() {
    const { logout, user } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Study Room', href: '/dashboard/room', icon: MessageSquare },
        { name: 'Whiteboard', href: '/dashboard/whiteboard', icon: Edit3 },
        { name: 'Flashcards', href: '/dashboard/flashcards', icon: BookOpen },
        { name: 'Scheduler', href: '/dashboard/schedule', icon: Calendar },
        { name: 'Admin', href: '/dashboard/admin', icon: Shield },
    ];

    return (
        <aside className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen flex flex-col">
            <div className="p-6 border-b border-gray-700">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    StudyRoom
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition text-gray-300 hover:text-white"
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-400 truncate pr-2">{user?.name || 'Guest'}</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 transition w-full p-2 rounded hover:bg-gray-700"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
