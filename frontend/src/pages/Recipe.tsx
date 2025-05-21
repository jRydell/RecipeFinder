import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { getIngredients } from "@/utils/getIngredients";
import { useRecipeData } from "../hooks/useRecipeData";
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

const Recipe = () => {
  const { mealId } = useParams();
  const { recipe, loading, error } = useRecipeData(mealId);

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

      <Instructions />

      {recipe.strYoutube && (
        <>
          <YoutubeVideo />
        </>
      )}

      <Reviews />
    </div>
  );
};

export default Recipe;
