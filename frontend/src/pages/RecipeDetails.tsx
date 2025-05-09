import { useParams } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import RecipeComments from "@/components/RecipeComments";
import { getIngredients } from "@/utils/getIngredients";
import { useRecipeDetails } from "../hooks/useRecipeDetails";
const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { recipe, loading, error } = useRecipeDetails(id);

  if (loading) {
    return <RecipeDetailsSkeleton />;
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

  // Extract ingredients
  const ingredients = getIngredients(recipe);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <RecipeHeader recipe={recipe} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <RecipeImage recipe={recipe} />
        <RecipeIngredientsList ingredients={ingredients} />
      </div>

      <RecipeRatingCard recipe={recipe} />
      <Separator className="my-8" />
      <RecipeComments mealId={recipe.idMeal} />
      <Separator className="my-8" />
      <RecipeInstructions instructions={recipe.strInstructions} />
      {recipe.strYoutube && (
        <>
          <Separator className="my-8" />
          <RecipeVideoTutorial
            title={recipe.strMeal}
            youtubeUrl={recipe.strYoutube}
          />
        </>
      )}
    </div>
  );
};

// Loading skeleton
const RecipeDetailsSkeleton = () => (
  <div className="max-w-4xl mx-auto py-8">
    <Skeleton className="h-12 w-2/3 mb-4" />
    <div className="flex gap-2 mb-8">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-20" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <Skeleton className="h-80 w-full rounded-lg" />
      <div>
        <Skeleton className="h-8 w-40 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-6 w-5/6 mb-2" />
      </div>
    </div>
  </div>
);

export default RecipeDetails;
