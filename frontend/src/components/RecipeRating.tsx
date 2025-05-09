import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const RecipeRating = () => {
  const [rating, setRating] = useState<number | null>(null);

  return (
    <div className="flex flex-row gap-1 items-center  justify-evenly">
      <Star
        className={`cursor-pointer ${
          rating && rating >= 1
            ? "fill-amber-400 text-amber-400"
            : "text-gray-300"
        }`}
        onClick={() => setRating(1)}
      />
      <Star
        className={`cursor-pointer ${
          rating && rating >= 2
            ? "fill-amber-400 text-amber-400"
            : "text-gray-300"
        }`}
        onClick={() => setRating(2)}
      />
      <Star
        className={`cursor-pointer ${
          rating && rating >= 3
            ? "fill-amber-400 text-amber-400"
            : "text-gray-300"
        }`}
        onClick={() => setRating(3)}
      />
      <Star
        className={`cursor-pointer ${
          rating && rating >= 4
            ? "fill-amber-400 text-amber-400"
            : "text-gray-300"
        }`}
        onClick={() => setRating(4)}
      />
      <Star
        className={`cursor-pointer ${
          rating && rating >= 5
            ? "fill-amber-400 text-amber-400"
            : "text-gray-300"
        }`}
        onClick={() => setRating(5)}
      />
      <Button variant="default">Submit</Button>
    </div>
  );
};

export default RecipeRating;
