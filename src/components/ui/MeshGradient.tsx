'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ParticleBackground } from './ParticleBackground';

export function MeshGradient({ children }: { children?: React.ReactNode }) {
    return (
        <div className="relative w-full h-full min-h-screen overflow-hidden bg-gray-50/50">
            {/* Base noise texture for premium feel */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Floating Blobs Container */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">

                {/* Blob 1: Blue */}
                <motion.div
                    className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full blur-[120px] bg-blue-300/40 mix-blend-multiply"
                    animate={{
                        x: [0, 100, -50, 0],
                        y: [0, 50, 100, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />

                {/* Blob 2: Purple */}
                <motion.div
                    className="absolute top-[10%] right-[0%] w-[50vw] h-[50vw] rounded-full blur-[100px] bg-purple-300/40 mix-blend-multiply"
                    animate={{
                        x: [0, -100, 50, 0],
                        y: [0, 100, -50, 0],
                        scale: [0.8, 1.1, 1, 0.8],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />

                {/* Blob 3: Emerald/Teal */}
                <motion.div
                    className="absolute -bottom-[20%] left-[20%] w-[70vw] h-[70vw] rounded-full blur-[140px] bg-emerald-300/30 mix-blend-multiply"
                    animate={{
                        x: [0, 150, -100, 0],
                        y: [0, -100, 50, 0],
                        scale: [1, 0.9, 1.2, 1],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />

                {/* Subtle moving light beam across screen */}
                <motion.div
                    className="absolute inset-0 opacity-40 bg-gradient-to-tr from-transparent via-white/40 to-transparent skew-x-12 blur-3xl"
                    animate={{
                        x: ['-200%', '200%'],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

            </div>

            {/* Interactive Particle Web */}
            <ParticleBackground />

            <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                {children}
            </div>
        </div>
    );
}
