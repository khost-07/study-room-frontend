'use client';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import CanvasDraw from 'react-canvas-draw';

let socket: Socket;

export default function Whiteboard() {
    const canvasRef = useRef<any>(null);
    const [color, setColor] = useState('#2dd4bf'); // teal-400
    const [brushRadius, setBrushRadius] = useState(3);

    useEffect(() => {
        socket = io('http://localhost:3001');
        socket.emit('join-room', 'whiteboard-room');

        socket.on('draw', (data: any) => {
            if (canvasRef.current && data.saveData) {
                canvasRef.current.loadSaveData(data.saveData, true);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleDraw = () => {
        if (canvasRef.current) {
            const saveData = canvasRef.current.getSaveData();
            socket.emit('draw', { roomId: 'whiteboard-room', saveData });
        }
    };

    const clearCanvas = () => {
        if (canvasRef.current) {
            canvasRef.current.clear();
            // Emitting an empty standard setup to clear for others as well
            const emptySaveData = canvasRef.current.getSaveData();
            socket.emit('draw', { roomId: 'whiteboard-room', saveData: emptySaveData });
        }
    };

    return (
        <div className="flex flex-col h-full p-8 relative">
            <div className="mb-6 flex justify-between items-center bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg">
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                        Shared Whiteboard
                    </h2>
                    <p className="text-sm text-gray-400">Draw together in real-time</p>
                </div>

                <div className="flex gap-4 items-center">
                    <div className="flex gap-2">
                        {['#2dd4bf', '#ef4444', '#eab308', '#3b82f6', '#ffffff'].map((c) => (
                            <button
                                key={c}
                                onClick={() => setColor(c)}
                                className={`w-8 h-8 rounded-full border-2 transition-transform ${color === c ? 'scale-110 border-white' : 'border-transparent'}`}
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>

                    <div className="h-8 w-px bg-gray-600 mx-2" />

                    <input
                        type="range"
                        min="1" max="20"
                        value={brushRadius}
                        onChange={(e) => setBrushRadius(parseInt(e.target.value))}
                        className="w-24 accent-teal-400"
                    />

                    <div className="h-8 w-px bg-gray-600 mx-2" />

                    <button
                        onClick={clearCanvas}
                        className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition"
                    >
                        Clear All
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-white rounded-2xl overflow-hidden border border-gray-700 shadow-2xl relative" style={{ cursor: 'crosshair' }}>
                <CanvasDraw
                    ref={canvasRef}
                    brushColor={color}
                    brushRadius={brushRadius}
                    lazyRadius={0}
                    canvasWidth={'100%'}
                    canvasHeight={'100%'}
                    onChange={handleDraw}
                    hideGrid={true}
                    backgroundColor="#1f2937" // gray-800 layout base
                />
            </div>
        </div>
    );
}
