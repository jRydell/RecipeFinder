import { useRecipeData } from "@/hooks/useRecipeData";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export const Instructions = () => {
  const { recipe } = useRecipeData();

  if (!recipe) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Instructions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recipe.strInstructions ? (
          recipe.strInstructions
            .split("\r\n")
            .filter(Boolean)
            .map((paragraph, index) => (
              // Static lits inndex is safe to use as key here
              // eslint-disable-next-line react-x/no-array-index-key
              <p key={index} className="text-left">
                {paragraph}
              </p>
            ))
        ) : (
          <p>No instructions available.</p>
        )}
      </CardContent>
    </Card>
  );
};
