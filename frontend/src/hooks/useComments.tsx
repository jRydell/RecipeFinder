import { RecipeComment, recipeService } from "@/api/services/recipe-service";
import { useState, useEffect } from "react";
import { useRecipeData } from "./useRecipeData";

export const useComments = () => {
  const [comments, setComments] = useState<RecipeComment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
  const [isAddingComment, setIsAddingComment] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { recipe } = useRecipeData();

  // get comments when recipe changes
  useEffect(() => {
    if (!recipe) return;

    const getComments = async () => {
      setIsLoadingComments(true);
      setError(null);
      const { data, error } = await recipeService.getComments(recipe.idMeal);
      if (error) {
        setError(error);
        setComments([]);
      } else if (data) {
        setComments(data);
      }
      setIsLoadingComments(false);
    };

    void getComments();
  }, [recipe]);

  // add comment function
  const addComment = async (newComment: string) => {
    if (!recipe) return { success: false, error: "No recipe selected" };

    setIsAddingComment(true);

    const { error } = await recipeService.addComment(recipe.idMeal, newComment);

    if (error) {
      setError(error);
      setIsAddingComment(false);
      return { success: false, error };
    }

    // Refetch comments after adding
    const { data } = await recipeService.getComments(recipe.idMeal);
    if (data) setComments(data);

    setIsAddingComment(false);
    return { success: true };
  };

  return {
    comments,
    isLoadingComments,
    isAddingComment,
    error,
    addComment,
  };
};
