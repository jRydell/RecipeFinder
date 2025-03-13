import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { mealDbService } from "../services/mealdb-service";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
};

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [searchResults, setSearchResults] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Perform search when component mounts if there's a query parameter
  useEffect(() => {
    if (queryParam) {
      performSearch(queryParam);
    }
  }, [queryParam]);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    const { data, error } = await mealDbService.searchByName(query);

    if (error) {
      setError(error);
    } else if (!data || data.length === 0) {
      setError("No recipes found. Try a different search term.");
    } else {
      setSearchResults(data);
      setError(null);
    }

    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Update URL with search query
    setSearchParams(searchQuery ? { q: searchQuery } : {});

    // Perform the search
    performSearch(searchQuery);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Find something tasty!</h1>
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

      {loading && (
        <div className="text-center py-8">
          <p>Searching for recipes...</p>
        </div>
      )}

      {!loading && searchResults.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
    </div>
  );
};

export default Home;
