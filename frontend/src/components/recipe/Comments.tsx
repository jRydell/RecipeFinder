import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { CommentSkeletons } from "./CommentSkeletons";
import { Separator } from "@radix-ui/react-separator";
import { useComments } from "@/hooks/useComments";

export const Comments = () => {
  const { isAuthenticated, user } = useAuthStore();
  const [newComment, setNewComment] = useState("");
  const {
    comments,
    loadingComments,
    error,
    addComment,
    addingComment,
    deleteComment,
    deletingCommentId,
  } = useComments();

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const response = await addComment(newComment);

    if (response?.success) {
      setNewComment("");
    }
  };
  const handleDeleteComment = async (commentId: number) => {
    const response = await deleteComment(commentId);

    if (!response || !response.success) {
      console.error(response?.error);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      console.error("error:", error);
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
        <form onSubmit={(e) => void handleAddComment(e)} className="mb-6">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
            className="mb-2"
            rows={3}
          />
          <Button type="submit" disabled={addingComment || !newComment.trim()}>
            {addingComment ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      ) : (
        <div className="p-4 mb-6 bg-gray-100 dark:bg-gray-800 rounded-md">
          <p className="text-muted-foreground">
            Please{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              sign in
            </Link>{" "}
            to leave a comment.
          </p>
        </div>
      )}

      {loadingComments ? (
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
                    </time>{" "}
                    {user && user.id === comment.user_id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => void handleDeleteComment(comment.id)}
                        disabled={deletingCommentId === comment.id}
                      >
                        {deletingCommentId === comment.id ? (
                          <span className="animate-spin">...</span>
                        ) : (
                          <Trash2 className="h-4 w-4 text-red-500" />
                        )}
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
