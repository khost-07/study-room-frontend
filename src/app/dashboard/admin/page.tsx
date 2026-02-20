'use client';
import { Users, AlertTriangle, Shield, Settings, Activity } from 'lucide-react';

export default function AdminPanel() {
    const stats = [
        { label: 'Active Users', value: '142', icon: Users, color: 'text-blue-400' },
        { label: 'Live Sessions', value: '12', icon: Activity, color: 'text-emerald-400' },
        { label: 'Reported Issues', value: '3', icon: AlertTriangle, color: 'text-amber-400' },
    ];

    return (
        <div className="p-8">
            <div className="mb-10">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent mb-2 flex items-center gap-3">
                    <Shield size={32} className="text-red-500" /> Admin Dashboard
                </h1>
                <p className="text-gray-400">Manage the platform, moderate sessions, and view analytics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map(stat => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex items-center gap-4 hover:border-gray-600 transition">
                            <div className={`p-4 rounded-xl bg-gray-900 shadow-inner ${stat.color}`}>
                                <Icon size={24} />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Active Session Moderation</h2>
                    <button className="text-gray-400 hover:text-white transition"><Settings size={20} /></button>
                </div>
                <div className="p-10 text-center text-gray-500">
                    <AlertTriangle size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No sessions require moderation at this time.</p>
                    <p className="text-sm mt-2">All rooms are operating normally.</p>
                </div>
            </div>

            {/* MOCK FEATURE: Session Recording playback indicator */}
            <div className="bg-gray-800/50 rounded-2xl border border-dashed border-gray-700 p-6 flex justify-between items-center">
                <div>
                    <h3 className="font-semibold text-gray-300 mb-1">Session Recording Archives</h3>
                    <p className="text-sm text-gray-500">View past whiteboard and chat recordings (Mock)</p>
                </div>
                <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition text-sm">
                    Browse Archives &gt;
                </button>
            </div>
        </div>
    );
}
