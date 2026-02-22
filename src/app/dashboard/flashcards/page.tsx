'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Plus, ChevronRight, Layers, CreditCard, Sparkles } from 'lucide-react';

interface Deck {
    id: string;
    title: string;
    description: string;
    _count: { cards: number };
}

export default function Flashcards() {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [newTitle, setNewTitle] = useState('');
    const { token } = useAuthStore();

    const fetchDecks = async () => {
        try {
            const res = await fetch('https://study-room-backend.onrender.com/api/flashcards/decks', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setDecks(data);
            }
        } catch (e) { console.error(e) }
    };

    useEffect(() => {
        if (token) fetchDecks();
    }, [token]);

    const createDeck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTitle.trim()) return;

        try {
            const res = await fetch('https://study-room-backend.onrender.com/api/flashcards/decks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title: newTitle })
            });
            if (res.ok) {
                setNewTitle('');
                fetchDecks();
            }
        } catch (error) { }
    };

    return (
        <div className="p-8 md:p-10 min-h-full relative overflow-y-auto custom-scrollbar">
            {/* Ambient Background Glows */}
            <div className="absolute top-[5%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-emerald-300/30 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-teal-300/30 blur-[130px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto space-y-10">
                {/* Header & Create Form */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                <Layers className="text-white w-6 h-6" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent tracking-tight">
                                Flashcards
                            </h1>
                        </div>
                        <p className="text-gray-500 font-medium">Master your subjects with spaced repetition decks.</p>
                    </div>

                    <form onSubmit={createDeck} className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 relative z-10">
                        <div className="relative flex-1 lg:w-80">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <Sparkles className="text-emerald-500 w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                placeholder="Name your new deck..."
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="w-full bg-white/70 border border-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 px-4 py-3.5 pl-11 rounded-2xl text-gray-800 placeholder-gray-400 transition-all font-medium shadow-sm"
                            />
                        </div>
                        <button type="submit" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-6 py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 font-bold active:scale-95 group">
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                            <span>Create</span>
                        </button>
                    </form>
                </div>

                {/* Decks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {decks.map((deck) => (
                        <Link href={`/dashboard/flashcards/${deck.id}`} key={deck.id}>
                            <div className="group relative bg-white/50 backdrop-blur-lg border border-white/80 p-6 rounded-3xl flex flex-col min-h-[240px] cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 overflow-hidden">
                                {/* Hover glow */}
                                <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br from-emerald-300 to-teal-300 opacity-0 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />

                                <div className="flex justify-between items-start mb-5 relative z-10">
                                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 shadow-sm border border-emerald-100">
                                        <Layers className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="flex-1 relative z-10">
                                    <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-emerald-600 transition-colors line-clamp-2">
                                        {deck.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 font-medium">
                                        {deck.description || 'No description provided yet.'}
                                    </p>
                                </div>

                                <div className="mt-5 pt-5 border-t border-gray-100 flex justify-between items-center relative z-10">
                                    <div className="flex items-center gap-2 text-sm font-bold">
                                        <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                                            <CreditCard className="w-3.5 h-3.5" />
                                            {deck._count?.cards || 0}
                                        </span>
                                    </div>

                                    <div className="text-sm font-bold text-gray-400 flex items-center group-hover:text-emerald-600 transition-colors">
                                        Study <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {decks.length === 0 && (
                        <div className="col-span-full flex flex-col items-center justify-center p-16 md:p-24 border-2 border-dashed border-emerald-200/50 rounded-3xl bg-white/30 backdrop-blur-sm shadow-sm gap-4">
                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-2 shadow-sm border border-emerald-100">
                                <Layers className="w-10 h-10 text-emerald-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-700">No decks found</h3>
                            <p className="max-w-md text-center text-gray-500 font-medium">Create your first flashcard deck above to start studying more effectively.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
