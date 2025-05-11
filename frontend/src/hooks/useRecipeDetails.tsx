import { useState, useEffect } from "react";
import { mealDbService } from "../services/mealdb-service";
import { useRecipeStore } from "@/stores/recipe.store";

export const useRecipeData = (id: string | undefined) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { recipe, setRecipe } = useRecipeStore();

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
