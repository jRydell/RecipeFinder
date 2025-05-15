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
import { Meal } from "@/services/mealdb-service";

type RecipeCardProps = {
  recipe: Meal;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <a href={`/recipe/${recipe.idMeal}`} className="flex-1 flex flex-col">
        <div className="aspect-video relative overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <Skeleton className="w-full h-full" />
            </div>
          )}
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className={`w-full h-full object-cover transition-transform duration-300 ${
              imageLoaded ? "hover:scale-105" : "opacity-0"
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

        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-1">{recipe.strMeal}</CardTitle>
          <CardDescription className="flex flex-wrap gap-2">
            {recipe.strCategory && (
              <Badge variant="secondary">{recipe.strCategory}</Badge>
            )}
            {recipe.strArea && (
              <Badge variant="outline">{recipe.strArea} Cuisine</Badge>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 flex-1">
          {recipe.strTags && (
            <div className="flex flex-wrap gap-1 mt-2">
              {recipe.strTags
                .split(",")
                .slice(0, 3)
                .map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs bg-muted"
                  >
                    {tag.trim()}
                  </Badge>
                ))}
              {recipe.strTags.split(",").length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{recipe.strTags.split(",").length - 3}
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
