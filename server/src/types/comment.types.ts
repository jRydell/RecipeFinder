export type Comment = {
  id: number;
  user_id: number;
  meal_id: string;
  comment: string;
  created_at: Date;
};

export type CommentDTO = {
  user_id: number;
  meal_id: string;
  comment: string;
};

export type CommentWithUser = Comment & {
  username: string;
};
