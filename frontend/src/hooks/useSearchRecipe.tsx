import { Meal, mealDbService } from "@/services/mealdb-service";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearchRecipe = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Meal[] | null>([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    if (searchQuery) {
      const performSearch = async () => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        setError(null);

        const { data, error } = await mealDbService.searchByName(searchQuery);

        setSearchResults(data);
        setError(error);
        setLoading(false);
      };

      void performSearch();
    }
  }, [searchQuery]);
  return { searchResults, loading, error, searchQuery };
};
