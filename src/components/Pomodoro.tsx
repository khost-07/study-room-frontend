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
        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-80 border border-gray-700">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">Pomodoro</h3>
                <div className="flex gap-2 text-sm">
                    <button
                        onClick={() => { setMode('work'); setTimeLeft(25 * 60); setIsRunning(false); }}
                        className={`px-3 py-1 rounded-full transition ${mode === 'work' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        Work
                    </button>
                    <button
                        onClick={() => { setMode('break'); setTimeLeft(5 * 60); setIsRunning(false); }}
                        className={`px-3 py-1 rounded-full transition ${mode === 'break' ? 'bg-teal-500/20 text-teal-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        Break
                    </button>
                </div>
            </div>

            <div className="text-center mb-8">
                <span className="text-6xl font-mono font-light tracking-wider">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </span>
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={toggleTimer}
                    className="p-4 rounded-full bg-blue-600 hover:bg-blue-500 transition shadow-lg shadow-blue-500/30"
                >
                    {isRunning ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </button>
                <button
                    onClick={resetTimer}
                    className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition"
                >
                    <RotateCcw size={24} />
                </button>
            </div>
        </div>
    );
}
