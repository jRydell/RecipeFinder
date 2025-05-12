import { Card, CardContent } from "@/components/ui/card";

import { Meal } from "@/services/mealdb-service";
import Rating from "./Rating";

type RecipeRatingCardProps = {
  recipe: Meal;
};

export const RatingCard = ({ recipe }: RecipeRatingCardProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="flex flex-row items-center gap-4 justify-start pt-6">
        <h2 className="font-medium text-lg">Rating:</h2>
        <Rating />
      </CardContent>
    </Card>
  );
};
