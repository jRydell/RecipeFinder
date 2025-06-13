import { getIngredients } from "@/utils/getIngredients";
import { useRecipeData } from "@/hooks/useRecipeData";
import {
  FoodImage,
  Header,
  IngredientList,
  Instructions,
  RecipeSkeletons,
  Reviews,
  YoutubeVideo,
} from "@/components/recipe";
import { useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import ErrorMessage from "@/components/shared/ErrorMessage";

const Recipe = () => {
  const { mealId } = useParams();
  const { recipe, loading, error } = useRecipeData(mealId);

  if (loading) {
    return <RecipeSkeletons />;
  }
  if (error) {
    return (
      <div className="p-6">
        <ErrorMessage error={error} />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="p-6">
        <ErrorMessage error="The requested recipe could not be found." />
      </div>
    );
  }

  const ingredients = getIngredients(recipe);
  return (
    <div className="p-6">
      <Header recipe={recipe} />
      <Separator className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <FoodImage />
        <IngredientList ingredients={ingredients} />
      </div>
      <Instructions recipe={recipe} />
      {recipe.strYoutube && (
        <>
          <YoutubeVideo />
        </>
      )}
      <Reviews recipe={recipe} />
    </div>
  );
};

export default Recipe;
