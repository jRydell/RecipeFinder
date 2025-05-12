import { useRecipeStore } from "@/stores/recipe.store";

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Card } from "../ui/card";

export const FoodImage = () => {
  const { recipe } = useRecipeStore();

  if (!recipe) {
    return;
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
