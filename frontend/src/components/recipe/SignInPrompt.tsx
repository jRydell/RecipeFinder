import { Link } from "react-router-dom";

export const SignInPrompt = () => {
  return (
    <div className="p-4 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <p className="text-muted-foreground">
        Please{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          sign in
        </Link>{" "}
        to leave a review.
      </p>
    </div>
  );
};
