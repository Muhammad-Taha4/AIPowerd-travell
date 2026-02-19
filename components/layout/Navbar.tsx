'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCompass, FaStore, FaMapMarkerAlt, FaChartBar, FaBars, FaTimes } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { href: '/explore', label: 'Explore', icon: <FaCompass /> },
        { href: '/marketplace', label: 'Marketplace', icon: <FaStore /> },
        { href: '/my-trip', label: 'My Trip', icon: <FaMapMarkerAlt /> },
    ];

    if (session) {
        navLinks.push({ href: '/agency/dashboard', label: 'Dashboard', icon: <FaChartBar /> });
    }

    const isAuthPage = pathname?.startsWith('/auth');
    if (isAuthPage) return null;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mt-4 rounded-2xl px-6 py-3 flex items-center justify-between"
                    style={{
                        background: 'rgba(10, 14, 26, 0.85)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                >
                    <Link href="/" className="flex items-center gap-2.5 shrink-0">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-lg italic"
                            style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)', boxShadow: '0 4px 15px rgba(36,99,235,0.4)' }}>
                            A
                        </div>
                        <span className="text-xl font-black tracking-tight text-white hidden sm:block">
                            AI POWERED<span className="text-blue-400 italic"> TRIP ADVISOR</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                                        ? 'bg-blue-600/20 text-blue-400'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <span className="text-base">{link.icon}</span>
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {session ? (
                            <>
                                <button
                                    onClick={() => signOut()}
                                    className="text-sm font-semibold text-slate-400 hover:text-red-400 transition-colors hidden sm:block"
                                >
                                    Logout
                                </button>
                                <Link href="/profile" className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-500/30 hover:border-blue-500 transition-colors shrink-0">
                                    <img
                                        src={session.user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100"}
                                        className="w-full h-full object-cover"
                                        alt="Avatar"
                                    />
                                </Link>
                            </>
                        ) : (
                            <div className="hidden sm:flex gap-2">
                                <Link href="/auth/login"
                                    className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors rounded-xl hover:bg-white/5">
                                    Login
                                </Link>
                                <Link href="/auth/login"
                                    className="px-5 py-2 text-sm font-bold text-white rounded-xl transition-all"
                                    style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)', boxShadow: '0 4px 15px rgba(36,99,235,0.3)' }}>
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden text-slate-400 hover:text-white text-xl p-2"
                        >
                            {mobileOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="md:hidden mt-2 rounded-2xl p-4 animate-fade-in"
                        style={{
                            background: 'rgba(10, 14, 26, 0.95)',
                            backdropFilter: 'blur(24px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}
                    >
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <span className="text-base">{link.icon}</span>
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                        {!session && (
                            <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
                                <Link href="/auth/login" onClick={() => setMobileOpen(false)}
                                    className="flex-1 text-center px-4 py-2.5 text-sm font-semibold text-slate-300 rounded-xl border border-white/10">
                                    Login
                                </Link>
                                <Link href="/auth/login" onClick={() => setMobileOpen(false)}
                                    className="flex-1 text-center px-4 py-2.5 text-sm font-bold text-white rounded-xl"
                                    style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)' }}>
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
