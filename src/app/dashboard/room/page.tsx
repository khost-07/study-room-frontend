'use client';
import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/authStore';
import { Send } from 'lucide-react';

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
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        <div className="flex flex-col h-[calc(100vh-2rem)] m-4 bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
            <header className="bg-gray-750 p-4 border-b border-gray-700 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">General Study Room</h2>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
                        Real-time Chat Active
                    </p>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-900/50">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                        <span className="text-xs text-gray-500 mb-1 px-1">{msg.sender}</span>
                        <div className={`px-4 py-2 rounded-2xl max-w-[80%] ${msg.isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-100 rounded-bl-none'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </main>

            <footer className="p-4 bg-gray-800 border-t border-gray-700">
                <form onSubmit={sendMessage} className="flex gap-2">
                    <input
                        type="text"
                        className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl transition flex items-center justify-center min-w-[3rem]"
                    >
                        <Send size={20} className="ml-1" />
                    </button>
                </form>
            </footer>
        </div>
    );
}
