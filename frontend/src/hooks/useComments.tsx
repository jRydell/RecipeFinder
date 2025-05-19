import { RecipeComment, recipeService } from "@/api/services/recipe-service";
import { useState, useEffect } from "react";
import { useRecipeData } from "./useRecipeData";

export const useComments = () => {
  const [comments, setComments] = useState<RecipeComment[]>([]);
  const [loadingComments, setLoadingComments] = useState<boolean>(false);
  const [addingComment, setAddingComment] = useState<boolean>(false);
  const [deletingCommentId, setDeletingCommentId] = useState<number | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const { recipe } = useRecipeData();

  // get comments when recipe changes
  useEffect(() => {
    if (!recipe) return;

    const getComments = async () => {
      setLoadingComments(true);
      setError(null);
      const { data, error } = await recipeService.getComments(recipe.idMeal);
      if (error) {
        setError(error);
        setComments([]);
      } else if (data) {
        setComments(data);
      }
      setLoadingComments(false);
    };

    void getComments();
  }, [recipe]);
  // add comment function
  const addComment = async (newComment: string) => {
    if (!recipe) return { success: false, error: "No recipe selected" };

    setAddingComment(true);
    const { error, message } = await recipeService.addComment(
      recipe.idMeal,
      newComment
    );

    if (error) {
      setError(error);
      setAddingComment(false);
      return { success: false, error };
    }

    // refresh after add
    const { data, error: refreshError } = await recipeService.getComments(
      recipe.idMeal
    );

    setAddingComment(false);

    if (refreshError) {
      console.warn("Failed to refresh comments:", refreshError);
      return {
        success: true,
        message,
      };
    }

    if (data) {
      setComments(data);
    }

    return { success: true, message };
  };
  const deleteComment = async (commentId: number) => {
    setDeletingCommentId(commentId);
    setError(null);

    if (!recipe) {
      setDeletingCommentId(null);
      return { success: false, error: "No recipe selected" };
    }

    const { error, message } = await recipeService.deleteComment(commentId);

    if (error) {
      setError(error);
      setDeletingCommentId(null);
      return { success: false, error };
    } // refetch comments after deleting

    const { data, error: refreshError } = await recipeService.getComments(
      recipe.idMeal
    );

    if (refreshError) {
      console.warn("Failed to refresh comments:", refreshError);
      setDeletingCommentId(null);
      return {
        success: true,
        message,
      };
    } else if (data) {
      setComments(data);
    }

    setDeletingCommentId(null);
    return {
      success: true,
      message,
    };
  };
  return {
    comments,
    loadingComments,
    addingComment,
    error,
    addComment,
    deleteComment,
    deletingCommentId,
  };
};
