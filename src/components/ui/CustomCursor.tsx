'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isMounted, setIsMounted] = useState(false); // added mounted state

    // Mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for cursor movement
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        setIsMounted(true); // set mounted to true only on client

        const handleMouseMove = (e: MouseEvent) => {
            // 16px offset to center the 32px cursor on the exact mouse point coordinates
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        const handleHoverStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Triggers interactive size change on buttons, inputs, links
            if (
                target.tagName.toLowerCase() === 'button' ||
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'input' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('cursor-pointer')
            ) {
                setIsHovering(true);
            }
        };

        const handleHoverEnd = () => setIsHovering(false);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseover', handleHoverStart);
        document.addEventListener('mouseout', handleHoverEnd);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseover', handleHoverStart);
            document.removeEventListener('mouseout', handleHoverEnd);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isMounted) return null; // do not render on server to prevent mismatch

    return (
        <>
            <style jsx global>{`
        /* Hide default cursor globally */
        * {
          cursor: none !important;
        }
      `}</style>
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[10001]"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                initial={{ opacity: 0 }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    scale: { type: 'spring', stiffness: 300, damping: 20 },
                    opacity: { duration: 0.2 }
                }}
            >
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500/20 backdrop-blur-sm border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    {/* Inner dot */}
                    <motion.div
                        className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                        animate={{
                            scale: isHovering ? 0 : 1,
                            opacity: isHovering ? 0 : 1
                        }}
                    />
                </div>
            </motion.div>
        </>
    );
}
