import { mealDbService } from "@/api/services/mealdb-service";
import { useState, useEffect } from "react";
import { CardSkeletons } from "@/components/shared/CardSkeletons";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { TopRatedRecipes } from "@/components/home/TopRatedRecipes";

export type Category = {
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

export const FeaturedContent = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      const { data: categoriesData } = await mealDbService.getCategories();
      if (categoriesData) {
        setCategories(categoriesData.slice(0, 6));
      }

      setLoading(false);
    };

    void fetchCategories();
  }, []);

  return (
    <div className="space-y-12">
      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Popular Categories</h2>
        {loading ? (
          <CardSkeletons />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.strCategory} category={category} />
            ))}
          </div>
        )}
      </section>

      <TopRatedRecipes />
    </div>
  );
};
