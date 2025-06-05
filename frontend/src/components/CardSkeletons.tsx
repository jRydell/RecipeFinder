import { Card, CardContent, CardFooter } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const CardSkeletons = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }, (_, i) => (
        <Card
          key={`recipe-skeleton-${Date.now()}-${i}`}
          className="overflow-hidden shadow-md h-full p-0"
        >
          <CardContent className="p-0 relative overflow-hidden w-full h-48">
            <Skeleton className="absolute inset-0 w-full h-full" />
          </CardContent>{" "}
          <CardFooter className="flex-col items-center p-4">
            <Skeleton className="h-7 w-4/5 mb-2" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-5 w-40" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
