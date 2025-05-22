export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md">{message}</div>
  );
};

//{error && <ErrorMessage message={error} />}
