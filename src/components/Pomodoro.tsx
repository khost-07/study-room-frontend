'use client';
import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Pomodoro() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState<'work' | 'break'>('work');

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            // Auto-switch mode
            if (mode === 'work') {
                setMode('break');
                setTimeLeft(5 * 60);
            } else {
                setMode('work');
                setTimeLeft(25 * 60);
            }
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft, mode]);

    const toggleTimer = () => setIsRunning(!isRunning);

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="bg-white/50 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-sm border border-white/80 relative overflow-hidden group">
            {/* Soft background glow based on mode */}
            <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-1000 ${mode === 'work' ? 'bg-rose-400' : 'bg-teal-400'}`} />

            <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className="text-xl font-extrabold bg-gradient-to-br from-gray-800 to-gray-500 bg-clip-text text-transparent">Pomodoro</h3>
                <div className="flex gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50 shadow-inner">
                    <button
                        onClick={() => { setMode('work'); setTimeLeft(25 * 60); setIsRunning(false); }}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${mode === 'work' ? 'bg-white text-rose-500 shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-800 hover:bg-white/50'}`}
                    >
                        Focus
                    </button>
                    <button
                        onClick={() => { setMode('break'); setTimeLeft(5 * 60); setIsRunning(false); }}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${mode === 'break' ? 'bg-white text-teal-500 shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-800 hover:bg-white/50'}`}
                    >
                        Break
                    </button>
                </div>
            </div>

            <div className="text-center mb-10 relative z-10">
                <span className="text-7xl font-mono font-light tracking-tight text-gray-800 tabular-nums">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
            </div>

            <div className="flex justify-center gap-4 relative z-10">
                <button
                    onClick={toggleTimer}
                    className={`p-5 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 ${isRunning
                            ? 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50'
                            : (mode === 'work' ? 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/30 text-white' : 'bg-gradient-to-br from-teal-400 to-emerald-500 shadow-teal-500/30 text-white')
                        }`}
                >
                    {isRunning ? <Pause size={28} className="fill-current" /> : <Play size={28} className="ml-1 fill-current" />}
                </button>
                <button
                    onClick={resetTimer}
                    className="p-5 rounded-2xl bg-white text-gray-400 hover:text-gray-800 border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow active:scale-95"
                >
                    <RotateCcw size={26} />
                </button>
            </div>
        </div>
    );
}
