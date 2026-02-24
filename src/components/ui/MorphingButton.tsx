'use client';

import React from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { Loader2, Check } from 'lucide-react';

export type ButtonState = 'idle' | 'loading' | 'success';

interface MorphingButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    status: ButtonState;
    children: React.ReactNode;
}

export const MorphingButton = React.forwardRef<HTMLButtonElement, MorphingButtonProps>(
    ({ status, children, className, disabled, ...props }, ref) => {

        return (
            <motion.button
                ref={ref}
                disabled={disabled || status !== 'idle'}
                className={`relative overflow-hidden flex items-center justify-center font-bold text-white tracking-wide transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]
          ${status === 'idle' ? 'rounded-2xl w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]' : ''}
          ${status === 'loading' ? 'rounded-full w-14 h-14 bg-blue-600 self-center mx-auto' : ''}
          ${status === 'success' ? 'rounded-full w-14 h-14 bg-emerald-500 self-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.5)]' : ''}
          ${className}
        `}
                layout // Smoothly animate between widths/border-radius
                whileHover={status === 'idle' ? { scale: 1.02 } : {}}
                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                {...props}
            >
                <AnimatePresence mode="wait">
                    {status === 'idle' && (
                        <motion.span
                            key="idle"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute flex items-center gap-2"
                        >
                            {children}
                        </motion.span>
                    )}

                    {status === 'loading' && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute"
                        >
                            <Loader2 className="w-6 h-6 animate-spin text-white" />
                        </motion.div>
                    )}

                    {status === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute"
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        >
                            <Check className="w-8 h-8 text-white stroke-[3px]" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Ripple effect layer for premium feel on idle */}
                {status === 'idle' && (
                    <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity rounded-2xl pointer-events-none mix-blend-overlay" />
                )}
            </motion.button>
        );
    }
);
MorphingButton.displayName = 'MorphingButton';
