import { Category } from "@/api/services/mealdb-service";
import { mealDbService } from "@/api/services/mealdb-service";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { CardSkeletons } from "@/components/shared/CardSkeletons";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { CategoryCard } from "@/components/shared/CategoryCard";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      const { data, error } = await mealDbService.getCategories();
      if (error) {
        setError(error);
      } else if (data) {
        setCategories(data);
      }
      setLoading(false);
    };

    void fetchCategories();
  }, []);

  if (loading) {
    return <CardSkeletons />;
  }
  return (
    <section className="p-6 space-y-6">
      {error && <ErrorMessage error={error} />}
      <h2 className="text-3xl font-bold mb-6">Categories</h2>
      <Separator />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <CategoryCard key={category.strCategory} category={category} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
