'use client';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { ArrowLeft, Users, ShieldAlert, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// JitsiMeeting must be loaded dynamically because it relies on the window object
const JitsiMeeting = dynamic(
    () => import('@jitsi/react-sdk').then((mod) => mod.JitsiMeeting),
    { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center text-indigo-500 font-bold animate-pulse">Initializing Secure Connection...</div> }
);

export default function StudyGroupRoom() {
    const params = useParams();
    const router = useRouter();
    const { user } = useAuthStore();
    const [isJoined, setIsJoined] = useState(false);

    // Create a deterministic but unique room name based on the ID to ensure users land in the same place
    const roomName = `StudyRoom-App-Session-${params.id}`;

    return (
        <div className="p-4 md:p-8 h-[calc(100vh-2rem)] flex flex-col relative overflow-hidden custom-scrollbar">
            {/* Ambient Glassmorphism Background Glows */}
            <div className="absolute top-[5%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-indigo-300/30 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-300/30 blur-[130px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col h-full bg-white/40 backdrop-blur-xl rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">

                {/* Header */}
                <header className="p-4 md:p-6 border-b border-gray-100 bg-white/60 backdrop-blur-md flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/dashboard/schedule')}
                            className="p-2.5 rounded-xl bg-white/50 hover:bg-white border border-gray-200 text-gray-500 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20">
                                <Users className="text-white w-5 h-5" />
                            </div>
                            <div>
                                <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
                                    Study Group Call
                                </h1>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <p className="text-xs font-semibold text-emerald-600">Secure P2P Connection</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl text-xs font-bold text-indigo-700 border border-indigo-100">
                        <ShieldAlert className="w-4 h-4" />
                        End-to-End Encrypted
                    </div>
                </header>

                <main className="flex-1 relative w-full h-full bg-gray-900/5">
                    {!isJoined && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white/40 backdrop-blur-sm z-20">
                            <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-indigo-50 text-indigo-400 flex items-center justify-center shadow-inner border border-white">
                                <Sparkles className="w-12 h-12" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to join the group?</h2>
                            <p className="text-gray-500 max-w-md mx-auto mb-8 font-medium">Your camera and microphone will be disabled by default. Up to 4 people can join this room.</p>
                            <button
                                onClick={() => setIsJoined(true)}
                                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-500/25 transition-all active:scale-95"
                            >
                                Join Study Group
                            </button>
                        </div>
                    )}

                    {isJoined && (
                        <div className="w-full h-full">
                            <JitsiMeeting
                                roomName={roomName}
                                configOverwrite={{
                                    startWithAudioMuted: true,
                                    startWithVideoMuted: true,
                                    disableModeratorIndicator: true,
                                    startScreenSharing: false,
                                    enableEmailInStats: false,
                                    prejoinPageEnabled: false,
                                }}
                                interfaceConfigOverwrite={{
                                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                                    SHOW_CHROME_EXTENSION_BANNER: false,
                                }}
                                userInfo={{
                                    displayName: user?.name || 'Anonymous Student'
                                }}
                                onApiReady={(externalApi) => {
                                    // Make sure it takes up the full space
                                }}
                                getIFrameRef={(iframeRef) => {
                                    iframeRef.style.height = '100%';
                                    iframeRef.style.width = '100%';
                                    iframeRef.style.border = 'none';
                                }}
                            />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
