import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link, useParams } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ReviewSkeletons } from "./ReviewSkeletons";
import { Trash2 } from "lucide-react";

import { useReviews } from "@/hooks/useReviews";
import { Card } from "../ui/card";

export const Reviews = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { mealId } = useParams();
  const { reviews, userReview, loading, error, addReview, deleteReview } =
    useReviews(mealId);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    setSubmitting(true);
    try {
      await addReview(rating, comment);
    } finally {
      setComment("");
      setSubmitting(false);
    }
  };
  const handleDelete = async () => {
    setSubmitting(true);
    try {
      const result = await deleteReview();
      if (result.success) {
        setComment("");
        setRating(0);
      }
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
    <Card className="mt-8">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}
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
            disabled={submitting || !!userReview}
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={
                submitting || !rating || !!userReview || !isAuthenticated
              }
            >
              {submitting ? "Submitting..." : "Post Review"}
            </Button>{" "}
          </div>
        </form>
        {!isAuthenticated && (
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
              <div
                key={review.id}
                className="group flex gap-3 relative p-3 rounded-lg transition-colors"
              >
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">
                      {review.user_id === user?.id ? "You" : review.username}
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
                      </time>{" "}
                      {review.user_id === user?.id && (
                        <Button
                          variant="ghost"
                          onClick={() => {
                            if (
                              confirm(`Delete your review for this recipe?`)
                            ) {
                              void handleDelete();
                            }
                          }}
                          disabled={submitting}
                          aria-label="Delete review"
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  </div>{" "}
                  {review.comment && <p className="mt-1">{review.comment}</p>}
                  <div className="mt-3 border-b border-gray-200 dark:border-gray-700"></div>
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
    </Card>
  );
};
