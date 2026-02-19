'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaSearch, FaStar, FaPlane, FaHotel, FaMapMarkerAlt, FaArrowRight, FaShieldAlt, FaRobot, FaHeadset, FaGlobe, FaUsers, FaAward, FaChevronRight, FaCalendarAlt, FaUserFriends, FaMinus, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const destinations = [
    { name: 'Maldives', country: 'Indian Ocean', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80', rating: 4.9, price: '$2,450' },
    { name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=600&q=80', rating: 4.8, price: '$2,100' },
    { name: 'Kyoto', country: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80', rating: 4.9, price: '$2,800' },
    { name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80', rating: 4.7, price: '$1,800' },
];

const packages = [
    { title: 'Maldives Paradise Escape', duration: '7 Days', travelers: '2 Adults', price: '$4,299', originalPrice: '$5,100', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80', tag: 'Best Seller', rating: 4.9, reviews: 234 },
    { title: 'Swiss Alps Adventure', duration: '5 Days', travelers: '2 Adults', price: '$3,799', originalPrice: '$4,500', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=80', tag: 'Premium', rating: 4.8, reviews: 178 },
    { title: 'Tokyo & Kyoto Explorer', duration: '10 Days', travelers: '2 Adults', price: '$5,499', originalPrice: '$6,200', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80', tag: 'New', rating: 4.9, reviews: 89 },
];

const testimonials = [
    { name: 'Sarah Mitchell', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', text: 'AI Powered Trip Advisor made our honeymoon absolutely magical. Every detail was perfectly arranged.', rating: 5, trip: 'Maldives Paradise' },
    { name: 'James Rodriguez', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', text: 'The AI recommendations were spot on. Found destinations I never knew existed!', rating: 5, trip: 'Japan Explorer' },
    { name: 'Emily Chen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', text: 'Best travel platform I\'ve ever used. The real-time trip tracking gave me so much peace of mind.', rating: 5, trip: 'European Tour' },
];

export default function HomePage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [guests, setGuests] = useState(1);
    const [showGuestPicker, setShowGuestPicker] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.append('destination', searchQuery);
        if (searchDate) params.append('date', searchDate);
        params.append('guests', guests.toString());
        router.push(`/explore?${params.toString()}`);
    };

    return (
        <div className="min-h-screen" style={{ background: '#0a0e1a' }}>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                {/* Background gradient orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #2463eb 0%, transparent 70%)' }} />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }} />
                </div>

                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(36,99,235,0.15)', border: '1px solid rgba(36,99,235,0.3)' }}>
                            <FaRobot className="text-blue-400 text-sm" />
                            <span className="text-blue-400 text-sm font-semibold">AI-Powered Travel Platform</span>
                        </div>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-tight mb-6">
                        Discover Your Next
                        <br />
                        <span className="gradient-text">Dream Destination</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg sm:text-xl max-w-2xl mx-auto mb-10" style={{ color: '#94a3b8' }}>
                        Experience travel like never before with AI-curated itineraries, premium packages, and real-time trip monitoring.
                    </motion.p>

                    {/* Enhanced Search Bar */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                        className="max-w-4xl mx-auto mb-12">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-2 p-2 rounded-2xl md:rounded-3xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
                            <div className="flex-1 flex items-center gap-3 px-4 w-full">
                                <FaMapMarkerAlt className="text-blue-400 text-lg flex-shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Where to?"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-none outline-none text-white placeholder-slate-500 text-base py-4"
                                />
                            </div>

                            <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>

                            <div className="flex-1 flex items-center gap-3 px-4 w-full">
                                <FaCalendarAlt className="text-blue-400 text-lg flex-shrink-0" />
                                <input
                                    type="date"
                                    value={searchDate}
                                    onChange={(e) => setSearchDate(e.target.value)}
                                    className="w-full bg-transparent border-none outline-none text-white placeholder-slate-500 text-base py-4 [color-scheme:dark]"
                                />
                            </div>

                            <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>

                            <div className="flex-1 relative w-full">
                                <button
                                    type="button"
                                    onClick={() => setShowGuestPicker(!showGuestPicker)}
                                    className="flex items-center gap-3 px-4 w-full py-4 text-left"
                                >
                                    <FaUserFriends className="text-blue-400 text-lg flex-shrink-0" />
                                    <span className={guests > 0 ? "text-white" : "text-slate-500"}>
                                        {guests} {guests === 1 ? 'Guest' : 'Guests'}
                                    </span>
                                </button>

                                <AnimatePresence>
                                    {showGuestPicker && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 right-0 mt-2 p-4 rounded-xl z-50 border border-white/10 shadow-2xl"
                                            style={{ background: '#111827' }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold text-white">Guests</span>
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)); }}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 border border-white/10 hover:bg-white/5"
                                                    >
                                                        <FaMinus className="text-xs" />
                                                    </button>
                                                    <span className="text-white font-bold w-4 text-center">{guests}</span>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); setGuests(Math.min(10, guests + 1)); }}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 border border-white/10 hover:bg-white/5"
                                                    >
                                                        <FaPlus className="text-xs" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <button
                                type="submit"
                                className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl md:rounded-2xl text-white font-bold transition-all hover:scale-105 active:scale-95 flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)', boxShadow: '0 8px 30px rgba(36,99,235,0.4)' }}>
                                <FaSearch />
                                <span>Search</span>
                            </button>
                        </form>
                    </motion.div>

                    {/* Stats */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-8 sm:gap-16">
                        {[
                            { icon: <FaGlobe />, value: '200+', label: 'Destinations' },
                            { icon: <FaUsers />, value: '50K+', label: 'Travelers' },
                            { icon: <FaAward />, value: '4.9', label: 'Rating' },
                            { icon: <FaShieldAlt />, value: '100%', label: 'Secure' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-blue-400 text-xl mb-2 flex justify-center">{stat.icon}</div>
                                <div className="text-2xl font-black text-white">{stat.value}</div>
                                <div className="text-sm text-slate-500">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Trending Destinations */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">Popular Picks</span>
                        <h2 className="text-4xl font-black text-white mt-2">Trending Destinations</h2>
                        <p className="text-slate-400 mt-3 max-w-lg">Explore the most sought-after destinations curated by our AI travel engine.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {destinations.map((dest, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                            <Link href="/explore" className="group block rounded-2xl overflow-hidden" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="relative h-64 overflow-hidden">
                                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
                                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-xl" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)' }}>
                                        <FaStar className="text-yellow-400" /> {dest.rating}
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <p className="text-xl font-bold text-white mb-1">{dest.name}</p>
                                        <p className="text-sm text-slate-300 flex items-center gap-1.5"><FaMapMarkerAlt className="text-xs text-blue-400" /> {dest.country}</p>
                                    </div>
                                </div>
                                <div className="p-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-slate-500 mb-0.5">Starting from</p>
                                        <p className="text-xl font-black text-blue-400">{dest.price}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-all shadow-lg" style={{ background: 'rgba(36,99,235,0.1)' }}>
                                        <FaArrowRight className="text-sm" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Featured Packages */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">Hand-picked Luxury</span>
                    <h2 className="text-4xl font-black text-white mt-2">Exclusive Travel Packages</h2>
                    <p className="text-slate-400 mt-3 max-w-2xl mx-auto">Premium experiences with curated itineraries and VIP access to the world&apos;s most beautiful locations.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {packages.map((pkg, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                            <Link href="/explore" className="group block rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="relative h-72 overflow-hidden">
                                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,14,26,0.9) 0%, transparent 50%)' }} />
                                    <div className="absolute top-4 left-4">
                                        <span className="text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl text-white shadow-2xl" style={{ background: pkg.tag === 'Best Seller' ? '#ef4444' : pkg.tag === 'Premium' ? '#8b5cf6' : '#10b981' }}>
                                            {pkg.tag}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">{pkg.title}</h3>
                                    <div className="flex items-center gap-6 mb-6 text-sm text-slate-400">
                                        <span className="flex items-center gap-2"><FaCalendarAlt className="text-blue-400" /> {pkg.duration}</span>
                                        <span className="flex items-center gap-2"><FaUserFriends className="text-blue-400" /> {pkg.travelers}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <div>
                                            <span className="text-sm text-slate-500 line-through mb-1 block">{pkg.originalPrice}</span>
                                            <p className="text-3xl font-black text-white">{pkg.price}</p>
                                        </div>
                                        <div className="btn-primary px-8 py-3 rounded-xl font-bold flex items-center gap-2">
                                            Book Now <FaArrowRight className="text-xs" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Why Choose Fusix */}
            <section className="py-32 px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">Experience Excellence</span>
                        <h2 className="text-4xl font-black text-white mt-2">Why Choose AI Powered Trip Advisor</h2>
                        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">We combine cutting-edge technology with human expertise to deliver unparalleled travel experiences.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <FaRobot />, title: 'Smart AI Agent', desc: 'Personalized itineraries that learn your preferences over time leads to better trips.', color: '#3b82f6' },
                            { icon: <FaShieldAlt />, title: 'Verified Security', desc: 'Secure payment gateway and vetted partners ensure your peace of mind.', color: '#10b981' },
                            { icon: <FaHeadset />, title: 'Global 24/7 Support', desc: 'Our dedicated concierge team is always one message away whenever you need them.', color: '#8b5cf6' },
                        ].map((feature, i) => (
                            <div key={i} className="group p-10 rounded-3xl transition-all duration-300 hover:bg-white/5 border border-white/5">
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-8 transition-transform group-hover:scale-110 shadow-2xl"
                                    style={{ background: `${feature.color}15`, color: feature.color }}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-4">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-lg">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">Success Stories</span>
                    <h2 className="text-4xl font-black text-white mt-2">Loved by Travelers</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div key={i} className="p-8 rounded-3xl" style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.04)' }}>
                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(t.rating)].map((_, s) => <FaStar key={s} className="text-yellow-500 text-lg" />)}
                            </div>
                            <p className="text-slate-300 text-lg leading-relaxed italic mb-8">&ldquo;{t.text}&rdquo;</p>
                            <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                                <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/20" />
                                <div>
                                    <p className="text-lg font-bold text-white mb-0.5">{t.name}</p>
                                    <p className="text-sm text-blue-400 font-bold">{t.trip}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto text-center rounded-[40px] p-16 relative overflow-hidden shadow-2xl ring-1 ring-white/10"
                    style={{ background: 'linear-gradient(135deg, #111827 0%, #0a0e1a 100%)' }}>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full"></div>

                    <div className="relative z-10">
                        <h2 className="text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight">Ready for Your Next<br /><span className="text-blue-400">Great Adventure?</span></h2>
                        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">Join 50,000+ happy travelers who discover and book their dream vacations using our AI platform.</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link href="/auth/signup" className="btn-primary px-12 py-5 rounded-2xl text-lg w-full sm:w-auto">
                                Join Now for Free
                            </Link>
                            <Link href="/explore" className="text-white font-bold text-lg hover:text-blue-400 transition-colors flex items-center gap-3 w-full sm:w-auto justify-center">
                                Browse Destinations <FaArrowRight className="text-sm" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#0a0e1a]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
                        <div className="col-span-2">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-2xl italic shadow-xl" style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)' }}>A</div>
                                <span className="text-3xl font-black text-white tracking-tight">AI POWERED<span className="text-blue-400 italic"> TRIP ADVISOR</span></span>
                            </div>
                            <p className="text-lg text-slate-400 leading-relaxed max-w-sm mb-8">Redefining modern travel with artificial intelligence and global soul since 2010.</p>
                            <div className="flex gap-4">
                                {['Twitter', 'Instagram', 'Facebook', 'LinkedIn'].map((s) => (
                                    <a key={s} href="#" className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 text-slate-400 hover:text-white hover:bg-blue-600 transition-all border border-white/5">
                                        <FaGlobe className="text-lg" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Company</h4>
                            <ul className="space-y-4">
                                {['About Us', 'Success Stories', 'Our Partners', 'Careers'].map(l => (
                                    <li key={l}><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">{l}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Support</h4>
                            <ul className="space-y-4">
                                {['Help Center', 'Safety & Security', 'Privacy Policy', 'Terms of Use'].map(l => (
                                    <li key={l}><Link href="#" className="text-slate-400 hover:text-blue-400 transition-colors">{l}</Link></li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-8">Contact</h4>
                            <ul className="space-y-4">
                                <li className="text-slate-400">hello@aitripadvisor.com</li>
                                <li className="text-slate-400">+1 (888) AI-TRIP</li>
                                <li className="text-slate-400">Silicon Valley, CA</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5">
                        <p className="text-slate-500 font-medium">© 2024 AI Powered Trip Advisor Inc. Experience the World Smarter.</p>
                        <div className="flex gap-8">
                            <span className="text-slate-500 hover:text-white transition-colors cursor-pointer text-sm">English (US)</span>
                            <span className="text-slate-500 hover:text-white transition-colors cursor-pointer text-sm">USD ($)</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
