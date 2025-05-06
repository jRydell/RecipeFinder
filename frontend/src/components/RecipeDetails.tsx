import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mealDbService, Meal } from "../services/mealdb-service";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";
import { recipeService } from "@/services/recipe-service";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

const RecipeDetails = () => {
  // Keep all your existing state and functions
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const checkIfSaved = async () => {
      if (!recipe || !isAuthenticated) return;

      const { data } = await recipeService.getSavedRecipes();
      if (data) {
        const saved = data.some((item) => item.meal_id === recipe.idMeal);
        setIsSaved(saved);
      }
    };

    checkIfSaved();
  }, [recipe, isAuthenticated]);

  // Add this function to handle save/unsave
  const handleSaveRecipe = async () => {
    if (!recipe) return;

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setSaveLoading(true);

    if (isSaved) {
      await recipeService.removeSavedRecipe(recipe.idMeal);
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

  // Fetch recipe effect remains the same
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await mealDbService.getById(id);
      setRecipe(data);
      setError(error);
      setLoading(false);
    };
    fetchRecipeDetails();
  }, [id]);

  const getIngredients = (recipe: Meal) => {
    // Your existing getIngredients function
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof Meal];
      const measure = recipe[`strMeasure${i}` as keyof Meal];

      if (
        ingredient &&
        typeof ingredient === "string" &&
        ingredient.trim() !== ""
      ) {
        ingredients.push({
          ingredient,
          measure: measure || "",
        });
      }
    }
    return ingredients;
  };

  // Loading and error states remain the same
  if (loading) {
    return (
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
      {/* Recipe Title and Tags */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-left">{recipe.strMeal}</h1>
        <Button
          variant={isSaved ? "outline" : "default"}
          onClick={handleSaveRecipe}
          disabled={saveLoading}
          className="whitespace-nowrap"
        >
          {saveLoading
            ? "Processing..."
            : isSaved
            ? "Remove from My Recipes"
            : "Save Recipe"}
        </Button>
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.strCategory && (
            <Badge variant="secondary" className="text-sm">
              {recipe.strCategory}
            </Badge>
          )}
          {recipe.strArea && (
            <Badge variant="outline" className="text-sm">
              {recipe.strArea} Cuisine
            </Badge>
          )}
          {recipe.strTags &&
            recipe.strTags.split(",").map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-muted text-muted-foreground text-sm"
              >
                {tag.trim()}
              </Badge>
            ))}
        </div>
      </div>

      {/* Main Image and Ingredients side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="overflow-hidden">
          <AspectRatio ratio={4 / 3}>
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {ingredients.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  <span>
                    {item.measure} {item.ingredient}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* Instructions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recipe.strInstructions
            .split("\r\n")
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={index} className="text-left">
                {paragraph}
              </p>
            ))}
        </CardContent>
      </Card>

      {/* Video (if available) */}
      {recipe.strYoutube && (
        <>
          <Separator className="my-8" />
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorial</CardTitle>
            </CardHeader>
            <CardContent>
              <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden rounded-md"
              >
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${
                    recipe.strYoutube.split("v=")[1]
                  }`}
                  title={`${recipe.strMeal} video tutorial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </AspectRatio>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
