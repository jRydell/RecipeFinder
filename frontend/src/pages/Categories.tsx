import { Category } from "@/api/services/mealdb-service";
import { mealDbService } from "@/api/services/mealdb-service";
import { CategoryCard } from "@/components/CategoryCard";
import { Separator } from "@/components/ui/separator";
import ErrorMessage from "@/components/ErrorMessage";
import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
    return <p>Loading...</p>;
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
