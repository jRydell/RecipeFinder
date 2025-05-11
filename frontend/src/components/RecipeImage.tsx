import { useRecipeStore } from "@/stores/recipe.store";
import { Card } from "./ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const RecipeImage = () => {
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

export default RecipeImage;
