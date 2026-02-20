'use client';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket;

export default function Whiteboard() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [color, setColor] = useState('#2dd4bf'); // teal-400
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
                ctx.fillStyle = '#1f2937';
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
            ctx.fillStyle = '#1f2937';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            emitDrawing();
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

            <div className="flex-1 bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl relative" style={{ cursor: 'crosshair', touchAction: 'none' }}>
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onMouseMove={draw}
                    onTouchStart={startDrawing}
                    onTouchEnd={stopDrawing}
                    onTouchMove={draw}
                    className="w-full h-full block"
                />
            </div>
        </div>
    );
}
