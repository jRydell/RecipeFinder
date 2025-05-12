import { useState, useEffect } from "react";
import { mealDbService } from "../services/mealdb-service";
import { useRecipeStore } from "@/stores/recipe.store";
import { useParams } from "react-router-dom";

export const useRecipeData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { recipe, setRecipe } = useRecipeStore();
  const { id } = useParams<{ id: string }>();

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

    void getRecipeData();

    return () => {
      isMounted = false;
    };
  }, [id, setRecipe]);

  return { recipe, loading, error };
};
