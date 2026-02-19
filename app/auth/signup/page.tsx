'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const apiBase = 'http://localhost:5000/api';
            const res = await fetch(`${apiBase}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    role: 'traveller'
                }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/explore');
            } else {
                setError(data.message || data.error || 'Signup failed');
            }
        } catch (err) {
            setError('Connection to server failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0a0e1a' }}>
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-xl italic" style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)' }}>A</div>
                        <span className="text-2xl font-black text-white">AI POWERED<span className="text-blue-400 italic"> TRIP ADVISOR</span></span>
                    </div>
                </div>

                <Card className="shadow-2xl border-none" style={{ background: '#111827' }}>
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-2xl font-bold text-white">Create Account</CardTitle>
                        <p className="text-sm text-slate-400 mt-2">Join the future of travel</p>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {error && (
                            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Full Name</label>
                                <Input
                                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:ring-blue-500"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Email Address</label>
                                <Input
                                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:ring-blue-500"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Phone Number</label>
                                <Input
                                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:ring-blue-500"
                                    type="tel"
                                    placeholder="+1 (555) 000-0000"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Password</label>
                                <Input
                                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:ring-blue-500"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-11 font-bold transition-all hover:scale-[1.02]"
                                style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)' }}
                                disabled={loading}
                            >
                                {loading ? 'Creating Account...' : 'Get Started'}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="justify-center text-sm pb-8">
                        <span className="text-slate-400">Already have an account?</span>
                        <button
                            type="button"
                            className="ml-2 text-blue-400 font-bold hover:text-blue-300"
                            onClick={() => router.push('/auth/login')}
                        >
                            Sign In
                        </button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
