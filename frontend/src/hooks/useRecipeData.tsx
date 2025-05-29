import { useState, useEffect } from "react";
import { Meal, mealDbService } from "../api/services/mealdb-service";

export const useRecipeData = (mealId: string | undefined) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Meal | null>(null);

  useEffect(() => {
    const fetchRecipeData = async () => {
      if (!mealId) return;
      setLoading(true);
      setError(null);

      const { data, error } = await mealDbService.getById(mealId);
      if (error) {
        setError(error);
        setRecipe(null);
      } else if (data) {
        setRecipe(data);
      }
      setLoading(false);
    };

    void fetchRecipeData();
  }, [mealId]);

  return { recipe, loading, error };
};
