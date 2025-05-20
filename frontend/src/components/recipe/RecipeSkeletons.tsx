import { Skeleton } from "../ui/skeleton";

export const RecipeSkeletons = () => (
  <div className="max-w-4xl mx-auto py-8">
    <Skeleton className="h-12 w-2/3 mb-4" />
    <div className="flex gap-2 mb-8">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-20" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <Skeleton className="h-80 w-full rounded-lg" />
      <div>
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-6 w-5/6 mb-2" />
        <Skeleton className="h-6 w-3/6 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-2" />
      </div>
    </div>
  </div>
);
