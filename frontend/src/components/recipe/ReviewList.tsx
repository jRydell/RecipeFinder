import type { Review } from "@/api/services/recipe-service";
import type { User } from "@/api/services/auth-service";
import { ReviewItem } from "./ReviewItem";

type ReviewListProps = {
  reviews: Review[];
  user: User | null;
  submitting: boolean;
  onDelete: () => void;
};

export function ReviewList({
  reviews,
  user,
  submitting,
  onDelete,
}: ReviewListProps) {
  return (
    <ul className="space-y-6 mt-6">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          user={user}
          submitting={submitting}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
