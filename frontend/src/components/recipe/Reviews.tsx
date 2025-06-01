import { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { ReviewSkeletons } from "./ReviewSkeletons";
import { useReviews } from "@/hooks/useReviews";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Meal } from "@/api/services/mealdb-service";
import { ReviewForm } from "./ReviewForm";
import { ReviewList } from "./ReviewList";
import { SignInPrompt } from "./SignInPrompt";
import ErrorMessage from "../ErrorMessage";

export const Reviews = ({ recipe }: { recipe: Meal }) => {
  const { isAuthenticated, user } = useAuthStore();
  const {
    reviews,
    userReview,
    loading,
    error,
    addReview,
    deleteReview,
    submitting,
  } = useReviews(recipe.idMeal);

  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    const success = await addReview(rating, comment);
    if (success) {
      setComment("");
      setRating(0);
    }
  };
  const handleDelete = async () => {
    await deleteReview();
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <ErrorMessage error={error} />}
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
