import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const SearchSkeletons = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={`skeleton-${i}`} className="overflow-hidden h-full">
          <div className="aspect-video">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="p-4">
            <Skeleton className="h-7 w-4/5 mb-2" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
