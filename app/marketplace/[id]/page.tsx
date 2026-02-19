'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUsers, FaCheck, FaPlane, FaHotel, FaUtensils, FaSpa, FaHeart, FaRegHeart, FaShare, FaArrowRight, FaChevronDown, FaChevronUp, FaShieldAlt, FaPhone, FaGlobe, FaAward } from 'react-icons/fa';
import { motion } from 'framer-motion';

const packageData = {
    title: 'Swiss Alps Luxury Escape',
    location: 'Switzerland, Europe',
    rating: 4.9,
    reviews: 312,
    price: 5499,
    originalPrice: 6500,
    duration: '7 Days / 6 Nights',
    groupSize: '2-8 People',
    startDate: 'Available year-round',
    description: 'Experience the pinnacle of alpine luxury with our curated 7-day escape. From private train rides through the Glacier Express to 5-star chalet accommodations, every detail is handled for you. Immerse yourself in the breathtaking landscapes, indulge in world-class Swiss cuisine, and rejuvenate in exclusive mountain spas.',
    images: [
        'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    ],
    includes: [
        { icon: <FaPlane />, label: 'Round-trip flights' },
        { icon: <FaHotel />, label: '5-star accommodation' },
        { icon: <FaUtensils />, label: 'Daily breakfast & dinner' },
        { icon: <FaSpa />, label: 'Spa access included' },
        { icon: <FaUsers />, label: 'Private tour guides' },
        { icon: <FaShieldAlt />, label: 'Travel insurance' },
    ],
    itinerary: [
        { day: 1, title: 'Arrival in Zurich', description: 'Welcome to Switzerland! Your private chauffeur will meet you at Zurich Airport and transfer you to your luxury hotel overlooking the lake. Enjoy a welcome dinner at a Michelin-starred restaurant in the evening.', active: true },
        { day: 2, title: 'Scenic Train to Zermatt', description: 'Board the legendary Glacier Express for a scenic journey through alpine valleys and tunnels. Arrive in Zermatt with stunning views of the Matterhorn.', active: false },
        { day: 3, title: 'Gornergrat Railway Excursion', description: 'Take the Gornergrat cogwheel railway to the summit for panoramic views of Monte Rosa and the Matterhorn glacier.', active: false },
        { day: 4, title: 'Spa Day & Leisure in Zermatt', description: 'Enjoy a full day at the resort spa with thermal baths, massage treatments, and après-ski relaxation.', active: false },
        { day: 5, title: 'Interlaken Adventure', description: 'Travel to Interlaken for optional paragliding, river rafting, or a cruise on Lake Thun.', active: false },
        { day: 6, title: 'Lucerne & Mt. Pilatus', description: 'Explore the medieval old town of Lucerne and ride the steepest cogwheel railway to the summit of Mt. Pilatus.', active: false },
        { day: 7, title: 'Departure', description: 'Private transfer to Zurich Airport for your return flight home.', active: false },
    ],
    organizer: {
        name: 'Travel Elite Corp',
        description: 'Specializing in luxury European tours for over 20 years. We focus on bespoke experiences, ensuring every moment of your journey is unforgettable and seamlessly managed.',
        rating: 4.9,
        trips: 1500,
        avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80',
    },
    reviewsList: [
        { name: 'Sarah M.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', rating: 5, text: 'Absolutely breathtaking experience! Every detail was perfectly orchestrated. The Glacier Express ride was the highlight of my life.', date: 'Oct 2023' },
        { name: 'James R.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', rating: 5, text: 'Worth every penny. The hotels were immaculate, the food was world-class, and our guide was incredibly knowledgeable.', date: 'Sep 2023' },
        { name: 'Emily C.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80', rating: 4, text: 'Amazing trip overall. The spa day in Zermatt was exactly what I needed. Would recommend adding an extra day for Interlaken.', date: 'Aug 2023' },
    ],
};

export default function PackageDetailsPage() {
    const [favorite, setFavorite] = useState(false);
    const [expandedDay, setExpandedDay] = useState(0);
    const [selectedImage, setSelectedImage] = useState(0);
    const [travelers, setTravelers] = useState(2);

    const pkg = packageData;

    return (
        <div className="min-h-screen pb-20" style={{ background: '#0a0e1a' }}>
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/marketplace" className="hover:text-blue-400 transition-colors">Europe</Link>
                    <span>/</span>
                    <span className="text-slate-300">Switzerland</span>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 rounded-2xl overflow-hidden">
                    <div className="lg:col-span-2 relative h-72 sm:h-96 lg:h-[480px]">
                        <img src={pkg.images[selectedImage]} alt={pkg.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)' }} />
                    </div>
                    <div className="hidden lg:grid grid-rows-3 gap-3">
                        {pkg.images.slice(1).map((img, i) => (
                            <button key={i} onClick={() => setSelectedImage(i + 1)}
                                className={`overflow-hidden rounded-lg transition-all ${selectedImage === i + 1 ? 'ring-2 ring-blue-500' : 'opacity-80 hover:opacity-100'}`}>
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Title & Actions */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl font-black text-white">{pkg.title}</h1>
                                    <p className="text-slate-400 flex items-center gap-2 mt-2">
                                        <FaMapMarkerAlt className="text-blue-400" /> {pkg.location}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setFavorite(!favorite)}
                                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/10"
                                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                        {favorite ? <FaHeart className="text-red-400" /> : <FaRegHeart className="text-slate-400" />}
                                    </button>
                                    <button className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/10"
                                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                        <FaShare className="text-slate-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="flex flex-wrap gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, s) => <FaStar key={s} className={`text-sm ${s < Math.floor(pkg.rating) ? 'text-yellow-400' : 'text-slate-600'}`} />)}
                                    </div>
                                    <span className="text-sm font-bold text-white">{pkg.rating}</span>
                                    <span className="text-sm text-slate-400">({pkg.reviews} reviews)</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                {[
                                    { icon: <FaCalendarAlt className="text-blue-400" />, label: pkg.duration },
                                    { icon: <FaUsers className="text-blue-400" />, label: pkg.groupSize },
                                    { icon: <FaClock className="text-blue-400" />, label: pkg.startDate },
                                ].map((info, i) => (
                                    <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                        {info.icon}
                                        <span className="text-slate-300">{info.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                            <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <h2 className="text-xl font-bold text-white mb-4">About This Package</h2>
                                <p className="text-slate-400 leading-relaxed">{pkg.description}</p>
                            </div>
                        </motion.div>

                        {/* What's Included */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                            <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <h2 className="text-xl font-bold text-white mb-4">What&apos;s Included</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {pkg.includes.map((inc, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-400 text-sm" style={{ background: 'rgba(36,99,235,0.15)' }}>
                                                {inc.icon}
                                            </div>
                                            <span className="text-sm text-slate-300">{inc.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Itinerary */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <h2 className="text-xl font-bold text-white mb-6">Itinerary</h2>
                                <div className="space-y-3">
                                    {pkg.itinerary.map((day, i) => (
                                        <div key={i} className="rounded-xl overflow-hidden transition-all"
                                            style={{ background: expandedDay === i ? 'rgba(36,99,235,0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${expandedDay === i ? 'rgba(36,99,235,0.2)' : 'rgba(255,255,255,0.04)'}` }}>
                                            <button onClick={() => setExpandedDay(expandedDay === i ? -1 : i)}
                                                className="w-full flex items-center justify-between p-4 text-left">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                                                        style={{ background: expandedDay === i ? '#2463eb' : 'rgba(255,255,255,0.1)', color: expandedDay === i ? 'white' : '#94a3b8' }}>
                                                        {day.day}
                                                    </div>
                                                    <span className={`text-sm font-semibold ${expandedDay === i ? 'text-blue-400' : 'text-slate-300'}`}>{day.title}</span>
                                                </div>
                                                {expandedDay === i ? <FaChevronUp className="text-blue-400 text-xs" /> : <FaChevronDown className="text-slate-500 text-xs" />}
                                            </button>
                                            {expandedDay === i && (
                                                <div className="px-4 pb-4 pt-0">
                                                    <p className="text-sm text-slate-400 leading-relaxed pl-11">{day.description}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Organizer */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                            <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <h2 className="text-xl font-bold text-white mb-4">Organized by</h2>
                                <div className="flex items-start gap-4">
                                    <img src={pkg.organizer.avatar} alt={pkg.organizer.name} className="w-14 h-14 rounded-xl object-cover" />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                            {pkg.organizer.name}
                                            <FaAward className="text-blue-400 text-sm" />
                                        </h3>
                                        <p className="text-sm text-slate-400 mt-1 leading-relaxed">{pkg.organizer.description}</p>
                                        <div className="flex items-center gap-4 mt-3">
                                            <div className="flex items-center gap-1 text-sm">
                                                <FaStar className="text-yellow-400" />
                                                <span className="font-semibold text-white">{pkg.organizer.rating}</span>
                                            </div>
                                            <div className="text-sm text-slate-400">{pkg.organizer.trips}+ trips organized</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Reviews */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <h2 className="text-xl font-bold text-white mb-6">Reviews</h2>
                                <div className="space-y-4">
                                    {pkg.reviewsList.map((review, i) => (
                                        <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
                                            <div className="flex items-center gap-3 mb-3">
                                                <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                                                <div>
                                                    <p className="text-sm font-bold text-white">{review.name}</p>
                                                    <p className="text-xs text-slate-500">{review.date}</p>
                                                </div>
                                                <div className="ml-auto flex items-center gap-1">
                                                    {[...Array(review.rating)].map((_, s) => <FaStar key={s} className="text-yellow-400 text-xs" />)}
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-400 leading-relaxed">{review.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Sidebar - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                                <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div className="mb-4">
                                        <span className="text-sm text-slate-500 line-through">${pkg.originalPrice.toLocaleString()}</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-black text-white">${pkg.price.toLocaleString()}</span>
                                            <span className="text-sm text-slate-400">/ person</span>
                                        </div>
                                        <span className="text-xs text-green-400 font-semibold">Save ${(pkg.originalPrice - pkg.price).toLocaleString()}</span>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                            <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-1">Check-in Date</label>
                                            <input type="date" className="w-full bg-transparent text-white text-sm outline-none" />
                                        </div>
                                        <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                            <label className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-1">Travelers</label>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-white">{travelers} Adults</span>
                                                <div className="flex gap-2">
                                                    <button onClick={() => setTravelers(Math.max(1, travelers - 1))}
                                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 text-sm hover:bg-white/10 transition-colors"
                                                        style={{ border: '1px solid rgba(255,255,255,0.1)' }}>-</button>
                                                    <button onClick={() => setTravelers(travelers + 1)}
                                                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 text-sm hover:bg-white/10 transition-colors"
                                                        style={{ border: '1px solid rgba(255,255,255,0.1)' }}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price breakdown */}
                                    <div className="space-y-2 mb-6 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">${pkg.price.toLocaleString()} × {travelers} travelers</span>
                                            <span className="text-white">${(pkg.price * travelers).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Service fee</span>
                                            <span className="text-white">$299</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-400">Insurance</span>
                                            <span className="text-green-400">Included</span>
                                        </div>
                                        <div className="pt-2 mt-2 flex justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                            <span className="text-sm font-bold text-white">Total</span>
                                            <span className="text-lg font-black text-blue-400">${(pkg.price * travelers + 299).toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <Link href="/checkout"
                                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold transition-all hover:-translate-y-0.5"
                                        style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)', boxShadow: '0 4px 20px rgba(36,99,235,0.4)' }}>
                                        Book Now <FaArrowRight className="text-sm" />
                                    </Link>

                                    <p className="text-center text-xs text-slate-500 mt-3">Free cancellation up to 48h before</p>

                                    {/* Help */}
                                    <div className="mt-6 p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                        <p className="text-sm text-slate-400 mb-2">Need help booking?</p>
                                        <p className="text-sm font-bold text-blue-400 flex items-center justify-center gap-2">
                                            <FaPhone className="text-xs" /> +1 (800) 123-4567
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">Available 24/7</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-20 py-12 px-4 sm:px-6 lg:px-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black italic text-sm" style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)' }}>F</div>
                                <span className="text-lg font-black text-white">FUSIX<span className="text-blue-400 italic">TRAVEL</span></span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">Crafting unforgettable journeys since 2010.</p>
                        </div>
                        {[
                            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Press'] },
                            { title: 'Support', links: ['Help Center', 'Terms of Service', 'Privacy Policy', 'Contact Us'] },
                            { title: 'Subscribe', links: [] },
                        ].map((col, i) => (
                            <div key={i}>
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">{col.title}</h4>
                                {col.links.length > 0 ? (
                                    <ul className="space-y-2">
                                        {col.links.map((link, j) => (
                                            <li key={j}><a href="#" className="text-xs text-slate-500 hover:text-blue-400 transition-colors">{link}</a></li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="flex gap-2">
                                        <input type="email" placeholder="Email" className="input-dark text-xs py-2 flex-1" />
                                        <button className="px-3 py-2 rounded-lg text-white text-xs" style={{ background: '#2463eb' }}><FaArrowRight /></button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="pt-6 flex items-center justify-between gap-4 text-xs text-slate-600" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                        <span>© 2024 Fusix Travel Inc. All rights reserved.</span>
                        <div className="flex gap-4">
                            {['Twitter', 'Instagram', 'Facebook'].map(s => <a key={s} href="#" className="hover:text-blue-400 transition-colors">{s}</a>)}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
