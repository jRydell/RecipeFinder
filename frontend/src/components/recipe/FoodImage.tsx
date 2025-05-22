import { useRecipeData } from "@/hooks/useRecipeData";
import { useParams } from "react-router-dom";

export const FoodImage = () => {
  const { mealId } = useParams();
  const { recipe } = useRecipeData(mealId);

  if (!recipe) {
    return null;
  }
  return (
    <div className="overflow-hidden rounded-xl shadow-lg relative h-[400px]">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};
