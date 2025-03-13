import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mealDbService, Meal } from "../services/mealdb-service";

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 text-center">
        <p className="text-lg">Loading recipe details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <p className="text-lg">Recipe not found</p>
      </div>
    );
  }

  const ingredients = getIngredients(recipe);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-left">{recipe.strMeal}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {recipe.strCategory && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {recipe.strCategory}
            </span>
          )}
          {recipe.strArea && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
              {recipe.strArea} Cuisine
            </span>
          )}
          {recipe.strTags &&
            recipe.strTags.split(",").map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
              >
                {tag.trim()}
              </span>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 text-left">Ingredients</h2>
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
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-left">Instructions</h2>
        {recipe.strInstructions
          .split("\r\n")
          .filter(Boolean)
          .map((paragraph, index) => (
            <p key={index} className="mb-4 text-left">
              {paragraph}
            </p>
          ))}
      </div>

      {recipe.strYoutube && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-left">
            Video Tutorial
          </h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-96"
              src={`https://www.youtube.com/embed/${
                recipe.strYoutube.split("v=")[1]
              }`}
              title={`${recipe.strMeal} video tutorial`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
