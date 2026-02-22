'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { ArrowLeft, Plus, Trash2, Edit2, PlayCircle, Sparkles, Layers } from 'lucide-react';

interface Flashcard {
    id: string;
    front: string;
    back: string;
}

interface Deck {
    id: string;
    title: string;
    description: string;
    cards: Flashcard[];
}

export default function FlashcardDeck() {
    const params = useParams();
    const router = useRouter();
    const { token } = useAuthStore();
    const [deck, setDeck] = useState<Deck | null>(null);
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const [isStudyMode, setIsStudyMode] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const fetchDeck = async () => {
        try {
            const res = await fetch(`https://study-room-backend.onrender.com/api/flashcards/decks/${params.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setDeck(data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (token && params.id) fetchDeck();
    }, [token, params.id]);

    const addCard = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!front.trim() || !back.trim()) return;

        try {
            const res = await fetch(`https://study-room-backend.onrender.com/api/flashcards/decks/${params.id}/cards`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ front, back })
            });

            if (res.ok) {
                setFront('');
                setBack('');
                fetchDeck();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCard = async (cardId: string) => {
        try {
            const res = await fetch(`https://study-room-backend.onrender.com/api/flashcards/cards/${cardId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                fetchDeck();
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (!deck) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (isStudyMode) {
        const currentCard = deck.cards[currentCardIndex];

        if (!currentCard) {
            return (
                <div className="p-8 h-full flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-emerald-300/30 blur-[120px] pointer-events-none" />

                    <div className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center relative z-10 max-w-md w-full">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-6">
                            <Sparkles className="text-white w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">You finished the deck!</h2>
                        <p className="text-gray-500 mb-8 font-medium">Great job. You've reviewed all {deck.cards.length} cards.</p>

                        <button
                            onClick={() => { setIsStudyMode(false); setCurrentCardIndex(0); setIsFlipped(false); }}
                            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
                        >
                            Back to Deck
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="p-4 md:p-8 h-full flex flex-col relative overflow-hidden custom-scrollbar">
                <div className="absolute top-[5%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-emerald-300/30 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-teal-300/30 blur-[130px] pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto w-full flex-1 flex flex-col">
                    <header className="flex justify-between items-center mb-8">
                        <button
                            onClick={() => setIsStudyMode(false)}
                            className="p-3 rounded-2xl bg-white/50 hover:bg-white border border-white hover:border-emerald-200 text-gray-500 hover:text-emerald-600 transition-all shadow-sm active:scale-95 flex items-center gap-2 font-bold"
                        >
                            <ArrowLeft className="w-5 h-5" /> Exit Study Mode
                        </button>
                        <div className="bg-white/60 backdrop-blur-sm border border-white/80 px-4 py-2 rounded-xl shadow-sm text-sm font-bold text-emerald-700">
                            Card {currentCardIndex + 1} of {deck.cards.length}
                        </div>
                    </header>

                    <div className="flex-1 flex flex-col items-center justify-center perspective-1000 w-full mb-8">
                        <div
                            onClick={() => setIsFlipped(!isFlipped)}
                            className={`relative w-full max-w-2xl aspect-[3/2] cursor-pointer transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                        >
                            {/* Front */}
                            <div className="absolute inset-0 backface-hidden bg-white/80 backdrop-blur-xl border border-white rounded-3xl shadow-[0_8px_32px_rgb(0,0,0,0.06)] flex flex-col items-center justify-center p-10 text-center">
                                <span className="absolute top-6 left-6 text-sm font-bold text-emerald-500/50 uppercase tracking-widest">Front</span>
                                <p className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight">{currentCard.front}</p>
                            </div>

                            {/* Back */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-3xl shadow-[0_8px_32px_rgb(0,0,0,0.06)] flex flex-col items-center justify-center p-10 text-center">
                                <span className="absolute top-6 left-6 text-sm font-bold text-emerald-500/50 uppercase tracking-widest">Back</span>
                                <p className="text-3xl md:text-5xl font-medium text-gray-800 leading-tight">{currentCard.back}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => {
                                setIsFlipped(false);
                                setTimeout(() => setCurrentCardIndex(prev => prev + 1), 150);
                            }}
                            className="px-8 py-4 bg-white border border-gray-200 hover:border-emerald-300 hover:text-emerald-600 rounded-2xl font-bold text-gray-600 shadow-sm transition-all active:scale-95 flex items-center gap-2"
                        >
                            Next Card <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 md:p-10 min-h-full relative overflow-y-auto custom-scrollbar">
            <div className="absolute top-[5%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-emerald-300/30 blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                    <div className="absolute -left-20 -top-20 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50" />

                    <div className="flex items-center gap-4 relative z-10">
                        <button
                            onClick={() => router.push('/dashboard/flashcards')}
                            className="p-3 rounded-2xl bg-white hover:bg-gray-50 border border-gray-100 text-gray-500 hover:text-emerald-600 transition-all shadow-sm active:scale-95"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent tracking-tight">
                                {deck.title}
                            </h1>
                            <p className="text-emerald-600 font-bold mt-1">{deck.cards.length} Cards in Deck</p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsStudyMode(true)}
                        disabled={deck.cards.length === 0}
                        className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 font-bold active:scale-95 relative z-10"
                    >
                        <PlayCircle className="w-5 h-5" /> Study Now
                    </button>
                </header>

                {/* Add Card Form */}
                <div className="bg-white/50 backdrop-blur-lg border border-white/80 p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Plus className="text-emerald-500" /> Add New Flashcard
                    </h2>
                    <form onSubmit={addCard} className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Front of card (Term/Question)"
                            value={front}
                            onChange={(e) => setFront(e.target.value)}
                            className="flex-1 bg-white/70 border border-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 px-5 py-4 rounded-2xl text-gray-800 placeholder-gray-400 transition-all font-medium shadow-sm"
                        />
                        <input
                            type="text"
                            placeholder="Back of card (Definition/Answer)"
                            value={back}
                            onChange={(e) => setBack(e.target.value)}
                            className="flex-1 bg-white/70 border border-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 px-5 py-4 rounded-2xl text-gray-800 placeholder-gray-400 transition-all font-medium shadow-sm"
                        />
                        <button
                            type="submit"
                            disabled={!front.trim() || !back.trim()}
                            className="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white px-6 py-4 rounded-2xl font-bold transition-all shadow-md flex justify-center items-center active:scale-95 shrink-0"
                        >
                            Add Card
                        </button>
                    </form>
                </div>

                {/* Cards List */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
                        <Layers className="text-emerald-500 w-5 h-5" /> All Cards
                    </h3>

                    {deck.cards.length === 0 && (
                        <div className="p-12 text-center text-gray-500 bg-white/40 backdrop-blur-sm rounded-3xl border border-dashed border-gray-300 font-medium">
                            No cards yet. Add your first card above!
                        </div>
                    )}

                    {deck.cards.map((card, index) => (
                        <div key={card.id} className="group bg-white/50 backdrop-blur-sm border border-white/80 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:shadow-md transition-all hover:bg-white/80">
                            <div className="bg-emerald-50 text-emerald-600 font-bold rounded-xl w-10 h-10 flex items-center justify-center shrink-0 border border-emerald-100">
                                {index + 1}
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Front</p>
                                    <p className="text-gray-800 font-medium">{card.front}</p>
                                </div>
                                <div className="md:border-l md:border-gray-100 md:pl-4">
                                    <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">Back</p>
                                    <p className="text-gray-600">{card.back}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => deleteCard(card.id)}
                                className="p-2.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Add these to global CSS or layout to enable 3D flip effects
const styles = `
.perspective-1000 { perspective: 1000px; }
.transform-style-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }
`;
