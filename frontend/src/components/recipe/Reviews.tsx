import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ReviewSkeletons } from "./ReviewSkeletons";
import { Trash2 } from "lucide-react";

import { useReviews } from "@/hooks/useReviews";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Meal } from "@/api/services/mealdb-service";

export const Reviews = ({ recipe }: { recipe: Meal }) => {
  const { isAuthenticated, user } = useAuthStore();
  const { reviews, userReview, loading, error, addReview, deleteReview } =
    useReviews(recipe.idMeal);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    setSubmitting(true);
    const result = await addReview(rating, comment);
    if (result.success) {
      setComment("");
      setRating(0);
    }
    //TODO: Toast on error? (maybe)
    setSubmitting(false);
  };
  const handleDelete = async () => {
    setSubmitting(true);
    const result = await deleteReview();
    if (result.success) {
      setComment("");
      setRating(0);
    }
    //TODO: Toast on error? (maybe)
    setSubmitting(false);
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
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        {/* Review Form */}
        <form onSubmit={(e) => void handleSubmit(e)} className="mb-6 space-y-4">
          <div>
            <span className="block text-sm font-medium mb-1">Rating:</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`text-xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  } hover:text-yellow-400 transition-colors`}
                  onClick={() => setRating(star)}
                  aria-label={`Set rating to ${star}`}
                  disabled={submitting}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your review..."
            className="min-h-[100px]"
            disabled={submitting || !!userReview}
          />

          <div>
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={
                submitting || !rating || !!userReview || !isAuthenticated
              }
            >
              {submitting ? "Submitting..." : "Post Review"}
            </Button>
          </div>
        </form>

        {/* Sign in message */}
        {!isAuthenticated && (
          <aside className="p-4 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-muted-foreground">
              Please{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                sign in
              </Link>{" "}
              to leave a review.
            </p>
          </aside>
        )}

        {/* Reviews List */}
        {loading ? (
          <ReviewSkeletons />
        ) : reviews.length > 0 ? (
          <ul className="space-y-6 mt-6">
            {reviews.map((review) => (
              <li
                key={review.id}
                className="p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <article>
                  <header className="flex justify-between items-center">
                    <h3 className="font-medium">
                      {review.user_id === user?.id ? "You" : review.username}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">
                        {Array.from({ length: review.rating }, (_, i) => (
                          <span key={i}>★</span>
                        ))}
                        {Array.from({ length: 5 - review.rating }, (_, i) => (
                          <span key={i} className="text-gray-300">
                            ☆
                          </span>
                        ))}
                      </span>
                      <time className="text-xs text-muted-foreground">
                        {formatTimestamp(review.created_at)}
                      </time>
                      {review.user_id === user?.id && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (
                              confirm(`Delete your review for this recipe?`)
                            ) {
                              void handleDelete();
                            }
                          }}
                          disabled={submitting}
                        >
                          <Trash2 size={16} />
                          <span className="sr-only">Delete review</span>
                        </Button>
                      )}
                    </div>
                  </header>
                  {review.comment && (
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      {review.comment}
                    </p>
                  )}
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center py-10 text-muted-foreground">
            No reviews yet. Be the first to review!
          </p>
        )}
      </CardContent>
    </Card>
  );
};
