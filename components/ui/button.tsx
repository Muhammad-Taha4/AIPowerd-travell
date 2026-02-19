'use client'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    className?: string
    variant?: 'default' | 'secondary' | 'outline' | 'link' | 'ghost' | 'destructive'
    size?: 'sm' | 'md' | 'lg'
}

export function Button({ children, className = '', variant = 'default', size = 'md', ...props }: ButtonProps) {
    const variants: Record<string, string> = {
        default: 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5',
        secondary: 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10',
        outline: 'border border-blue-500/30 text-blue-400 hover:bg-blue-500/10',
        link: 'text-blue-400 underline hover:text-blue-300',
        ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
    }
    const sizes: Record<string, string> = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base',
    }
    return (
        <button className={`rounded-xl font-semibold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button
