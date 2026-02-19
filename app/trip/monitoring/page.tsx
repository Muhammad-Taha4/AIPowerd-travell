'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FaPhoneAlt, FaExclamationTriangle, FaMapMarkerAlt, FaShieldAlt, FaInfoCircle } from 'react-icons/fa';

export default function TripMonitoringPage() {
    const [status, setStatus] = useState('ongoing');
    const [location, setLocation] = useState({ lat: 46.8182, lng: 8.2275 }); // Mock Swiss location
    const [sosTriggered, setSosTriggered] = useState(false);

    const triggerSOS = () => {
        if (confirm("ALERT: This will notify local emergency services and your agency. Are you sure?")) {
            setSosTriggered(true);
            // In real app, call /monitoring/sos
        }
    };

    return (
        <div className="bg-slate-950 min-h-screen text-white">
            {/* Real-time Map Background (Mock) */}
            <div className="fixed inset-0 opacity-40 grayscale">
                <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000"
                    className="w-full h-full object-cover"
                    alt="Map Background"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 flex flex-col h-screen">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
                    <div>
                        <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Live Trip Monitoring
                        </div>
                        <h1 className="text-3xl font-black">Alpine Adventure: Day 3</h1>
                    </div>
                    <div className="flex gap-4">
                        <Button className="bg-white/10 hover:bg-white/20 rounded-2xl h-14 w-14 p-0">
                            <FaPhoneAlt />
                        </Button>
                        <Button
                            onClick={triggerSOS}
                            className={`${sosTriggered ? 'bg-red-600 animate-bounce' : 'bg-red-500/80 hover:bg-red-600'} rounded-2xl px-8 font-black text-lg h-14 flex items-center gap-3 shadow-2xl shadow-red-900/40`}
                        >
                            <FaExclamationTriangle />
                            {sosTriggered ? 'SOS CALLED' : 'SOS'}
                        </Button>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-grow overflow-hidden">
                    {/* Status Panel */}
                    <div className="lg:col-span-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
                            <h3 className="text-gray-400 font-bold mb-4 uppercase text-xs tracking-widest">Global Snapshot</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Weather</span>
                                    <span className="font-bold">Sunny, 12°C</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Signal</span>
                                    <span className="text-green-400 font-bold">Excellent 5G</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Safe Zone</span>
                                    <span className="text-secondary font-bold">Inside</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/20 backdrop-blur-xl p-6 rounded-3xl border border-primary/20">
                            <h3 className="text-primary font-bold mb-4 flex items-center gap-2">
                                <FaShieldAlt /> Travel Insurance
                            </h3>
                            <div className="text-sm text-gray-300">
                                Policy #TRV-88291 is currently active. Coverage includes Mountain Rescue and Medical Evacuation.
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
                            <h3 className="text-gray-400 font-bold mb-4 uppercase text-xs tracking-widest">Next Milestone</h3>
                            <div className="flex items-start gap-4">
                                <div className="w-1 bg-primary h-12 rounded-full"></div>
                                <div>
                                    <div className="font-bold">Jungfraujoch Summit</div>
                                    <div className="text-sm text-gray-500">In approx. 2 hours</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Map Area (Mock) */}
                    <div className="lg:col-span-2 relative bg-slate-900/50 rounded-[40px] border border-white/5 overflow-hidden shadow-inner">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* Mock Pin */}
                            <div className="relative">
                                <div className="absolute -top-12 -left-3 bg-white text-slate-900 px-3 py-1 rounded-full text-xs font-black shadow-2xl">
                                    Current Location
                                </div>
                                <div className="w-6 h-6 bg-primary rounded-full border-4 border-white animate-ping"></div>
                                <div className="w-6 h-6 bg-primary rounded-full border-4 border-white absolute inset-0 shadow-2xl shadow-primary"></div>
                            </div>
                        </div>

                        {/* Map Controls */}
                        <div className="absolute top-6 right-6 flex flex-col gap-2">
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 font-bold">+</button>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 font-bold">-</button>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 bg-slate-950/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/20 rounded-xl text-primary">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 font-bold uppercase tracking-tighter">Coordinates</div>
                                    <div className="font-mono text-sm tracking-widest">{location.lat.toFixed(4)}°N, {location.lng.toFixed(4)}°E</div>
                                </div>
                            </div>
                            <Button variant="ghost" className="text-primary font-bold hover:bg-primary/10">Center Map</Button>
                        </div>
                    </div>

                    {/* Agency Feed */}
                    <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex flex-col">
                        <h3 className="text-gray-400 font-bold mb-6 uppercase text-xs tracking-widest flex items-center gap-2">
                            <FaInfoCircle className="text-secondary" /> Agency Support
                        </h3>
                        <div className="space-y-6 flex-grow overflow-y-auto">
                            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center font-bold">S</div>
                                <div>
                                    <div className="font-bold text-sm">Sarah (Travel Guide)</div>
                                    <p className="text-xs text-gray-400 mt-1">Check-in complete. You're on track for the summit tour.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center text-xs">AI</div>
                                <div>
                                    <div className="font-bold text-sm">Travel AI</div>
                                    <p className="text-xs text-gray-400 mt-1">Alert: Wind speeds increasing. Recommend extra layer.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Button className="w-full bg-secondary hover:bg-secondary/90 rounded-2xl font-black text-slate-900 py-6">
                                Open Direct Chat
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
