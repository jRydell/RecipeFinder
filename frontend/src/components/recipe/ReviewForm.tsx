import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import type { Review } from "@/api/services/recipe-service";

type ReviewFormProps = {
  comment: string;
  setComment: (value: string) => void;
  rating: number;
  setRating: (value: number) => void;
  submitting: boolean;
  userReview: Review | null;
  isAuthenticated: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

export function ReviewForm({
  comment,
  setComment,
  rating,
  setRating,
  submitting,
  userReview,
  isAuthenticated,
  onSubmit,
}: ReviewFormProps) {
  return (
    <form onSubmit={onSubmit} className="mb-6 space-y-4">
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
          disabled={submitting || !rating || !!userReview || !isAuthenticated}
        >
          {submitting ? "Submitting..." : "Post Review"}
        </Button>
      </div>
    </form>
  );
}
