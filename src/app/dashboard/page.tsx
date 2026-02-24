'use client';
import { useAuthStore } from '@/store/authStore';
import Pomodoro from '@/components/Pomodoro';
import Link from 'next/link';
import { Users, Presentation, Layers, ArrowRight, Calendar as CalendarIcon } from 'lucide-react';
import { LiquidGlassCard } from '@/components/ui/LiquidGlassCard';
import { PageTransition } from '@/components/ui/PageTransition';

export default function Dashboard() {
    const { user } = useAuthStore();

    const quickLinks = [
        {
            title: 'Group Chat',
            desc: 'Chat & collaborate instantly',
            href: '/dashboard/room',
            icon: Users,
            colorHint: 'bg-blue-500',
            bgLight: 'bg-blue-500/10',
            shadow: 'shadow-blue-500/20'
        },
        {
            title: 'Whiteboard',
            desc: 'Draw & brainstorm together',
            href: '/dashboard/whiteboard',
            icon: Presentation,
            colorHint: 'bg-purple-500',
            bgLight: 'bg-purple-500/10',
            shadow: 'shadow-purple-500/20'
        },
        {
            title: 'Flashcards',
            desc: 'Review custom decks',
            href: '/dashboard/flashcards',
            icon: Layers,
            colorHint: 'bg-emerald-500',
            bgLight: 'bg-emerald-500/10',
            shadow: 'shadow-emerald-500/20'
        },
    ];

    return (
        <PageTransition>
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
                            <Link href={link.href} key={link.title} scroll={false} className="h-full block">
                                <LiquidGlassCard
                                    className={`group cursor-pointer h-full flex flex-col p-6 ${link.bgLight}`}
                                    colorHint={link.colorHint}
                                >
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-white/40 to-white/10 flex items-center justify-center shadow-lg ${link.shadow} mb-5 border border-white/40 backdrop-blur-md`}>
                                        <Icon className="text-gray-800 w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-1.5">{link.title}</h3>
                                    <p className="text-gray-500 text-sm font-medium flex-1">{link.desc}</p>

                                    <div className="mt-4 flex items-center text-sm font-bold text-gray-400 group-hover:text-gray-800 transition-colors">
                                        Open App <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </LiquidGlassCard>
                            </Link>
                        )
                    })}
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            Focus Session
                        </h2>
                        <LiquidGlassCard className="flex-1 p-2 flex items-center justify-center min-h-[300px]" interactive={false}>
                            <Pomodoro />
                        </LiquidGlassCard>
                    </div>

                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            Upcoming Schedule
                        </h2>
                        <LiquidGlassCard className="flex-1 p-8 flex flex-col items-center justify-center min-h-[300px]" interactive={false}>
                            <div className="w-20 h-20 rounded-full bg-blue-50/50 flex items-center justify-center mb-6 border border-white/60">
                                <CalendarIcon className="w-10 h-10 text-blue-400" />
                            </div>
                            <p className="text-gray-800 font-semibold text-lg mb-2">No upcomings sessions</p>
                            <p className="text-gray-500 text-sm text-center max-w-xs mb-6">Your calendar is clear for today. Take a break or schedule a new study block.</p>
                            <Link href="/dashboard/schedule">
                                <button className="px-6 py-2.5 bg-white/60 backdrop-blur-md border border-white hover:border-blue-200 hover:text-blue-600 rounded-xl text-sm font-bold text-gray-600 transition-all shadow-sm active:scale-95">
                                    Open Calendar
                                </button>
                            </Link>
                        </LiquidGlassCard>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
