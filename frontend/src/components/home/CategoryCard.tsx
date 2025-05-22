import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Category } from "./FeaturedContent";

type CategoryCardProps = {
  category: Category;
  className?: string;
};

export const CategoryCard = ({ category, className }: CategoryCardProps) => {
  return (
    <Link to={`/search?category=${category.strCategory}`}>
      <Card
        className={`overflow-hidden h-auto transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
          className || ""
        }`}
      >
        <CardContent className="p-0 h-full">
          {category.strCategoryThumb && (
            <img
              src={category.strCategoryThumb}
              alt={category.strCategory}
              className="object-cover w-full h-full"
            />
          )}
        </CardContent>
        <CardFooter className="justify-center font-medium">
          <h3>{category.strCategory}</h3>
        </CardFooter>
      </Card>
    </Link>
  );
};
