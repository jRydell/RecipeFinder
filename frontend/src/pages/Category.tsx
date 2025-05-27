import { Meal, mealDbService } from "@/api/services/mealdb-service";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const { strCategory } = useParams();
  const [recipes, setRecipes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [displayedCount, setDisplayedCount] = useState(6);
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      const { data, error } = await mealDbService.filterByCategory(strCategory);
      if (error) {
        setError(error);
      } else if (data) {
        setRecipes(data);
      }
      setLoading(false);
    };

    void fetchCategories();
  }, [strCategory]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <section className="p-6 space-y-6">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <h2 className="text-3xl font-bold mb-6">{strCategory}</h2>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.slice(0, displayedCount).map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            idMeal={recipe.idMeal}
            strMealThumb={recipe.strMealThumb}
            strMeal={recipe.strMeal}
          />
        ))}
      </div>
      {displayedCount < recipes.length && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={() =>
              setDisplayedCount((prev) => Math.min(prev + 6, recipes.length))
            }
            className="px-6"
          >
            Load More
          </Button>
        </div>
      )}
    </section>
  );
};

export default Category;
