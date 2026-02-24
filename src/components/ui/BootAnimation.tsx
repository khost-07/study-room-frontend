'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export function BootAnimation({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Artificial delay to show the boot animation
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        key="boot-loader"
                        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-gray-900 pointer-events-none overflow-hidden"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.8, ease: "easeInOut" } }}
                        animate={{ opacity: 1 }}
                    >
                        {/* Ambient Glows */}
                        <div className="absolute w-[60vw] h-[60vw] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute w-[40vw] h-[40vw] bg-fuchsia-500/20 rounded-full blur-[80px] animate-pulse animation-delay-1000" />

                        {/* Liquid Glass Loading Card */}
                        <motion.div
                            className="relative z-10 w-64 h-64 md:w-80 md:h-80 bg-white/10 backdrop-blur-xl rounded-[3rem] border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.2)] flex flex-col items-center justify-center p-8 overflow-hidden"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 1.2, opacity: 0, filter: 'blur(20px)' }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                        >
                            {/* Chromatic Dispersion Edge Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-[3.1rem] blur-xl opacity-30 animate-[spin_4s_linear_infinite]" />

                            <div className="relative z-10 flex flex-col items-center">
                                <motion.div
                                    className="w-20 h-20 bg-gradient-to-br from-blue-400 to-fuchsia-500 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6"
                                    animate={{
                                        rotate: [0, 90, 180, 270, 360],
                                        borderRadius: ["20%", "50%", "20%"]
                                    }}
                                    transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                                >
                                    <Sparkles className="text-white w-10 h-10" />
                                </motion.div>

                                <motion.h1
                                    className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 tracking-tight"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    Study Room
                                </motion.h1>

                                <motion.div
                                    className="mt-6 w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-400 to-fuchsia-400 rounded-full"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>

                        <style jsx global>{`
            .animation-delay-1000 {
                animation-delay: 1s;
            }
          `}</style>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main App Content - reveals when loading finishes */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: isLoading ? 0 : 1, scale: isLoading ? 0.95 : 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: isLoading ? 0 : 0.2 }}
                className="w-full min-h-screen flex flex-col relative"
            >
                {children}
            </motion.div>
        </>
    );
}
