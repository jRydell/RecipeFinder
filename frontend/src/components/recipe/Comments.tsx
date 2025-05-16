import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { RecipeComment, recipeService } from "@/api/services/recipe-service";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { CommentSkeletons } from "./CommentSkeletons";
import { Separator } from "@radix-ui/react-separator";
import { useRecipeData } from "@/hooks/useRecipeData";

export const Comments = () => {

  const { isAuthenticated, user } = useAuthStore();
  const { recipe } = useRecipeData();



  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    setSubmitting(true);
    setError(null);

    const { error } = await recipeService.addComment(mealId, newComment);

    if (error) {
      setError(error);
    } else {
      setNewComment("");
      void fetchComments();
    }

    setSubmitting(false);
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    const { error } = await recipeService.deleteComment(commentId);

    if (error) {
      setError(error);
    } else {
      void fetchComments();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      console.log("time stamp error: ", error);
      return "some time ago";
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {isAuthenticated ? (
        <form onSubmit={(e) => void handleSubmitComment(e)} className="mb-6">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
            className="mb-2"
            rows={3}
          />
          <Button type="submit" disabled={submitting || !newComment.trim()}>
            {submitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      ) : (
        <div className="p-4 mb-6 bg-gray-100 dark:bg-gray-800 rounded-md">
          <p className="text-muted-foreground">
            Please{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              sign in
            </Link>
            to leave a comment.
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <CommentSkeletons />
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="group flex gap-3">
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{comment.username}</h3>
                  <div className="flex items-center space-x-2">
                    <time className="text-xs text-muted-foreground">
                      {formatTimestamp(comment.created_at)}
                    </time>
                    {user && user.id === comment.user_id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => void handleDeleteComment(comment.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    )}
                  </div>
                </div>
                <p className="mt-1">{comment.comment}</p>
                <Separator />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-8 text-muted-foreground">
          No comments yet.
        </p>
      )}
    </div>
  );
};
