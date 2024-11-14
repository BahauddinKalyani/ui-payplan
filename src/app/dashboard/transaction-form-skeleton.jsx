import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"; // Adjust the import based on your actual file structure

export default function TransactionFormSkeleton() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    <div>
                        <Skeleton className="h-8 w-full" /> {/* Transaction Type */}
                        <Skeleton className="h-10 w-full" /> {/* Placeholder for Select */}
                    </div>
                    <div>
                        <Skeleton className="h-8 w-full" /> {/* Transaction Name */}
                        <Skeleton className="h-10 w-full" /> {/* Placeholder for Input */}
                    </div>
                    <div>
                        <Skeleton className="h-8 w-full" /> {/* Transaction Amount */}
                        <Skeleton className="h-10 w-full" /> {/* Placeholder for Input */}
                    </div>
                    <div>
                        <Skeleton className="h-8 w-full" /> {/* Transaction Frequency */}
                        <Skeleton className="h-10 w-full" /> {/* Placeholder for Select */}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div>
                        <Skeleton className="h-8 w-full" /> {/* Start Date */}
                        <Skeleton className="h-10 w-full" /> {/* Placeholder for Calendar Button */}
                    </div>
                    <div>
                        <Skeleton className="h-8 w-full" /> {/* End Date (Optional) */}
                        <Skeleton className="h-10 w-full" /> {/* Placeholder for Calendar Button */}
                    </div>
                    <div>
                        <Skeleton className="h-8 w-full" /> {/* Due Date (Optional) */}
                        <Skeleton className="h-10 w-full" /> {/* Placeholder for Calendar Button */}
                    </div>
                </div>
            </div>

            {/* Submit Button Skeleton */}
            <Skeleton className="h-12 w-full" />
        </div>
    );
}