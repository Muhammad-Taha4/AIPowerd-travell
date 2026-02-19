'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
    FaCalendarAlt, FaClock, FaStar, FaUsers, FaCheckCircle,
    FaPlane, FaHotel, FaUtensils, FaMapMarkerAlt, FaShieldAlt
} from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PackageDetailPage() {
    const params = useParams();
    const id = params.id;
    const [pkg, setPkg] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
                const res = await fetch(`${apiBase}/packages/${id}`);
                if (res.ok) {
                    const data = await res.json();

                    // Add mock/fallback values for fields not in the simplified schema but needed for UI
                    setPkg({
                        ...data,
                        duration: data.duration_days || 7,
                        rating: 4.9,
                        reviewCount: 128,
                        agency: {
                            name: 'Peak Explorers Ltd',
                            verified: true,
                            rating: 4.8
                        },
                        availability: [
                            { date: 'Jun 15 - Jun 22, 2026', spots: 8 },
                            { date: 'Jul 10 - Jul 17, 2026', spots: 4 },
                            { date: 'Aug 05 - Aug 12, 2026', spots: 12 }
                        ],
                        // Ensure inclusions and itinerary are formatted correctly
                        inclusions: data.inclusions || { flights: true, hotels: true, meals: true, transport: true, guide: true },
                        itinerary: data.itinerary || [
                            { day: 1, title: 'Arrival', activity: 'Meet & Greet.' },
                            { day: 2, title: 'Mountain Exploration', activity: 'Guided tour.' }
                        ]
                    });
                }
            } catch (error) {
                console.error("Failed to fetch package:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPackage();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;

    if (!pkg) return <div>Package not found</div>;

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Gallery / Hero */}
            <div className="h-[60vh] relative">
                <img src={pkg.images[0]} className="w-full h-full object-cover" alt={pkg.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-0 w-full">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {pkg.tags.map((tag: string) => (
                                <span key={tag} className="bg-primary/90 text-white px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-2">{pkg.title}</h1>
                        <div className="flex items-center gap-6 text-white/90">
                            <div className="flex items-center gap-2">
                                <FaStar className="text-yellow-400" />
                                <span className="font-bold">{pkg.rating}</span>
                                <span className="opacity-70 text-sm">({pkg.reviewCount} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaClock />
                                <span className="font-bold">{pkg.duration} Days</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt />
                                <span className="font-bold">Switzerland</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h2 className="text-3xl font-black text-gray-900 mb-6">Overview</h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {pkg.description}
                        </p>
                    </section>

                    <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                            <span className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><FaShieldAlt /></span>
                            What's Included
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            {Object.entries(pkg.inclusions).map(([key, included]) => (
                                <div key={key} className={`flex items-center gap-3 ${included ? 'text-gray-700' : 'text-gray-300 line-through'}`}>
                                    {key === 'flights' && <FaPlane className="text-blue-500" />}
                                    {key === 'hotels' && <FaHotel className="text-blue-500" />}
                                    {key === 'meals' && <FaUtensils className="text-blue-500" />}
                                    {key === 'transport' && <FaMapMarkerAlt className="text-blue-500" />}
                                    {key === 'guide' && <FaUsers className="text-blue-500" />}
                                    <span className="font-bold capitalize">{key}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-2xl font-black text-gray-900 mb-8">Itinerary</h3>
                        <div className="space-y-8">
                            {pkg.itinerary.map((item: any, idx: number) => (
                                <div key={idx} className="flex gap-6 relative">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-black z-10 shadow-lg shadow-primary/30">
                                        {item.day}
                                    </div>
                                    {idx !== pkg.itinerary.length - 1 && (
                                        <div className="absolute left-[23px] top-12 bottom-[-32px] w-0.5 bg-gray-200"></div>
                                    )}
                                    <div className="pb-8">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                                        <p className="text-gray-600">{item.activity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Booking Widget */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 space-y-6">
                        <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-2xl shadow-primary/5">
                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-sm text-gray-400">Total Price</span>
                                <span className="text-5xl font-black text-primary">${pkg.price}</span>
                                <span className="text-gray-400">/ person</span>
                            </div>

                            <div className="space-y-4 mb-8">
                                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                    <FaCalendarAlt className="text-primary" />
                                    Available Dates
                                </h4>
                                {pkg.availability.map((avail: any, idx: number) => (
                                    <label key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-primary cursor-pointer transition-all group">
                                        <div className="flex items-center gap-3">
                                            <input type="radio" name="date" className="accent-primary w-5 h-5" />
                                            <div>
                                                <div className="font-bold text-gray-800">{avail.date}</div>
                                                <div className="text-xs text-gray-400">{avail.spots} spots remaining</div>
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <Link href="/checkout">
                                <Button className="w-full rounded-2xl py-8 text-xl font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">
                                    Book This Trip
                                </Button>
                            </Link>

                            <p className="text-center text-xs text-gray-400 mt-4 px-4">
                                Free cancellation up to 14 days before departure. 100% money-back guarantee.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-8 rounded-3xl text-white">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xl">
                                    {pkg.agency.name[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-lg flex items-center gap-2">
                                        {pkg.agency.name}
                                        {pkg.agency.verified && <FaCheckCircle className="text-blue-400 text-sm" />}
                                    </div>
                                    <div className="text-sm text-gray-400">Host Agency</div>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full rounded-xl border-gray-700 text-white hover:bg-gray-800 font-bold">
                                Contact Agency
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
