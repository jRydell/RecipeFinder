import { Button } from "@/components/ui/button";
import { useSearchRecipe } from "@/hooks/useSearchRecipe";
import RecipeCard from "../RecipeCard";

type SearchResultsProps = {
  displayedCount: number;
  setDisplayedCount: React.Dispatch<React.SetStateAction<number>>;
};

export const SearchResults = ({
  displayedCount,
  setDisplayedCount,
}: SearchResultsProps) => {
  const { searchResults } = useSearchRecipe();

  if (!searchResults) {
    return null;
  }

  return (
    <div className="space-y-6">
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.slice(0, displayedCount).map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            idMeal={meal.idMeal}
            strMealThumb={meal.strMealThumb}
            strMeal={meal.strMeal}
            strCategory={meal.strCategory}
            strArea={meal.strArea}
          />
        ))}
      </div>
      {displayedCount < searchResults.length && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            onClick={() =>
              setDisplayedCount((prev) =>
                Math.min(prev + 6, searchResults.length)
              )
            }
            className="px-6"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};
