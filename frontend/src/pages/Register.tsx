import { useNavigate, Link } from "react-router-dom";
import { RegisterForm } from "@/components/register/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    if (!agreed) {
      e.preventDefault();
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Sign up to save and review recipes</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <RegisterForm disabled={!agreed} />
            <div className="flex flex-col items-center gap-2 mt-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link
                    to="/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-primary"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              {showError && !agreed && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  You must agree to the terms and conditions to register.
                </p>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-6 mt-8">
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0"
              onClick={() => void navigate("/login")}
            >
              Sign in
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
