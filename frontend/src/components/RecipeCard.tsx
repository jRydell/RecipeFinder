import { Link } from "react-router-dom";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  category?: string;
}

const RecipeCard = ({ id, title, image, category }: RecipeCardProps) => {
  return (
    <Link
      to={`/recipe/${id}`}
      className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {category && (
          <span className="inline-block mt-2 bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs">
            {category}
          </span>
        )}
      </div>
    </Link>
  );
};

export default RecipeCard;
