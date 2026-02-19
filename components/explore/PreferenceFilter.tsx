'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaSlidersH } from "react-icons/fa";

const TAGS = ['Adventure', 'Cultural', 'Beach', 'Wildlife', 'Nightlife', 'Wellness'];

export default function PreferenceFilter() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 bg-white border-b sticky top-0 z-10 px-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                <Button size="sm" variant="outline" className="shrink-0"><FaSlidersH className="mr-2" /> Filters</Button>
                <div className="h-6 w-[1px] bg-gray-200 hidden md:block" />
                {TAGS.map(tag => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-white transition-colors py-1.5 px-4 whitespace-nowrap">
                        {tag}
                    </Badge>
                ))}
            </div>
            <div className="flex gap-2">
                <Button size="sm" variant="ghost">Reset</Button>
                <Button size="sm">Apply Recommendations</Button>
            </div>
        </div>
    );
}
