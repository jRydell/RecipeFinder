import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";

export const RecipeSkeletons = () => (
  <div className="p-6">
    {/* Header skeleton */}
    <Skeleton className="h-12 w-2/3 mb-8 bg-gray-200" />
    <Separator className="mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      {/* FoodImage skeleton */}
      <Skeleton className="h-80 w-full rounded-lg bg-gray-200" />
      {/* IngredientList skeleton */}
      <div>
        <Skeleton className="h-8 w-1/2 mb-4 bg-gray-200" />

        {Array.from({ length: 8 }).map((_, i) => (
          // eslint-disable-next-line react-x/no-array-index-key
          <Skeleton key={i} className="h-6 w-3/4 mb-2 bg-gray-200" />
        ))}
      </div>
    </div>
    {/* Instructions skeleton */}
    <div className="mb-8">
      <Skeleton className="h-8 w-1/2 mb-4 bg-gray-200" />

      {Array.from({ length: 5 }).map((_, i) => (
        // eslint-disable-next-line react-x/no-array-index-key
        <Skeleton
          key={`instruction-${i}`}
          className="h-6 w-full mb-2 bg-gray-200"
        />
      ))}
    </div>
    {/* YoutubeVideo skeleton */}
    <Skeleton className="h-64 w-full rounded-lg bg-gray-200 mb-8" />
    {/* Reviews skeleton */}
    <div className="mb-8">
      <Skeleton className="h-8 w-1/3 mb-2 bg-gray-200" />

      {Array.from({ length: 2 }).map((_, i) => (
        // eslint-disable-next-line react-x/no-array-index-key
        <Skeleton key={`review-${i}`} className="h-6 w-full mb-2 bg-gray-200" />
      ))}
    </div>
  </div>
);
