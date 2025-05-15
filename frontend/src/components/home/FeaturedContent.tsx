import { Meal, mealDbService } from "@/services/mealdb-service";
import { useState, useEffect } from "react";
import { SearchSkeletons } from "./SearchSkeletons";

export const FeaturedContent = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [popularMeals, setPopularMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialContent = async () => {
      setLoading(true);

      const categoriesResponse = await mealDbService.getCategories();
      if (categoriesResponse.data) {
        setCategories(categoriesResponse.data.slice(0, 6));
      }

      const popularResponse = await mealDbService.getRandomMeals(6);
      if (popularResponse.data) {
        setPopularMeals(popularResponse.data);
      }

      setLoading(false);
    };

    void fetchInitialContent();
  }, []);

  if (loading) return <SearchSkeletons />;

  return (
    <div className="space-y-12">
      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.strCategory}
              className="relative overflow-hidden rounded-lg h-40 bg-gradient-to-br from-amber-100 to-amber-200 hover:shadow-lg transition-shadow"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-semibold">
                  {category.strCategory}
                </span>
              </div>
              {category.strCategoryThumb && (
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  className="object-cover w-full h-full opacity-30"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularMeals.map((meal) => (
            <div
              key={meal.idMeal}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{meal.strMeal}</h3>
                <div className="flex gap-2 mt-2 text-sm">
                  <span className="bg-amber-100 px-2 py-1 rounded">
                    {meal.strCategory}
                  </span>
                  {meal.strArea && (
                    <span className="bg-blue-100 px-2 py-1 rounded">
                      {meal.strArea}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
