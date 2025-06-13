import { useSearchRecipe } from "@/hooks/useSearchRecipe";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/shared/ErrorMessage";

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
    <Card>
      {" "}
      <CardHeader>
        <CardTitle className="text-xl sm:text-3xl text-center">
          Lets find something tasty!
        </CardTitle>
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
