import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedBlogSkeleton() {
  return (
    <Card className="mb-12 border-border overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2">
          <Skeleton className="w-full h-64 md:h-full" />
        </div>
        <div className="md:w-1/2 p-8 bg-card">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>

          <div className="mb-4">
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>

          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-3/4 mb-4" />

          <div className="space-y-2 mb-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <Skeleton className="h-10 w-48" />
        </div>
      </div>
    </Card>
  );
}

export function BlogCardSkeleton() {
  return (
    <Card className="border-border overflow-hidden">
      <div className="relative overflow-hidden">
        <Skeleton className="w-full h-48" />
        <div className="absolute top-4 left-4">
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </div>

      <CardContent className="p-6 bg-card">
        <div className="flex items-center gap-4 mb-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>

        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-2/3 mb-3" />

        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
