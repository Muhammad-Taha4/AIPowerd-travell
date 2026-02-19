import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

interface RecommendationCardProps {
    title: string;
    rating: number;
    explanation: string;
    price: number;
    tags: string[];
    image?: string;
}

export default function RecommendationCard({ title, rating, explanation, price, tags, image }: RecommendationCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-none bg-white/80 backdrop-blur-md group">
            <div className="h-48 relative overflow-hidden">
                <img
                    src={image || "https://images.unsplash.com/photo-1469474968028-56623f02e42e"}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-white">AI RECOMMENDED</Badge>
                <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded-full text-xs font-bold flex items-center shadow-md">
                    <FaStar className="text-yellow-400 mr-1" /> {rating}
                </div>
            </div>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold">{title}</CardTitle>
                    <p className="text-lg font-bold text-primary">${price}</p>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                    {tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[10px] uppercase tracking-wider">{tag}</Badge>
                    ))}
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600 italic line-clamp-3">"{explanation}"</p>
            </CardContent>
            <CardFooter>
                <Button className="w-full font-bold">View Details</Button>
            </CardFooter>
        </Card>
    );
}
