import { useRecipeStore } from "@/stores/recipe.store";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export const Instructions = () => {
  const { recipe } = useRecipeStore();
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Instructions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recipe?.strInstructions ? (
          recipe.strInstructions
            .split("\r\n")
            .filter(Boolean)
            .map((paragraph, index) => (
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
