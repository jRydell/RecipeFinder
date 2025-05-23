import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AverageRating } from "./AverageRating";
import { Link } from "react-router-dom";

type RecipeCardProps = {
  idMeal: string;
  strMealThumb: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
};

const RecipeCard = ({ idMeal, strMealThumb, strMeal }: RecipeCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  return (
    <Link to={`/recipe/${idMeal}`} className="block h-full">
      <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full p-0">
        <CardContent className="p-0 relative overflow-hidden w-full h-48">
          {!imageLoaded && !imageError && (
            <Skeleton className="absolute inset-0 w-full h-full pointer-events-none" />
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
            <span className="absolute inset-0 flex items-center justify-center bg-muted pointer-events-none text-muted-foreground">
              Image unavailable
            </span>
          )}
        </CardContent>
        <CardFooter className="flex-col items- p-4">
          <h3 className="font-semibold text-lg line-clamp-1 mb-2">{strMeal}</h3>
          <div className="flex gap-2 mt-2 text-sm">
            <AverageRating mealId={idMeal} />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
