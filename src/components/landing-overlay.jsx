import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"; // Adjust the import based on your actual file structure

export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <Skeleton className="h-16 w-16 rounded-full" />
            <p className="text-white ml-4">Loading...</p>
        </div>
    );
}