'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaGoogle, FaApple, FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaArrowRight, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSignUp) {
            // Handle signup
            console.log('Sign up:', { name, email, phone, password });
        } else {
            // Handle login
            await signIn('credentials', { email, password, redirect: true, callbackUrl: '/' });
        }
    };

    return (
        <div className="min-h-screen flex" style={{ background: '#0a0e1a' }}>
            {/* Left side - Image/Brand */}
            <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                        alt="Travel destination"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,14,26,0.85) 0%, rgba(36,99,235,0.4) 100%)' }} />
                </div>

                <div className="relative z-10 max-w-xl p-12">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <Link href="/" className="flex items-center gap-2.5 mb-12">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xl italic"
                                style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)', boxShadow: '0 4px 20px rgba(36,99,235,0.5)' }}>
                                A
                            </div>
                            <span className="text-2xl font-black text-white">AI POWERED<span className="text-blue-400 italic"> TRIP ADVISOR</span></span>
                        </Link>

                        <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                            Explore the world&apos;s most premium destinations.
                        </h1>
                        <p className="text-lg text-blue-100/80 leading-relaxed">
                            Join thousands of travellers discovering luxury experiences curated just for you.
                        </p>

                        {/* Floating stats cards */}
                        <div className="flex gap-4 mt-10">
                            {[
                                { value: '200+', label: 'Destinations' },
                                { value: '50K+', label: 'Travelers' },
                                { value: '4.9★', label: 'Rating' },
                            ].map((stat, i) => (
                                <div key={i} className="px-5 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}>
                                    <p className="text-xl font-black text-white">{stat.value}</p>
                                    <p className="text-xs text-blue-200/70">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                    className="w-full max-w-md">

                    {/* Mobile logo */}
                    <Link href="/" className="flex lg:hidden items-center gap-2.5 mb-10 justify-center">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xl italic"
                            style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)' }}>
                            A
                        </div>
                        <span className="text-2xl font-black text-white">AI POWERED<span className="text-blue-400 italic"> TRIP ADVISOR</span></span>
                    </Link>

                    <h2 className="text-3xl font-black text-white mb-2">
                        {isSignUp ? 'Create account' : 'Welcome back'}
                    </h2>
                    <p className="text-slate-400 mb-8">
                        {isSignUp ? 'Start your journey with AI Powered Trip Advisor.' : 'Please enter your details to sign in.'}
                    </p>

                    {/* Social Login */}
                    <div className="flex gap-3 mb-6">
                        <button onClick={() => signIn('google', { callbackUrl: '/' })}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:bg-white/10"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <FaGoogle className="text-lg" /> Google
                        </button>
                        <button
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:bg-white/10"
                            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <FaApple className="text-lg" /> Apple
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">or continue with email</span>
                        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isSignUp && (
                            <div className="relative">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input-dark pl-11"
                                    required
                                />
                            </div>
                        )}

                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-dark pl-11"
                                required
                            />
                        </div>

                        {isSignUp && (
                            <div className="relative">
                                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="tel"
                                    placeholder="Phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="input-dark pl-11"
                                />
                            </div>
                        )}

                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-dark pl-11 pr-11"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {!isSignUp && (
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-blue-500" />
                                    <span className="text-sm text-slate-400">Remember me</span>
                                </label>
                                <a href="#" className="text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        <button type="submit"
                            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold transition-all hover:-translate-y-0.5"
                            style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)', boxShadow: '0 4px 20px rgba(36,99,235,0.4)' }}>
                            {isSignUp ? 'Create Account' : 'Sign In'} <FaArrowRight className="text-sm" />
                        </button>
                    </form>

                    {/* Toggle */}
                    <p className="text-center text-sm text-slate-400 mt-6">
                        {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-blue-400 hover:text-blue-300 font-bold transition-colors"
                        >
                            {isSignUp ? 'Sign in' : 'Sign up for free'}
                        </button>
                    </p>

                    {/* Terms */}
                    <p className="text-center text-xs text-slate-600 mt-6">
                        By continuing, you agree to our{' '}
                        <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
