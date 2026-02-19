'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const ACTIVITIES = ['Adventure', 'Cultural', 'Beach', 'Wildlife', 'Nightlife', 'Wellness'];

export default function OnboardingPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [preferences, setPreferences] = useState({
        fullName: '',
        activities: [] as string[],
        budgetRange: 'Medium',
        groupSize: 1,
    });

    const toggleActivity = (act: string) => {
        setPreferences(prev => ({
            ...prev,
            activities: prev.activities.includes(act)
                ? prev.activities.filter(a => a !== act)
                : [...prev.activities, act]
        }));
    };

    const handleFinish = async () => {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiBase}/auth/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
            },
            body: JSON.stringify(preferences),
        });
        if (res.ok) router.push('/explore');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <div className="flex justify-between items-center mb-4">
                        {[1, 2, 3].map(s => (
                            <div key={s} className={`h-2 w-1/4 rounded-full ${step >= s ? 'bg-primary' : 'bg-gray-200'}`} />
                        ))}
                    </div>
                    <CardTitle>Step {step}: {step === 1 ? 'Basic Info' : step === 2 ? 'Interests' : 'Budget'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {step === 1 && (
                        <div className="space-y-4">
                            <label>What's your full name?</label>
                            <Input
                                value={preferences.fullName}
                                onChange={(e) => setPreferences({ ...preferences, fullName: e.target.value })}
                            />
                            <Button className="w-full" onClick={() => setStep(2)}>Next</Button>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="space-y-4">
                            <label>Select your preferred activities:</label>
                            <div className="flex flex-wrap gap-2">
                                {ACTIVITIES.map(act => (
                                    <Badge
                                        key={act}
                                        className={`cursor-pointer p-2 text-sm ${preferences.activities.includes(act) ? 'bg-primary' : 'bg-gray-200 text-gray-700'}`}
                                        onClick={() => toggleActivity(act)}
                                    >
                                        {act}
                                    </Badge>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="w-full" onClick={() => setStep(1)}>Back</Button>
                                <Button className="w-full" onClick={() => setStep(3)}>Next</Button>
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="space-y-4">
                            <label>Choose your budget range:</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={preferences.budgetRange}
                                onChange={(e) => setPreferences({ ...preferences, budgetRange: e.target.value })}
                            >
                                <option>Budget</option>
                                <option>Medium</option>
                                <option>Luxury</option>
                            </select>
                            <div className="flex gap-2">
                                <Button variant="outline" className="w-full" onClick={() => setStep(2)}>Back</Button>
                                <Button className="w-full" onClick={handleFinish}>Complete Setup</Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
