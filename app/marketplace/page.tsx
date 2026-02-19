'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaSearch, FaSortAmountDown, FaFilter, FaHeart, FaRegHeart, FaCalendarAlt, FaUserFriends, FaChevronDown, FaPlane, FaHotel, FaTimes, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Destinations', 'Cruises', 'Hotels', 'Flights', 'Deals'];

const filterOptions = {
    priceRange: ['Under $1,000', '$1,000 - $3,000', '$3,000 - $5,000', '$5,000+'],
    duration: ['1-3 Days', '4-7 Days', '8-14 Days', '15+ Days'],
    rating: ['4.5+', '4.0+', '3.5+', 'Any'],
    type: ['Luxury', 'Adventure', 'Cultural', 'Beach', 'Wellness', 'Family'],
};

const allPackages = [
    { id: 1, title: 'Maldives Paradise Escape', location: 'Maldives', price: 4299, originalPrice: 5100, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80', rating: 4.9, reviews: 234, duration: '7 Days', travelers: '2 Adults', tag: 'Best Seller', type: 'Beach', includes: ['Flight', 'Hotel', 'Meals'] },
    { id: 2, title: 'Santorini Sunset Suites', location: 'Greece', price: 3599, originalPrice: 4200, image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=600&q=80', rating: 4.8, reviews: 189, duration: '5 Days', travelers: '2 Adults', tag: 'Premium', type: 'Romantic', includes: ['Hotel', 'Tours'] },
    { id: 3, title: 'Bali Spiritual Retreat', location: 'Indonesia', price: 2899, originalPrice: 3500, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80', rating: 4.7, reviews: 156, duration: '8 Days', travelers: '2 Adults', tag: 'Trending', type: 'Wellness', includes: ['Hotel', 'Spa', 'Yoga'] },
    { id: 4, title: 'Swiss Alps Ski Resort', location: 'Switzerland', price: 5499, originalPrice: 6500, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=80', rating: 4.9, reviews: 312, duration: '6 Days', travelers: '2 Adults', tag: 'Luxury', type: 'Adventure', includes: ['Flight', 'Hotel', 'Ski Pass'] },
    { id: 5, title: 'Kyoto Cultural Tour', location: 'Japan', price: 3799, originalPrice: 4500, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80', rating: 4.8, reviews: 178, duration: '10 Days', travelers: '2 Adults', tag: 'Cultural', type: 'Cultural', includes: ['Flight', 'Hotel', 'Guide'] },
    { id: 6, title: 'Dubai Royal Experience', location: 'UAE', price: 6299, originalPrice: 7500, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80', rating: 4.9, reviews: 267, duration: '5 Days', travelers: '2 Adults', tag: 'Ultra Luxury', type: 'Luxury', includes: ['Flight', 'Hotel', 'Safari'] },
];

const tagColors: Record<string, string> = {
    'Best Seller': '#ef4444',
    'Premium': '#8b5cf6',
    'Trending': '#10b981',
    'Luxury': '#f59e0b',
    'Cultural': '#06b6d4',
    'Ultra Luxury': '#ec4899',
};

export default function MarketplacePage() {
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [favorites, setFavorites] = useState<Set<number>>(new Set());
    const [sortBy, setSortBy] = useState('Popular');

    React.useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/packages');
                if (res.ok) {
                    const data = await res.json();
                    setPackages(data);
                } else {
                    setError('Failed to load packages');
                }
            } catch (err) {
                setError('Connection to API failed');
            } finally {
                setLoading(false);
            }
        };
        fetchPackages();
    }, []);

    const toggleFav = (id: number) => {
        setFavorites(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <div className="min-h-screen pt-8 pb-20" style={{ background: '#0a0e1a' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
                        Explore Luxury <span className="gradient-text">Packages</span>
                    </h1>
                    <p className="text-slate-400 text-lg mb-8">Showing {packages.length} premium properties worldwide</p>
                </motion.div>

                {/* Categories & Search */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    {/* Categories */}
                    <div className="flex gap-2 flex-wrap flex-1">
                        {categories.map((cat) => (
                            <button key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat
                                    ? 'text-white'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                                style={activeCategory === cat ? { background: 'linear-gradient(135deg, #2463eb, #3b82f6)' } : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search & Filter bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search destinations, packages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-dark pl-11"
                        />
                    </div>
                    <button onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-300 transition-all hover:bg-white/10"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <FaFilter /> Filters
                    </button>
                    <div className="relative">
                        <button className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-300 transition-all hover:bg-white/10"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <FaSortAmountDown /> {sortBy} <FaChevronDown className="text-xs" />
                        </button>
                    </div>
                </div>

                {/* Filters Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mb-8">
                            <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-white">Filters</h3>
                                    <button onClick={() => setShowFilters(false)} className="text-slate-400 hover:text-white transition-colors">
                                        <FaTimes />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {Object.entries(filterOptions).map(([key, options]) => (
                                        <div key={key}>
                                            <label className="text-sm font-semibold text-slate-300 capitalize mb-2 block">{key.replace(/([A-Z])/g, ' $1')}</label>
                                            <div className="space-y-2">
                                                {options.map((opt) => (
                                                    <label key={opt} className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer hover:text-white transition-colors">
                                                        <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5" />
                                                        {opt}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-3 mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                    <button className="btn-primary text-sm py-2.5">Apply Filters</button>
                                    <button className="btn-secondary text-sm py-2.5">Reset</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Loading & Error States */}
                {loading && (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-20">
                        <p className="text-red-400 bg-red-400/10 inline-block px-4 py-2 rounded-xl border border-red-400/20">{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packages.map((pkg, i) => (
                            <motion.div key={pkg.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                                <div className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                                    style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div className="relative h-56 overflow-hidden">
                                        <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)' }} />

                                        {/* Tag */}
                                        <div className="absolute top-3 left-3">
                                            {pkg.tags && pkg.tags[0] && (
                                                <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: tagColors[pkg.tags[0]] || '#3b82f6' }}>
                                                    {pkg.tags[0]}
                                                </span>
                                            )}
                                        </div>

                                        {/* Favorite */}
                                        <button onClick={() => toggleFav(pkg.id)} className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                                            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }}>
                                            {favorites.has(pkg.id) ? <FaHeart className="text-red-400" /> : <FaRegHeart className="text-white/70" />}
                                        </button>

                                        {/* Includes */}
                                        <div className="absolute bottom-3 left-3 flex gap-2">
                                            {pkg.inclusions && Object.entries(pkg.inclusions).map(([key, value], j) => value && (
                                                <span key={j} className="text-xs font-semibold px-2.5 py-1 rounded-full text-white/90"
                                                    style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}>
                                                    {key === 'flights' && <FaPlane className="inline mr-1 text-xs" />}
                                                    {key === 'hotels' && <FaHotel className="inline mr-1 text-xs" />}
                                                    {key}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{pkg.title}</h3>
                                                <p className="text-sm text-slate-400 flex items-center gap-1 mt-1">
                                                    <FaMapMarkerAlt className="text-xs text-blue-400" /> {pkg.location || 'Global'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 mt-3 text-sm text-slate-400">
                                            <span className="flex items-center gap-1"><FaCalendarAlt className="text-xs" /> {pkg.duration} Days</span>
                                            <span className="flex items-center gap-1"><FaUserFriends className="text-xs" /> For 2 Adults</span>
                                        </div>

                                        <div className="flex items-center gap-2 mt-3">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, s) => (
                                                    <FaStar key={s} className={`text-xs ${s < Math.floor(pkg.rating || 4.5) ? 'text-yellow-400' : 'text-slate-600'}`} />
                                                ))}
                                            </div>
                                            <span className="text-sm font-semibold text-white">{pkg.rating || 4.8}</span>
                                            <span className="text-xs text-slate-500">(150 reviews)</span>
                                        </div>

                                        <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                            <div>
                                                <p className="text-xl font-black text-blue-400">${pkg.price.toLocaleString()}</p>
                                            </div>
                                            <Link href={`/marketplace/${pkg.id}`}
                                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                                                style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)', boxShadow: '0 4px 15px rgba(36,99,235,0.3)' }}>
                                                View <FaArrowRight className="text-xs" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
                {/* Load More */}
                <div className="text-center mt-12">
                    <button className="btn-secondary inline-flex items-center gap-2">
                        Load More Packages <FaChevronDown />
                    </button>
                </div>
            </div>
        </div>
    );
}
