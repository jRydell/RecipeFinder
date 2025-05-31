import { useSearchRecipe } from "@/hooks/useSearchRecipe";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Input } from "../ui/input";

export const SearchForm = ({
  searchQuery,
  setSearchQuery,
  onSubmit,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}) => {
  const { error, loading } = useSearchRecipe();
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
        {error && <ErrorMessage error={error} />}
      </CardContent>
    </Card>
  );
};
