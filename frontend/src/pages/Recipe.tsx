import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { Separator } from "@/components/ui/separator";
import { getIngredients } from "@/utils/getIngredients";
import { useRecipeData } from "../hooks/useRecipeData";
import {
  Comments,
  FoodImage,
  Header,
  IngredientList,
  Instructions,
  RatingCard,
  RecipeSkeletons,
  YoutubeVideo,
} from "@/components/recipe";

const Recipe = () => {
  const { recipe, loading, error } = useRecipeData();

  if (loading) {
    return <RecipeSkeletons />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <Alert variant="destructive">
          <AlertTitle>Error loading recipe</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <Alert>
          <AlertTitle>Recipe not found</AlertTitle>
          <AlertDescription>
            The requested recipe could not be found.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const ingredients = getIngredients(recipe);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <FoodImage />
        <IngredientList ingredients={ingredients} />
      </div>

      <RatingCard />
      <Separator className="my-8" />

      <Instructions />
      {recipe.strYoutube && (
        <>
          <Separator className="my-8" />
          <YoutubeVideo />
        </>
      )}
    </div>
  );
};

export default Recipe;
