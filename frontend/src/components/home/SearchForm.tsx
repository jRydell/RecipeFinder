import { Alert, AlertDescription } from "../ui/alert";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";

export const SearchForm = ({
  searchQuery,
  setSearchQuery,
  onSubmit,
  loading,
  error,
}: {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-3xl">Find something you like</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes..."
            className="flex-grow"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
