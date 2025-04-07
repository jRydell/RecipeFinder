export type Rating = {
  id: number;
  user_id: number;
  meal_id: string;
  rating: number;
  created_at: Date;
};

export type RatingDTO = {
  user_id: number;
  meal_id: string;
  rating: number;
};

export type RecipeRatingResponse = {
  average: number;
  count: number;
  userRating?: number | null;
};
