'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
    ({ className, label, type, error, required, ...props }, ref) => {
        const [isFocused, setIsFocused] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
        const [hasValue, setHasValue] = useState(Boolean(props.value || props.defaultValue));

        // Sync with controlled value for browser autofill and state changes
        useEffect(() => {
            if (props.value !== undefined) {
                setHasValue(Boolean(props.value));
            }
        }, [props.value]);

        const isPassword = type === 'password';
        const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
        const isFloating = isFocused || hasValue;

        return (
            <div className="w-full relative group">
                <motion.div
                    className={cn(
                        "relative w-full rounded-2xl bg-white/50 backdrop-blur-md border border-gray-200/60 transition-all duration-300 shadow-sm",
                        isFocused && "border-blue-400/50 bg-white/80 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
                        error && "border-red-400/50 shadow-[0_0_15px_rgba(248,113,113,0.15)]",
                        className
                    )}
                    animate={{
                        scale: isFocused ? 1.02 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    {/* Label */}
                    <motion.label
                        className="absolute left-4 pointer-events-none text-gray-400"
                        animate={{
                            y: isFloating ? -24 : 14,
                            x: isFloating ? 0 : 0,
                            scale: isFloating ? 0.85 : 1,
                            color: error ? '#f87171' : isFocused ? '#3b82f6' : '#6b7280',
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        {label} {required && <span className="text-blue-500">*</span>}
                    </motion.label>

                    {/* Input Field */}
                    <input
                        ref={ref}
                        type={inputType}
                        className="w-full text-gray-900 bg-transparent outline-none px-4 py-3.5 h-[52px]"
                        onFocus={(e) => {
                            setIsFocused(true);
                            props.onFocus?.(e);
                        }}
                        onBlur={(e) => {
                            setIsFocused(false);
                            props.onBlur?.(e);
                        }}
                        onChange={(e) => {
                            setHasValue(Boolean(e.target.value));
                            props.onChange?.(e);
                        }}
                        {...props}
                    />

                    {/* Password Toggle */}
                    {isPassword && (
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-800 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    )}

                    {/* Error Icon */}
                    {error && !isPassword && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400">
                            <AlertCircle size={20} />
                        </div>
                    )}
                </motion.div>

                {/* Inline Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            className="text-red-400 text-sm font-medium mt-2 pl-2"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);
FloatingInput.displayName = 'FloatingInput';
