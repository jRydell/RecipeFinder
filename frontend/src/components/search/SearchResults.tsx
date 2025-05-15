import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea?: string;
  strTags?: string;
};

type SearchResultsProps = {
  searchResults: Meal[];
  displayedCount: number;
  setDisplayedCount: React.Dispatch<React.SetStateAction<number>>;
};

export const SearchResults = ({
  searchResults,
  displayedCount,
  setDisplayedCount,
}: SearchResultsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.slice(0, displayedCount).map((meal) => (
          <Card
            key={meal.idMeal}
            className="overflow-hidden flex flex-col h-full"
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <Link to={`/recipe/${meal.idMeal}`}>
                <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors mb-2">
                  {meal.strMeal}
                </h3>
              </Link>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  {meal.strCategory}
                </span>
                {meal.strArea && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {meal.strArea}
                  </span>
                )}
                {meal.strTags &&
                  meal.strTags
                    .split(",")
                    .slice(0, 2)
                    .map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {tag.trim()}
                      </span>
                    ))}
              </div>
            </div>
          </Card>
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
