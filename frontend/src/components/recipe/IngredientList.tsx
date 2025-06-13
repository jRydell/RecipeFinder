import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Ingredient = {
  measure: string;
  ingredient: string;
};

export const IngredientList = ({
  ingredients,
}: {
  ingredients: Ingredient[];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingredients</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {ingredients.map((item: Ingredient) => (
            <li
              key={`${item.ingredient}-${item.measure}`}
              className="flex items-start"
            >
              <span className="font-medium mr-2">•</span>
              <span>
                {item.measure} {item.ingredient}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
