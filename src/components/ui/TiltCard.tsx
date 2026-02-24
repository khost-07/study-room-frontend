'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring, useTransform, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TiltCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: React.ReactNode;
}

export function TiltCard({ children, className, ...props }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position limits - buttery smooth movement with even lower stiffness
    const x = useSpring(0, { stiffness: 100, damping: 30, mass: 1 });
    const y = useSpring(0, { stiffness: 100, damping: 30, mass: 1 });

    // Map mouse position to tilt angle - INVERTED from previous mapping to push away from mouse
    const rotateX = useTransform(y, [-100, 100], [18, -18]);
    const rotateY = useTransform(x, [-100, 100], [-18, 18]);

    // Shimmer reflection effect
    const glareX = useTransform(x, [-100, 100], [0, 100]);
    const glareY = useTransform(y, [-100, 100], [0, 100]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = event.clientX - centerX;
        const distanceY = event.clientY - centerY;

        x.set(distanceX);
        y.set(distanceY);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                transformPerspective: 1200,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            animate={{
                scale: isHovered ? 1.02 : 1
            }}
            // Soft spring for the return-to-center animation when mouse leaves
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            className={cn(
                "relative rounded-[3rem] bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(255,255,255,0.8)] overflow-hidden transition-shadow duration-500",
                isHovered && "shadow-[0_20px_50px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(255,255,255,1)]",
                className
            )}
            {...props}
        >
            {/* Glare/Shimmer Effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay will-change-transform"
                style={{
                    background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
                    opacity: isHovered ? 1 : 0,
                }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            />

            {/* Inner noise texture for premium feel */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* 3D content wrapper without blur-inducing Z translations for children unless intended */}
            <div className="relative z-10 w-full h-full transform-gpu min-h-full">
                {children}
            </div>
        </motion.div>
    );
}
