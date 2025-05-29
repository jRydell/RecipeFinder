import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { recipeService } from "@/api/services/recipe-service";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { AverageRating } from "../AverageRating";
import { Meal } from "@/api/services/mealdb-service";

//TODO: REFACTOR, CUSTOM HOOK

export const Header = ({ recipe }: { recipe: Meal }) => {
  const [isSaved, setIsSaved] = useState<boolean>();
  const [saveLoading, setSaveLoading] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!recipe) {
      return;
    }

    const checkIfSaved = async () => {
      if (!recipe || !isAuthenticated) return;

      const { data } = await recipeService.getSavedRecipes();
      if (data) {
        const saved = data.some((item) => item.meal_id === recipe.idMeal);
        setIsSaved(saved);
      }
    };

    void checkIfSaved();
  }, [recipe, isAuthenticated]);

  const handleSaveRecipe = async () => {
    if (!recipe) return;

    if (!isAuthenticated) {
      void navigate("/login");
      return;
    }

    setSaveLoading(true);

    if (isSaved) {
      await recipeService.deleteSavedRecipe(recipe.idMeal);
      setIsSaved(false);
    } else {
      await recipeService.saveRecipe(
        recipe.idMeal,
        recipe.strMeal,
        recipe.strMealThumb
      );
      setIsSaved(true);
    }

    setSaveLoading(false);
  };
  if (!recipe) {
    return;
  }
  return (
    <header className="max-w-4xl mb-8">
      <h1 className="text-3xl font-bold mb-3">{recipe.strMeal}</h1>
      <AverageRating mealId={recipe.idMeal} />
      <div className="flex flex-wrap gap-2 my-6">
        {recipe.strCategory && (
          <Badge className="bg-amber-100 px-2 py-1 rounded text-black font-normal text-sm">
            {recipe.strCategory}
          </Badge>
        )}
        {recipe.strArea && (
          <Badge className="bg-blue-100 px-2 py-1 rounded text-black font-normal text-sm">
            {recipe.strArea} Cuisine
          </Badge>
        )}
        {recipe.strTags &&
          recipe.strTags.split(",").map((tag) => (
            <Badge
              key={tag}
              className="bg-green-50 px-2 py-1 rounded text-black font-normal text-sm"
            >
              {tag.trim()}
            </Badge>
          ))}
      </div>

      <Button
        variant={isSaved ? "outline" : "default"}
        onClick={() => void handleSaveRecipe()}
        disabled={saveLoading}
        className="whitespace-nowrap"
      >
        {saveLoading
          ? "Processing..."
          : isSaved
          ? "Remove from My Recipes"
          : "Save Recipe"}
      </Button>
    </header>
  );
};
