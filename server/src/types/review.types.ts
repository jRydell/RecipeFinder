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
  user_id: number;
  meal_id: string;
  rating?: number;
  comment?: string;
};
