'use client';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Plus, Trash2, ChevronRight } from 'lucide-react';

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
        <div className="p-8">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-2">
                        Flashcard Decks
                    </h1>
                    <p className="text-gray-400">Create, study, and master your subjects.</p>
                </div>

                <form onSubmit={createDeck} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="New Deck Title..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none w-64 text-sm"
                    />
                    <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-lg transition px-4 flex items-center gap-2 text-sm font-semibold">
                        <Plus size={16} /> Create
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {decks.map(deck => (
                    <div key={deck.id} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl flex flex-col group hover:-translate-y-1 transition duration-300">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition">{deck.title}</h3>
                        <p className="text-sm text-gray-400 mb-6 flex-1">
                            {deck.description || 'No description provided.'}
                        </p>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
                            <span className="text-xs bg-gray-700 px-3 py-1 rounded-full">{deck._count.cards} Cards</span>
                            <button className="text-emerald-500 hover:text-emerald-400 flex items-center gap-1 text-sm font-medium transition">
                                Study <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                {decks.length === 0 && (
                    <div className="col-span-full text-center py-20 text-gray-500 border-2 border-dashed border-gray-700 rounded-2xl">
                        <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No decks found. Create your first flashcard deck to start studying!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Inline fallback for BookOpen icon from lucide-react (if it fails to auto-import)
import { BookOpen } from 'lucide-react';
