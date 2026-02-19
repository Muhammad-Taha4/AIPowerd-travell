'use client';

import { useSession, signOut } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FaUserAlt, FaBuilding, FaSignOutAlt, FaHistory, FaHeart } from 'react-icons/fa';

export default function ProfilePage() {
    const { data: session } = useSession();
    const user = session?.user as any;

    if (!user) return <p>Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-extrabold flex items-center gap-3">
                    {user.role === 'TRAVELLER' ? <FaUserAlt /> : <FaBuilding />} Profile
                </h1>
                <Button variant="destructive" onClick={() => signOut()}>
                    <FaSignOutAlt className="mr-2" /> Logout
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="col-span-1 shadow-lg">
                    <CardHeader>
                        <CardTitle>Account Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-lg font-medium">{user.email}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Account Type</p>
                            <Badge variant="secondary">{user.role}</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-2 shadow-lg">
                    <CardHeader>
                        <CardTitle>Preferences & History</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-4 bg-primary/5 rounded-xl">
                                <FaHistory className="mx-auto text-2xl mb-2 text-primary" />
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-sm text-gray-500">Bookings</p>
                            </div>
                            <div className="p-4 bg-primary/5 rounded-xl">
                                <FaHeart className="mx-auto text-2xl mb-2 text-primary" />
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-sm text-gray-500">Whishlist</p>
                            </div>
                        </div>

                        {user.role === 'TRAVELLER' && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Travel Interests</h3>
                                <div className="flex flex-wrap gap-2">
                                    <Badge>Adventure</Badge>
                                    <Badge>Cultural</Badge>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
