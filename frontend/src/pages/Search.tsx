import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchSkeletons } from "@/components/home";
import { SearchResults } from "@/components/search/SearchResults";
import { useSearchRecipe } from "@/hooks/useSearchRecipe";

const Search = () => {
  const [displayedCount, setDisplayedCount] = useState(6);
  const { searchResults, queryParam, loading, error } = useSearchRecipe();

  if (!searchResults) {
    return null;
  }
  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          to="/"
          className="text-blue-500 hover:underline flex items-center gap-2"
        >
          <span>←</span> Back to Home
        </Link>

        <h1 className="text-2xl font-bold mt-4">
          Search Results for "{queryParam}"
        </h1>
      </div>

      {loading && <SearchSkeletons />}

      <SearchResults
        displayedCount={displayedCount}
        setDisplayedCount={setDisplayedCount}
      />

      {!loading && searchResults.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No recipes found matching "{queryParam}"
          </p>
          <Link
            to="/"
            className="inline-block mt-4 px-4 py-2 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Search;
