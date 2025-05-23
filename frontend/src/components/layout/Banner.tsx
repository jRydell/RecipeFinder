import { useLocation } from "react-router-dom";

const Banner = () => {
  const location = useLocation();

  if (location.pathname !== "/") return null;

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden shadow-md mb-8">
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
        alt="Rustic food banner"
        className="w-full h-full object-cover object-center"
        style={{ filter: "brightness(0.85)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#f8f5f0]/70 to-transparent" />
    </div>
  );
};

export default Banner;
