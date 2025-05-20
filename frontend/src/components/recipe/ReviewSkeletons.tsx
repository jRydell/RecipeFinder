import { Skeleton } from "@/components/ui/skeleton";

export const ReviewSkeletons = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        // eslint-disable-next-line react-x/no-array-index-key
        <div key={`comment-skeleton-${i}`} className="flex gap-3">
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="mt-2">
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
