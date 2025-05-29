import { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { ReviewSkeletons } from "./ReviewSkeletons";
import { useReviews } from "@/hooks/useReviews";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Meal } from "@/api/services/mealdb-service";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import { SignInPrompt } from "./SignInPrompt";

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
    setSubmitting(false);
  };
  const handleDelete = async () => {
    setSubmitting(true);
    const result = await deleteReview();
    if (result.success) {
      setComment("");
      setRating(0);
    }
    setSubmitting(false);
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
        <ReviewForm
          comment={comment}
          setComment={setComment}
          rating={rating}
          setRating={setRating}
          submitting={submitting}
          userReview={userReview}
          isAuthenticated={isAuthenticated}
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
        />
        {!isAuthenticated && <SignInPrompt />}
        {loading ? (
          <ReviewSkeletons />
        ) : reviews.length > 0 ? (
          <ReviewList
            reviews={reviews}
            user={user}
            submitting={submitting}
            onDelete={() => {
              void handleDelete();
            }}
          />
        ) : (
          <p className="text-center py-10 text-muted-foreground">
            No reviews yet. Be the first to review!
          </p>
        )}
      </CardContent>
    </Card>
  );
};
