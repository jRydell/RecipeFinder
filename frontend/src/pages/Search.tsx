import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchSkeletons } from "@/components/home";
import { SearchResults } from "@/components/search/SearchResults";
import { useSearchRecipe } from "@/hooks/useSearchRecipe";

const Search = () => {
  const [displayedCount, setDisplayedCount] = useState(6);
  const { searchResults, searchQuery, loading, error } = useSearchRecipe();

  if (!searchResults) {
    return null;
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <Link
          to="/"
          className="text-blue-500 hover:underline flex items-center gap-2"
        >
          <span>←</span> Back to Home
        </Link>

        <h1 className="text-2xl font-bold mt-4">
          Search Results for "{searchQuery}"
        </h1>
      </div>

      {loading && <SearchSkeletons />}

      {!loading && error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">{error}</div>
      )}

      {!loading && searchResults.length > 0 && (
        <SearchResults
          searchResults={searchResults}
          displayedCount={displayedCount}
          setDisplayedCount={setDisplayedCount}
        />
      )}

      {!loading && searchResults.length === 0 && !error && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No recipes found matching "{searchQuery}"
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
