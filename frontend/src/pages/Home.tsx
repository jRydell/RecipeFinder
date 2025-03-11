// src/pages/Home.tsx
import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { mealDbService } from "../services/mealdb-service";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Meal[]>([]);
  const [popularMeals, setPopularMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  // Load some initial recipes on component mount
  useEffect(() => {
    const loadRandomMeals = async () => {
      try {
        setInitialLoading(true);
        // Get several random meals by calling the API multiple times
        const randomMeals = [];
        for (let i = 0; i < 6; i++) {
          const meal = await mealDbService.getRandomMeal();
          if (meal) {
            randomMeals.push(meal);
          }
        }
        setPopularMeals(randomMeals);
      } catch (err) {
        console.error("Failed to load random recipes", err);
      } finally {
        setInitialLoading(false);
      }
    };

    loadRandomMeals();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const result = await mealDbService.searchByName(searchQuery);
      setSearchResults(result || []);
      if (!result || result.length === 0) {
        setError("No recipes found. Try a different search term.");
      } else {
        setError(null);
      }
    } catch (err) {
      console.error("Search failed", err);
      setError("Error searching for recipes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Find Your Perfect Recipe</h1>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes..."
            className="flex-grow p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {searchResults.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                id={meal.idMeal}
                title={meal.strMeal}
                image={meal.strMealThumb}
                category={meal.strCategory}
              />
            ))}
          </div>
        </div>
      )}

      {initialLoading ? (
        <div className="text-center py-8">
          <p>Loading recipes...</p>
        </div>
      ) : (
        (!searchResults.length || !searchQuery) &&
        popularMeals.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Random Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularMeals.map((meal) => (
                <RecipeCard
                  key={meal.idMeal}
                  id={meal.idMeal}
                  title={meal.strMeal}
                  image={meal.strMealThumb}
                  category={meal.strCategory}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Home;
