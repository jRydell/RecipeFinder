import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { mealDbService } from "../services/mealdb-service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import RecipeCard from "@/components/RecipeCard";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea?: string;
  strTags?: string;
};

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [searchResults, setSearchResults] = useState<Meal[]>([]);
  const [displayedCount, setDisplayedCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (queryParam) {
      void performSearch(queryParam);
    }
  }, [queryParam]);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setDisplayedCount(6);

    const { data, error } = await mealDbService.searchByName(query);

    if (error) {
      setError(error);
      setSearchResults([]);
    } else if (!data || data.length === 0) {
      setError("No recipes found. Try a different search term.");
      setSearchResults([]);
    } else {
      setSearchResults(data);
      setError(null);
    }

    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { q: searchQuery } : {});
    void performSearch(searchQuery);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">Find something you like</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes..."
              className="flex-grow"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            // eslint-disable-next-line react-x/no-array-index-key
            <Card key={`skeleton-${i}`} className="overflow-hidden h-full">
              <div className="aspect-video">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="p-4">
                <Skeleton className="h-7 w-4/5 mb-2" />
                <div className="flex gap-2 mt-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && searchResults.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Search Results:</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.slice(0, displayedCount).map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                id={meal.idMeal}
                title={meal.strMeal}
                image={meal.strMealThumb}
                category={meal.strCategory}
                area={meal.strArea || ""}
                tags={meal.strTags}
              />
            ))}
          </div>

          {/* Load More button */}
          {displayedCount < searchResults.length && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={() =>
                  setDisplayedCount((prev) =>
                    Math.min(prev + 6, searchResults.length)
                  )
                }
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      )}

      {!loading && searchResults.length === 0 && !error && !queryParam && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            Search for your favorite recipes above to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
