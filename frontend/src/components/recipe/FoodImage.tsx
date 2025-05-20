import { Card } from "../ui/card";
import { useRecipeData } from "@/hooks/useRecipeData";
import { useParams } from "react-router-dom";

export const FoodImage = () => {
  const { mealId } = useParams();
  const { recipe } = useRecipeData(mealId);

  if (!recipe) {
    return null;
  }
  return (
    <Card className="overflow-hidden shadow-lg border-0 relative h-[400px]">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </Card>
  );
};
