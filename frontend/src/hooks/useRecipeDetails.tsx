import { useState, useEffect } from "react";
import { mealDbService, Meal } from "../services/mealdb-service";

export const useRecipeDetails = (id: string | undefined) => {
  const [recipe, setRecipe] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const getRecipeData = async () => {
      if (!id) return;
      setLoading(true);

      const { data, error } = await mealDbService.getById(id);

      if (isMounted) {
        setRecipe(data);
        setError(error);
        setLoading(false);
      }
    };

    getRecipeData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { recipe, loading, error };
};
