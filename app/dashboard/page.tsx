'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    FaPlane, FaBell, FaCalendarAlt, FaStar,
    FaUserCircle, FaCreditCard, FaMapMarkerAlt, FaCommentDots
} from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [stats, setStats] = useState({ bookings: 0, reviews: 0, spent: 0 });
    const [upcomingTrips, setUpcomingTrips] = useState<any[]>([]);
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/login?from=/dashboard');
            return;
        }

        if (status === 'authenticated' && (session?.user as any)?.accessToken) {
            const fetchData = async () => {
                try {
                    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
                    const headers = { 'Authorization': `Bearer ${(session?.user as any)?.accessToken}` };

                    // Fetch Stats
                    const statsRes = await fetch(`${apiBase}/analytics/traveller`, { headers });
                    if (statsRes.ok) {
                        const statsData = await statsRes.json();
                        setStats({
                            bookings: statsData.total_bookings,
                            reviews: statsData.total_reviews,
                            spent: statsData.total_spent
                        });
                    }

                    // Fetch My Bookings
                    const bookingsRes = await fetch(`${apiBase}/booking/my-bookings`, { headers });
                    if (bookingsRes.ok) {
                        const bookingsData = await bookingsRes.json();
                        setUpcomingTrips(bookingsData);
                    }

                    // Fetch AI Alerts
                    const alertRes = await fetch(`${apiBase}/ai/alerts/real-time/Global`);
                    if (alertRes.ok) {
                        const alertData = await alertRes.json();
                        setAlerts([{ id: '1', title: 'AI Travel Insight', message: alertData.alerts, time: 'Just now' }]);
                    }
                } catch (error) {
                    console.error("Dashboard fetch failed:", error);
                }
            };
            fetchData();
        }
    }, [session, status]);

    if (status === 'loading') return <div className="min-h-screen flex items-center justify-center">Loading session...</div>;

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900">Welcome back, <span className="text-primary italic">Traveller</span></h1>
                        <p className="text-gray-500 mt-1">Your next adventure is just a few clicks away.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/explore">
                            <Button className="rounded-2xl px-8 font-bold shadow-lg shadow-primary/20">
                                <FaPlane className="mr-2" /> Book New Trip
                            </Button>
                        </Link>
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm cursor-pointer relative">
                            <FaBell className="text-gray-400" />
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <div className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-1">Total Bookings</div>
                            <div className="text-3xl font-black text-gray-900">{stats.bookings}</div>
                        </div>
                        <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-2xl font-black">
                            <FaCalendarAlt />
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <div className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-1">Trusted Reviews</div>
                            <div className="text-3xl font-black text-gray-900">{stats.reviews}</div>
                        </div>
                        <div className="w-14 h-14 bg-yellow-50 text-yellow-500 rounded-2xl flex items-center justify-center text-2xl">
                            <FaStar />
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <div className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-1">Travel Credits</div>
                            <div className="text-3xl font-black text-gray-900">${stats.spent}</div>
                        </div>
                        <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center text-2xl">
                            <FaCreditCard />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Upcoming Trips */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                <FaMapMarkerAlt className="text-primary" /> Upcoming Adventures
                            </h2>
                            <div className="space-y-4">
                                {upcomingTrips.map(trip => (
                                    <div key={trip.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow">
                                        <img src={trip.package.image} className="w-24 h-24 rounded-2xl object-cover" alt={trip.package.title} />
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-bold text-gray-900">{trip.package.title}</h3>
                                            <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                                <FaCalendarAlt /> {new Date(trip.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="mt-3">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${trip.status === 'CONFIRMED' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                                    {trip.status}
                                                </span>
                                            </div>
                                        </div>
                                        <Link href={`/trip/monitoring`}>
                                            <Button variant="outline" className="rounded-xl border-gray-100 font-bold">View Details</Button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Alerts & AI */}
                    <div className="space-y-8">
                        <section className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                <FaBell className="text-red-500" /> Notifications
                            </h3>
                            <div className="space-y-6">
                                {alerts.map(alert => (
                                    <div key={alert.id} className="group cursor-pointer">
                                        <div className="font-bold text-gray-900 group-hover:text-primary transition-colors">{alert.title}</div>
                                        <div className="text-sm text-gray-500 mt-1">{alert.message}</div>
                                        <div className="text-[10px] text-gray-300 font-bold uppercase mt-2">{alert.time}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-slate-900 p-8 rounded-[32px] text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
                            <h3 className="text-xl font-black mb-4 flex items-center gap-3">
                                <FaCommentDots className="text-secondary" /> Travel AI
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                "Based on your 5-star review of Zurich, you might love our new Hidden Gems of Iceland tour."
                            </p>
                            <Button className="w-full bg-secondary hover:bg-secondary/90 text-slate-900 font-black rounded-2xl py-6">
                                Ask for Recommendation
                            </Button>
                        </section>
                    </div>
                </div>

            </div>
        </div>
    );
}
