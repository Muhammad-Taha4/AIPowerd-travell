'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaChartBar, FaSuitcase, FaCalendarAlt, FaCog, FaStar, FaUsers, FaArrowUp, FaArrowDown, FaPlus, FaEllipsisV, FaBell, FaSearch, FaChevronDown, FaMapMarkerAlt, FaAward, FaQuestionCircle, FaDollarSign, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';

const sidebarLinks = [
    { icon: <FaChartBar />, label: 'Overview', href: '/agency/dashboard', active: true },
    { icon: <FaSuitcase />, label: 'Packages', href: '#', active: false },
    { icon: <FaCalendarAlt />, label: 'Bookings', href: '#', active: false, badge: 12 },
    { icon: <FaChartBar />, label: 'Reports', href: '#', active: false },
    { icon: <FaCog />, label: 'Settings', href: '#', active: false },
];

const stats = [
    { label: 'Total Revenue', value: '$124,500', change: '+12.5%', positive: true, icon: <FaDollarSign />, sublabel: 'Premium Status', subicon: <FaStar className="text-yellow-400 text-xs" /> },
    { label: 'Total Bookings', value: '843', change: '+8.2%', positive: true, icon: <FaCalendarAlt />, sublabel: '14 pending confirmation' },
    { label: 'Average Rating', value: '4.8', change: '+0.3', positive: true, icon: <FaStar />, sublabel: '' },
    { label: 'Total Customers', value: '1,205', change: '+3.7%', positive: true, icon: <FaUsers />, sublabel: '45 new this month' },
];

const topPackages = [
    { name: 'Maldives Paradise', bookings: 156, revenue: '$42,500', growth: 12 },
    { name: 'Swiss Alps Escape', bookings: 134, revenue: '$38,200', growth: 8 },
    { name: 'Bali Retreat', bookings: 98, revenue: '$22,300', growth: 15 },
    { name: 'Dubai Royal', bookings: 87, revenue: '$34,100', growth: -3 },
    { name: 'Kyoto Cultural', bookings: 76, revenue: '$18,900', growth: 22 },
];

const recentPackages = [
    { id: 1, title: 'Bali Spiritual Retreat', date: 'Added Oct 22, 2023', status: 'Active', bookings: 23, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=100&q=80' },
    { id: 2, title: 'Romantic Paris', date: 'Added Oct 20, 2023', status: 'Active', bookings: 18, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=100&q=80' },
    { id: 3, title: 'Kyoto Cherry Blossom', date: 'Added Oct 18, 2023', status: 'Draft', bookings: 0, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=100&q=80' },
];

const revenueData = [
    { month: 'Jan', value: 42 }, { month: 'Feb', value: 55 }, { month: 'Mar', value: 48 },
    { month: 'Apr', value: 62 }, { month: 'May', value: 71 }, { month: 'Jun', value: 85 },
    { month: 'Jul', value: 92 }, { month: 'Aug', value: 78 }, { month: 'Sep', value: 95 },
    { month: 'Oct', value: 88 }, { month: 'Nov', value: 100 }, { month: 'Dec', value: 110 },
];

const maxRevenue = Math.max(...revenueData.map(d => d.value));

export default function AgencyDashboard() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [analytics, setAnalytics] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                // Mocking authorization for demo
                const res = await fetch('http://localhost:5000/api/analytics/agency', {
                    headers: { 'Authorization': 'Bearer placeholder-token' }
                });
                if (res.ok) {
                    const data = await res.json();
                    setAnalytics(data);
                }
            } catch (err) {
                console.error('Failed to fetch analytics');
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    const dynamicStats = analytics ? [
        { label: 'Total Revenue', value: `$${analytics.total_revenue.toLocaleString()}`, change: '+12.5%', positive: true, icon: <FaDollarSign />, sublabel: 'Premium Status', subicon: <FaStar className="text-yellow-400 text-xs" /> },
        { label: 'Total Bookings', value: analytics.total_bookings.toString(), change: '+8.2%', positive: true, icon: <FaCalendarAlt />, sublabel: 'Real-time sync' },
        { label: 'Average Rating', value: analytics.average_rating.toFixed(1), change: '+0.3', positive: true, icon: <FaStar />, sublabel: '' },
        { label: 'Total Customers', value: '1,205', change: '+3.7%', positive: true, icon: <FaUsers />, sublabel: '45 new this month' },
    ] : stats;

    return (
        <div className="min-h-screen flex" style={{ background: '#0a0e1a' }}>
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 shrink-0 p-4 sticky top-0 h-screen"
                style={{ background: '#111827', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-2.5 px-3 mb-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-lg italic"
                        style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)' }}>A</div>
                    <div>
                        <span className="text-lg font-black text-white uppercase">AI Powered<span className="text-blue-400 italic"> Trip Advisor</span></span>
                        <p className="text-xs text-slate-500">Agency Portal</p>
                    </div>
                </div>

                <nav className="flex-1 mt-6 space-y-1">
                    {sidebarLinks.map((link, i) => (
                        <Link key={i} href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${link.active
                                ? 'bg-blue-600/15 text-blue-400'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}>
                            <span className="text-base">{link.icon}</span>
                            <span className="flex-1">{link.label}</span>
                            {link.badge && (
                                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-blue-600 text-white">{link.badge}</span>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Help Card */}
                <div className="p-4 rounded-xl mb-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <FaQuestionCircle className="text-blue-400 text-sm" />
                        <span className="text-xs font-semibold text-white">Need help?</span>
                    </div>
                    <p className="text-xs text-slate-500">Check our documentation for agency guidelines.</p>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3 px-3 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                        className="w-9 h-9 rounded-full object-cover" alt="Marcus" />
                    <div>
                        <p className="text-sm font-bold text-white">Marcus Chen</p>
                        <p className="text-xs text-slate-500">Senior Manager</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white">Dashboard Overview</h1>
                        <p className="text-slate-400 text-sm mt-1">Welcome back, get an overview of your agency performance.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative hidden sm:block">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                            <input type="text" placeholder="Search..." className="pl-9 pr-4 py-2 rounded-xl text-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', outline: 'none', width: '200px' }} />
                        </div>
                        <button className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <FaBell />
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white"
                            style={{ background: 'linear-gradient(135deg, #2463eb, #3b82f6)', boxShadow: '0 4px 15px rgba(36,99,235,0.3)' }}>
                            <FaPlus className="text-xs" /> Add Package
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {dynamicStats.map((stat, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <div className="p-5 rounded-2xl transition-all hover:-translate-y-0.5"
                                style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-slate-400">{stat.label}</span>
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-400 text-sm"
                                        style={{ background: 'rgba(36,99,235,0.15)' }}>{stat.icon}</div>
                                </div>
                                <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
                                <div className="flex items-center gap-2">
                                    <span className={`flex items-center gap-1 text-xs font-semibold ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                                        {stat.positive ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />} {stat.change}
                                    </span>
                                    {stat.sublabel && (
                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                            {stat.subicon} {stat.sublabel}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Revenue Chart */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        className="lg:col-span-2 p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">Monthly Revenue</h3>
                                <p className="text-sm text-slate-400">Performance over time</p>
                            </div>
                            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                This Year <FaChevronDown className="text-xs" />
                            </button>
                        </div>
                        {/* Bar Chart */}
                        <div className="flex items-end gap-2 h-48">
                            {revenueData.map((d, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer relative group"
                                        style={{
                                            height: `${(d.value / maxRevenue) * 100}%`,
                                            background: i === revenueData.length - 1 ? 'linear-gradient(to top, #2463eb, #3b82f6)' : 'linear-gradient(to top, rgba(36,99,235,0.3), rgba(36,99,235,0.5))',
                                            minHeight: '8px',
                                        }}>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs font-bold text-white bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            ${d.value}K
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-500">{d.month}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Top Packages */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">Top Packages</h3>
                                <p className="text-sm text-slate-400">Most booked destinations</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {topPackages.map((pkg, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/5"
                                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                                        style={{ background: i < 3 ? 'rgba(36,99,235,0.2)' : 'rgba(255,255,255,0.05)', color: i < 3 ? '#60a5fa' : '#64748b' }}>
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-white truncate">{pkg.name}</p>
                                        <p className="text-xs text-slate-500">{pkg.bookings} bookings</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-white">{pkg.revenue}</p>
                                        <span className={`text-xs font-semibold ${pkg.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {pkg.growth > 0 ? '+' : ''}{pkg.growth}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Recent Packages */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <div className="p-6 rounded-2xl" style={{ background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white">Recent Packages</h3>
                                <p className="text-sm text-slate-400">Manage your latest travel offerings.</p>
                            </div>
                            <button className="text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors">View All</button>
                        </div>

                        <div className="space-y-3">
                            {recentPackages.map((pkg) => (
                                <div key={pkg.id} className="flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-white/5"
                                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                                    <img src={pkg.image} alt={pkg.title} className="w-14 h-14 rounded-xl object-cover" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-white">{pkg.title}</p>
                                        <p className="text-xs text-slate-500">{pkg.date}</p>
                                    </div>
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${pkg.status === 'Active'
                                        ? 'bg-green-500/15 text-green-400'
                                        : 'bg-yellow-500/15 text-yellow-400'
                                        }`}>
                                        {pkg.status}
                                    </span>
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm font-semibold text-white">{pkg.bookings} bookings</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
                                            <FaEye className="text-xs" />
                                        </button>
                                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
                                            <FaEdit className="text-xs" />
                                        </button>
                                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all">
                                            <FaTrash className="text-xs" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
