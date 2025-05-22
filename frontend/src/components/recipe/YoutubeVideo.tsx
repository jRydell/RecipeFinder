import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import { useRecipeData } from "@/hooks/useRecipeData";
import { useParams } from "react-router-dom";

export const YoutubeVideo = () => {
  const { mealId } = useParams();
  const { recipe } = useRecipeData(mealId);

  const getVideoId = () => {
    if (!recipe?.strYoutube) return "";
    try {
      return recipe.strYoutube.split("v=")[1].split("&")[0];
    } catch {
      return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Instructions</CardTitle>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md">
          {/* eslint-disable-next-line react-dom/no-missing-iframe-sandbox */}
          <iframe
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${getVideoId()}`}
            title={`${recipe?.strMeal || "Recipe"} video tutorial`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </AspectRatio>
      </CardContent>
    </Card>
  );
};
