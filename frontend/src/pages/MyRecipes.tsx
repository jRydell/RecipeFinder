import { useEffect, useState } from "react";
import { recipeService, SavedRecipe } from "../api/services/recipe-service";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import RecipeCard from "../components/RecipeCard";

const MyRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavedRecipes = async () => {
    setIsLoading(true);
    const { data, error } = await recipeService.getSavedRecipes();

    if (data) {
      setSavedRecipes(data);
    } else {
      setError(error);
    }
    setIsLoading(false);
  };

  const handleRemoveRecipe = async (mealId: string) => {
    const { error } = await recipeService.deleteSavedRecipe(mealId);

    if (!error) {
      setSavedRecipes((prev) =>
        prev.filter((recipe) => recipe.meal_id !== mealId)
      );
    } else {
      setError(error);
    }
  };

  useEffect(() => {
    void fetchSavedRecipes();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Saved Recipes</h1>
        <p>Loading your recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Saved Recipes</h1>
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (savedRecipes.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Saved Recipes</h1>
        <p>You haven't saved any recipes yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Saved Recipes</h1>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedRecipes.map((recipe) => (
          <div key={recipe.id} className="relative group">
            <RecipeCard
              id={recipe.meal_id}
              title={recipe.meal_name}
              image={recipe.meal_thumb}
              category=""
              area=""
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => void handleRemoveRecipe(recipe.meal_id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
