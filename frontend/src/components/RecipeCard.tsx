import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type RecipeCardProps = {
  id: string;
  title: string;
  image: string;
  category: string;
  area: string;
  tags?: string;
};

const RecipeCard = ({
  id,
  title,
  image,
  category,
  area,
  tags,
}: RecipeCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <a href={`/recipe/${id}`} className="flex-1 flex flex-col">
        <div className="aspect-video relative overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <Skeleton className="w-full h-full" />
            </div>
          )}
          <img
            src={image}
            alt={title}
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
          <CardTitle className="line-clamp-1">{title}</CardTitle>
          <CardDescription className="flex flex-wrap gap-2">
            {category && <Badge variant="secondary">{category}</Badge>}
            {area && <Badge variant="outline">{area} Cuisine</Badge>}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 flex-1">
          {tags && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags
                .split(",")
                .slice(0, 3)
                .map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs bg-muted"
                  >
                    {tag.trim()}
                  </Badge>
                ))}
              {tags.split(",").length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{tags.split(",").length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="mt-auto">
          <span className="text-primary font-medium w-full text-center hover:underline">
            View Recipe
          </span>
        </CardFooter>
      </a>
    </Card>
  );
};

export default RecipeCard;
