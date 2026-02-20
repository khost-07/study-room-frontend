'use client';
import { Calendar as CalendarIcon, Clock, Plus } from 'lucide-react';

export default function Schedule() {
    const sessions = [
        { id: 1, title: 'Calculus Study Group', time: '10:00 AM', duration: '2 hours', attendees: 4 },
        { id: 2, title: 'React Hooks Review', time: '2:30 PM', duration: '1 hour', attendees: 2 },
    ];

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                        Schedule
                    </h1>
                    <p className="text-gray-400">Plan your study sessions and stay on track.</p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-lg transition px-4 flex items-center gap-2 font-semibold">
                    <Plus size={18} /> New Session
                </button>
            </div>

            <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl overflow-hidden">
                <div className="p-6 border-b border-gray-700 bg-gray-750 flex justify-between items-center">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <CalendarIcon className="text-purple-400" /> Today's Sessions
                    </h2>
                </div>

                <div className="divide-y divide-gray-700">
                    {sessions.map(session => (
                        <div key={session.id} className="p-6 hover:bg-gray-750 transition flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-1">{session.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <span className="flex items-center gap-1"><Clock size={14} className="text-purple-400" /> {session.time}</span>
                                    <span>⏱ {session.duration}</span>
                                    <span>👥 {session.attendees} joining</span>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition text-gray-200">
                                Join Room
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
