import { useAuthStore } from "@/stores/auth.store";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { AverageRating } from "../AverageRating";
import { Meal } from "@/api/services/mealdb-service";
import { useSavedRecipesStore } from "@/stores/savedRecipes.store";

export const Header = ({ recipe }: { recipe: Meal }) => {
  const { isAuthenticated } = useAuthStore();
  const { isSaved, saveRecipe, removeSavedRecipe, loading } =
    useSavedRecipesStore();
  const navigate = useNavigate();

  const handleSaveRecipe = async () => {
    if (!recipe) return;

    if (!isAuthenticated) {
      void navigate("/login");
      return;
    }

    if (isSaved(recipe.idMeal)) {
      await removeSavedRecipe(recipe.idMeal);
    } else {
      await saveRecipe(recipe.idMeal, recipe.strMeal, recipe.strMealThumb);
    }
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
      </div>{" "}
      <Button
        variant={isSaved(recipe.idMeal) ? "outline" : "default"}
        onClick={() => void handleSaveRecipe()}
        disabled={loading}
        className="whitespace-nowrap"
      >
        {loading
          ? "Processing..."
          : loading
          ? "Loading..."
          : isSaved(recipe.idMeal)
          ? "Remove from My Recipes"
          : "Save Recipe"}
      </Button>
    </header>
  );
};
