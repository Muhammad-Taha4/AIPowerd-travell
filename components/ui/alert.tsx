'use client'
import React from 'react'

export function Alert({ children, className = '', variant = 'default', ...props }: {
    children: React.ReactNode
    className?: string
    variant?: 'default' | 'destructive'
} & React.HTMLAttributes<HTMLDivElement>) {
    const variants: Record<string, string> = {
        default: 'bg-white/5 border-white/10 text-slate-300',
        destructive: 'bg-red-500/10 border-red-500/20 text-red-300',
    }
    return (
        <div className={`p-4 rounded-xl border ${variants[variant]} ${className}`} role="alert" {...props}>
            {children}
        </div>
    )
}

export function AlertTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <h5 className={`font-bold mb-1 ${className}`}>{children}</h5>
}

export function AlertDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <p className={`text-sm opacity-80 ${className}`}>{children}</p>
}
