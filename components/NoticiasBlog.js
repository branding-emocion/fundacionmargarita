import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function NoticiasSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Static, no skeleton needed */}

      {/* Noticias Grid Skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Últimas Noticias
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <NoticiaCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function NoticiaCardSkeleton() {
  return (
    <Card className="group border-border overflow-hidden">
      <div className="relative overflow-hidden">
        {/* Image skeleton */}
        <Skeleton className="w-full h-48" />

        {/* Badge skeleton */}
        <div className="absolute top-4 left-4">
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
      </div>

      <CardContent className="p-6 bg-card">
        {/* Date skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>

        {/* Title skeleton */}
        <div className="mb-3 space-y-2">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-3/4 h-6" />
        </div>

        {/* Content skeleton */}
        <div className="mb-4 space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-2/3 h-4" />
        </div>

        {/* Button skeleton */}
        <Skeleton className="w-full h-10 rounded-md" />
      </CardContent>
    </Card>
  );
}

// Alternative: Just the grid skeleton if you want to keep your existing hero
export function NoticiasGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <NoticiaCardSkeleton key={index} />
      ))}
    </div>
  );
}
