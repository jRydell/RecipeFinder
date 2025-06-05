import ErrorMessage from "../components/ErrorMessage";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { useSavedRecipesStore } from "@/stores/savedRecipes.store";
import { useState } from "react";
import { CardSkeletons } from "@/components/CardSkeletons";

const MyRecipes = () => {
  const { savedRecipes, error, initialLoad, removeSavedRecipe } =
    useSavedRecipesStore();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemoveRecipe = async (mealId: string) => {
    setRemovingId(mealId);
    await removeSavedRecipe(mealId);
    setRemovingId(null);
  };
  if (initialLoad) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">My Saved Recipes</h1>
        <CardSkeletons />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">My Saved Recipes</h1>
        <ErrorMessage error={error} />
      </div>
    );
  }

  if (savedRecipes.length === 0) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">My Saved Recipes</h1>
        <p>You haven't saved any recipes yet.</p>
        <Separator />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">My Saved Recipes</h1>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedRecipes.map((recipe) => (
          <div key={recipe.id} className="relative group">
            <RecipeCard
              idMeal={recipe.meal_id}
              strMeal={recipe.meal_name}
              strMealThumb={recipe.meal_thumb}
            />{" "}
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
              onClick={() => void handleRemoveRecipe(recipe.meal_id)}
              disabled={removingId === recipe.meal_id}
            >
              {removingId === recipe.meal_id ? (
                <span className="h-4 w-4 flex items-center justify-center">
                  ...
                </span>
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
