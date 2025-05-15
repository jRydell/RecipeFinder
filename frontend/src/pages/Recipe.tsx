import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
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
  YoutubeVideo,
} from "@/components/recipe";

const Recipe = () => {
  const { recipe, loading, error } = useRecipeData();

  if (loading) {
    return <RecipeLoadingSkeleton />;
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
      <Comments mealId={recipe.idMeal} />
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

// Loading skeleton
const RecipeLoadingSkeleton = () => (
  <div className="max-w-4xl mx-auto py-8">
    <Skeleton className="h-12 w-2/3 mb-4" />
    <div className="flex gap-2 mb-8">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-20" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <Skeleton className="h-80 w-full rounded-lg" />
      <div>
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-6 w-5/6 mb-2" />
        <Skeleton className="h-6 w-3/6 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-2" />
      </div>
    </div>
  </div>
);

export default Recipe;
