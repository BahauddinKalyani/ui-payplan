// components/LoginCardSkeleton.jsx
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="space-y-4 w-full max-w-md">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-[48px] w-full" />
      </div>
    </div>
  )
}