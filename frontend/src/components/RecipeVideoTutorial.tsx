import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useRecipeStore } from "@/stores/recipe.store";

const RecipeVideoTutorial = () => {
  const { recipe } = useRecipeStore();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Tutorial</CardTitle>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${
              recipe?.strYoutube?.split("v=")[1]
            }`}
            title={`${recipe?.strMeal} video tutorial`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </AspectRatio>
      </CardContent>
    </Card>
  );
};

export default RecipeVideoTutorial;
