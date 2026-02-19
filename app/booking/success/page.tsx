'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaCheckCircle, FaRocket, FaCompass, FaCalendarCheck } from 'react-icons/fa';

export default function BookingSuccessPage() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-20 px-4">
            <div className="max-w-2xl w-full text-center">
                <div className="relative inline-block mb-10">
                    <div className="absolute inset-0 bg-secondary/20 rounded-full scale-150 animate-pulse"></div>
                    <div className="relative z-10 w-32 h-32 bg-secondary rounded-full flex items-center justify-center shadow-2xl shadow-secondary/40">
                        <FaCheckCircle className="text-slate-900 text-6xl" />
                    </div>
                </div>

                <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
                    Booking <span className="text-secondary italic">Confirmed!</span>
                </h1>

                <p className="text-xl text-gray-500 mb-12 max-w-lg mx-auto leading-relaxed">
                    Your adventure is officially scheduled! We've sent a detailed itinerary and booking confirmation to your email.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-center gap-4 text-left">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm">
                            <FaCalendarCheck />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900">Trip Scheduled</div>
                            <div className="text-sm text-gray-500">June 15 - June 22, 2026</div>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex items-center gap-4 text-left">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm">
                            <FaCompass />
                        </div>
                        <div>
                            <div className="font-bold text-gray-900">Next Step</div>
                            <div className="text-sm text-gray-500">Complete trip onboarding</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/trip/monitoring">
                        <Button className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-8 rounded-2xl font-black text-lg gap-3">
                            <FaRocket /> Start Monitoring
                        </Button>
                    </Link>
                    <Link href="/explore">
                        <Button variant="outline" className="px-10 py-8 rounded-2xl font-black text-lg border-gray-200">
                            Find More Trips
                        </Button>
                    </Link>
                </div>

                <p className="mt-12 text-sm text-gray-400">
                    Questions? <span className="text-secondary font-bold cursor-pointer">Chat with your agency</span>
                </p>
            </div>
        </div>
    );
}
