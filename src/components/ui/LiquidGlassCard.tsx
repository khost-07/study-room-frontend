'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface LiquidGlassCardProps extends HTMLMotionProps<'div'> {
    className?: string;
    children?: React.ReactNode;
    interactive?: boolean;
    colorHint?: string;
}

export const LiquidGlassCard = React.forwardRef<HTMLDivElement, LiquidGlassCardProps>(
    ({ className, children, interactive = true, colorHint, ...props }, ref) => {
        // Base liquid glass classes combining refraction, fresnel reflections, and structural blurs
        const baseClasses = `
            relative overflow-hidden rounded-[2rem]
            bg-white/10 backdrop-blur-xl
            border border-white/50
            shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-1px_2px_rgba(255,255,255,0.3)]
        `;

        return (
            <motion.div
                ref={ref}
                whileHover={interactive ? { scale: 1.02, y: -4, filter: 'brightness(1.05)' } : {}}
                whileTap={interactive ? { scale: 0.98, filter: 'brightness(0.95)' } : {}}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                    opacity: { duration: 0.4 }
                }}
                className={cn(baseClasses, className)}
                {...props}
            >
                {/* Glare Highlight Overlay */}
                <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/40 to-transparent pointer-events-none rounded-t-[2rem]" />

                {/* Chromatic Dispersion ambient light if color hint provided */}
                {colorHint && (
                    <div
                        className={cn(
                            "absolute z-0 w-32 h-32 rounded-full opacity-30 blur-[40px] pointer-events-none transition-opacity duration-500",
                            colorHint
                        )}
                        style={{ top: '-10%', right: '-10%' }}
                    />
                )}

                {/* Content Container */}
                <div className="relative z-10 w-full h-full">
                    {children}
                </div>
            </motion.div>
        );
    }
);

LiquidGlassCard.displayName = 'LiquidGlassCard';
