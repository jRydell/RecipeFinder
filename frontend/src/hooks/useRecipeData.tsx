import { useState, useEffect } from "react";
import { Meal, mealDbService } from "../api/services/mealdb-service";
import { useParams } from "react-router-dom";

export const useRecipeData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Meal | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getRecipeData = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);

      const { data, error } = await mealDbService.getById(id);
      if (error) {
        setError(error);
        setRecipe(null);
      } else if (data) {
        setRecipe(data);
      }
      setLoading(false);
    };

    void getRecipeData();
  }, [id]);

  return { recipe, loading, error };
};
