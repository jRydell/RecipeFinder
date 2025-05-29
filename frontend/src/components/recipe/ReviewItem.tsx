import { formatTimestamp } from "@/utils/formatTimestamp";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import type { Review } from "@/api/services/recipe-service";
import type { User } from "@/api/services/auth-service";

type ReviewItemProps = {
  review: Review;
  user: User | null;
  submitting: boolean;
  onDelete: () => void;
};

export const ReviewItem = ({
  review,
  user,
  submitting,
  onDelete,
}: ReviewItemProps) => {
  return (
    <li className="p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <section>
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
                  if (confirm(`Delete your review for this recipe?`)) {
                    void onDelete();
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
      </section>
    </li>
  );
};
