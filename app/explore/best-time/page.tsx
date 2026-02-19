'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaSearch, FaCloudSun } from 'react-icons/fa';

const MOCK_W_DATA = [
    { month: 'Jan', score: 6 }, { month: 'Feb', score: 7 }, { month: 'Mar', score: 8 },
    { month: 'Apr', score: 9 }, { month: 'May', score: 10 }, { month: 'Jun', score: 8 },
    { month: 'Jul', score: 5 }, { month: 'Aug', score: 4 }, { month: 'Sep', score: 6 },
    { month: 'Oct', score: 9 }, { month: 'Nov', score: 8 }, { month: 'Dec', score: 7 },
];

export default function BestTimePage() {
    const [destination, setDestination] = useState('');
    const [showResult, setShowResult] = useState(false);

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold">Best Time to Visit</h1>
                <p className="text-gray-500 text-lg">Our AI analyzes 10+ years of historical weather and event data to find your perfect travel window.</p>
                <div className="flex gap-2">
                    <Input
                        placeholder="Search destination (e.g. Kyoto, Japan)"
                        className="text-lg py-6"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                    <Button size="lg" onClick={() => setShowResult(true)}><FaSearch className="mr-2" /> Analyze</Button>
                </div>
            </div>

            {showResult && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FaCloudSun className="text-primary" /> Monthly Visitability Score
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={MOCK_W_DATA}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="month" />
                                        <YAxis domain={[0, 10]} />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                        <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ r: 6, fill: '#2563eb' }} activeDot={{ r: 10 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="col-span-1 bg-primary text-white border-none shadow-xl">
                        <CardHeader>
                            <CardTitle>AI Recommendation</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <p className="text-4xl font-black">May</p>
                                <p className="opacity-80 mt-1 uppercase text-xs tracking-widest font-bold">Best Month to Visit</p>
                            </div>
                            <div className="space-y-4 text-sm opacity-90 leading-relaxed">
                                <p><strong>Weather:</strong> May in {destination} offers mild temperatures averaging 22°C with minimal rainfall.</p>
                                <p><strong>Local Events:</strong> Peak blooming season and several cultural festivals occur this month.</p>
                                <p><strong>Crowd Level:</strong> Moderate. Just before the summer peak, allowing for easier bookings.</p>
                            </div>
                            <Button variant="secondary" className="w-full font-bold">Book a May Trip</Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
