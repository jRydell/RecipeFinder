import { CardSkeletons } from "@/components/shared/CardSkeletons";
import RecipeCard from "@/components/shared/RecipeCard";
import { useTopRatedRecipes } from "@/hooks/useTopRatedRecipes";

const RECIPE_COUNT = 6;

export const TopRatedRecipes = () => {
  const { meals, isFallback, loading } = useTopRatedRecipes(RECIPE_COUNT);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">
        {isFallback ? "Popular Recipes" : "Top Rated Recipes"}
      </h2>
      {isFallback && !loading && (
        <p className="text-sm text-muted-foreground mb-4">
          No recipes have been rated yet. Here are a few to get you started.
        </p>
      )}
      {loading ? (
        <CardSkeletons />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              idMeal={meal.idMeal}
              strMealThumb={meal.strMealThumb}
              strMeal={meal.strMeal}
            />
          ))}
        </div>
      )}
    </section>
  );
};
