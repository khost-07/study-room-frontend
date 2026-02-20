'use client';
import { useAuthStore } from '@/store/authStore';
import Pomodoro from '@/components/Pomodoro';
import Link from 'next/link';

export default function Dashboard() {
    const { user } = useAuthStore();

    const quickLinks = [
        { title: 'Join Study Room', desc: 'Chat and collaborate instantly', href: '/dashboard/room', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
        { title: 'Shared Whiteboard', desc: 'Draw and brainstorm together', href: '/dashboard/whiteboard', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
        { title: 'Flashcards & Quizzes', desc: 'Review your decks', href: '/dashboard/flashcards', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    ];

    return (
        <div className="p-8 h-full overflow-y-auto">
            <header className="mb-10">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
                    Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
                </h1>
                <p className="text-gray-400 text-lg">Ready to make today productive?</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {quickLinks.map((link) => (
                    <Link href={link.href} key={link.title}>
                        <div className={`p-6 rounded-2xl border ${link.color} transition hover:scale-[1.02] cursor-pointer h-full`}>
                            <h3 className="text-xl font-semibold mb-2">{link.title}</h3>
                            <p className="opacity-80">{link.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-6">Focus Session</h2>
                    <Pomodoro />
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-6">Upcoming Schedule</h2>
                    <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl">
                        <div className="text-center py-8 text-gray-500">
                            <span className="block text-4xl mb-3">📅</span>
                            <p>No upcoming study sessions today.</p>
                            <button className="mt-4 text-sm text-blue-400 hover:underline">Schedule one now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
