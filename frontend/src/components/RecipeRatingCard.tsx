import { Card, CardContent } from "@/components/ui/card";
import RecipeRating from "../components/RecipeRating";
import { Meal } from "@/services/mealdb-service";

type RecipeRatingCardProps = {
  recipe: Meal;
};

const RecipeRatingCard = ({ recipe }: RecipeRatingCardProps) => {
  return (
    <Card className="mb-8">
      <CardContent className="flex flex-row items-center gap-4 justify-start pt-6">
        <h2 className="font-medium text-lg">Rating:</h2>
        <RecipeRating />
      </CardContent>
    </Card>
  );
};

export default RecipeRatingCard;
