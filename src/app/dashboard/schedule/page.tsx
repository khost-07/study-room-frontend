'use client';
import { Calendar as CalendarIcon, Clock, Plus, Users } from 'lucide-react';
import Link from 'next/link';

export default function Schedule() {
    const sessions = [
        { id: 1, title: 'Calculus Study Group', time: '10:00 AM', duration: '2 hours', attendees: 4, color: 'from-blue-500 to-indigo-500', shadow: 'shadow-blue-500/20' },
        { id: 2, title: 'React Hooks Review', time: '2:30 PM', duration: '1 hour', attendees: 2, color: 'from-fuchsia-500 to-pink-500', shadow: 'shadow-fuchsia-500/20' },
    ];

    return (
        <div className="p-8 md:p-10 h-full overflow-y-auto custom-scrollbar relative">
            {/* Ambient Background Glows */}
            <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-blue-300/30 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-pink-300/30 blur-[100px] pointer-events-none" />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <CalendarIcon className="text-white w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-1 tracking-tight">
                            Schedule
                        </h1>
                        <p className="text-gray-500 font-medium">Plan your study sessions and stay on track.</p>
                    </div>
                </div>
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-3 rounded-xl transition-all shadow-lg shadow-indigo-500/25 px-5 flex items-center gap-2 font-bold active:scale-95">
                    <Plus size={18} strokeWidth={3} /> New Session
                </button>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative z-10">
                <div className="p-6 border-b border-gray-100 bg-white/40 flex justify-between items-center backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                        Today's Sessions
                        <span className="bg-indigo-100 text-indigo-700 text-xs py-1 px-2.5 rounded-full font-bold">2 sessions</span>
                    </h2>
                </div>

                <div className="divide-y divide-gray-100/50">
                    {sessions.map(session => (
                        <div key={session.id} className="p-6 hover:bg-white/60 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group">
                            <div className="flex items-start gap-5">
                                <div className={`mt-1 w-12 h-12 rounded-2xl bg-gradient-to-br ${session.color} flex items-center justify-center shadow-lg ${session.shadow} shrink-0`}>
                                    <Clock className="text-white w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">{session.title}</h3>
                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm font-semibold text-gray-500">
                                        <span className="flex items-center gap-1.5 bg-gray-100/80 px-3 py-1.5 rounded-lg text-gray-700">
                                            <Clock size={14} className="text-indigo-500" /> {session.time}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                            {session.duration}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">
                                            <Users size={14} /> {session.attendees} joining
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Link href={`/dashboard/schedule/${session.id}`}>
                                <button className="w-full md:w-auto px-6 py-3 bg-white border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md rounded-xl text-sm font-bold transition-all text-gray-700 active:scale-95 shadow-sm">
                                    Join Room
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
