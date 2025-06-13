import { Alert, AlertDescription } from "@/components/ui/alert";

type ErrorMessageProps = {
  error: string;
};

const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <>
    {error && (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )}
  </>
);

export default ErrorMessage;
