import { Meal, mealDbService } from "@/api/services/mealdb-service";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useSearchRecipe = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Meal[] | null>([]);
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  useEffect(() => {
    if (queryParam) {
      const performSearch = async () => {
        if (!queryParam.trim()) return;
        setLoading(true);
        setError(null);

        const { data, error } = await mealDbService.searchByName(queryParam);

        setSearchResults(data);
        setError(error);
        setLoading(false);
      };

      void performSearch();
    }
  }, [queryParam]);
  return { searchResults, loading, error, queryParam };
};
