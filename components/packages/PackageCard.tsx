'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui';

interface PackageCardProps {
    id: string;
    title: string;
    description: string;
    price: number;
    duration: number;
    rating: number;
    image: string;
    tags: string[];
}

const PackageCard: React.FC<PackageCardProps> = ({
    id,
    title,
    description,
    price,
    duration,
    rating,
    image,
    tags
}) => {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
            <div className="relative h-56 w-full overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-sm">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <FaStar className="text-yellow-400 text-sm" />
                    <span className="text-sm font-bold">{rating}</span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
                </div>

                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
                    {description}
                </p>

                <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
                    <div className="flex items-center gap-1">
                        <FaClock className="text-primary/60" />
                        <span>{duration} Days</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div>
                        <span className="text-xs text-gray-400 block uppercase tracking-wider font-semibold">Starting from</span>
                        <span className="text-2xl font-black text-primary">${price}</span>
                    </div>
                    <Link href={`/packages/${id}`}>
                        <Button className="rounded-xl px-6 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                            View Deal
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;
