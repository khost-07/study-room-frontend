'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React from 'react';

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 25,
                opacity: { duration: 0.3 }
            }}
            className="w-full h-full flex flex-col flex-1"
        >
            {children}
        </motion.div>
    );
}
