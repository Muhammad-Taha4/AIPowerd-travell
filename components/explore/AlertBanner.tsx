import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamationTriangle } from "react-icons/fa";

interface AlertBannerProps {
    type: string;
    message: string;
    severity: 'High' | 'Medium' | 'Low';
}

export default function AlertBanner({ type, message, severity }: AlertBannerProps) {
    const colorClass = severity === 'High' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-amber-50 border-amber-200 text-amber-800';

    return (
        <Alert className={`${colorClass} mb-6 border-l-4 shadow-sm animate-in slide-in-from-top-4`}>
            <FaExclamationTriangle className="h-4 w-4" />
            <AlertTitle className="font-bold">{type} Alert - {severity} Severity</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}
