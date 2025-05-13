import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Card } from "../ui/card";
import { useRecipeData } from "@/hooks/useRecipeData";

export const FoodImage = () => {
  const { recipe } = useRecipeData();

  if (!recipe) {
    return null;
  }
  return (
    <Card className="overflow-hidden">
      <AspectRatio ratio={4 / 3}>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover"
        />
      </AspectRatio>
    </Card>
  );
};
