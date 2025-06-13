import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchForm } from "@/components/shared/SearchForm";

const Banner = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  if (location.pathname !== "/" && location.pathname !== "/search") return null;
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      void navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden shadow-md mb-8">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
        alt="Rustic food banner"
        className="w-full h-full object-cover object-center"
        style={{ filter: "brightness(0.85)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#f8f5f0]/70 to-transparent" />{" "}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container max-w-4xl mx-auto px-4">
          <SearchForm
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSubmit={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
