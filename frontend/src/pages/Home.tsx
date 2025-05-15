import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchForm } from "../components/home";
import { FeaturedContent } from "@/components/home/FeaturedContent";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      setError("Please enter a search term");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <SearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSubmit={handleSearch}
        loading={loading}
        error={error}
      />

      <FeaturedContent />
    </div>
  );
};

export default Home;
