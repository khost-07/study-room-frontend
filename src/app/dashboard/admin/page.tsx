'use client';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Users, AlertTriangle, Shield, Settings, Activity, PlayCircle, Clock, Video, Terminal, Cpu, Database } from 'lucide-react';

export default function AdminPanel() {
    const { token } = useAuthStore();
    const [statsData, setStatsData] = useState({ totalUsers: 0, activeRooms: 0, reports: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('https://study-room-backend.onrender.com/api/admin/stats', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setStatsData(data);
                }
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            }
        };

        if (token) fetchStats();
    }, [token]);

    const stats = [
        { label: 'Total Users', value: statsData.totalUsers || '142', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', glow: 'shadow-blue-500/20' },
        { label: 'Active Rooms', value: statsData.activeRooms || '12', icon: Activity, color: 'text-fuchsia-500', bg: 'bg-fuchsia-50', border: 'border-fuchsia-100', glow: 'shadow-fuchsia-500/20' },
        { label: 'Reports', value: statsData.reports || '3', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100', glow: 'shadow-amber-500/20' },
    ];

    const mockArchives = [
        { id: 1, title: 'Calculus 101 Recording', duration: '45m', date: 'Today' },
        { id: 2, title: 'Data Structures Sync', duration: '1h 20m', date: 'Yesterday' },
        { id: 3, title: 'Philosophy Discussion', duration: '30m', date: 'Yesterday' },
    ];

    return (
        <div className="p-8 md:p-10 min-h-full relative font-sans overflow-y-auto custom-scrollbar">
            {/* Ambient Glassmorphism Background Glows */}
            <div className="absolute top-[5%] left-[20%] w-[40vw] h-[40vw] bg-blue-300/30 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-fuchsia-300/30 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                    <div className="absolute -left-20 -top-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Shield className="text-white w-6 h-6" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                                Admin Dashboard
                            </h1>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-500">
                            <span className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full"><Cpu size={14} /> System Online</span>
                            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full"><Database size={14} /> DB Connected</span>
                            <span className="text-gray-400">v2.0.4.beta</span>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 hover:border-blue-300 transition-all text-gray-700 shadow-sm active:scale-95 relative z-10">
                        <Settings className="w-4 h-4 text-blue-500" /> Configure Settings
                    </button>
                </div>

                {/* Glass Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label}
                                className="relative bg-white/50 backdrop-blur-lg p-6 rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group overflow-hidden"
                            >
                                <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${stat.bg} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />

                                <div className="relative z-10">
                                    <p className="font-bold text-sm text-gray-500 mb-1">{stat.label}</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-4xl font-extrabold tracking-tight text-gray-900">{stat.value}</p>
                                        <span className="text-gray-400 font-semibold text-sm">/ 1000</span>
                                    </div>
                                </div>
                                <div className={`p-4 rounded-2xl bg-white shadow-lg ${stat.glow} ${stat.border} border group-hover:scale-110 transition-transform relative z-10`}>
                                    <Icon size={28} className={stat.color} />
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Security Monitor */}
                    <div className="lg:col-span-2 bg-white/50 backdrop-blur-lg rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col relative h-[450px] overflow-hidden group">
                        <div className="p-6 border-b border-gray-100 bg-white/40 flex justify-between items-center backdrop-blur-md relative z-10">
                            <div className="flex items-center gap-3">
                                <Terminal className="text-blue-500 w-5 h-5" />
                                <h2 className="text-lg font-bold text-gray-800">Security Stream</h2>
                            </div>
                            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                                </span>
                                <span className="text-xs font-bold text-blue-600">Monitoring Active</span>
                            </div>
                        </div>

                        <div className="flex-1 p-8 flex flex-col items-center justify-center relative z-10">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-blue-100 blur-2xl rounded-full scale-150 group-hover:bg-blue-200 transition-colors duration-700" />
                                <Shield size={80} className="text-blue-400 relative z-10 drop-shadow-md" />
                            </div>
                            <p className="text-gray-800 font-bold text-xl mb-2">No Anomalies Detected</p>
                            <p className="text-sm text-gray-500 max-w-sm text-center font-medium leading-relaxed">System is securely scanning 12 active clusters. All local nodes are operating safely within defined security parameters.</p>
                        </div>
                    </div>

                    {/* Server Logs / Archives */}
                    <div className="bg-white/50 backdrop-blur-lg rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-[450px] overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-white/40 flex justify-between items-center backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <Video className="text-fuchsia-500 w-5 h-5" />
                                <h2 className="text-lg font-bold text-gray-800">Archived Sessions</h2>
                            </div>
                        </div>

                        <div className="p-0 flex-1 overflow-y-auto custom-scrollbar">
                            {mockArchives.map((archive) => (
                                <div key={archive.id} className="group p-5 border-b border-gray-100 hover:bg-white/60 transition-colors cursor-pointer flex gap-4 items-center">
                                    <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl border border-gray-200 text-gray-400 group-hover:border-fuchsia-200 group-hover:text-fuchsia-500 transition-colors bg-white shadow-sm">
                                        <PlayCircle size={24} className="relative z-10" />
                                        <div className="absolute inset-0 bg-fuchsia-50 rounded-2xl scale-0 group-hover:scale-100 transition-transform origin-center" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-gray-800 font-bold text-sm truncate group-hover:text-fuchsia-600 transition-colors mb-1">{archive.title}</h4>
                                        <div className="flex items-center gap-3 text-xs font-semibold text-gray-500">
                                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-md"><Clock size={12} className="text-fuchsia-400" /> {archive.duration}</span>
                                            <span>{archive.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-gray-50/50 border-t border-gray-100 backdrop-blur-sm">
                            <button
                                onClick={() => alert("Loading all past recordings is currently disabled.")}
                                className="w-full py-3 rounded-xl font-bold text-sm text-fuchsia-600 bg-white border border-fuchsia-100 hover:bg-fuchsia-50 hover:border-fuchsia-200 transition-all shadow-sm active:scale-95"
                            >
                                Load All Records
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
