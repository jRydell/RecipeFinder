import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

import { Meal } from "@/api/services/mealdb-service";

export const Instructions = ({ recipe }: { recipe: Meal }) => {
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
