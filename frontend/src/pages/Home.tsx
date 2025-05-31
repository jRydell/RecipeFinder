import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchForm } from "../components/home";
import { FeaturedContent } from "@/components/home/FeaturedContent";
import ErrorMessage from "@/components/ErrorMessage";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        await navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      } catch (error) {
        console.error("Navigation error:", error);
        setError("Navigation failed");
      }
    } else {
      setError("Please enter a search term");
    }
  };
  return (
    <div className="p-6">
      {error && <ErrorMessage error={error} />}
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSubmit={(e) => {
          void handleSearch(e);
        }}
      />

      <FeaturedContent />
    </div>
  );
};

export default Home;
