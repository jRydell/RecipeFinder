import { Meal, mealDbService } from "@/api/services/mealdb-service";
import { useState, useEffect } from "react";
import { SearchSkeletons } from "./SearchSkeletons";
import RecipeCard from "../RecipeCard";
import { CategoryCard } from "../CategoryCard";

export type Category = {
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export const FeaturedContent = () => {
  const [categories, setCategories] = useState<Category[]>([]);
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
        <h2 className="text-2xl font-bold mb-4">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.strCategory} category={category} />
          ))}
        </div>
      </section>

      {/* Popular Recipes Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularMeals.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              idMeal={meal.idMeal}
              strMealThumb={meal.strMealThumb}
              strMeal={meal.strMeal}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
