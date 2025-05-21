import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";

export const RecipeSkeletons = () => (
  <div className="max-w-4xl mx-auto py-8">
    {/* Header skeleton */}
    <Skeleton className="h-12 w-2/3 mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {/* FoodImage skeleton */}
      <Skeleton className="h-80 w-full rounded-lg" />
      {/* IngredientList skeleton */}
      <div>
        <Skeleton className="h-8 w-1/2 mb-4" />

        {Array.from({ length: 8 }).map((_, i) => (
          // eslint-disable-next-line react-x/no-array-index-key
          <Skeleton key={i} className="h-6 w-3/4 mb-2" />
        ))}
      </div>
    </div>
    {/* Reviews skeleton */}
    <div className="mb-8">
      <Skeleton className="h-8 w-1/3 mb-2" />

      {Array.from({ length: 2 }).map((_, i) => (
        // eslint-disable-next-line react-x/no-array-index-key
        <Skeleton key={`review-${i}`} className="h-6 w-full mb-2" />
      ))}
    </div>
    <Separator className="my-8" />
    {/* Instructions skeleton */}
    <div className="mb-8">
      <Skeleton className="h-8 w-1/2 mb-4" />

      {Array.from({ length: 5 }).map((_, i) => (
        // eslint-disable-next-line react-x/no-array-index-key
        <Skeleton key={`instruction-${i}`} className="h-6 w-full mb-2" />
      ))}
    </div>
    {/* YoutubeVideo skeleton */}
    <Separator className="my-8" />
    <Skeleton className="h-64 w-full rounded-lg" />
  </div>
);
