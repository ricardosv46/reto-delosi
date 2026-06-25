import { Skeleton } from '@/shared/presentation/components/Skeleton';

export function CatalogSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Banner Skeleton */}
      <div className="space-y-3 pb-6 border-b border-border/30">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>

      {/* Filter bar Skeleton */}
      <div className="p-4 rounded-xl border border-border/40 bg-card/20 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <Skeleton className="h-9 w-full md:max-w-md" />
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="border-t border-border/20 pt-4 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-7 w-16 rounded-full" />
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="p-4 rounded-xl border border-border/40 bg-card/30 space-y-4">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-border/20">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-7 w-7 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
