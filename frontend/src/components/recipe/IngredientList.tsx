import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Ingredient = {
  measure: string;
  ingredient: string;
};

type IngredientListProps = {
  ingredients: Ingredient[];
};

export const IngredientList = ({ ingredients }: IngredientListProps) => {
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
