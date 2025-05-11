import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Ingredient = {
  measure: string;
  ingredient: string;
};

type RecipeIngredientsListProps = {
  ingredients: Ingredient[];
};

const RecipeIngredientsList = ({ ingredients }: RecipeIngredientsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingredients</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {ingredients.map((item: Ingredient, index: number) => (
            <li key={index} className="flex items-start">
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

export default RecipeIngredientsList;
