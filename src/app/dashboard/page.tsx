'use client';
import { useAuthStore } from '@/store/authStore';
import Pomodoro from '@/components/Pomodoro';
import Link from 'next/link';
import { Users, Presentation, Layers, ArrowRight, Calendar as CalendarIcon } from 'lucide-react';

export default function Dashboard() {
    const { user } = useAuthStore();

    const quickLinks = [
        {
            title: 'Group Chat',
            desc: 'Chat & collaborate instantly',
            href: '/dashboard/room',
            icon: Users,
            color: 'from-blue-500 to-indigo-600',
            bgLight: 'bg-blue-50/50',
            shadow: 'shadow-blue-500/20'
        },
        {
            title: 'Whiteboard',
            desc: 'Draw & brainstorm together',
            href: '/dashboard/whiteboard',
            icon: Presentation,
            color: 'from-purple-500 to-fuchsia-600',
            bgLight: 'bg-purple-50/50',
            shadow: 'shadow-purple-500/20'
        },
        {
            title: 'Flashcards',
            desc: 'Review custom decks',
            href: '/dashboard/flashcards',
            icon: Layers,
            color: 'from-emerald-400 to-teal-500',
            bgLight: 'bg-emerald-50/50',
            shadow: 'shadow-emerald-500/20'
        },
    ];

    return (
        <div className="p-8 md:p-10 h-full overflow-y-auto custom-scrollbar">
            <header className="mb-12">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent mb-3 tracking-tight">
                    Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
                </h1>
                <p className="text-gray-500 text-lg font-medium">Ready to make today your most productive day yet?</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {quickLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link href={link.href} key={link.title} scroll={false}>
                            <div className={`group relative p-6 rounded-3xl ${link.bgLight} border border-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer h-full flex flex-col overflow-hidden`}>
                                {/* Soft ambient hover glow */}
                                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br ${link.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />

                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center shadow-lg ${link.shadow} mb-5`}>
                                    <Icon className="text-white w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1.5">{link.title}</h3>
                                <p className="text-gray-500 text-sm font-medium flex-1">{link.desc}</p>

                                <div className="mt-4 flex items-center text-sm font-bold text-gray-400 group-hover:text-gray-800 transition-colors">
                                    Open App <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        Focus Session
                    </h2>
                    <div className="flex-1 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-sm p-2 flex items-center justify-center min-h-[300px]">
                        <Pomodoro />
                    </div>
                </div>

                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        Upcoming Schedule
                    </h2>
                    <div className="flex-1 bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/60 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
                        <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                            <CalendarIcon className="w-10 h-10 text-blue-300" />
                        </div>
                        <p className="text-gray-800 font-semibold text-lg mb-2">No upcomings sessions</p>
                        <p className="text-gray-500 text-sm text-center max-w-xs mb-6">Your calendar is clear for today. Take a break or schedule a new study block.</p>
                        <Link href="/dashboard/schedule">
                            <button className="px-6 py-2.5 bg-white border border-gray-200 hover:border-blue-200 hover:text-blue-600 rounded-xl text-sm font-bold text-gray-600 transition-all shadow-sm active:scale-95">
                                Open Calendar
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
