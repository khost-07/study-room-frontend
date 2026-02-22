'use client';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Trash2, Edit3 } from 'lucide-react';

let socket: Socket;

export default function Whiteboard() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [color, setColor] = useState('#8b5cf6'); // violet-500
    const [brushRadius, setBrushRadius] = useState(3);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        socket = io('https://study-room-backend.onrender.com');
        socket.emit('join-room', 'whiteboard-room');

        socket.on('draw', (data: any) => {
            if (data.saveData && canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = () => {
                    ctx?.clearRect(0, 0, canvas.width, canvas.height); // clear before drawing new state
                    ctx?.drawImage(img, 0, 0);
                };
                img.src = data.saveData;
            }
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        // Initialize canvas sizing
        const canvas = canvasRef.current;
        if (canvas && canvas.parentElement) {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            // Set base color
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }
    }, []);

    const emitDrawing = () => {
        if (canvasRef.current) {
            const saveData = canvasRef.current.toDataURL();
            socket.emit('draw', { roomId: 'whiteboard-room', saveData });
        }
    };

    const getMousePos = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();

        let clientX = 0, clientY = 0;

        if (e.type.includes('touch')) {
            const touchEvent = e as unknown as TouchEvent;
            if (touchEvent.touches.length > 0) {
                clientX = touchEvent.touches[0].clientX;
                clientY = touchEvent.touches[0].clientY;
            }
        } else {
            const mouseEvent = e as React.MouseEvent;
            clientX = mouseEvent.clientX;
            clientY = mouseEvent.clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) ctx.beginPath(); // reset path
        emitDrawing();
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        const pos = getMousePos(e);

        ctx.lineWidth = brushRadius;
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;

        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            emitDrawing();
        }
    };

    return (
        <div className="flex flex-col h-full p-8 md:p-10 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-violet-300/30 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-fuchsia-300/30 blur-[100px] pointer-events-none" />

            {/* Grid Pattern Background for Canvas Area */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                        <Edit3 className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent tracking-tight">
                            Shared Whiteboard
                        </h2>
                        <p className="text-sm font-medium text-gray-500">Draw and brainstorm together in real-time</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white shadow-sm">
                    <div className="flex gap-2.5">
                        {['#111827', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b', '#ef4444'].map((c) => (
                            <button
                                key={c}
                                onClick={() => setColor(c)}
                                className={`w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 shadow-sm ${color === c ? 'ring-2 ring-blue-400 ring-offset-2 scale-110' : 'border border-gray-200'}`}
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>

                    <div className="h-8 w-px bg-gray-200 mx-2" />

                    <div className="flex items-center gap-3 px-2">
                        <span className="text-xs font-bold text-gray-400 w-4 text-center">{brushRadius}</span>
                        <input
                            type="range"
                            min="1" max="20"
                            value={brushRadius}
                            onChange={(e) => setBrushRadius(parseInt(e.target.value))}
                            className="w-24 accent-violet-500"
                        />
                    </div>

                    <div className="h-8 w-px bg-gray-200 mx-2" />

                    <button
                        onClick={clearCanvas}
                        className="px-4 py-2 flex items-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 rounded-xl transition-colors font-bold text-sm"
                    >
                        <Trash2 size={16} />
                        Clear All
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-white/30 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/60 shadow-[0_8px_32px_rgb(0,0,0,0.08)] relative z-10 group" style={{ cursor: 'crosshair', touchAction: 'none' }}>
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onMouseMove={draw}
                    onTouchStart={startDrawing}
                    onTouchEnd={stopDrawing}
                    onTouchMove={draw}
                    className="w-full h-full block bg-transparent"
                />
            </div>
        </div>
    );
}
