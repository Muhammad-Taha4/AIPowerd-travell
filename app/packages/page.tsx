'use client';

import React, { useState, useEffect } from 'react';
import PackageCard from '@/components/packages/PackageCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaSearch, FaFilter, FaCompass } from 'react-icons/fa';

export default function PackagesPage() {
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
                const res = await fetch(`${apiBase}/packages`);
                const data = await res.json();
                setPackages(data);
            } catch (error) {
                console.error("Failed to fetch packages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[400px] w-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000"
                        className="w-full h-full object-cover"
                        alt="Hero"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-3xl">
                    <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md px-4 py-2 rounded-full text-primary-foreground text-sm font-bold mb-6 border border-primary/30">
                        <FaCompass className="animate-spin-slow" />
                        Explore Our Best Deals
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl">
                        Unforgettable <span className="text-primary italic">Packages</span>
                    </h1>
                    <p className="text-xl text-gray-200 mb-8 drop-shadow-md">
                        Find the perfect journey tailored to your soul. From peaks to palms, we have it all.
                    </p>

                    <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl mx-auto border border-white/20">
                        <div className="flex-grow flex items-center px-4 border-r border-gray-100">
                            <FaSearch className="text-gray-400 mr-3" />
                            <input
                                className="w-full py-3 outline-none text-gray-700 bg-transparent"
                                placeholder="Search destinations, types, or vibes..."
                            />
                        </div>
                        <Button className="rounded-xl h-auto py-4 px-8 font-bold text-lg">
                            Search Now
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 mb-2">Curated Experiences</h2>
                        <div className="h-1.5 w-20 bg-primary rounded-full"></div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-xl font-bold flex items-center gap-2">
                            <FaFilter /> Filters
                        </Button>
                        <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-primary/20">
                            <option>Recommended</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Highest Rated</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map(n => (
                            <div key={n} className="h-96 rounded-2xl bg-gray-100 animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {packages.map(pkg => (
                            <PackageCard
                                key={pkg.id}
                                id={pkg.id}
                                title={pkg.title}
                                description={pkg.description}
                                price={pkg.price}
                                duration={pkg.duration}
                                rating={pkg.rating}
                                image={pkg.image}
                                tags={pkg.tags}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
