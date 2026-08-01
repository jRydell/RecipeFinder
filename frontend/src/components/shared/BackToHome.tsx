import { Link } from "react-router";

const BackToHome = () => {
  return (
    <>
      <Link to="/" className="flex items-center gap-2">
        <span>←</span> Back to Home
      </Link>
    </>
  );
};

export default BackToHome;
