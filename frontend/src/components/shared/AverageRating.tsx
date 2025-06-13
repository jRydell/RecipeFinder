import { useAverageRating } from "@/hooks/useAverageRating";
import ErrorMessage from "@/components/shared/ErrorMessage";

export const AverageRating = ({ mealId }: { mealId: string | undefined }) => {
  const { rating, loading, error } = useAverageRating(mealId);

  if (loading) {
    return <div>Loading rating...</div>;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const renderStar = (position: number) => {
    const ratingValue = rating?.averageRating ?? 0;

    // Fully filled star
    if (position <= Math.floor(ratingValue)) {
      return <span className="text-yellow-400">★</span>;
    }

    // Half-filled star
    if (position === Math.ceil(ratingValue) && !Number.isInteger(ratingValue)) {
      return (
        <div className="relative">
          <span className="text-gray-300">★</span>
          <span
            className="absolute left-0 top-0 overflow-hidden"
            style={{ width: "50%" }}
          >
            <span className="text-yellow-400">★</span>
          </span>
        </div>
      );
    }

    // Empty star
    return <span className="text-gray-300">★</span>;
  };

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className="text-xl"
          aria-label={`${rating?.averageRating}: stars`}
        >
          {renderStar(star)}
        </div>
      ))}
      <span className="ml-2 text-sm text-gray-500">({rating?.count})</span>
    </div>
  );
};
