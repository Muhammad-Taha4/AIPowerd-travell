'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaArrowRight, FaRobot, FaCalendarAlt, FaSnowflake, FaSun, FaCloudRain, FaInfoCircle, FaChevronRight, FaHeart, FaRegHeart, FaThermometerHalf, FaWind, FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';

const aiRecommendations = [
    {
        destination: 'Kyoto, Japan',
        category: 'Cultural Heritage',
        categoryIcon: '🏛️',
        price: '$2,450',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
        rating: 4.9,
        aiReason: 'Matches your interest in historical sites and high engagement with "Zen Garden" posts last week.',
        bestTime: 'Apr-May',
        weather: '18°C',
    },
    {
        destination: 'Reykjavik, Iceland',
        category: 'Nature & Adventure',
        categoryIcon: '🏔️',
        price: '$3,100',
        image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=600&q=80',
        rating: 4.8,
        aiReason: 'High probability of Northern Lights visibility during your selected dates.',
        bestTime: 'Sep-Mar',
        weather: '-2°C',
    },
    {
        destination: 'Santorini, Greece',
        category: 'Romantic Getaway',
        categoryIcon: '🏖️',
        price: '$2,100',
        image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=600&q=80',
        rating: 4.9,
        aiReason: 'Rare price drop detected for luxury suites in Oia.',
        bestTime: 'Jun-Sep',
        weather: '28°C',
    },
    {
        destination: 'Patagonia, Argentina',
        category: 'Wilderness',
        categoryIcon: '🌿',
        price: '$2,850',
        image: 'https://images.unsplash.com/photo-1508009579867-82cf33c83ac1?auto=format&fit=crop&w=600&q=80',
        rating: 4.7,
        aiReason: 'Your adventure travel score is high. Peak trekking season starts next month.',
        bestTime: 'Nov-Mar',
        weather: '15°C',
    },
    {
        destination: 'Marrakech, Morocco',
        category: 'Cultural Immersion',
        categoryIcon: '🕌',
        price: '$1,650',
        image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=600&q=80',
        rating: 4.6,
        aiReason: 'Budget-friendly luxury option. Matches your culinary exploration interests.',
        bestTime: 'Mar-May',
        weather: '24°C',
    },
    {
        destination: 'Tromsø, Norway',
        category: 'Arctic Experience',
        categoryIcon: '❄️',
        price: '$3,400',
        image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=80',
        rating: 4.8,
        aiReason: 'Perfect time for midnight sun experience. Rare whale watching opportunity available.',
        bestTime: 'Jun-Aug',
        weather: '10°C',
    },
];

const travelAdvisory = {
    title: 'Travel Advisory: Southeast Asia',
    message: 'Updates on regional safety protocols are in effect. Please review the latest guidelines before booking travel to this region.',
};

const bestTimeData = [
    { dest: 'Kyoto', best: 'Apr-May', icon: <FaLeaf className="text-pink-400" />, season: 'Cherry Blossom' },
    { dest: 'Reykjavik', best: 'Sep-Mar', icon: <FaSnowflake className="text-blue-300" />, season: 'Northern Lights' },
    { dest: 'Santorini', best: 'Jun-Sep', icon: <FaSun className="text-yellow-400" />, season: 'Summer' },
    { dest: 'Patagonia', best: 'Nov-Mar', icon: <FaWind className="text-teal-400" />, season: 'Trekking' },
];

export default function ExplorePage() {
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState<Set<number>>(new Set());

    React.useEffect(() => {
        const fetchRecs = async () => {
            try {
                // In a real scenario, we'd pass the JWT token here
                const res = await fetch('http://localhost:5000/api/ai/recommendations/personalized', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ preferences: ["Adventure", "Luxury"] }) // Fallback prefs
                });
                if (res.ok) {
                    const data = await res.json();
                    setRecommendations(data.recommendations);
                }
            } catch (err) {
                console.error('Failed to fetch AI recommendations');
            } finally {
                setLoading(false);
            }
        };
        fetchRecs();
    }, []);

    const toggleFav = (i: number) => {
        setFavorites(prev => {
            const next = new Set(prev);
            next.has(i) ? next.delete(i) : next.add(i);
            return next;
        });
    };

    return (
        <div className="min-h-screen pt-8 pb-20" style={{ background: '#0a0e1a' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Travel Advisory Banner */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="mb-8 p-4 rounded-xl flex items-start gap-3"
                    style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
                    <FaInfoCircle className="text-amber-400 text-lg mt-0.5 shrink-0" />
                    <div>
                        <h4 className="text-sm font-bold text-amber-400">{travelAdvisory.title}</h4>
                        <p className="text-sm text-amber-200/70 mt-1">{travelAdvisory.message}</p>
                    </div>
                </motion.div>

                {/* Hero */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(36,99,235,0.15)', border: '1px solid rgba(36,99,235,0.3)' }}>
                        <FaRobot className="text-blue-400 text-sm" />
                        <span className="text-blue-400 text-sm font-semibold">AI-Powered Recommendations</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
                        Where will AI take you <span className="gradient-text">next?</span>
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        Curated recommendations based on your travel history and preferences.
                    </p>
                </motion.div>

                {/* AI Recommendation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {loading && [1, 2, 3].map(i => (
                        <div key={i} className="h-80 rounded-2xl animate-pulse bg-white/5 border border-white/10" />
                    ))}

                    {!loading && recommendations.map((rec: any, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                            <div className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                                style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="relative h-48 overflow-hidden">
                                    <img src={rec.image || "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e"} alt={rec.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />

                                    {/* Favorite button */}
                                    <button onClick={() => toggleFav(i)} className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                                        style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }}>
                                        {favorites.has(i) ? <FaHeart className="text-red-400" /> : <FaRegHeart className="text-white/70" />}
                                    </button>

                                    <div className="absolute top-3 left-3">
                                        <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(36,99,235,0.9)' }}>
                                            ✨ AI Pick
                                        </span>
                                    </div>

                                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                                        <div>
                                            <p className="text-lg font-bold text-white">{rec.title || rec.destination}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <FaStar className="text-yellow-400 text-xs" />
                                                <span className="text-sm text-white/80">4.9</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs text-slate-300">From</span>
                                            <p className="text-xl font-black text-blue-400">${rec.price}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5">
                                    {/* AI Reason */}
                                    <div className="flex items-start gap-2 p-3 rounded-xl mb-4" style={{ background: 'rgba(36,99,235,0.08)', border: '1px solid rgba(36,99,235,0.15)' }}>
                                        <FaRobot className="text-blue-400 text-sm mt-0.5 shrink-0" />
                                        <p className="text-xs text-blue-300/80 leading-relaxed">
                                            <span className="font-semibold text-blue-400">Why AI chose this: </span>
                                            {rec.explanation || "Matches your interest in premium adventure stays."}
                                        </p>
                                    </div>

                                    {/* Quick Info */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 text-xs text-slate-400">
                                                <FaCalendarAlt className="text-slate-500" />
                                                <span>Best Match</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-slate-400">
                                                <FaThermometerHalf className="text-slate-500" />
                                                <span>{rec.relevance_score ? `${(rec.relevance_score * 100).toFixed(0)}% Match` : '98% Match'}</span>
                                            </div>
                                        </div>
                                        <Link href={`/marketplace/${rec.package_id || '1'}`} className="text-blue-400 hover:text-blue-300 transition-colors">
                                            <FaChevronRight className="text-sm" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Best Time to Visit */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <div className="rounded-2xl p-8" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <h2 className="text-2xl font-black text-white mb-2">Best Time to Visit</h2>
                        <p className="text-slate-400 text-sm mb-6">Based on crowd levels, weather, and local events.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {bestTimeData.map((item, i) => (
                                <div key={i} className="p-4 rounded-xl transition-all hover:bg-white/5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div className="flex items-center gap-2 mb-3">
                                        {item.icon}
                                        <span className="text-sm font-bold text-white">{item.dest}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xs text-slate-500 uppercase tracking-wider">Best</span>
                                            <p className="text-sm font-bold text-blue-400">{item.best}</p>
                                        </div>
                                        <span className="text-xs text-slate-400 px-2 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                            {item.season}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Mood-based Suggestions */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    className="mt-12">
                    <h2 className="text-2xl font-black text-white mb-6">What&apos;s your travel mood?</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {[
                            { emoji: '🏖️', mood: 'Beach', color: '#f59e0b' },
                            { emoji: '🏔️', mood: 'Adventure', color: '#10b981' },
                            { emoji: '🏛️', mood: 'Cultural', color: '#8b5cf6' },
                            { emoji: '💆', mood: 'Wellness', color: '#ec4899' },
                            { emoji: '🍽️', mood: 'Culinary', color: '#ef4444' },
                            { emoji: '❄️', mood: 'Winter', color: '#06b6d4' },
                        ].map((m, i) => (
                            <button key={i} className="p-4 rounded-xl text-center transition-all hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                                style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <span className="text-3xl block mb-2">{m.emoji}</span>
                                <span className="text-sm font-bold text-white">{m.mood}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    className="mt-16 text-center">
                    <div className="rounded-2xl p-10 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1f2e, #111827)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at top right, rgba(36,99,235,0.3), transparent 60%)' }} />
                        <div className="relative">
                            <h3 className="text-2xl font-black text-white mb-3">Can&apos;t decide? Let AI plan your trip</h3>
                            <p className="text-slate-400 mb-6 max-w-lg mx-auto">Tell us your preferences and budget, and our AI will create a personalized itinerary in seconds.</p>
                            <Link href="/marketplace" className="btn-primary inline-flex items-center gap-2">
                                Explore Packages <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
