import { useState } from "react";
import { SearchResults } from "@/components/search/SearchResults";
import { useSearchRecipe } from "@/hooks/useSearchRecipe";
import { CardSkeletons } from "@/components/CardSkeletons";

const Search = () => {
  const [displayedCount, setDisplayedCount] = useState(6);
  const { searchResults, queryParam, loading, error } = useSearchRecipe();

  if (!searchResults) {
    return null;
  }
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mt-4">
          Search Results for "{queryParam}"
        </h1>
      </div>

      {loading && <CardSkeletons />}

      <SearchResults
        displayedCount={displayedCount}
        setDisplayedCount={setDisplayedCount}
      />

      {!loading && searchResults.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No recipes found matching "{queryParam}"
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;
