'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaClock, FaPhone, FaExclamationTriangle, FaChevronRight, FaCheck, FaCircle, FaBell, FaUser, FaCar, FaPlane, FaHotel, FaRoute, FaShieldAlt, FaCompass, FaStar, FaArrowRight, FaCoffee, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { io } from 'socket.io-client';

const tripData = {
    title: 'Paris to Berlin',
    subtitle: 'Day 3 of 7 • Business Delegation',
    progress: 43,
    currentLocation: 'En route to Berlin',
    eta: '2h 15m',
    distance: '147 km remaining',
};

const timeline = [
    { time: '08:00', title: 'Departed Paris', subtitle: 'Hotel Ritz Paris', status: 'completed', icon: <FaHotel /> },
    { time: '10:30', title: 'Coffee Stop', subtitle: 'Rest Stop A4', status: 'completed', icon: <FaCoffee /> },
    { time: '14:45', title: 'En route to Berlin', subtitle: 'Approaching city limits. Traffic is moderate.', status: 'current', icon: <FaCar /> },
    { time: '17:00', title: 'Arrival at Hotel', subtitle: 'Hotel Adlon Kempinski', status: 'upcoming', icon: <FaHotel /> },
];

const driverInfo = {
    name: 'Hans Muller',
    vehicle: 'Mercedes V-Class',
    plate: 'B-KM-402',
    rating: 4.9,
    phone: '+49 170 123 4567',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
};

const emergencyContacts = [
    { label: 'Emergency SOS', number: '112', color: '#ef4444' },
    { label: 'Local Police', number: '110', color: '#f59e0b' },
    { label: 'Fusix Support', number: '+1 800 FUSIX', color: '#2463eb' },
    { label: 'Embassy', number: '+49 30 8305 0', color: '#8b5cf6' },
];

const upcomingStops = [
    { day: 'Day 4', title: 'Berlin City Tour', location: 'Berlin, Germany', time: '09:00 AM', type: 'Sightseeing' },
    { day: 'Day 5', title: 'Brandenburg Gate Visit', location: 'Berlin, Germany', time: '10:30 AM', type: 'Landmark' },
    { day: 'Day 6', title: 'Train to Munich', location: 'Berlin → Munich', time: '08:00 AM', type: 'Transfer' },
    { day: 'Day 7', title: 'Departure', location: 'Munich Airport', time: '14:00 PM', type: 'Flight' },
];

const alerts = [
    { type: 'info', message: 'Weather update: Light rain expected in Berlin this evening. Pack an umbrella.', time: '5 min ago' },
    { type: 'warning', message: 'Traffic congestion detected on A9 highway. Alternate route suggested.', time: '12 min ago' },
];

export default function MyTripPage() {
    const [tripStatus, setTripStatus] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('timeline');
    const [showSOS, setShowSOS] = useState(false);
    const [liveTime, setLiveTime] = useState(new Date());
    const socketRef = useRef<any>(null);

    useEffect(() => {
        // Init Socket
        socketRef.current = io('http://localhost:5000');

        socketRef.current.emit('join_room', { booking_id: '12345' });

        const fetchStatus = async () => {
            try {
                // Mocking a booking ID
                const res = await fetch('http://localhost:5000/api/monitoring/status/12345', {
                    headers: { 'Authorization': 'Bearer placeholder' }
                });
                if (res.ok) {
                    const data = await res.json();
                    setTripStatus(data);
                }
            } catch (err) {
                console.error('Failed to fetch trip status');
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();

        const timer = setInterval(() => setLiveTime(new Date()), 1000);
        return () => {
            if (socketRef.current) socketRef.current.disconnect();
            clearInterval(timer);
        };
    }, []);

    const triggerSOS = () => {
        if (socketRef.current) {
            socketRef.current.emit('trigger_sos', {
                booking_id: '12345',
                user_id: 'current-user',
                location: 'Paris-Berlin Highway'
            });
            alert("Emergency SOS triggered! Help is on the way.");
        }
    };

    const displayData = tripStatus ? {
        title: 'Current Expedition',
        subtitle: `Booking #${tripStatus.booking_id} • ${tripStatus.status}`,
        progress: 65,
        currentLocation: tripStatus.current_location_name || 'Alps Region',
        eta: tripStatus.eta,
        distance: 'Direct route active',
    } : tripData;

    return (
        <div className="min-h-screen pt-8 pb-20" style={{ background: '#0a0e1a' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-6">
                    {['Dashboard', 'Trips', 'Alerts', 'Profile'].map((tab) => (
                        <button key={tab}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === 'Trips'
                                ? 'bg-blue-600/20 text-blue-400'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}>
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Trip Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl mb-6 relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #1a1f2e, #111827)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at top right, rgba(36,99,235,0.3), transparent 60%)' }} />
                    <div className="relative">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-3xl font-black text-white">{displayData.title}</h1>
                                <p className="text-slate-400 mt-1">{displayData.subtitle}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
                                    <FaCircle className="text-green-400 text-xs animate-pulse" />
                                    <span className="text-sm font-semibold text-green-400">Live tracking active</span>
                                </div>
                                <button onClick={() => setShowSOS(!showSOS)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                                    style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 4px 15px rgba(239,68,68,0.3)' }}>
                                    <FaExclamationTriangle /> SOS
                                </button>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-blue-400" /> {displayData.currentLocation}
                                </span>
                                <span className="text-slate-400 flex items-center gap-2">
                                    <FaClock className="text-blue-400" /> ETA: {displayData.eta} • {displayData.distance}
                                </span>
                            </div>
                            <div className="w-full h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                                <div className="h-full rounded-full transition-all duration-1000 relative"
                                    style={{ width: `${displayData.progress}%`, background: 'linear-gradient(90deg, #2463eb, #3b82f6)' }}>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-400 border-2 border-white shadow-lg shadow-blue-500/50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* SOS Panel */}
                {showSOS && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="p-6 rounded-2xl mb-6" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                        <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                            <FaExclamationTriangle /> Emergency Contacts
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {emergencyContacts.map((contact, i) => (
                                <a key={i} href={`tel:${contact.number}`}
                                    className="p-4 rounded-xl text-center transition-all hover:-translate-y-1"
                                    style={{ background: `${contact.color}15`, border: `1px solid ${contact.color}30` }}>
                                    <FaPhone className="mx-auto mb-2" style={{ color: contact.color }} />
                                    <p className="text-sm font-bold text-white">{contact.label}</p>
                                    <p className="text-xs mt-1" style={{ color: contact.color }}>{contact.number}</p>
                                </a>
                            ))}
                        </div>
                        <button onClick={triggerSOS}
                            className="w-full mt-4 py-4 rounded-xl text-white font-black text-xl animate-pulse shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)', border: '2px solid rgba(255,255,255,0.2)' }}>
                            CONFIRM EMERGENCY SOS
                        </button>
                    </motion.div>
                )}

                {/* Alerts */}
                {alerts.map((alert, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                        className="p-4 rounded-xl mb-3 flex items-start gap-3"
                        style={{
                            background: alert.type === 'warning' ? 'rgba(245,158,11,0.08)' : 'rgba(36,99,235,0.08)',
                            border: `1px solid ${alert.type === 'warning' ? 'rgba(245,158,11,0.15)' : 'rgba(36,99,235,0.15)'}`,
                        }}>
                        <FaBell className={`mt-0.5 shrink-0 ${alert.type === 'warning' ? 'text-amber-400' : 'text-blue-400'}`} />
                        <div className="flex-1">
                            <p className={`text-sm ${alert.type === 'warning' ? 'text-amber-200/80' : 'text-blue-200/80'}`}>{alert.message}</p>
                            <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                        </div>
                    </motion.div>
                ))}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Timeline */}
                    <div className="lg:col-span-2">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <FaRoute className="text-blue-400" /> Trip Timeline
                                    </h2>
                                    <span className="text-xs text-green-400 font-semibold flex items-center gap-1">
                                        <FaCircle className="text-xs animate-pulse" /> Live tracking active
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    {timeline.map((event, i) => (
                                        <div key={i} className="flex gap-4">
                                            {/* Timeline line */}
                                            <div className="flex flex-col items-center">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm shrink-0 ${event.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                    event.status === 'current' ? 'bg-blue-500/20 text-blue-400 ring-2 ring-blue-400/30' :
                                                        'bg-white/5 text-slate-500'
                                                    }`}>
                                                    {event.status === 'completed' ? <FaCheckCircle /> :
                                                        event.status === 'current' ? <FaSpinner className="animate-spin" /> : event.icon}
                                                </div>
                                                {i < timeline.length - 1 && (
                                                    <div className="w-0.5 flex-1 min-h-[40px] my-1" style={{
                                                        background: event.status === 'completed' ? '#10b981' : 'rgba(255,255,255,0.08)',
                                                    }} />
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 pb-6">
                                                <div className="p-4 rounded-xl" style={event.status === 'current' ? { background: 'rgba(36,99,235,0.08)', border: '1px solid rgba(36,99,235,0.15)' } : { background: 'rgba(255,255,255,0.02)' }}>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h4 className={`text-sm font-bold ${event.status === 'upcoming' ? 'text-slate-500' : 'text-white'}`}>{event.title}</h4>
                                                            <p className="text-xs text-slate-400 mt-1">{event.subtitle}</p>
                                                        </div>
                                                        <span className={`text-xs font-semibold ${event.status === 'completed' ? 'text-green-400' :
                                                            event.status === 'current' ? 'text-blue-400' : 'text-slate-500'
                                                            }`}>{event.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Upcoming Stops */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="mt-6">
                            <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <h2 className="text-xl font-bold text-white mb-4">Upcoming Stops</h2>
                                <div className="space-y-3">
                                    {upcomingStops.map((stop, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-white/5"
                                            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                                            <div className="w-12 text-center">
                                                <p className="text-xs text-blue-400 font-bold">{stop.day}</p>
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-white">{stop.title}</p>
                                                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                                    <FaMapMarkerAlt className="text-xs" /> {stop.location}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-slate-300 font-semibold">{stop.time}</p>
                                                <span className="text-xs text-slate-500">{stop.type}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Driver Info */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <h3 className="text-lg font-bold text-white mb-4">Driver Details</h3>
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={driverInfo.avatar} alt={driverInfo.name} className="w-14 h-14 rounded-full object-cover" />
                                    <div>
                                        <p className="text-sm font-bold text-white">{driverInfo.name}</p>
                                        <p className="text-xs text-slate-400">{driverInfo.vehicle} • {driverInfo.plate}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <FaStar className="text-yellow-400 text-xs" />
                                            <span className="text-xs font-semibold text-white">{driverInfo.rating}</span>
                                        </div>
                                    </div>
                                </div>
                                <a href={`tel:${driverInfo.phone}`}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-blue-400 transition-all hover:bg-blue-400/10"
                                    style={{ background: 'rgba(36,99,235,0.1)', border: '1px solid rgba(36,99,235,0.2)' }}>
                                    <FaPhone className="text-xs" /> Call Driver
                                </a>
                            </div>
                        </motion.div>

                        {/* Map Placeholder */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                            <div className="rounded-2xl overflow-hidden relative h-64" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
                                    <div className="text-center">
                                        <FaCompass className="text-4xl text-blue-400/50 mx-auto mb-3 animate-spin-slow" />
                                        <p className="text-sm text-slate-400">Live Map View</p>
                                        <p className="text-xs text-slate-500 mt-1">Paris → Berlin</p>
                                        <div className="mt-3 flex items-center justify-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                            <span className="text-xs text-green-400 font-semibold">Tracking Active</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Actions */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                            <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { icon: <FaPhone />, label: 'Call Support', color: '#2463eb' },
                                        { icon: <FaMapMarkerAlt />, label: 'Share Location', color: '#10b981' },
                                        { icon: <FaHotel />, label: 'Hotel Info', color: '#8b5cf6' },
                                        { icon: <FaPlane />, label: 'Flight Status', color: '#f59e0b' },
                                    ].map((action, i) => (
                                        <button key={i} className="p-3 rounded-xl text-center transition-all hover:-translate-y-1"
                                            style={{ background: `${action.color}10`, border: `1px solid ${action.color}20` }}>
                                            <div className="text-lg mb-1" style={{ color: action.color }}>{action.icon}</div>
                                            <p className="text-xs font-semibold text-slate-300">{action.label}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Trip Stats */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                            <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <h3 className="text-lg font-bold text-white mb-4">Trip Stats</h3>
                                <div className="space-y-3">
                                    {[
                                        { label: 'Total Distance', value: '1,050 km', sublabel: 'of 2,400 km' },
                                        { label: 'Time Elapsed', value: '2d 6h', sublabel: 'of 7 days' },
                                        { label: 'Stops Made', value: '5', sublabel: 'of 12 planned' },
                                        { label: 'Safety Score', value: '98%', sublabel: 'Excellent' },
                                    ].map((stat, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                            <span className="text-sm text-slate-400">{stat.label}</span>
                                            <div className="text-right">
                                                <span className="text-sm font-bold text-white">{stat.value}</span>
                                                <span className="text-xs text-slate-500 block">{stat.sublabel}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
