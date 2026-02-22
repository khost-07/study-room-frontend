'use client';
import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/authStore';
import { Send, Users, Sparkles } from 'lucide-react';

let socket: Socket;

interface Message {
    id: string;
    text: string;
    sender: string;
    isMe: boolean;
}

export default function StudyRoom() {
    const { user } = useAuthStore();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socket = io('https://study-room-backend.onrender.com');

        socket.emit('join-room', 'general');

        socket.on('receive-message', (data: any) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Math.random().toString(),
                    text: data.content,
                    sender: data.name || 'Anonymous',
                    isMe: data.userId === user?.id,
                },
            ]);
        });

        return () => {
            socket.disconnect();
        };
    }, [user]);

    useEffect(() => {
        if (messages.length > 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [messages]);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const data = {
            roomId: 'general',
            content: input,
            userId: user?.id,
            name: user?.name,
        };

        socket.emit('send-message', data);
        setInput('');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-2rem)] m-4 md:m-8 relative overflow-hidden rounded-3xl bg-white/40 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            {/* Ambient Glassmorphism Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-300/30 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-indigo-300/30 blur-[120px] rounded-full pointer-events-none" />

            <header className="p-6 border-b border-gray-100 bg-white/60 backdrop-blur-md flex justify-between items-center relative z-10 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Users className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                            General Study Room
                        </h2>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <p className="text-sm font-semibold text-emerald-600">Real-time Chat Active</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 custom-scrollbar">
                {messages.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 shadow-sm">
                            <Sparkles className="w-8 h-8 text-blue-300" />
                        </div>
                        <p className="font-medium text-gray-500">It's quiet in here. Send a message to start studying together!</p>
                    </div>
                )}

                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} animate-[fadeIn_0.3s_ease-out]`}>
                        <span className="text-xs font-bold text-gray-400 mb-1.5 px-2">{msg.sender}</span>
                        <div
                            className={`px-5 py-3.5 rounded-2xl max-w-[80%] shadow-sm font-medium ${msg.isMe
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-tr-sm shadow-blue-500/20'
                                : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </main>

            <footer className="p-4 md:p-6 bg-white/60 border-t border-gray-100 backdrop-blur-md relative z-10">
                <form onSubmit={sendMessage} className="flex gap-3 max-w-5xl mx-auto">
                    <input
                        type="text"
                        className="flex-1 bg-white/80 border border-white focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 rounded-2xl px-5 py-3.5 text-gray-800 placeholder-gray-400 font-medium shadow-sm transition-all"
                        placeholder="Type a message to the room..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-4 rounded-2xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center min-w-[3.5rem] active:scale-95"
                    >
                        <Send size={20} className="ml-0.5" />
                    </button>
                </form>
            </footer>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
