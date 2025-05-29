export type Review = {
  id: number;
  user_id: number;
  meal_id: string;
  rating: number | null;
  comment: string | null;
  created_at: Date;
  updated_at: Date;
};

export type ReviewDTO = {
  mealId: string;
  rating: number;
  comment?: string;
};

export type ReviewResponse = Review & {
  username: string;
};
