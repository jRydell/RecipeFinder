import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link, useParams } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ReviewSkeletons } from "./ReviewSkeletons";
import { Separator } from "@radix-ui/react-separator";

import { useReviews } from "@/hooks/useReviews";

export const Reviews = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { mealId } = useParams();
  const { reviews, userReview, loading, error, upsertReview, deleteReview } =
    useReviews(mealId);
  const [comment, setComment] = useState(userReview?.comment || "");
  const [rating, setRating] = useState(userReview?.rating || 0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setComment(userReview?.comment || "");
    setRating(userReview?.rating || 0);
  }, [userReview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    setSubmitting(true);
    try {
      await upsertReview(rating, comment);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await deleteReview();
      setComment("");
      setRating(0);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch {
      return "some time ago";
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}
      {isAuthenticated ? (
        <form onSubmit={(e) => void handleSubmit(e)} className="mb-6 space-y-2">
          <div className="flex items-center gap-2">
            <span>Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={star <= rating ? "text-yellow-400" : "text-gray-300"}
                onClick={() => setRating(star)}
                aria-label={`Set rating to ${star}`}
                disabled={submitting}
              >
                ★
              </button>
            ))}
          </div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your review..."
            className="mb-2"
            rows={3}
            disabled={submitting}
          />
          <div className="flex gap-2">
            <Button type="submit" disabled={submitting || !rating}>
              {submitting
                ? "Submitting..."
                : userReview
                ? "Update Review"
                : "Post Review"}
            </Button>
            {userReview && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => void handleDelete()}
                disabled={submitting}
              >
                Delete
              </Button>
            )}
          </div>
        </form>
      ) : (
        <div className="p-4 mb-6 bg-gray-100 dark:bg-gray-800 rounded-md">
          <p className="text-muted-foreground">
            Please{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              sign in
            </Link>{" "}
            to leave a review.
          </p>
        </div>
      )}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <ReviewSkeletons />
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="group flex gap-3">
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">
                    {review.user_id === user?.id
                      ? "You"
                      : `User #${review.user_id}`}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">
                      {Array.from({ length: review.rating }, () => "★").join(
                        ""
                      )}
                      {Array.from(
                        { length: 5 - review.rating },
                        () => "☆"
                      ).join("")}
                    </span>
                    <time className="text-xs text-muted-foreground">
                      {formatTimestamp(review.created_at)}
                    </time>
                  </div>
                </div>
                {review.comment && <p className="mt-1">{review.comment}</p>}
                <Separator />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center py-8 text-muted-foreground">
          No reviews yet.
        </p>
      )}
    </div>
  );
};
