export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
};

export type UserRegistrationDTO = {
  username: string;
  email: string;
  password: string;
};

export type UserLoginDTO = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};
