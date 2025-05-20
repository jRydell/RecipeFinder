import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type RecipeCardProps = {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strTags?: string;
};

const RecipeCard = ({
  idMeal,
  strMealThumb,
  strMeal,
  strCategory,
  strArea,
  strTags,
}: RecipeCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col p-0">
      <a href={`/recipe/${idMeal}`} className="flex-1 flex flex-col">
        <div className="relative overflow-hidden h-48 w-full">
          {" "}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <Skeleton className="w-full h-full" />
            </div>
          )}
          <img
            src={strMealThumb}
            alt={strMeal}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
              imageLoaded ? "" : "opacity-0"
            } ${imageError ? "hidden" : ""}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted pointer-events-none">
              <span className="text-muted-foreground">Image unavailable</span>
            </div>
          )}
        </div>
        <CardHeader className="px-4 py-3">
          <CardTitle className="line-clamp-1 font-semibold text-lg">
            {strMeal}
          </CardTitle>
          <CardDescription className="flex flex-wrap gap-2 mt-1">
            {strCategory && (
              <Badge className="bg-amber-100 px-2 py-1 rounded text-amber-800 text-sm font-normal">
                {strCategory}
              </Badge>
            )}
            {strArea && (
              <Badge className="bg-blue-100 px-2 py-1 rounded text-blue-800 text-sm font-normal">
                {strArea}
              </Badge>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 px-4 pb-4 flex-1">
          {" "}
          {strTags && (
            <div className="flex flex-wrap gap-1 mt-1">
              {" "}
              {strTags
                .split(",")
                .slice(0, 3)
                .map((tag: string) => (
                  <Badge
                    key={tag}
                    className="bg-green-50 px-2 py-1 rounded text-green-700 text-sm font-normal"
                  >
                    {tag.trim()}
                  </Badge>
                ))}
              {strTags.split(",").length > 3 && (
                <Badge className="bg-green-50 px-2 py-1 rounded text-green-700 text-sm font-normal">
                  +{strTags.split(",").length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </a>
    </Card>
  );
};

export default RecipeCard;
